# Archive Labs IIIF service

IIIF (the "International Image Interoperability Framework") is a collection of web standards for manipulating and serving image resources (Image API), as well as structuring collections of these images (Presentation API).

the goal of IIIF is interoperability: to make an institution's image resources available and accessible to web applications and clients running on other domains.

The Internet Archive IIIF API v1 (alpha) is a RESTful web service which implements IIIF (Image API & Presentation API) and provides a mechanism for accessing all of the Archive's images and books in IIIF format. Every image item in the Archive now has has a corresponding info.json and every book a manifest.json. This means, you can seamlessly view any Archive.org image or book in any interface compatible with IIIF (such as OpenSeadragon, Mirador, and the Universal Viewer) and also enjoy the enhancements they provide (annotation, side-by-size viewing, and loading images from different institutions into the same space).

The service also provides a mechanism for producing permanantly citeable image tiles of any arbitrary region of any image or book found in the Internet Archive.

## Deploying a IIIF Service

The Internet Archive IIIF API v1 (alpha) is built using Python3.4 Flask web application framework and the iiif2 library. The source code for iiif.archive.org is publicly available [here](https://github.com/mekarpeles/iiif.archive.org), as is the source of the iiif2 image processing library [here](https://github.com/mekarpeles/iiif2).

For information on how to deploy a IIIF service, see [IIIF API](https://iiif.archivelab.org/iiif/documentation).

For questions on implementing a service, contact support@archive.org.

## Common tasks

### Using IIIF with a Single Book Page

By default our IIIF service opens books in Mirador so you can open every page with IIIF. If you want to retrieve a manifest for a specific page, or load a single page using OpenSeadragon (so you can use the cropper), you will need to append $<page> to the suffix of the item's archive.org id.

### Finding the IIIF Manifest URL for an Archive.org Item

"Could you help us by telling how we can find and open the IIIF manifest that the InternetArchive has created. Or (ideally) drag and drop the manifest into another viewer such as Mirador or OpenSeadragon?"

We have plans on including a draggable IIIF manifest link on our book and image archive.org items but it has not yet been prioritized.

In the meantime, any manifest for an archive.org book or image item can be accessed as https://iiif.archivelab.org/iiif/<itemid>/manifest.json where <itemid> is the name of the archive.org item id.

In the case of a book item, or an image item which has more than one image, by default the manifest should contain all book pages or images in the item. If you want to create a manifest only for one such image, you can do so by adding to the archive.org item id the suffix $1 (to get page 1, or any other number for any other corresponding page) or $<filename> for <filename> is the filename of a specific image in the item. The filename can be found from https://archive.org/metadata/<itemid>.

### Comparing multiple images side-by-side

1. Open one of the images by navigating to https://iiif.archivelab.org/iiif/<itemid> where <itemid> is the name of the archive.org item identifier
2. In the upper left hand corner there is an icon representing 4 boxes stacked (2 x 2). Click this drop-down menu and select the option "new object". You will be brought to a file-picking screen where you can select a new object from those registered in your session.
3. We will need to add a new object to our session before selecting it. To do this, find the archive.org <itemid> of the item which you would like to compare and, in the "addNewObject" input box at the upper right of the interface, type in https://iiif.archivelab.org/iiif/<itemid>/manifest.json, again where <itemid> is replaced with the archive.org item id value.
4. The object should appear among those registered in the object selector -- if so, proceed to selecting this object to view it side by side the image from step 1.

### How can I crop or link to a region of an image?

First, open navigate to an archive.org item id using the IIIF service. If you your item is a book, a specific page will need to be known in order to link to a crop (in this example, we'll use page 1 of Descartes, "The Geometry"). If you are using an archive.org item which has many images in it, you willl need to use $<filename> to select one of them.

e.g. navigate to https://iiif.archivelab.org/iiif/TheGeometry$1

In the upper right hand corner of the screen there should be an icon which reads, "enable cropper".

## Community resources

-   `IIIF API <https://iiif.archivelab.org/iiif/documentation>`_
-   `What is IIIF <https://iipimage.sourceforge.io/2014/12/iiif/>`_
-   `The IIIF Image Specification <https://iiif.io/api/image/2.1/>`_
-   `The IIIF Presentation Specification <https://iiif.io/api/presentation/2.1/>`_
