# Item Metadata API: Read

[Item Metadata API](metadata.html) (MDAPI) Read fetches an item's metadata.

_(**NOTE:** In this document, JSON is pretty-printed for legibility.)_

An item's metadata may be fetched by making an HTTP GET request to
```
https://archive.org/metadata/{identifier}
```
where `{identifier}` is the exact item identifier.  MDAPI will return the item's metadata record in JSON format.

An example request:
```
GET /metadata/xfetch HTTP/1.1
Host: archive.org
```

And a successful response (some fields trimmed for compactness):
```
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

{
  "created": 1616004182,
  "d1": "ia600308.us.archive.org",
  "d2": "ia800308.us.archive.org",
  "dir": "/21/items/xfetch",
  "files": [
    {
      "name": "xfetch.pdf",
      "source": "original",
      "format": "Text PDF",
      "mtime": "1479169618",
      "size": "419170",
      "md5": "ee68c235c2cfc1007a5ab998d21d643c",
      "crc32": "4db3022d",
      "sha1": "abceccfc74a577ed06a5aeb7bebe365e9ff8946d"
    },
    {
      "name": "xfetch_files.xml",
      "source": "original",
      "format": "Metadata",
      "md5": "d6ea3edc409f11ecfd69c061719e9368",
      "summation": "md5"
    },
    // ... additional files ...
  ],
  "files_count": 13,
  "item_last_updated": 1613804036,
  "item_size": 10682344,
  "metadata": {
    "mediatype": "texts",
    "collection": [
      "opensource",
      "community"
    ],
    "title": "XFETCH: Optimal Probabilistic Cache Stampede Prevention",
    // ... additional key-value metadata fields ...
  },
  "server": "ia800308.us.archive.org",
  "uniq": 267404775,
  "workable_servers": [
    "ia800308.us.archive.org",
    "ia600308.us.archive.org"
  ]
}
```
Most of the top-level fields (`d1`, `dir`, `files_count`, etc.) are available across all items.  Some are optional and not always available.  Others depend on the content within the item itself.

A full description of each item record field may be found [here](md-record.html).

## Partial reads

Partial MDAPI records may be fetched by addressing the field (or even a sub-field) directly.  For example, to fetch the `server` field, call `https://archive.org/metadata/xfetch/server`.

A partial fetch successful response:
```
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

{
  "result": "ia800308.us.archive.org"
}
```

Or, to fetch the first file in the `files` list, call `https://archive.org/metadata/xfetch/files/0`:
```
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

{
  "result": {
    "name": "__ia_thumb.jpg",
    "source": "original",
    "mtime": "1613804036",
    "size": "14393",
    "format": "JPEG Thumb",
    "rotation": "0",
    "md5": "1fe0b765283352b5556e6dea4e0fb4ae",
    "crc32": "cd8a1de7",
    "sha1": "f39cb5dec565af57de5cca03a77edf6231aa1dd3"
  }
}
```

When using partial reads, two query parameters are available for slicing elements out of a large array:
* `start` - index to start slice
* `count` - length of slice

For example, if an item has hundreds of files, files from 100 to 104 may be retrieved as so:
```
https://archive.org/metadata/gov.uspto.patents.application.10743335/files?start=100&count=5
```

## Errors

If the item identifier does not exist or cannot be found, MD Read returns an empty array.

For other errors, MDAPI returns an `error` field with a human-readable string explaining the problem.

If a partial read is performed (e.g., `https://archive.org/metadata/xfetch/files/0`), MD Read will return an `error` if the item cannot be found, not an empty array.

## PHP interface

PHP code internal to Petabox may also access MDAPI via its PHP library.  The following are the recommended calls for reading metadata.

### Common options

Read functions accept an array of options (where the option name is an array key).  Many of these
options are common to all or most read functions:

* `primaryonly` (bool, default: false) - Only return the item's PRIMARY server in the `server` field
* `recache` (bool, default: false) - Force a recompute of the metadata record
* `lookahead` (bool, default: true) - Enable [lookahead](md-write.html#lookahead)
* `authed` (bool, default: false) - Authorizes all JSON file reads
* `files_limit` (false|int, default: false) - If `int`, max. number of files to return in `files` field
* `get_timeout` (false|int, default: false) - If `int`, timeout (in seconds) for reading user JSON files
* `dontcache` (bool, default: false) - If record is recomputed, do not write it to the record server
* `offline_ok` (bool, default: false) - `server` may include OFFLINE datanode
* `extended_err` (bool, default: false) - Enable extended errors

Some options are unavailable with a function for specific reasons.  For example, `get_obj_minimal()` doesn't accept `lookahead` because none of the fields it returns require lookahead.

Other options are specific to one or two functions, and are not listed above.  They are detailed in the function information below.

### Metadata::get_obj()
```
Metadata::get_obj(string $item_id, array $options = []): array
```

Options:
* `primaryonly` (bool)
* `recache` (bool)
* `lookahead` (bool)
* `authed` (bool)
* `files_limit` (false|int)
* `get_timeout` (false|int)
* `dontcache` (bool)
* `offline_ok` (bool)
* `extended_err` (bool)

Returns the item's entire metadata record as a PHP associative array.

### Metadata::get_obj_part()
```
Metadata::get_obj_part(string $item_id, string $part, array $options = []): array
```

Options:
* `start` (int|bool) - Start index of `$part` slice
* `count` (int) - Count of `$part` slice
* `authed` (bool)
* `get_timeout` (false|int)
* `recache` (bool)
* `dontcache` (bool)
* `offline_ok` (bool)
* `extended_err` (bool)

Returns only the specified field (`$part`) of the metadata record as a PHP associative array.  The array will have a `result` key holding the field.

`$part` should be a JSON Pointer, e.g., `metadata` or `/metadata/collection`.

If only one field is required by the caller, this call can potentially be more efficient than a full `get_obj()` fetch.

Unlike other calls, if the item doesn't exist or cannot be found, this call returns an `error` with explanatory text.

### Metadata::get_obj_minimal()
```
Metadata::get_obj_minimal(string $item_id, array $options = []): array
```

Options:
* `primaryonly` (bool)
* `get_timeout` (false|int)
* `dontcache` (bool)
* `offline_ok` (bool)
* `extended_err` (bool)

Returned fields:
* `d1`, `d2`, `dir`, `solo`
* `files_count`, `item_size`
* `server`, `workable_servers`, `servers_unavailable`
* `is_dark`, `nodownload,` `is_collection`
* `conflict`

Returns a smaller number of fields, which is potentially more efficient than a full `get_obj()` fetch.

### Metadata::get_obj_fast()
```
Metadata::get_obj_fast(string $item_id, array $options = []): array
```

Options:
* `primaryonly` (bool)
* `offline_ok` (bool)
* `recache` (bool)
* `extended_err` (bool)

Returned fields:
* `d1`, `d2`, `dir`, `solo`
* `server`,` workable_servers`, `servers_unavailable`
* `is_dark`, `nodownload`, `is_collection`
* `conflict`

Returns an ultra-minimal number of fields for the item.  Essentially, it only provides the item's location and a handful of relevant flags.

### Extended errors

To simplify error-handling, extended errors can be enabled.  This is a newer feature of MDAPI and is not enabled by default for backwards compatibility.

When enabled, the returned value is different in two important ways:

1. For a certain class of errors, an `errcode` value is returned along with `error`.  This integer code is machine-parsable.  See `Metadata\ExtendedError` for a full list of codes.
2. If an item cannot be found, rather than returning an empty array, `errcode` and `error` are returned.

Not all MDAPI errors have been adapted to extended errors at this time.  No `errcode` will be present for these errors.

Extended errors are currently unavailable to the `/metadata/` endpoint.
