# Item Metadata API: Write

[Item Metadata API](metadata.html) (MDAPI) Read updates an item's metadata.

_(**NOTE:** In this document, JSON is pretty-printed for legibility.)_

Certain portions of an item's metadata record may be updated by making an HTTP POST request to the same address as reading the record (`https://archive.org/metadata/{identifier}`).

The caller must choose which target(s) they wish to write to.  Currently, the only writeable targets are `metadata`, `files`, user JSON, and `simplelists`.

(Reviews may be written via the [Reviews API](reviews.html).  Writing to SimpleLists is covered [here](simplelists.htmll#modifying-relationships).)

Metadata Write does not support [partial paths](md-read.html#partial-reads), such as `https://archive.org/metadata/xfetch/metadata/creator`.  Rather, the write would occur to the `metadata` target and the patch path would be for `/creator`.

There are two forms of Metadata Write: [single-target](#single-target-writes) and [multi-target](#multi-target-writes).  The first form is more common.

## Lookahead

MDAPI performs lookahead for all changes submitted via MD Write.  This means that changes submitted to an item will be reflected in MD Read's results _before_ the patch is written to disk.  Lookahead takes effect the moment a change is submitted.

Note that lookahead only works if the metadata record is read with the Metadata API.  Directly viewing the on-disk data file will _not_ receive the benefits of lookahead.

When creating a patch for MD Write, the caller should always use MD Read rather than reading the raw file in the item.

## Transaction workflow

The general approach for using Metadata Write is:

1. Read the item's current metadata record (using [Metadata Read](md-read.html))
2. Alter the record (either the record's `metadata`, `files`, or a user JSON field; other fields are read-only)
3. Generate a JSON Patch (using a diff tool, although it can be hand-generated)
4. Perform a Metadata Write

The caller should *always* read the item state via MD Read, and not read the files directly from the data node via HTTP.

### Concurrency issues

It's possible for multiple writers to submit changes to the same item concurrently.  MDAPI makes certain provisions to guard against race conditions, but clients are expected to use safeguards as well.

This issue is discussed further in [Metadata API: Advanced Topics & Extensions](md-write-adv.html).

### Authentication

In addition to the authentication methods detailed [elsewhere](metadata.html#authentication), Metadata Write also permits the user's S3 access/secret keys to be included as URL-encoded form data in the POST payload.  This is explained below.

### User JSON files

As mentioned earlier, MD Write may be used to create and update JSON files in the item.  **If you plan on updating a user JSON file with MD Write, do NOT upload the file to or delete the file from the item using S3.**  This interferes with MDAPI and the way it works with the JSON file.

## Targets

Other than `simplelists` and `reviews`, the three supported targets are:

* `metadata`: To write to the `metadata` field
* `files/{filename}`: To write metadata for a specific file in the item
* `{identifier}` or `{name}`: To write custom user JSON

Note that the `files/{filename}` form does **not** write to the target file itself.  Rather, the metadata is written to the item's `_files.xml` file, which holds sundry metadata about each file.

Also note that a partial Metadata Read of a file uses the file's *index* in the path (https://archive.org/metadata/xfetch/files/12), while Metadata Write uses the file's *name* in the path (`files/xfetch.pdf`).

Custom user JSON will result in a file being written to the item: `{identifier}.json` for the first form, and `{identifier}_{name}.json` for the second.

## JSON Patch & JSON Pointer

MDAPI uses [JSON Patch](https://tools.ietf.org/html/rfc6902) for specifying metadata changes.  The patches can be generated by hand, or by using a JSON diff library.

One important note about the patches regards the JSON path (which is a [JSON pointer](https://tools.ietf.org/html/rfc6901)).  The patch `path` should _not_ include the target being modified.

For example, if modifying the `creator`field in `metadata`, don't include `/metadata/` in the JSON path:
```
{
  "op": "replace",
  "path: "/creator",
  "value": "Stimpy"
}
```

Also note that a JSON Patch may include multiple operations as a JSON array:
```
[
  {
    "op": "replace",
    "path: "/creator",
    "value": "Stimpy"
  },
  {
    "op": "remove",
    "path": "/keywords"
  }
]
```

## Rate limits

Users are limited in the number of tasks they may submit over a period of time.  Clients should be prepared to receive a `429 Too Many Requests` HTTP response indicating the user's threshold has been reached.  The client should either report this error or sleep for a period of time before retrying.

The server may return a `Retry-After` header with the response.  The client may use this value as a suggestion for the amount of time to pause.

## Priority

All tasks have a priority number.  The higher the number, the higher the execution order.  Task priorities generally run in the range from -10 to +10.

**High priority does not mean a task will run sooner.**  There are several criteria used to determine when a task executes, including machine availability, workload, total number of queued tasks, and more.  Also, tasks for any particular item are serialized (only one may execute at a time).  Tasks are executed in the order they are submitted, regardless of their priority.

Additionally, because of [lookahead](#lookahead), when the MD Write task executes is somewhat moot.  As soon as the task is scheduled, it will be reflected in the MD Read record.

### Priority reduction

Clients wishing to avoid rate limiting may opt to schedule their change task at a reduced priority.  When the `X-Accept-Reduced-Priority` request header is set to a true-ish value (e.g., `1`), a client submitting a task for execution can avoid rate limiting.  If the user is being rate limited, the task will be queued at a reduced priority rather than returning a `429 Too Many Requests`.

If priority reduction occurs, the `X-Priority-Reduced` header is returned with the `200 OK` response.  The header value is the task's reduced priority number (e.g., `-7` or `-9`).

Clients should be prepared to receive a `429 Too Many Requests` even if the `X-Accept-Reduced-Priority` header is sent.

## Single target writes

To write to a single target, perform an HTTP POST to the `/metadata/{identifier}` endpoint with a [**URL-encoded form data payload**](https://datatracker.ietf.org/doc/html/rfc7578) of the following fields:
* `-target`: The patch target (`metadata`, `files/{filename}`, or user JSON identifier)
* `-patch`: The JSON Patch (JSON-encoded)

As mentioned above, the form data may also include these fields rather than use the `Authorization:` header:
* `access`: The user's S3 access key
* `secret`: The user's S3 secret key

The form data may also include an optional `priority` field, an integer indicating the task's execution priority.  The default `priority` is `0` (zero).  (See [Priority](#priority) for more information.)

A success response is [JSON-encoded](https://datatracker.ietf.org/doc/html/rfc8259) with three fields:
* `success` (true)
* `task_id` (int): The queued task identifier for the change
* `log`: A URL to the log file that will be written to when the change is executed

An error response will have two fields:
* `success` (false)
* `error` (string)

### Encoding

One important point that can be confusing is the use of multiple encodings.

The entire payload is URL-encoded form data ("percent encoding").  The `-patch` field is a JSON Patch, meaning it is itself JSON-encoded.  This means the JSON Patch is double-encoded: First as JSON, and then percent encoded.

In pseudo-code, assembling the payload looks something like this:
```
  patch = json_diff(current_metadata, updated_metadata);
  json_patch = json_encode(patch); // if json_diff() doesn't return a JSON-encoded patch
  payload = percent_encode([ "-target" => "metadata", "-patch" => json_patch ]);
```

### Example

For writing to target `metadata`, a patch to remove the `creator` field would look like this:
```
{
  "op": "remove",
  "path": "/creator"
}
```

The write request:
```
POST /metadata/example_item HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
Content-Length: 85
Content-Type: application/x-www-form-urlencoded

-target=metadata&-patch=%7B%22op%22%3A%22remove%22%2C%22path%22%3A%22%2Fcreator%22%7D
```

A successful response:
```
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

{
  "success":true,
  "task_id":2391928033,
  "log":"https://catalogd.archive.org/log/2391928033"
}
```

An error response:
```
HTTP/1.1 400 Bad Request
Content-Type: application/json
Transfer-Encoding: chunked

{
  "success":false,
  "error":"No changes made to _meta.xml"
}
```

## Multi-target writes

Multiple targets may be written in a single request.  While this can be achieved by several sequential single-target requests, multi-target writes have the advantage of being atomic.

To write to multiple targets, perform an HTTP POST to the endpoint with a URL-encoded form data payload of the following field:

* `-changes`: A JSON-encoded array of targets and patches (described below)

As with single-target, the form data may also include an optional `priority` field.  (See [Priority](#priority) for more information.)

The success and error responses are identical to the responses described in ["Single target"](#single-target-writes).

Multi-target writes accept S3 keys as POST data, also described above.

### Encoding

The `-changes` list is a JSON-encoded array of objects (dictionaries).  Each JSON object contains two keys: `target` and `patch`.  Thus, multiple targets may be specified, each with its own patch.  The same target may be included multiple times.

Example:
```
[
  {
    "target": "metadata",
    "patch": {
      "op": "replace",
      "path": "/creator",
      "value": "Ren"
    }
  },
  {
    "target": "files/image/01.jpg",
    "patch": [
      {
        "op": "add",
        "path": "/subject",
        "value": "Log"
      },
      {
        "op": "remove",
        "path": "/keyword"
      }
    ]
  }
]
```
The second element in the changes list, for `files/image/01.jpg`, is an example of `patch` holding multiple operations.

As with single-target writes, the entire `-changes` list is URL-encoded (meaning the changes list is double-encoded).

### Example

Using the prior changes list example, the HTTP POST would look like this:
```
POST /metadata/example_item HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
Content-Length: 378
Content-Type: application/x-www-form-urlencoded

-changes=%5B%7B%22target%22%3A%22metadata%22%2C%22patch%22%3A%7B%22op%22%3A%22replace%22%2C%22path%22%3A%22%2Fcreator%22%2C%22value%22%3A%22Ren%22%7D%7D%2C%7B%22target%22%3A%22files%2Fimage%2F01.jpg%22%2C%22patch%22%3A%5B%7B%22op%22%3A%22add%22%2C%22path%22%3A%22%2Fsubject%22%2C%22value%22%3A%22Log%22%7D%2C%7B%22op%22%3A%22remove%22%2C%22path%22%3A%22%2Fkeyword%22%7D%5D%7D%5D
```

## Errors

If the patch does not make any changes to the item, it will be rejected with an error message stating "no changes made."  Other errors have different messages.

## PHP interface

PHP code internal to Petabox may also access MDAPI via its PHP library.  The following are the calls for writing metadata.

### Metadata::write()

`Metadata::write()` is used for [single-target writes](#single-target-writes).
```
Metadata::write(string $item_id, string $target, array $patch, string $username, int $priority = 0, string $submitter = null): int|bool
Throws: \Exception
```

Parameters are:
* `$item_id` - Item identifier
* `$target` - `metadata`, `file/{filename}` or user JSON identifier
* `$patch` - JSON Patch
* `$username` - Username (email) of user submitting the patch
* `$priority` - Task priority
* `$submitter` - Username (email) of task submitter

`$submitter` is used when `write()` is being called by a system account on behalf of a regular user.  `$username` is used for purposes of authorization/permissions, but the task is recorded as being submitted by `$submitter`.  (This is an unusual situation.)

The returned `int` is the submitted `task_id` (or, if writing to SimpleLists, a `bool` indicating success/failure).

`Metadata::write()` is not subject to rate limits.

### Metadata::write_many()

`Metadata::write()_many` is used for [multi-target writes](#multi-target-writes).
```
Metadata::write_many(string $item_id, array $changes, string $username, int $priority = 0, string $submitter = null): int|bool
Throws: \Exception
```

The parameters for `Metadata::write_many()` are the same as `Metadata::write()` save for the following:

* `$changes` is an array of "target/patch" changes as described [above](#multi-target-writes).

`Metadata::write_many()` is not subject to rate limits.