# API for discovering changes to archive.org items

At the core of the archive.org content management system
there is a task manager which changes the items in the archive.

This API provides access to the list of identifiers which
have changed since a particular time.

This API also supports a cold-start mode, which will enumerate all the items
in the archive, in addition to providing the change stream.

## Changes API

  * URL `https://be-api.us.archive.org/changes/v1`
  * Method `POST`
  * Arguments:
    * `access` S3 access key from https://archive.org/account/s3.php
    * `secret` S3 secret key from https://archive.org/account/s3.php
    * `start_date` if present sets the beginning point for the list of changed identifiers.
      * a date stamp of the form `YYYYMMDD` 
      * `0` to indicate a cold start, which will cause all identifiers to be returned, followed by any changes.
    * `token` optional, a value from the `next_token` field from a previous call to this API. When present, the API returns the next set of results in the sequence of changes to the petabox. 

In order to access the API, the account holding the `secret` and `access` keys requires `/` privs, or the `see_all_catalog_changes` privilege.
Please contact a member of the collections team to arrange this access. Access control is required because the changes API
reveals the presence of `noindex` items, which are otherwise unknown to the general public.

## Starting from now, see the changes in the archive
```
ACCESS=<ias3 access key>
SECRET=<ias3 secret key>

curl --data-urlencode access="$ACCESS" --data-urlencode secret="$SECRET" \
    https://be-api.us.archive.org/changes/v1 | jq .

```

Returns:
```javascript
{
  "estimated_distance_from_head": 0,
  "do_sleep_before_returning": true,
  "changes": [],
  "next_token": "eyJmaW5pc2hlZF9tYXJrZXIiOjUzMjI3NjI3MH0="
}
```

Then to see the next set of changes, make the request again with the `next_token`:
```
curl --data-urlencode access="$ACCESS" --data-urlencode secret="$SECRET" \
    --data-urlencode token="eyJmaW5pc2hlZF9tYXJrZXIiOjUzMjI3NjI3MH0=" \
    https://archive.org/services/changes.php | jq .

```

Returns:
```javascript
{
  "estimated_distance_from_head": 0,
  "do_sleep_before_returning": true,
  "changes": [
    {
      "identifier": "TELECONGO_20171026_223000"
    },
...
    {
      "identifier": "ARCHIVEIT-6334-CDL-20140408-00002"
    }
  ],
  "next_token": "eyJmaW5pc2hlZF9tYXJrZXIiOjUzMjI3Nzg2M30="
}

```

Each time, the call is made with the `next_token`, the next batch of results is returned.
The fields returned are:
  * `estimated_distance_from_head` This value does not always appear, when it does, it is the number of tasks on the done list, beyond the end of the current data set.
  * `changes` A list of records of items which have changed. This may contain more data about the item and change in the future.
  * `next_token` The token which, when used on a subsequent call will return the batch of changes following the ones given in the `changes` list.
  * `do_sleep_before_returning` A boolean which advises the caller to either take a break before the next call to the endpoint (because this data is very near the most recent possible), or if there is still much more change data to be consumed after this batch.

The api supports two other starting modes.

## Starting from a date, see changes made after midnight on that UTC day
```
curl --data-urlencode access="$ACCESS" --data-urlencode secret="$SECRET" \
    --data-urlencode start_date=20170401
    https://be-api.us.archive.org/changes/v1 | jq .

```

Returns:
```javascript
{
  "estimated_distance_from_head": 90828632,
  "do_sleep_before_returning": false,
  "changes": [
    {
      "identifier": "in.ernet.dli.2015.550031"
    },
...
    {
      "identifier": "jamaica-gleaner.com-20160320-230158"
    }
  ],
  "next_token": "eyJmaW5pc2hlZF9tYXJrZXIiOjQ0MTQ1Mjc2Nn0="
}
```

To fetch more results, make a request using the `next_token`, like so:
```
curl --data-urlencode access="$ACCESS" --data-urlencode secret="$SECRET" \
    --data-urlencode token="eyJmaW5pc2hlZF9tYXJrZXIiOjQ0MTQ1Mjc2Nn0=" \
    https://be-api.us.archive.org/changes/v1 | jq .

```

Returns:
```javascript
{
  "estimated_distance_from_head": 90779995,
  "do_sleep_before_returning": false,
  "changes": [
    {
      "identifier": "china.org.cn-20170101-092922"
    },
...
    {
      "identifier": "GurudevQuotes"
    }
  ],
  "next_token": "eyJmaW5pc2hlZF9tYXJrZXIiOjQ0MTUwMjc2Nn0="
}

```

## Starting from nothing, load all the identifiers, then pick up changes

This API supports a cold start mode where all items are dumped out, then changes since the full item dump time are sent.
This is done by setting `start_date` to `0`.

For example:
```
curl --data-urlencode access="$ACCESS" --data-urlencode secret="$SECRET" \
    --data-urlencode start_date=0
    https://be-api.us.archive.org/changes/v1 | jq .

```

Returns:
```javascript
{
  "do_sleep_before_returning": false,
  "changes": [
    {
      "identifier": "0----------"
    },
...
    {
      "identifier": "008MRAnonymous"
    }
  ],
  "next_token": "eyJmaW5pc2hlZF9tYXJrZXIiOiI1MzIyODQzOTAiLCJzY2FuX3N0YXJ0IjoiMDA4TVJBbm9ueW1vdXMifQ=="
}
```

Continuing calls with `token` set to `next_token` will eventually return all changes up until the present.

