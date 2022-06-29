# Item Metadata API: Advanced Topics & Extensions

## Introduction

The [Metadata Write API](md-write.html) (MD Write) updates [item](items.html) metadata via [JSON patches (RFC 6902)](https://tools.ietf.org/html/rfc6902).  JSON Patch allows for the caller to made specific changes to a [JSON](https://tools.ietf.org/html/rfc7159) document without uploading an entire new document to replace it.

However, there are several gotchas and fine-points that callers must be aware of when using MD Write and JSON Patch.  This document discusses those issues and offers possible solutions.

It also discusses some of the inner workings of the Metadata API, so the caller can better understand the underlying mechanisms.

To ameliorate some of the more difficult problems, Internet Archive has extended JSON Patch.  These extensions are discussed as well.

It's assumed the reader has reviewed and understands the basics of the [Metadata API](metadata.html).  Please read it before continuing.

_(**NOTE:** In this document, JSON is pretty-printed for legibility.)_

## Tasks

The concept of a [task](https://archive.org/services/docs/api/tasks.html#what-is-a-task) is explained elsewhere.  For the purposes of MD Write, each submitted JSON Patch results in one (1) new `modify_xml.php` task being queued for the item.

Note it's possible for a task to be queued but the actual write to disk to occur much later.  Metadata API's lookahead (explained next) makes it appear the write has been committed to disk as soon as the task is submitted.

## Per-item write locking

MD Write offers limited protection against multiple simultaneous writers.

When a patch is submitted, a per-item lock is acquired.  If two or more callers submit patches at the same time, the lock permits each patch to be analyzed for correctness and submitted to the task queue one at a time.

This prevents patches from being submitted that appear correct at submission time, but do not apply cleanly at write time.  Lookahead permits MD Write to guarantee all queued tasks will be considered when evaluating each patch.

However, the per-item write lock does _not_ guarantee consistency if the caller must read the item metadata first.  See "Problems with concurrent writes" and "Concurrency strategies," below.

## "no changes to _meta.xml"

Most errors returned by MD Write indicate a failure of some kind (often that the patch is malformed or will not apply cleanly).  One error, however, is benign.

If MD Write returns an error string starting with "no changes to", this indicates the patch had no problems, but it failed to make any changes to the target.

There are a number of reasons why this may occur.  What it means in many cases, though, is that the caller's change(s) were made by another patch (see "Dealing with concurrency," below).  For many situations, this is acceptable, and the error can be treated as a success case.

## Problems with concurrent writes

Problems with MD Write and concurrency are mentioned [elsewhere](md-write.html#concurrency-issues).  Any application using MD Write needs to be prepared for the problem of other callers changing the item metadata concurrently.

What follows are two examples of how concurrency affects callers.  "Concurrency strategies" (next) offers suggestions for working around these problems.

### Rejected patches

JSON Patch can modify the document in ways that significantly affect its paths.

For example, removing an element from an array will shift down the indices of all subsequent elements by one.  Inserting a value at the beginning or in the middle of an array will have the opposite effect.  (There are other patch operations which may have similar effects.)

This can lead to a subsequent JSON Patch being rejected if its path(s) are invalid or out-of-bounds.

Consider an item which has this `collection` list in its `metadata` field (array indices are listed to the left of the values):
```
0 opensource
1 stream_only
2 magazines
```

1. Application "A" and "B" use MD Read to download the item's `metadata` field.  They both hold identical copies of the `collection` list.
2. "A" creates a JSON patch to remove the `opensource` collection
```
{"op":"remove", "path":"/collection/0"}
```
3. "B" creates a JSON patch to replace the `magazines` collection with `northamerican`:
```
{"op":"replace", "path":"/collection/2", "value":"northamerican"}
```
4. "A" submits its JSON patch.
5. "B" submits its JSON patch.

The first patch is accepted by MD Write because it applies cleanly.  The second patch (from "B") is rejected by MD Write because `/collection/2` is no longer a valid path—after the first patch, the array only holds two values, and JSON array indexing is zero-based.

"B" will receive an error message, indicating it needs to re-read the metadata and try again.

### Accepted patches that cause data loss

The worse case is where MD Write _accepts_ a patch because it applies cleanly, but the final result does not reflect the callers' intentions.

Returning to an item with this `collection` list:
```
0 opensource
1 stream_only
2 magazines
```

1. Application "A" and "B" read the item's `metadata`
2. "A" creates a JSON patch to insert the `northamerican` collection at the beginning of the list:
```
{"op":"add", "path":"/collection/0", "value":"northamerican"}
```
3. "B" creates a JSON patch to remove the `stream_only` collection:
```
{"op":"remove", "path":"/collection/1"}
```
4. "A" submits its JSON patch.
5. "B" submits its JSON patch.

When both patches are finished writing, the `collection` list will be:
```
0 northamerican
1 stream_only
2 magazines
```

`stream_only` remains in the list while `opensource` was removed.  Neither patch was invalid, but the final result is incorrect.

## Concurrency strategies

Recall that MD Write uses a per-item lock to prevent multiple writers from submitting conflicting patches.  What the above scenarios demonstrate is that this lock is limited to preventing "bad" JSON patches from being accepted (e.g., a patch that references an out-of-bounds array index, or a patch that references an invalid path).

Most item write operations are actually read-analyze-write:

1. The metadata is read,
2. it's analyzed to determine what change(s) need to be made to produce a JSON patch,
3. and the patch is submitted (written).

In order to produce a clean patch that produces the desired effects, all three steps need to be performed on consistent data.  That is, the item metadata must not change between step one and step three.

Below are some strategies for guaranteeing consistency.

### Use the `test` operator

JSON Patch's [`test` operator](https://tools.ietf.org/html/rfc6902#section-4.6) can verify a value is present before proceeding with the rest of the patch (whitespace added for readability):
```
[
  {"op":"test",   "path":"/collection/1", "value":"stream_only"},
  {"op":"remove", "path":"/collection/1"}
]
```
If the test fails, MD Write will return an error to the caller.  The caller should re-read the item metadata and produce a new patch with the appropriate path.

(It's also possible the desired change was already made, and the caller can simply do nothing.)

Few, if any, JSON Patch diff libraries will generate appropriate `test` operations for their patches.  Using `test` often means having to hand-roll the patch.  (See "Document versioning," below, for another approach that is easier to integrate with diff libraries.)

### Use a custom lock

There are three targets for MD Write: `metadata`, `file`, and custom JSON files (whose names are chosen by the application).

The caller cannot acquire a general read-write lock for `metadata` and `file`, as those targets are available to all callers (as long as they have permissions to write to the item).  However, an application can be reasonably assured that its custom JSON files are only written by itself.

In this case, if the application is running on a limited set of computers, it could manage its own lock.  It should acquire the lock before reading the metadata and release it after successfully submitting the patch.

### Blind writes

Certain JSON patches don't require first reading the metadata.  In these cases, the caller doesn't have to worry about locks or using the `test` operator.

For example, JSON Patch supports an [array append operator](https://tools.ietf.org/html/rfc6902#section-4.1) (the "-" symbol at the end of the path) which doesn't require knowing the array's length to supply a proper index:
```
{"op":"add", "path":"/keywords/-", "value":"magazine"}
```

This patch will append `magazine` to the `keywords` array.  (Note that a JSON arrays permit multiple equal values, so if uniqueness is important, the append operator may not be appropriate.)

If the target is an associative array (a JSON object) and the key is already known, some operations can modify or remove the value without first reading the metadata:
```
{"op":"replace", "path":"/keywords/magazine", "value":"stream_only"}
```
If `magazine` is not in the keywords list, then MD Write will return a "no changes" error, which the caller is safe to ignore.

There are other situations where a blind write is possible.  Some of IA's JSON Patch extensions (detailed below) may help.

Callers should analyze the operation(s) they wish to perform to determine if they can be done without an initial read.

### Document versioning

An application can [store a document version number](https://github.com/tomalec/Versioned-JSON-Patch/blob/master/Versioned-JSON-Patch.md) in its JSON file and use the `test` operator to ensure consistency.

For example, the JSON might look like this (whitespace added for readability):
```
{
  "version":0,
  "data": [ "fee", "fo", "fum" ]
}
```
Rather than managing a lock or having to submit a large `value` for one or more `test` operators, the caller can use the version number to guarantee consistency:
```
[
  {"op":"test",     "path":"/version",  "value":0},
  {"op":"add",      "path":"/data/1",   "value":"fi"},
  {"op":"replace",  "path":"/version",  "value":1}
]
```
This results in the following steps:
1. The version number is checked with `test`,
2. the new data is inserted in the array at the proper location,
3. and finally the version number is incremented.

If `test` fails, the caller should re-read the JSON and try again.

For this to work, _all_ code writing to the document will need to update the version number.

The advantage of this approach over the general-purpose `test` case (above) is that it's easier to add this `test` to an auto-generated patch from a diff library.  The caller:

1. reads the JSON document,
2. saves the version number of the document in a temporary variable,
3. increments the version number and makes the other changes to the document,
3. and produces a diff.

The version number `test` is easy to prepend to the final patch, and the diff library will supply the `replace` operation to update the version number.

## JSON Patch extensions

To make it easier to produce good patches that don't cause data loss, IA offers two extensions to the JSON Patch specification.

Please be aware of the differences between a [JSON array](https://tools.ietf.org/html/rfc7159#section-5) (an ordered list of values indexed by offset) and a [JSON object](https://tools.ietf.org/html/rfc7159#section-4) (a collection of key-value pairs indexed by key, with no guarantees of ordering).

### remove-first

The `remove-first` operator will remove the first matching value in an array.  (It does _not_ operate on a JSON object, as objects lack a notion of ordering).
```
{"op":"remove-first", "path":"/collection/-", "value":"stream_only"}
```
Note that the special-use trailing dash (`-`) in `path` is required to target the array.

The operation will only change the document if:

* `/collection` is an array,
* and it contains at least one value equal to the specified `value`.

Only the first matching value in the array is removed.

Note that `value` may be any JSON data type. The supplied value must be equal to the existing value for the remove to occur. Equality is defined as with the [test operator](https://tools.ietf.org/html/rfc6902#section-4.6).

If the value is not found, the operation is a no-op and the array is unchanged. This will lead MD Write to report a "no changes" failure (see above).

If the path does not exist, or references a value other than an array, an error will be returned.

### remove-all

The `remove-all` operator will remove all matching values from an array _or_ a JSON object.
```
{"op":"remove-all", "path":"/keywords/-", "value":"foo"}
```
Note that the special-use trailing dash (`-`) in `path` is required to target the array or object.

The operation will only change the document if:

* `/collection` is an array or JSON object,
* and it contains at least one value equal to the specified `value`.

All values equal to `value` are removed.  For JSON objects, the key is removed as well.

Note that `value` may be any JSON data type. The supplied value must be equal to the existing value for the remove to occur. Equality is defined as with the [test operator](https://tools.ietf.org/html/rfc6902#section-4.6).

If the value is not found, the operation is a no-op and the array or object is unchanged. This will lead MD Write to report a "no changes" failure (see above).

If the path does not exist, or references a value other than an array or an object, an error will be returned.
