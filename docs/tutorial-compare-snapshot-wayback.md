# Compare two versions of a website

Websites evolve; their content changes over time. The Wayback Machine is a crawler that runs periodically to automatically archive websites. Every time it crawls a website, it creates a snapshot of that website at that moment in time. This snapshot trail can show you what changed on the website between two timestamps.

This tutorial shows you how to do these tasks:

- Retrieve a list of all available versions of a website.
- Compose the URLs for the versions to compare.

## API used

- [Wayback CDX Server API - BETA](https://archive.org/services/docs/api/wayback-cdx-server.html)

## Prerequisites

The instructions in this tutorial use the `cURL` command. Most computers have this protocol pre-installed. To see if it's installed on your computer, at the command prompt, run the following command: 

```bash
curl
```

You should get an output similar to this:

```
curl: try 'curl --help' for more information
```

If you don't see this output, install `cURL`.

## Steps

This task is has two steps.

### Step 1. Get a list of available snapshots

Run a command in the following syntax: 

```bash
curl -X GET "http://web.archive.org/cdx/search/cdx?url=<URL>"
```

where `<URL>` is the URL of the website whose snapshots you're retrieving.

The result has the following components, separated by a single space:

- `urlkey`: A canonical transformation of the URL you supplied, for example, `org,eserver,tc)/`. Such keys are useful for indexing.
- `timestamp`: A 14 digit date-time representation in the `YYYYMMDDhhmmss` format.
- `original`: The originally archived URL, which could be different from the URL you supplied.
- `mimetype`: The mimetype of the archived content, which can be one of these:
    - `text/html`
    - `warc/revisit`
- `statuscode`: The HTTP status code of the snapshot. If the mimetype is `warc/revisit`, the value returned for the `statuscode` key can be blank, but the actual value is the same as that of any other entry that has the same `digest` as this entry. 
- `digest`: The `SHA1` hash digest of the content, excluding the headers. It's usually a base-32-encoded string.
- `length`: The compressed byte size of the corresponding WARC record, which includes WARC headers, HTTP headers, and content payload.

#### Example request

```bash
curl -X GET "http://web.archive.org/cdx/search/cdx?url=tc.eserver.org"
```

#### Example response

```bash
org,eserver,tc)/ 20180515033912 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20180716082607 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 405
org,eserver,tc)/ 20180915160723 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20181014163006 http://tc.eserver.org/ warc/revisit - RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 502
org,eserver,tc)/ 20181115172501 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20181228210547 http://tc.eserver.org/ warc/revisit - RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 500
```

### Step 2. Compare the website versions

Snapshots archived by the Wayback machine contain the following prefix to  URLs: `http://web.archive.org/web/<time stamp>/`. So, for example, if a snapshot of the website at `tc.eserver.org/` was archived on 27 April 2018 at 13:06:34 hrs, the URL of the snapshot is `http://web.archive.org/web/20180427130634/https://tc.eserver.org/`.

1. From the list you generated in the previous step, pick two timestamps, and compose their URLs. For example, `http://web.archive.org/web/20180427130634/https://tc.eserver.org/` and
`http://web.archive.org/web/20181115172501/https://tc.eserver.org/`.
2. Open your favourite diff tool, and use compare the two versions.

If you don't see any difference, it might be that the digests of both the websites are the same. If so, pick two versions that have different digests, and compare them.
