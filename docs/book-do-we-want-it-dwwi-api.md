# Book Do-We-Want-It API

Do we want it is an API that determines whether or not Internet Archive needs a physical book for our collection. It can be queried by a 10 or 13 digit ISBN or a 10-character ASIN.

Either an ASIN or ISBN can be submitted for the `asin` key. The API will detect whether the value is an ASIN or an ISBN. Using `isbn` as the key instead of `asin` will cause the API to reject ASINs as invalid.

When the API request is received by the IA server, the server is looking for different identifiers that may be related to the queried identifier, for example: related ISBNs or ASINs, related items that exist in IA’s collections, etc.

Based on the data that the IA has on these related items, it calculates a response status and responds with the following fields:

```
{
  "codes": [
    {
      "code": "{\n  status: \"ok\",\n  response: 3,\n  message: \"we have already scanned this book, but need another physical copy for ourselves\",\n  ia_identifiers: \n    {\n      ia_identifier: \"lorem00ipsum\",\n      score: 1\n    },\n  response_time: 0.1064\n}",
      "language": "json",
      "name": "Typical Response"
    }
  ]
}
```

## Status

| Value | Information |
| --- | --- |
| OK | The input string seems to be valid |
| Error | There's an error with the input string|

## Response/message

| Response | Message |
| --- | --- |
| -1 | invalid asin or isbn |
| 0 | we don't need this book |
| 1 | we need to scan this book |
 | 2 | we have already scanned this book, but need another physical copy for a partner |
| 3 | we have already scanned this book, but need another physical copy for ourselves |

-  `ia_identifiers`: An array of globally unique IDs of items on archive.org that are related to the input (either have the same asin/isbn/oclc/lccn or have a related asin/isbn/oclc/lccn) 
-  `response time`: The time it took for IA’s server to generate the response
-  `score`: 1 if the book is an exact match, 0.5 if it's a related match

Note: As long as the API is working, it will always give a 200 OK HTTP response, as even "negative" responses may contain useful information for the caller.

Note: Currently, the API will never return a "2" response.

## Debug Info"


Additional fields are returned when &debug=true is added to the end of the query

```
{
  "codes": [
    {
      "code": "\n{\n  status: \"ok\",\n  response: 3,\n  message: \"we have already scanned this book, but need another physical copy for ourselves\",\n  ia_identifiers: \n    [\n      ia_identifier: \"9783791535661\",\n      score: 1\n    ],\n  books: \n    {\n      9783791535661: \n        {\n          metadata: \n            {\n              sort_status: \"NEED\",\n              title: \"DWWIAPI4Dummies\",\n              imagecount: \"1\",\n              isbn: \"9783791535661\",\n              identifier: \"DWNIAPI18R3\",\n              mediatype: \"texts\",\n              boxid: \"IA1234567\",\n              creator: \"DWNI, API\",\n              boxid_2: \"CH123456\",\n              related-external-id:[ \n                \"urn:isbn:3833722509\",\n                \"urn:asin:276776144\",\n                \"urn:oclc:723876752\",\n                \"urn:lccn:836890281\"\n              ]\n            },\n          scanned: true,\n          china_has: true,\n          need_second: true,\n          in_transit: false\n        }\n    },\n  related_books: [],\n  component_response_times: \n    {\n      search: 0.0531,\n      sort: 0.0001\n    },\n  query: \"mediatype:texts AND (isbn:TESTISBN00018 OR related-external-id:\"urn:isbn:TESTISBN00018\")\",\n  response_time: 0.0532\n}",
      "language": "json",
      "name": "Response w/ Debug Info"
    }
  ]
}
```

-  `books`: contains further metadata and internal algorithm results about the items from **ia_identifiers**
    - `title`: the name of the item
    - `imagecount`: number of scanned/uploaded image files that are associated to this book
    - `isbn`: ISBN/ASIN that associated to this book
    - `creator`: Writer/Illustrator/etc. that are related to this book
    - `related-external-id`: if available, an array of other asin/isbn/oclc/lccn that are related to this book, available in urn format
    - `boxid, boxid_2,sort_status`: information that’s related to a physical copy of the book, if available. Used to calculate the following fields, and consequently to calculate the **status/response/message** for the original query
    - `related_books`: a list of books similar to **books**, but for books who appear to be a "related" match, I.E. another printing or edition of the book with the queried isbn.
    - `component_response_times`: Detailed information about the response time
    - `query`: the query that’s used internally by the IA system to create this response
    - `response_time`: the total response time for the query

## Ignore Donation Items

By default, the API includes books that have been donated to Internet Archive but not yet scanned in its response. Including `&ignore_donation_items=true` in the request will force the API to ignore these items when processing search results, allowing a caller that is handling items from this category to tell whether they should digitize the book.

This is used in our scanningcenters when digitizing donated books, essentially answering the question, "do we have a copy of this book that is *not* the donated one," allowing us to dedupe books which have been acquired and digitized from another source before we were able to scan the donated one.

For most callers, this param can be left out.
