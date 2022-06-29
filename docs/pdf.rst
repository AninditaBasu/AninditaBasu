PDF generation and compression at the Internet Archive
######################################################

:authors: Merlijn Wajer <merlijn@archive.org>
:date: 2021-08-13
:last-updated: 2021-08-13
:version: 1.0


Introduction
============

This document outlines the PDF generation module and its features as used to
generate PDF documents for the Internet Archive items and elaborates on design
decisions and how various solutions were picked.

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


Release history
===============

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
