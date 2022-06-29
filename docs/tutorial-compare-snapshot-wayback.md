# Compare two versions of a website

Websites evolve; their content changes over time. The Wayback Machine is a crawler that runs periodically to automatically archive websites. Every time it crawls a website, it creates a snapshot of that website at that moment in time. This snapshot trail can show you what changed on the website between two timestamps.

This tutorial shows you how to retrieve two versions of the same website.

## API used

- [Wayback CDX Server API - BETA](https://archive.org/services/docs/api/wayback-cdx-server.html)

## Steps

This task is a two-step process, where you first retrieve a list of the available snapshots, and then pick the snapshots that you want to see.

### Step 1. Get a list of available snapshots

Run a command in the following syntax: `curl -X GET "http://web.archive.org/cdx/search/cdx?url=<URL>"`, where `<URL>` is the URL of the website whose snapshots you're retrieving.

The result has the following components, separated by a single space:

- `urlkey`: The parts of the URL you supplied, for example, `org,eserver,tc)/`
- `timestamp`: A 1-14 digit number in the `YYYYMMDDhhmmss` format
- `original`: The URL you supplied
- `mimetype`: The mimetype of the archived content
- `statuscode`: The HTTP status code of the snapshot
- `digest`: 
- `length`:

#### Example request

`curl -X GET "http://web.archive.org/cdx/search/cdx?url=tc.eserver.org"`

#### Example response

```bash
org,eserver,tc)/ 20180515033912 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20180716082607 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 405
org,eserver,tc)/ 20180915160723 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20181014163006 http://tc.eserver.org/ warc/revisit - RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 502
org,eserver,tc)/ 20181115172501 http://tc.eserver.org:80/ text/html 302 RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 404
org,eserver,tc)/ 20181228210547 http://tc.eserver.org/ warc/revisit - RK36SX4X6VJ44FMUWDK4QYFPYGBYUJUH 500
```

### Step 2. Retrieve the website versions

URLs of websites are in the following format: `https://www.example.com`. Snapshots, archived by the Wayback machine, contain the following prefix to the URLs: `http://web.archive.org/web/<time stamp>/`, where `<time stamp>` is a number of 1 to 14 digits in the following format: `YYYYMMDDhhmmss`. 

So, for example, if a snapshot of the website at `tc.eserver.org/` was archived on 27 April 2018 at 13:06:34 hrs, the URL of the snapshot is `http://web.archive.org/web/20180427130634/https://tc.eserver.org/`.

From the list you generated in the previous step, pick two timestamps, and use them to retrieve the website as it was at that moment in time. To do so, run a command in the following format: `http://archive.org/wayback/available?url=example.com&timestamp=<timestamp>`

#### Example request

`curl -X GET "https://archive.org/wayback/available?url=http://tc.eserver.org/"`

#### Example response

```json
{
    "url": "http://tc.eserver.org/",
    "archived_snapshots": {
        "closest": {
            "status": "200",
            "available": true,
            "url": "http://web.archive.org/web/20180427130634/https://tc.eserver.org/",
            "timestamp": "20180427130634"
        }
    }
}
```
