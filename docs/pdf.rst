PDF analysis, generation and compression at the Internet Archive
################################################################

:authors: Merlijn Wajer <merlijn@archive.org>
:date: 2021-08-13
:last-updated: 2022-09-07
:version: 1.1


Introduction
============

This document outlines the PDF generation module and its features as used to
generate PDF documents for the Internet Archive items and elaborates on design
decisions and how various solutions were picked. Additionally, the document
elaborates on the PDF analysis module that generates "PDF Metadata JSON" files.

Motivation
==========

The Internet Archive had been using proprietary PDF compression technology for
many years, but decided to move to and develop an open source stack
after evaluating the various open source software PDF compression offerings.

This transition to our own tooling was completed near the end of 2020.


Basic workflow
==============

After an `Internet Archive Item
<https://archive.org/services/docs/api/items.html#what-is-an-item>`_ has been
uploaded, various processes kick in to analyze the content and provide
derivative files, one of those being the PDF file, creating a PDF file from a
set of images and a hOCR file (see the OCR module documentation for more
information on hOCR files).

These PDFs contain text layers inferred from the OCR process (which means the
text can be selected and searched for in a PDF reader) and the image content is
typically highly compressed, allowing them to be distributed under bandwidth
constraints.


PDF files
---------

Barring any failures in the PDF generation process, after upload, every item with images will get one
or more ``*.pdf`` files which represent the results of PDF generation. In
special cases, additional files may be created:

* ``_text.pdf``: An `"Additional Text PDF"` file, in case the input was already a
  PDF, but without text layer. In that case, the ``_text.pdf`` file contains the
  same images, but with a OCR-created text layer inserted into the PDF.
* ``_bw.pdf``: A `"Grayscale PDF"` file, only created when specific collections
  require the generation of a grayscale PDF and the images are not already
  grayscale.


Archive.org items have metadata, and the metadata can dictate how the items are
treated. This section covers all the metadata relevant to the PDF process.


Metadata and input files for the PDF generation process
-------------------------------------------------------

Hardcoded collection list
~~~~~~~~~~~~~~~~~~~~~~~~~

There is a hardcoded list for downsampling images if they exceed a certain DPI.
Currently, if an item is in the `sim_microfilm` collection and its DPI exceeds
400, we will downsample it to a value close to 400 dpi.


Image stacks
~~~~~~~~~~~~

Image stacks with the following format/extensions are supported:

* ``_jp2.zip``
* ``_jp2.tar``
* ``_jpg.zip``
* ``_jpg.tar``
* ``_tif.zip``
* ``_tif.tar``


hOCR files
~~~~~~~~~~

The PDF generation module requires a hOCR file as input, which can be either:

* ``_hocr.html``
* ``_hocr.html.gz`` (deprecated)


Scandata
~~~~~~~~

Scandata files are a XML file containing specific per-image information,
including if the image should be included in any of the produced formats and
page specific ppi, if available. The module will find, parse and honor these
files if they exist.

Scandata files are marked with the format ``"Scandata"``.


Metadata written by the PDF module
----------------------------------

The following keys are written to the item metadata, as well as to the files
metadata of the generated PDF files.

If an item contains multiple stacks of images, then the item-level metadata only
represents the values of the stack of images that was most recently turned into a
PDF, in which case the PDF file-level metadata should be inspected for correct
values. This metadata is only written to the files metadata starting with module
version ``0.0.7``.


pdf_module_version
~~~~~~~~~~~~~~~~~~

This metadata key describes the version of the PDF module that was used to
create the resulting PDF file. The version number can be used to select PDFs for
replacements is problems are found in a specific version.


pdf_degraded
~~~~~~~~~~~~

If a non-fatal problem occurred during PDF generation, this field
will contain the (list of) problems. Currently, the possible values are:

* ``invalid-page-size``: The combination of the provided ``ppi`` and resolution of
  the image resulted in a page that was either too small or too large to adhere
  to the PDF/A specification, and the software changed the ``ppi`` of the specific
  page in the PDF to adhere to the specification.
* ``invalid-page-numbers``: The provided page numbers were invalid; this happens
  when the series of page numbers could not be parsed.
* ``invalid-jp2-headers``: Pillow could not read the JPEG2000 images, and the PDF
  producer fell back to Kakadu or OpenJPEG2000 to read the image.
* ``too-small-to-downsample``: Downsampling was requested (the item is in a
  specific hardcoded list of collections) but the image was too small to be
  downsampled. As a result, the image was not downsampled.


Task arguments
--------------

The PDF module currently supports no special task arguments.


.. Summary of the PDF module functionality
.. =======================================
..
.. (This would contain a basic explanation of MRC, and how the text layers are
..  created/rendered)


PDF Analysis module
===================

User uploaded PDFs may be analyzed by this module, which attempts to derive
relevant information from a PDF and stores said information in a JSON file.
This file can then be used by downstream modules to analyze the PDF without
actually having to read the PDF, saving time and complexity.

These files are called ``Image-Only PDF Metadata JSON`` and ``Text PDF
Metadata JSON`` - to differentiate between PDFs with just images and PDFs with a
text layer. The contents of the `PDF Metadata JSON`_ files will be the same.

PDF Metadata JSON
-----------------

This file contains structured information derived from PDFs, which can be used
to (but is not limited to):

* estimate the image size per page
* understand the color usage of the PDF
* extract any hyperlinks from the PDF
* analyze various properies of the images of a PDF
* check if a PDF page has a text layer


Metadata JSON Structure
-----------------------

The PDF metadata has the following top-level values:

* ``version``: string key-value pairs for the various versions used to perform the
  analysis:

  * ``analysis``: version of the code analysis
  * ``spec``: version of the PDF Metadata JSON that this document adheres to
  * ``pymupdf``: PyMuPDF version
  * ``mupdf``: MuPDF version

* ``page_count``: number of pages in the PDF
* ``page_data``: list of metadata per page, see below for detailed information
* ``imagestack_image_format``: string value containing the suggested format for
  the imagestack based on analysis of the image contents:

  * ``RGB``
  * ``Grayscale``
  * ``Bitonal``

The ``page_data`` has the following values for each page:

* ``page_number``: The number of the page, 0-indexed
* ``page_rotation``: Degrees the page is rotated by, if any
* ``page_language``: The language of the page, if any
* ``page_rect``: The rectangle defining the page, in ``(x0, y0, x1, y1)``
  format, in points.
* ``estimated_scale``: By how much to scale the page to make it comfortable to
  read for a human on a computer
* ``estimated_ppi``: The estimated PPI of the page when scaled by the
  ``estimated_scale`` value
* ``estimated_default_render_res``: The estimated resolution in **pixels** when
  applying the suggested ``estimated_scale`` parameter, in ``(x0, y0, x1, y1)``
  format.
* ``has_text_layer``: boolean indicating whether the page has a text layer
* ``page_without_images_color_mode``: string value of the color mode of the
  page, with any images removed:

  * ``RGB``
  * ``Grayscale``
  * ``Bitonal``

* ``image_data``: list of image metadata per page, see below for detailed
  information
* ``hyperlinks``: list of hyperlinks per page, see below for detailed
  information

``image_data`` has the following values for each image:

* ``xref``: The xref of the image in the PDF
* ``width``: The width of the image (in pixels) in the PDF -- this can be
  different from how large the image is rendered on the page itself
* ``height``: The height of the image (in pixels) in the PDF -- this can be
  different from how large the image is rendered on the page itself
* ``depth``: Integer value representing the bit-depth of the image:

  * ``1``: bitonal (black/white) image (typical depth for masks and heavily compressed images)
  * ``8``: typical depth for grayscale and colored images
* ``label``: The label of the image in the PDF
* ``bbox``: Bounding box of the image on the page, in ``(x0, y0, x1, y1)`` format, in points
* ``transform``: matrix transforming image rect to bbox
* ``mode``: string value representing the mode of the image, mimicking `Pillow image modes <https://pillow.readthedocs.io/en/stable/handbook/concepts.html#modes>`_, currently limited to:

  * ``1``: Bitonal
  * ``L``: Grayscale
  * ``LA``: Grayscale with transparency layer
  * ``RGB``: RGB
  * ``RGBA``: RGB with transparency layer

* ``mask``: has the following key-values (if the image has a mask):

  * ``xref``: The xref of the mask image in the PDF
  * ``width``: the width of the mask in pixels
  * ``height``: the height of the mask in pixels
  * ``depth``: the bit-depth of the mask (typically ``1``, but can vary)
  * ``mode``: the image mode of the mask (typically ``"1"`` but can vary)

``hyperlinks`` have the following values for each hyperlink:

* ``uri``: string value of target of the link
* ``xref``: xref of link in the PDF
* ``bbox``: bounding box of the link, in ``(x0, y0, x1, y1)`` format, in points



Release history
===============

PDF module 0.0.19
-----------------

Date: 2022-08-01

Changes:

* Switch to archive-pdf-tools 1.4.16
* Extend downsample collection to the `microfilm` collection
* Handle items without title metadata
* Pull in Pillow 9.2.0

PDF module 0.0.17 / 0.0.18
--------------------------

Date: 2022-02-03

Changes:

* Switch to archive-pdf-tools 1.4.12
* Switch to PyMuPDF 1.19.2
* Add fast denoising, turned on by default
* Fix noise estimation on very small images


PDF module 0.0.16
-----------------

Date: 2021-10-28

Changes:

* Switch to PyMuPDF 1.19.0
* Fetch versions of our software from pypi
* Add Kakadu fallback in case Pillow fails

PDF module 0.0.15
-----------------

Date: 2020-07-05

Changes:

* Render character boxes better in certain cases:

  1. Tesseract 5 generated hOCR with the correct DPI embedded in the hOCR
     file.
  2. Tesseract 5 generated hOCR with the incorrect (default) DPI embedded
     in the hOCR file (no DPI known at OCR time, for example), font sizes
     here are usually too large.
  3. Tesseract 4 generated hOCR with no DPI information, font sizes here
     are also often too large.
  4. hOCR files generated from Abbyy files using abbyy-to-hocr from
     archive-hocr-tools
  5. Custom uploaded hOCR files
  
  In the case of (1), we have to increase the font size for our PDFs.
  In the case of (2, 3), we only have to adjust the font size for the
  document size in the PDF.
  In the case of (4), depending the version we used to generate the hOCR
  file, we might not have any font information at all, in which case the
  default font size can be a poor pick, so we estimate the font size from
  the line bounding box height - the same applies to (5), in case those
  files also do not have font sizes.


PDF module 0.0.14
-----------------

Date: 2020-05-18

Changes:

* New PyMuPDF with a fix for `bug 1053
  <https://github.com/pymupdf/PyMuPDF/issues/1053>`_, which caused pages with
  identical foreground images to wrongfully have the same mask, causing
  "repeated" pages in PDFs, where actual content went missing.


PDF module 0.0.13
-----------------

Date: 2020-05-07

Changes:

* Submit compression statistics to statsd
* Fixes for bitonal images


PDF module 0.0.12
-----------------

Date: 2020-04-25

Changes:

* Upgrade to newer PyMuPDF (1.18.13), newer libjbig2dec, libopenjp2, libmupdf)
* Switch to newer/faster MRC algorithms, reducing required runtime and memory
  usage
* Support using OpenJPEG (not the default)


PDF module 0.0.11
-----------------

Date: 2020-04-09

Changes:

* Gracefully handle invalid hOCR bounding boxes


PDF module 0.0.10
-----------------

Date: 2020-03-15

Changes:

* Remove `merlijn_cd` from dpi testing collections
* Scale fontsize to DPI if the DPI is known


PDF module 0.0.9
----------------

Date: 2020-03-05

Changes:

* Implement collection-dependent DPI downsampling (helps dealing with really
  large images)
* Support downsampling input images entirely


PDF module 0.0.8
----------------

Date: 2020-02-24

Changes:

* Add more detailed timing information
* Move to python-derivermodule 1.0.0
* Write item URL to `xmp:Keywords`


PDF module 0.0.7
----------------

Date: 2020-01-26

Changes:

* Support tar files as input
* Handle items with multiple titles
* Fix the detection of uppercase roman numerals for page numbers
* Handle JPEG2000 images that Pillow cannot read gracefully
* Set maximum image size to 25000x25000


PDF module 0.0.6
----------------

Date: 2020-12-17

Changes:

* Add special luminance grayscale support


PDF module 0.0.5
----------------

Date: 2020-12-14

Changes:

* Support per-page ppi
* Verbosely report on PDF validation failures
* Handle missing ppi, attempt to repair bad ppi information (in extreme cases,
  bad ppi information would break PDF/A compliance)


PDF module 0.0.4
-----------------

Date: 2020-11-20

Changes:

* Switch away from using imagemagick
* Read JPEG2000 headers directly when possible, to speed up recoding
* Switch to PDF recoding as library function for better integration


PDF module 0.0.3
-----------------

Date: 2020-11-18

Changes:

* Add creator field
* Fix creation timestamp formatting
* Also accept `_jpg.zip` and other formats
* Fix scandata parsing for a single page
* Fix XMP escaping
* Add code to time text page generation
* Fix out of range error in `hq-pages` parsing


PDF module 0.0.2
-----------------

Date: 2020-11-18

Changes:

* Initial production version
* Support right-to-left writing order
* Do not render whitespace-only
* Add JBIG2 support
* Add optional mask denoise support
* Add basic PDF/UA support

PDF module 0.0.1
----------------

Date: 2020-10-24

* Initial version


Code repositories
==================

* https://git.archive.org/merlijn/archive-hocr-tools
* https://git.archive.org/merlijn/archive-pdf-tools
* https://git.archive.org/merlijn/python-derivermodule


Contributing
============

Contributions to the `Code repositories`_ are welcome. The discussion of the PDF
efforts takes place in the #ocr-g channel on the Internet Archive's Slack
channel. Feel free to reach out to the author of this document if you would like
to contribute.
