# Book Manifest API

A **manifest** is a metadata document which describes the layout, structure, properties, and presentation of a work. This includes the number of pages it has and their sizes, supplemental content, like tables of content and or excerpts, bibliographic information like title and author, and information about the holding or accessioning institution. It may also include references to other intellectual works embodied within or referenced by that object (such as annotations). For the IIIF Presentation specification, the manifest includes the descriptive, rights and linking information for the object. It then embeds the sequence(s) of canvases that should be rendered to the user.

(See also: http://iiif.io/api/presentation/2.0/#manifest)

## Archive.org Book Manifests

Prior to the IIIF specification, the Internet Archive had developer their own Image and Presentation layer standards to support their IA BookReader. You can read more about its design here:
https://openlibrary.org/dev/docs/bookurls

## The IA Manifest Specification

Let's say you wanted to write your very own Archive.org book reader. How would you start?

The url above (https://archive.org/download/theworksofplato01platiala/page/page_1.jpg) is able to fetch a page for you, but how do you know how many pages are included in the book? How do you know what size they are?

The Internet Archive has engineered its own "Book Data" API specification for retrieving book pages and metadata from its text items. This data is used behind the scenes to power our book reader, (here's what our book reader looks like: http://archive.org/stream/taylorsplato00tayluoft). The Book Data format includes information about a text, like: cover images, dates, # pages, the height and width of each page, date published, etc.

Here's an example of the Book Data for a book about the philosopher Plato:

```
{
  "codes": [
    {
      "code": "{\n    \"archiveFormat\": \"zip\",\n    \"collection\": \"kellylibrary\",\n    \"contributor\": \"Kelly - University of Toronto\",\n    \"coverImages\": [\n        \"http://ia802604.us.archive.org/BookReader/BookReaderImages.php?zip=/28/items/taylorsplato00tayluoft/taylorsplato00tayluoft_jpg.zip&file=taylorsplato00tayluoft_jpg/taylorsplato00tayluoft_0001.jpg\",\n        \"http://ia802604.us.archive.org/BookReader/BookReaderImages.php?zip=/28/items/taylorsplato00tayluoft/taylorsplato00tayluoft_jpg.zip&file=taylorsplato00tayluoft_jpg/taylorsplato00tayluoft_0170.jpg\"\n    ],\n    \"coverIndices\": [\n        0, 169\n    ],\n    \"date\": \"1908\",\n    \"imageFormat\": \"jpg\",\n    \"itemId\": \"taylorsplato00tayluoft\",\n    \"itemPath\": \"/28/items/taylorsplato00tayluoft\",\n    \"language\": \"eng\",\n    \"leafNums\": [\n        1, 2, 3, 4, ..., 169, 170\n    ],\n    \"numPages\": 170,\n    \"pageHeights\": [\n        3282, 3068, 3068, 3054, ..., 3080, 3210\n    ],\n    \"pageNums\": [\n        \"\", ..., \"2\", \"3\", ..., \"115\", \"116\", ..., \"\"\n    ],\n    \"pageProgression\": \"lr\",\n    \"pageWidths\": [\n        2040, 1962, ..., 1878, 2028\n    ],\n    \"ppi\": \"500\",\n    \"previewImage\": \"https://ia802604.us.archive.org/BookReader/BookReaderPreview.php?id=taylorsplato00tayluoft&subPrefix=taylorsplato00tayluoft&itemPath=%2F28%2Fitems%2Ftaylorsplato00tayluoft&server=ia802604.us.archive.org&page=preview\",\n    \"publisher\": \"London Constable\",\n    \"server\": \"ia802604.us.archive.org\",\n    \"subPrefix\": \"taylorsplato00tayluoft\",\n    \"title\": \"Plato\",\n    \"titleImage\": \"https://ia802604.us.archive.org/BookReader/BookReaderPreview.php?id=taylorsplato00tayluoft&subPrefix=taylorsplato00tayluoft&itemPath=%2F28%2Fitems%2Ftaylorsplato00tayluoft&server=ia802604.us.archive.org&page=title\",\n    \"titleIndex\": 8,\n    \"titleLeaf\": \"9\",\n    \"url\": \"http://archive.org/details/taylorsplato00tayluoft\",\n    \"zip\": \"/28/items/taylorsplato00tayluoft/taylorsplato00tayluoft_jpg.zip\"\n}",
      "language": "text"
    }
  ]
}
```

## How can I use the Book Manifest API?

You'll notice the url for the Book Data example above doesn't match our canonical standard of "https://archive.org". Instead, (for this **specific** book, at this **specific** time) the url uses the server name https://ia802604.us.archive.org. This server name may be different depending on the archive.org item you're trying to access and where its files physically reside.

Why don't we offer a single, standard archive.org url to access Book Data for a text?

The Book Data API endpoint needs to know the specific server (data node) which contains this book's content (e.g. ia802604.us.archive.org) as well as the directory of the item's content within this data node / server (e.g. /28/items/taylorsplato00tayluoft) in order to work. Simply put, the service wasn't originally designed to be a user-consumable service, though there's no reason why it can't be! It just wasn't originally obvious that others might be interested in creating their own readers or book experiences. Suffice to say, requiring programmers to know an item's server name in order to access its Book Data is a bit of an inconvenience. As a result, we've developed a new experimental endpoint which performs this mapping for you:

https://api.archivelab.org/books/:itemid

Performing a HTTP GET to this url and passing an archive.org itemid will resolve these server variables for you and instantly return the Book Data for this item.

## Manually Resolving to an Archive.org Item's Data Node

That said, Book Data isn't the only service which the Internet Archive has designed which requires the unique server name and data path of an item to be known in order for it to be used. So, it's reasonable that you might be asking:

Where is this server name coming from? How can one determine the server which contains and item and it's files? And how do I find the path to its files?

The simple answer is, most of this data (the 'server' and the 'dir' fields) are available on the item's public metadata page on archive.org (i.e. https://archive.org/metadata/:itemid). If you want to construct a call to the Book Data API (or a similar service) endpoint manually (i.e. by determining its data server and files directory), you can use the following steps below (python):

```
{
  "codes": [
    {
      "code": "import requests\n\nBOOK_DATA_URL = u'http://%s/BookReader/BookReaderJSON.php'\nARCHIVE_URL = u'https://archive.org'\n\ndef get_book_data(identifier):\n\t\"\"\"Retrieves the archive.org metadata for the item by its identifier\n  and from this metadata, picks out the 'server' and 'dir' values\n  required in order to retrieve data from the Book Data service.\n  \"\"\"\n\tmetadata = requests.get('%s/metadata/%s' % (ARCHIVE_URL, identifier)).json()\n\turl = BOOK_DATA_URL % metadata['server']\n\tprint(url)\n\treturn requests.get(url, params={\n\t\t'server': metadata['server'],\n    'itemPath': metadata['dir'],\n    'itemId': identifier\n\t}).json()\n\nif __name__ == \"__main__\":\n\tidentifier = \"taylorsplato00tayluoft\"  # a book by Plato\n\tprint(get_book_data(identifier))",
      "language": "python"
    }
  ]
}
```

Which produces the Book Data response example above

## Experimental APIs

While we can't guarantee it's long term support, a much more convenient way to fetch IA Book Manifests is through the Experimental Book APIs. These endpoints obviate the need for fetching the server and path (as is detailed in the steps above).

Here's what a request looks like for an IA-style manifest through the experimental Book API:

https://api.archivelab.org/books/:itemid/ia_manifest

## IIIF

In order to serve a broader class of institutions and image enthusiasts, we've translated our Archive.org Book Metadata API into IIIF, an interoperable industry standard image server with several key advantages.

Read about the IIIF specification at https://iiif.io, learn about our implementation at http://iiif.archivelab.org/iiif/documentation and browse the code which runs the service at https://github.com/ArchiveLabs/iiif.archivelab.org.

Our Book Data API is leveraged/called under the hood by the Internet Archive's IIIF service. The inner workings of this translation / shim layer (resolver) described in the steps above are detailed in the file:
https://github.com/ArchiveLabs/iiif.archivelab.org/blob/master/iiify/resolver.py

Manifests can be returned in IIIF format in one of two ways:
https://iiif.archivelab.org/iiif/TheGeometry/manifest.json -- or --
https://api.archivelab.org/books/TheGeometry/iiif_manifest

