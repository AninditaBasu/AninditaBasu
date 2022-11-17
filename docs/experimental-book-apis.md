# Experimental Book APIs

The experimental Book APIs are an attempt to wrap existing Archive.org services & API endpoints to provide a single, coherent experience which is more intuitive, discoverable, and expressive.

## Retrieving Book Metadata

To retrieve metadata for a book item, you can use the following URL which does the equivalent of https://archive.org/metadata/:itemid. The difference is, the syntax below allows you to do a lot more than just get metadata. By adding additional arguments to the url, you can search inside the book, get book pages, retrieve annotations, and more!

`https://api.archivelab.org/books/:itemid`

## Searching Inside a Book

The search API allows you to find where text occurs within a book. This metadata includes the page, the surrounding text / the section of the page which matched, and coordinates detailing the physical region on the book page which exactly matched.

`https://api.archivelab.org/books/:itemid/searchinside?q=:query`

```
{
  "codes": [
    {
      "code": "curl https://api.archivelab.org/books/platowithenglish04platuoft/searchinside?q=plato",
      "language": "curl"
    }
  ]
}
```

## Retrieving Book Pages

Quickly fetch the full resolution book page image as a .jpg for an Archive.org text. Note: If you need the image in a different file format (.gif, .png, .tiff, etc), a different resolution, or if you only want a region of the image (not the whole thing) consider using our experimental IIIF API (http://iiif.archivelab.org/iiif/documentation)

-  `https://api.archivelab.org/books/:itemid/pages` -- returns a list of all available page numbers
-  `https://api.archivelab.org/books/:itemid/pages/:page` -- returns a single page as an image (.jpg)

## Retrieving a Book Page's Annotations

Get all OpenAnnotations for an Archive.org book page using the following endpoint:

`https://api.archivelab.org/books/:itemid/pages/:page/annotations`

```
{
  "codes": [
    {
      "code": "curl https://api.archivelab.org/books/platowithenglish04platuoft/pages/1/annotations",
      "language": "text"
    }
  ]
}
```

The Archive Lab has created an experimental OpenAnnotations service  (see: www.openannotation.org) which allows users to select regions of Archive.org images and book pages and mark/tag them with notes called "annotations". An annotation can be thought of as similar to using a sticky note to comment about a region of a work.

The OpenAnnotation server is located at https://pragma.archivelab.org and the code is available, open source, at https://github.com/ArchiveLabs/pragma.archivelab.org.

### Why Annotate?

Annotations aren't **just** cool because they enable you to comment about an interesting line of a book. They're not just because they can give you a way to contribute a correction to a typo. 
Open Annotations are also powerful mechanisms which can be used to bring a static image to life. Using annotations, you can single out a country on a map, or a part of a table of contents in a book, and make them interactive by assigning them events. Annotations essentially give you the ability to augment any image or book make to make it as rich and as interactive as a webpage. Imagine being able to click on a quote in a book and having this trigger an action to pull up the book where this quote originated, side by side the book you're reading (i.e. Ted Nelson's idea of "transclusion").

### How do I make an annotation?

Annotations can be made in two ways.

The first method requires manually making a HTTP POST directly to the OpenAnnotation server (as described in the service's documentation at https://github.com/ArchiveLabs/pragma.archivelab.org). 
IIIF OpenAnnotations are specifically created by POSTing to the https://pragma.archivelab.org/annotations endpoint (as opposed to the server root).

The second method uses a GUI and the Mirador viewer to assist the user in selecting a region, crafting the http request, and automatically associating the annotation with the right book page and saving the annotation in the database.

### Using Mirador to View & Make Annotations

First, open an Archive.org book (e.g. platowithenglish04platuoft) using the Archive Lab's experimental IIIF service endpoint (e.g. https://iiif.archivelab.org/platowithenglish04platuoft). This will open the book using the IIIF-backed Mirador reader. From here, you should see a button on the top-left corner of the interface which looks like a callout bubble. Clicking this will enable you to see what annotations have been made on this page, as well as tools for creating and saving a new annotation.

### Guess What!

Here's a fun fact, OpenAnnotations aren't limited to images and book pages. They can also be used to annotate html pages. We're working on an experimental API to save annotated webpages using the Wayback Machine. Interested in helping? Email mek@archive.org and request an invitation to join the Archive Labs team -- anyone is welcome!

## Retrieving Book Page's OCR

The following endpoint can be used to retrieve the OCR results for the specified book pages. These OCR results include all the text which appears within the page, as well as the region coordinates where the text occurs within the book page image:

`https://api.archivelab.org/books/:itemid/pages/:page/ocr`

## Retrieving Manifests

(See also: http://iiif.io/api/presentation/2.0/#manifest)

A **manifest** is a metadata document which describes the layout, structure, properties, and presentation of a work. This includes the number of pages it has and their sizes, supplemental content, like tables of content and or excerpts, bibliographic information like title and author, and information about the holding or accessioning institution. It may also include references to other intellectual works embodied within or referenced by that object (such as annotations). For the IIIF Presentation specification, the manifest includes the descriptive, rights and linking information for the object. It then embeds the sequence(s) of canvases that should be rendered to the user.

### IA Manifests

You can get the archive.org IA Book Manifest through the following shortcut url:

`https://api.archivelab.org/books/:itemid/ia_manifest`

```
{
  "codes": [
    {
      "code": "curl https://api.archivelab.org/books/platowithenglish04platuoft/ia_metadata",
      "language": "curl"
    }
  ]
}
```

 ### IIIF Manifests

You can get the IIIF Manifest for an archive.org book item using the following link or directly through the Archive Labs IIIF API (e.g. https://iiif.archivelab.org/iiif/:itemid/manifest.json):

`https://api.archivelab.org/books/:itemid/iiif_manifest`

```
{
  "codes": [
    {
      "code": "curl https://api.archivelab.org/books/platowithenglish04platuoft/iiif_metadata",
      "language": "curl"
    }
  ]
}
```