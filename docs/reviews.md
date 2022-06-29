# Reviews API

## Introduction

Most [items](items.html) stored by Internet Archive may be reviewed by registered users.  Reviews are stored with the item.

Unlike other operations which write to an item, a user does not require special permissions to add a review.

## Review structure, syntax, and policies

A review consists of the following user-editable fields:

* `reviewtitle` - A single line of text
* `reviewbody` - Multiline text
* `stars` - From 0 (zero) to 5 (five)

Each review also contains the following system-managed fields:

* `reviewer` - The user's _screenname_ (not username/email)
* `reviewer_itemname` (optional) - The user's item (e.g., `@joe_example`)
* `createdate` - Date and time (UTC) of when the review was first submitted
* `reviewdate` - Date and time (UTC) of when the review was last edited

A user may only supply one review per item.  Writing a subsequent review will overwrite the earlier one.  `reviewdate` will be updated and `createdate` preserved.

Reviews may not be written for user items or collections.  Other limitations exist as well.

Every item with reviews is assigned an average rating computed by summing all the non-zero star ratings and dividing by the number of non-zero ratings.  The average rating is currently unavailable via the Metadata API or the Reviews API.

## Metadata API

Item reviews are available via the [Metadata API](metadata.html).  A full list of an item's reviews are available under its `'reviews'` branch.

## Reviews service

To update, delete, and read a user's review for an item, the Reviews API is available.  It's a RESTful microservice located at:
```
https://archive.org/services/reviews.php
```

### Service details

All operations require:

* An item identifier (using the `identifier` query parameter)
* User authentication (see below)

The HTTP method (`GET`, `POST`, etc.) determines which operation is being performed on the review.

For example, to read a user's review of an item:
```
GET /services/reviews.php?identifier=foo HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
```

For more information on how to interact with the Reviews API, see [Internet Archive RESTful microservices](iarest.html).

### Reading the user's review

Although a full list of reviews is available via the Metadata API, the user can fetch their review of the item directly (if they've submitted one) using the HTTP `GET` method:
```
GET /services/reviews.php?identifier=foo HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
```

A successful response might be:
```
{
  "success":true,
  "value":{
    "reviewbody":"the review text",
    "reviewtitle":"the review title",
    "reviewer":"Joe Example",
    "reviewer_itemname":"@joe_example",
    "reviewdate":"2020-07-17 20:35:43",
    "createdate":"2020-07-17 20:33:14",
    "stars":"3"
  }
}
```
If the item doesn't exist, or the user has not submitted a review to this item, the API will return `HTTP 404 Not Found`.

### Adding/updating a review

To add a new review or update an existing one, the user may HTTP `POST` a JSON structure with the following fields:

* `title` (string)
* `body` (string)
* `stars` (int, optional)

```
POST services/reviews.php?identifier=foo HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>

{
  "title":"A review title",
  "body":"A review body",
  "stars":1
}
```
If `stars` is not specified or non-numeric, a default value of `0` (zero) is assumed.

A successful response will return two fields in the `value` portion of the payload:

* `task_id` (int) - The catalog task identifier for the submitted review
* `review_updated` (bool) - `true` if an existing review was updated

For example:
```
{
  "success":true,
  "value":{
    "task_id":1234,
    "review_updated":false
  }
}
```

### Deleting a review

A user may delete their review using the HTTP `DELETE` method:
```
DELETE /services/reviews.php?identifier=foo HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
```

A successful response will include the `task_id` (as with adding/updating) indicating which task will delete the review:

```
{
  "success":true,
  "value":{
    "task_id":1234
  }
}
```

If no review was present to be deleted, the response will be `HTTP 200 OK` with `success` as `false`.
