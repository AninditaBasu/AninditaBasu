# Item Metadata API: Record details

The [Item Metadata API](metadata.html) (MDAPI) returns a record with a number of fields for each item.  This document explains the meaning of each field.

## Location fields

The item's location in Internet Archive's distributed cluster is described by several fields.  All items will have the following:

* `d1`: The primary data node the item is stored on
* `d2`: The secondary (backup) data node the item is stored on (unless stored on a solo node, see below)
* `dir`: The item's absolute pathname (on both data nodes)
* `server`: The preferred server for reading the item's contents.  Callers should use this node when constructing a URL
* `workable_servers`: A list of data nodes currently available for accessing the item's contents

Items may optionally also have these fields:

* `solo` (boolean): The item is only stored on a single node (rare)
* `servers_unavailable` (boolean): One or both servers are unavailable, that is, inaccessible for some reason (network problems, under service, etc.)

Even if both servers are unavailable, MDAPI will still return a `server` field for the client to attempt to contact.

Although the location metadata may be used to create a URL for accessing the item's content, it's best not to do so.  An item may migrate around the data center over its lifetime.

Use the `/download/` service to reliably access item data:
```
https://archive.org/download/xfetch/xfetch.pdf
```

## Metadata field

Each item holds an XML file of metadata fields at `<identifier>_meta.xml`.  These fields are generally in the form of key-value pairs, but some keys are allowed to hold a list of values.

The entire XML file is present in the MDAPI `metadata` field.  [Metadata Write](md-write.html) may add/update/delete these fields.

## Files fields

Each item also holds an XML file listing all its files and their metadata (`<identifier>_files.xml`).  These fields are in the form of key-value pairs.

The entire XML file is translated to the MDAPI `files` field as an array of file names, sizes, modification times, checksums, and more.  Metadata Write may add/update/delete some of these fields.

There are additional top-level fields regarding the item's file contents:

* `files_count`: Total number of files in the item
* `item_last_updated`: The UNIX epoch time when the item was last modified
* `item_size`: Total size in bytes of all files in the item

## Reviews field

Most items may be reviewed by Internet Archive users.  The reviews are listed under the `reviews` field.

Unlike the rest of the item's content, any logged-in user may modify an item's reviews.  The [Reviews API](reviews.html) is used to add/update/delete reviews.

## Catalog fields

If an item has changes queued or running, each [task](tasks.html) will be listed under the `tasks` field.  Each task is listed with the task name and its state (`queued`/`running`/`error`).  Tasks are listed in order of pending execution, from first to last.

Additionally, there are two other optional top-level fields indicating task activity:

* `pending_tasks` (boolean): Indicates one or more tasks are queued or running
* `has_redrow` (boolean): Indicates one or more tasks are red (halted due to error)

## Item state fields

Several non-editable fields describe states the item itself may be in:

* `is_dark`: The item was darked and is unavailable
* `nodownload`: The item is not ready for downloading
* `is_collection`: The item is a collection

## SimpleLists field

The `simplelists` field holds the SimpleLists structure for the item.

More information can be found at [SimpleLists](simplelists.html).

## User JSON fields

With proper permissions, users may add JSON files to an item and have its data present in the MDAPI record itself.  This permits adding highly-customized, structured, *ad hoc* metadata.

User JSON files are restricted by default, and will not be visible to all users by MDAPI without proper authentication.

Metadata Write may be used to add the JSON to the MDAPI record and update it.

### Uploading JSON files (discouraged)

If the file is uploaded to the item via [S3](ias3.html), the file's name must match one of the following patterns:
```
{identifier}.json
{identifier}_{name}.json
```
where `{identifier}` is the item identifier, and `{name}` is a string of alphanumeric characters.

In the first case, the JSON file will be listed in the MDAPI record by the item identifier.  In the second case, the JSON file will be listed by `{name}`.

However, **this approach is highly discouraged.**  It's better for several reasons to use MD Write to add user JSON to an item.  For one, using MD Write means you'll get the benefits of [lookahead](md-write.html#lookahead).  You'll also be able to support concurrent writes and selective editing of the file, while full file uploads results in a "last uploader wins" scenario.

## Meta-metadata fields

Finally, the MDAPI record may list fields which are metadata about the metadata:

* `created`: The UNIX epoch time the *metadata record* was created
* `uniq`: A pseudo-random value used internally by MDAPI
* `updated`: The UNIX epoch time the *metadata record* was updated (uncommon)

Metadata records are constantly created and destroyed by MDAPI as part of its internal caching strategy.  **The `created` and `updated` fields should NOT be used as indications of when the item itself was created or updated.**
