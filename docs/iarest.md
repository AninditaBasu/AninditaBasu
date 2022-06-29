# Internet Archive RESTful microservices

## Introduction

Recently, the Internet Archive has been introducing several RESTful (or REST-like) microservices with similar request and response semantics.  They're different from legacy IA services, either because of earlier requirements not present today (such as with the [Metadata API](metadata.html)) or due to emulation of existing services (such as [S3](ias3.html)).

Common traits of the newer microservices are:

* Stateless, representational programming interfaces to IA's services
* Accept and return JSON-encoded payloads
* [IAS3](ias3.html) credentials for authentication (no cookies)
* Utilize standard HTTP features whenever possible
* A standard request/response format and error reporting, meaning greater code reuse for server and client

In general, our approach is coding by contract.  When given the choice of pragmatism or purity, we've gone with pragmatism.

Examples of these newer microservices are [Task API](tasks.html) and [Reviews API](reviews.html).  Others may appear in the future as well.

## Service transaction

### Client request

Each microservice's documentation will detail which parameters need to be included as part of the URI query and which parameters should be encoded in the request payload as JSON.

If transmitting a JSON payload, the request should include the header:
```
Content-Type: application/json
```

### Server response

The server responds to most requests with a JSON payload.  The response `Content-Type` will be `application/json`.

The JSON itself is an object with the following top-level keys:

* `success` (bool): Indicates if the operation succeeded or failed
* `error` (string): A human-readable error message.  Only present if `success` is `false`
* `value` (mixed): A request-specific value.  May be a scalar or a complex data structure

Generally, if the HTTP status is any value other than `200 OK` the request should be considered failed.  However, it's possible for `200 OK` and `success: false`, in which case the `error` field describes the error.

The client should be prepared for `value` to be present with any response, including an error.

Clients should respect the HTTP status code rather than attempt to parse the `error` field.

Clients should respect HTTP redirects.

### Versioning

All requests may include a `version` URI query parameter.  This parameter is optional and if not included is treated as `1` (one).

If the client supplies an unsupported version number, the service will respond with a `400 Bad Request`.

The version number is only incremented when breaking changes are introduced to the microservice API.

To preserve backwards compatibility, the service ignores unknown parameters sent by the client, both in the URI query and in the JSON payload.

Likewise, the client should ignore unknown fields in the server response.

### Authentication

Some services require S3 authentication be supplied via the HTTP `Authorization` header.  Currently the only supported authentication scheme is `LOW` :
```
Authorization: LOW <s3-access>:<s3-secret>
```
If the service requires authentication and the header is not supplied or invalid S3 credentials are presented, the request will fail with an [`401 Unauthorized`](#unauthorized) status.

### Compression

These microservices support response compression to reduce bandwidth.

Clients which support compression should include an `Accept-Encoding: deflate, gzip` header in requests.  The client should be prepared to accept compressed or uncompressed content.

See [RFC 7230 Section 4.2](https://tools.ietf.org/html/rfc7230#section-4.2) for more information.

## Common HTTP methods

These services take advantage of HTTP’s descriptive methods when appropriate, such as `GET`, `POST`, `PUT`, and `DELETE`.  There are other HTTP methods, but these four are the most common.

### GET

Used for reading from a service.  `GET` should always be idempotent.

`GET` [permits request payloads](https://tools.ietf.org/html/rfc7231#section-4.3.1), but generally this is avoided.  The URI query parameters are used for passing arguments.  If a query parameter used for `GET` is needed for the other methods, it will often be used as a query parameter there as well, even if a JSON payload is transmitted.  (For example, this is true for [`version`](#versioning).

### POST

Generally used for creating a new resource or appending to an existing resource.

May also be used to update an existing resource if knowing when to `POST` (create) vs. `PUT` (update) is not easily determined or inconvenient.  (For more thought on this, see [When should we use PUT and when should we use POST?](http://restcookbook.com/HTTP%20Methods/put-vs-post/))

### PUT

Used for updating an existing resource.  See caveats in `POST` about `PUT`.

`PUT` is idempotent.

### DELETE

Used for removing a resource.  If the resource does not exist, it's up to the service to determine (and document!) whether to return an error ("delete failed") or success ("resource is now not present").

As with `GET`, request payloads are permitted but [generally avoided](https://tools.ietf.org/html/rfc7231#section-4.3.5).

## Common HTTP statuses

These microservices use a set of HTTP status to indicate errors and warnings.  The client is expected to process these statuses in addition to any information in the [response payload](#server-response).

### 200 OK

Indicates the transaction completed successfully.

**It’s still possible the request did not succeed as expected.**  The client should check the `success` and `error` values in the [response payload](#server-response).  (This special-case situation should be documented by the individual service.)

### 400 Bad Request

Indicates some element of the request was malformed or inappropriate.  Often means a required parameter was missing, in either the query parameters or the [request payload](#client-request).

### 401 Unauthorized

[Most](https://web.archive.org/web/20190126231944/http://www.dirv.me/blog/2011/07/18/understanding-403-forbidden/index.html) [readings](https://www.freecodecamp.org/news/http-401-error-vs-http-403-error-status-code-responses-explained/) of the HTTP specification differentiate between [`401 Unauthorized`](https://tools.ietf.org/html/rfc7235#section-3.1) as an *authentication* error and [`403 Forbidden`](https://tools.ietf.org/html/rfc7231#section-6.5.3) as an *authorization* error.  (See ["Authentication vs. Authorization"](http://people.duke.edu/~rob/kerberos/authvauth.html) for more information.)

Due to internal limitations, IA microservices cannot return `403 Forbidden`, as this will cause a static HTML page to be returned to the client.  `401 Unauthorized` is used for both authentication and authorization errors.

HTTP requires a [`WWW-Authenticate`](https://tools.ietf.org/html/rfc7235#section-4.1) header be sent with a `401` response.  We don’t do that at this time.

### 404 Not Found

Indicates the requested resource is not present.  For example, the Reviews API will return a `404 Not Found` if the client performs a `GET` on an item that does not exist _or_ if the user has not submitted a review for the item.  The `error` field in the JSON payload will differentiate between the two.

### 405 Method Not Allowed

Returned if the client invoked the microservice with a method the service does not support.

### 409 Conflict

Returned if the requested change could not be satisfied due to the current state of the resource or another resource.  For example, the Tasks API will return a `409` if the user attempts to rename the item identifier to an identifier already in use.

### 429 Too Many Requests

Used to indicate the client is being rate-limited due to an excessive number of requests over a period of time.  The client should take a breather and try again later.

A [`Retry-After` header](https://tools.ietf.org/html/rfc7231#section-7.1.3) *may* be included in the response.

### 503 Service Unavailable

General server error.  The error may be temporary.

`500 Internal Server Error` is a more appropriate response for permanent errors, but like `403 Forbidden`, that status code is wired on our servers to return a static HTML page.

## Custom headers

Some of IA's services support custom HTTP request and response headers.

### Request headers

**X-Archive-Simulate-Error**: _Supported by: [Metadata API](metadata.html), [S3](ias3.html)_

Header value should be a string describing which error should be simulated by the service.  `help` may be used to return a list of errors which can be simulated.

**X-Accept-Reduced-Priority**: _Supported by [Metadata API](metadata.html), [Tasks API](tasks.html)_

When set to a true-ish value (e.g., `1`), a client submitting a task for execution can avoid rate limiting.  The task will be queued at a reduced priority.

Clients should be prepared to receive an `HTTP 429 Too Many Requests` even if this header is present.

### Response headers

**X-Priority-Reduced**: _Supported by [Metadata API](metadata.html), [Tasks API](tasks.html)_

If `X-Accept-Reduced-Priority: 1` (or equivalent) was sent with the request, and the client is under rate limiting due to a high number of queued tasks, this header will be returned with an `HTTP 200 OK` response.  The task was queued successfully, but at a lower priority.

The `X-Priority-Reduced` value is the reduced priority number (e.g., `-7` or `-9`).

## Examples

(In these examples, the JSON payload is formatted for easy reading, and compressed data is shown uncompressed.)

This Reviews API request will add or update a user's review of item `foo`:
```
POST /services/reviews.php?identifier=foo&version=1 HTTP/1.1
Host: archive.org
Authorization: LOW <s3-access>:<s3-secret>
Content-Type: application/json
Accept-Encoding: gzip, deflate

{
  "title":"A review title",
  "body":"A review body",
  "stars":1
}
```
The server's success response:
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip

{
  "success":true,
  "value":{
    "task_id":1234,
    "review_updated":false
  }
}
```
And the server's response if the S3 credentials are invalid:
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Encoding: gzip

{
  "success":false,
  "error":"Authentication failed"
}
```

## Further reading

* [Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer), i.e., "REST"
* [REST CookBook](http://restcookbook.com/)
* [What are RESTful Web Services?](https://www.kennethlange.com/what-are-restful-web-services/)
