# See whether a website exists in the archives

Ever since the [first website](http://info.cern.ch/hypertext/WWW/TheProject.html) was born, the worldwide web has seen many sites being created every day. Sometimes, websites die. However, if the Internet Archive crawled and stored a dead website when the website was still available, you can still access that website.

This tutorial shows you how to see if a website was crawled and stored by the Internet Archive.

## API used 

[Wayback machine APIs](https://archive.org/help/wayback_api.php)

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

Run a command in the following syntax: 

```bash
curl -X GET "https://archive.org/wayback/available?url=<url>"
```
where `<url>` is the URL of the website you're looking for.

The result is a JSON dictionary that has the following objects:

- `url`: The URL you queried the API for
- `archived_snapshots.closest.status`: An HTTP status code that tells you whether the URL is available
- `archived_snapshots.closest.available`: Boolean, based on the value of the `status` key
- `archived_snapshots.closest.url`: If the value of `archived_snapshots.closest.available` is `true`, the URL of the archived website
- `archived_snapshots.timestamp`: The most recent time when the website was archived

## Example request

```bash
curl -X GET "https://archive.org/wayback/available?url=http://tc.eserver.org/"
```

## Example response

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

## What to do next

These steps give you the most recent snapshot of the queried website. If you need to retrieve all snapshots of the website, see [Compare two versions of a website](tutorial-compare-snapshot-wayback.md).