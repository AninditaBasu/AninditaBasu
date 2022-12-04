# Wayback machine

The Internet Archive Wayback Machine supports a number of different APIs to make it easier for developers to retrieve information about Wayback capture data.

The Internet Archive Wayback Machine is fully compliant with the [Memento Protocol](http://mementoweb.org/guide/howto/).

This page lists the APIs that are available.

## Wayback Availability JSON API

This simple API for Wayback is a test to see if a given url is archived and currenlty accessible in the Wayback Machine. This API is useful for providing a 404 or other error handler which checks Wayback to see if it has an archived copy ready to display. The API can be used as follows:

```
http://archive.org/wayback/available?url=example.com
```

This might return the following response if the URL is available:

```json
{
    "archived_snapshots": {
        "closest": {
            "available": true,
            "url": "http://web.archive.org/web/20130919044612/http://example.com/",
            "timestamp": "20130919044612",
            "status": "200"
        }
    }
}
```

When available, the URL is the link to the archived snapshot in the Wayback Machine. The API returns a single closest snapshot.

If the url is not available (not archived or currently not accessible), the response could be:

```
{"archived_snapshots":{}}
```

``` tip::
    For a tutorial, see :doc:`tutorial-get-snapshot-wayback`.
```

## Memento API

The Memento API provides additional interfaces for querying snapshots (e.g. `Mementos`) in the Wayback Machine. The Availability API is partially based on the Memento APIs.

Browse [examples of Memento](http://ws-dl.blogspot.fr/2013/07/2013-07-15-wayback-machine-upgrades.html) support in the Wayback Machine

## Wayback CDX Server API

The CDX Server is another API which allows for complex querying, filtering and analysis of Wayback capture data. If you are looking for more in depth information about Wayback machine data, please take a look at the CDX server API.

``` tip::
    For a tutorial, see :doc:`tutorial-compare-snapshot-wayback`.
```

## Interactive API sandbox

See [Wayback APIs](./_static/wayback_api.html).

## Community resources

The latest documentation on the CDX server can be found at [CDX server API on GitHub](https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server/).

