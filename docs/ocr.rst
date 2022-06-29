OCR at the Internet Archive with Tesseract and hOCR
###################################################

:authors: Merlijn Wajer <merlijn@archive.org>
:date: 2020-01-29
:last-updated: 2021-04-15
:version: 1.0


Introduction
============

This document outlines the OCR (Optical Character Recognition) module and its
features as used to perform optical text recognition on Internet Archive items
and elaborates on design decisions and how various solutions were picked.

Motivation
==========

The Internet Archive had been using proprietary OCR technology for many years,
but decided to move to an entirely open source stack after evaluating the
various open source software OCR offerings, settling on `Tesseract
<https://github.com/tesseract-ocr>`_ but keeping an eye out for alternative
engines.

This transition to Tesseract was completed near the end of 2020.


OCR format
----------

There are a few open standards when it comes to defining OCR results, with the
main contenders being:

* `hOCR <http://kba.cloud/hocr-spec/1.2/>`_
* `PAGE XML <https://github.com/PRImA-Research-Lab/PAGE-XML>`_
* `ALTO XML <https://en.wikipedia.org/wiki/ALTO_(XML)>`_

The Internet Archive settled on using `hOCR`_. At the time of writing, Tesseract
does support outputting ALTO XML, but PAGE XML was not yet supported. hOCR was
deemed sufficiently simple and flexible, with the added advantage that it is
XHTML, which allows for viewing the documents in a browser. Various hOCR tools
and libraries exist, as do hOCR viewers, such as `hocrviewer-miradoc
<https://github.com/jbaiter/hocrviewer-mirador>`_ and `hocrjs
<https://github.com/kba/hocrjs>`_.

We have also created our own tooling to work on (large) hOCR files, as some of
the existing tooling ran out of memory rather quickly; see `archive-hocr-tools
<https://git.archive.org/merlijn/archive-hocr-tools>`_ (`documentation
temporarily hosted here <https://archive.org/~merlijn/archive-hocr-tools/>`_).

We intend to keep around the older (pre-tesseract) OCR results, but will attempt
to convert them to hOCR as well, providing a hOCR file for each item with OCR
results, no matter the OCR engine. The code to convert those files can also be
found in `archive-hocr-tools`_.


Basic workflow
==============

After an `Internet Archive Item
<https://archive.org/services/docs/api/items.html#what-is-an-item>`_ has been
uploaded, various processes kick in to analyze the content and provide
derivative files, one of those being the OCR file. The output `OCR format`_
was changed from the old proprietary format to hOCR, as explained earlier.

hOCR files
----------

Barring any failures in the OCR process, after upload, every item will get one
or more ``*_hocr.html`` files which represent the results of OCR jobs.  Each
``*_hocr.html`` file contains results for all pages in one set of images (book,
PDF, or otherwise), with text, bounding boxes, and confidence at the word level.
For those seeking more detailed OCR results, each ``_hocr.html`` file should
also have a corresponding ``*_chocr.html.gz`` file, with character-level
granularity. (The exact meaning of "character" differs, of course, per script or
language).

From these hOCR files, two additional OCR files get created:

* ``*_hocr_pageindex.json.gz``: a simple JSON array annotating where each
  individual page element starts in the ``*_hocr.html`` file, enabling
  quick fast-forwarding to an individual page without parsing all the XML.
* ``*_hocr_searchtext.txt.gz``: a plaintext file that is ingested by the full
  text search engine.


Additional generated content
----------------------------

Using the ``*_hocr.html`` file, even more files are generated, for
accessibility and compatibility reasons:

* ``*.pdf``: Portable Document Format files, containing MRC-compressed
  images and the OCR result as a hidden (selectable, searchable) text layer.
  (In some cases, the PDF files can have a slightly different suffix,
  but the extension remains ``.pdf``)
* ``*_djvu.xml``: a modified version of the DjVu XML standard, these files
  can also be used to read OCR results, but the recommendation is to instead
  parse the hOCR files.
* ``*_djvu.txt``:, a human-readable plaintext version of the generated
  ``*_djvu.xml`` file.


OCR metadata
============

Archive.org items have metadata, and the metadata can dictate how the items are
treated. For example, the ``language`` field determines what languages will be
used when OCRing the content of the item. Upon completion, the OCR process will
write various metadata values that potentially enable document discovery through
metadata search. This section covers all the metadata relevant to the OCR process.

Metadata and input for the OCR process
--------------------------------------

language
~~~~~~~~

The item-level ``language`` metadata key describes the language(s) the documents
contained in the item are written in. Accepted values are standard three letter
ISO-639 codes, MARC languages codes, and canonical names of a language. So in
the case of English, either ``eng`` or ``English`` would be accepted.
Additionally, Tesseract language codes are accepted, and a list of special-case
language mappings can be found in section `Supported languages`_.

The ``language`` metadata value can be repeated, meaning that multiple languages
can be provided. If this is the case, the OCR module will perform OCR using the
multiple provided languages.

If the ``language`` value is set to the literal string ``None``, then no OCR
will be performed, and every page will instead be treated as a page with no
OCRable content.

If the ``language`` metadata key is not provided, or is set to one of (``und``,
``zxx``, ``mul``), then the OCR system will perform what is known as the
`autonomous mode`_, which is explained in detail later on.

If the ``language`` is set to an invalid or unknown language, the OCR module
will also perform the `autonomous mode`_ instead, attempting to guess the script
and language. (In addition, it will also set either ``ocr_invalid_language`` or
``ocr_unsupported_language`` in the item (and resulting hOCR file) metadata to
the languages that are considered invalid or unsupported.

adaptive_ocr
~~~~~~~~~~~~

When the ``adaptive_ocr`` metadata value is set to ``true``:

* excessively long runs on Tesseract will not cause the OCR process to fail, but
  rather insert an empty page and set ``ocr_degraded`` to ``page-timeout``.
* Tesseract crashes during the OCR process will cause an empty page to be be
  inserted (as opposed to hard failing) and ``ocr_degraded`` will be set to
  ``tesseract-crash``.
* In autonomous mode, if no language could be determined but scripts have been
  detected, the OCR will proceed with the scripts only and ``ocr_degraded`` will
  be set to ``script-only``.


ocr_default_parameters
~~~~~~~~~~~~~~~~~~~~~~

The item-level ``ocr_default_parameters`` metadata key allows specifying
specific OCR module parameters. This only has effect when it is set in the
``collection`` of an item, setting it on an item itself has no effect. See
`task arguments`_ for an explanation of all the possible task arguments.


Scandata
~~~~~~~~

Scandata is not a metadata key, but rather a XML file containing specific
per-image information, including if the image should be included in any of the
produced formats. The module will find, parse and honours these files if they
exist.

Scandata files are marked with the format ``"Scandata"``.


Metadata written by the OCR module
----------------------------------

The following keys are written to the item metadata, as well as to the files
metadata of the generated hOCR files.

If an item contains multiple stacks of images, pdfs, or otherwise, then the
item-level metadata only represents the values of the stack of images that was
OCRd, in which case the hOCR file-level metadata should be inspected for correct
values. This metadata is only written to the files metadata starting with module
version ``0.0.11``.

ocr
~~~

This metadata key contains the name and version of the OCR engine that was used
to produce to OCR content. If a `language`_ metadata key was found to be not
"ocrable", the ``ocr`` metadata key also contains the text ``language not
currently OCRable``.

Example::

    ocr: "tesseract 4.1.1"

ocr_parameters
~~~~~~~~~~~~~~

This metadata key describes the parameters passed to the OCR engine (Tesseract)
that were ultimately used to OCR the item contents. This can be used to spot
potential problems.

Example::

    ocr_parameters: "-l eng"


ocr_module_version
~~~~~~~~~~~~~~~~~~

This metadata key describes the version of the OCR module that was used to
perform the resulting hOCR file. This can be used to potentially perform OCR on
items again if problems are found in a specific version.


ocr_detected_script
~~~~~~~~~~~~~~~~~~~

The script or set of script that is/are most prominent on the images. This value
is typically based on sampling the content and internally relies on Tesseract's
script detection module. Please refer to Tesseract for the list of currently
supported scripts.

Example::

    ocr_detected_script: "Fraktur"


ocr_detected_script_conf
~~~~~~~~~~~~~~~~~~~~~~~~

This metadata key describes the confidence in the various
``ocr_detected_script`` keys; if multiple values are present then the ordering
follows the ``ocr_detected_script`` ordering. The confidence value is expressed
as a floating point number between 0 and 1.


ocr_detected_lang
~~~~~~~~~~~~~~~~~

The language that is most prominent after OCR. The functionality is provided by
`langid.py <https://github.com/saffsd/langid.py>`_ and is expressed as ISO639-1
language codes, but might be changed to ISO639-3 codes in the future.

Example::

    ocr_detected_lang: "en"


ocr_detected_lang_conf
~~~~~~~~~~~~~~~~~~~~~~

This metadata key describes the confidence in the detected language
(`ocr_detected_lang`_). The confidence value is expressed as a floating point
number between 0 and 1.


ocr_autonomous
~~~~~~~~~~~~~~

Contains the literal value ``true`` if the OCR was a result of an `autonomous
mode`_ OCR run. Otherwise, the key is not present.


ocr_unsupported_language
~~~~~~~~~~~~~~~~~~~~~~~~

If a value in the `language`_ field is not supported, this field will be set to
the unsupported value(s).

ocr_invalid_language
~~~~~~~~~~~~~~~~~~~~

If a value in the `language`_ field is considered invalid, this field will be
set to the invalid value(s).

ocr_converted
~~~~~~~~~~~~~

This value gets set to ``true`` if the hOCR document was created from an
existing ``_abbyy.gz`` file.

ocr_degraded
~~~~~~~~~~~~

If OCRing a specific page fails, this value will get set to the error that
caused the page failure. Currently can get set to:

* ``page-timeout``

Task arguments
--------------

Task arguments typically cannot be supplied manually, but can be set as part of
the `ocr_default_parameters`_ value of a collection.

ocr-script-detect
~~~~~~~~~~~~~~~~~

Perform script detection by sampling, default is on (``1``). Stores the result
in the `ocr_detected_script`_ metadata field.

ocr-full-script-detect
~~~~~~~~~~~~~~~~~~~~~~

Perform full script detection, default is off (``0``). Stores the result in the
`ocr_detected_script`_ metadata field.

ocr-use-script-detect
~~~~~~~~~~~~~~~~~~~~~

Use the detected script in the OCR step, default is off (``0``).

ocr-lang-detect
~~~~~~~~~~~~~~~

Detect the language based upon the OCR'd corpus and store it in the
`ocr_detected_lang`_ metadata field. Default is on (``1``).


ocr-binarization-method
~~~~~~~~~~~~~~~~~~~~~~~

Change the binarization method used for automatically segmenting the page.
Default is ``otsu``.

Valid values:

* ``otsu``: default Tesseract binarization
* ``leptonica-otsu``: Tesseract binarization based on Leptonica Otsu
    (``-c thresholding_method=1`` in Tesseract)
* ``leptonica-sauvola``: Tesseract binarization based on Leptonica Sauvola
    (``-c thresholding_method=2`` in Tesseract)


ocr-pass-dpi
~~~~~~~~~~~~

Whether to directly pass the DPI of the image to Tesseract. Default is off
(``0``), specify ``1`` to turn this feature on. DPI is taken from the item
metadata and `Scandata`_, with the scandata being the preferred source because
it can provide per-image information.


ocr-autonomous
~~~~~~~~~~~~~~

Force-enable the `autonomous mode`_. Default is off (``0``).

ocr-page-timeout
~~~~~~~~~~~~~~~~

Set the maximum running time (in seconds) for any given page, default is ``30``
minutes (``1800`` seconds). Applies to both script detection and the actual OCR
process. If the timeout is set to ``0``, no timeout is used.


Searching
=========

The OCR module writes various metadata keys to items (see `Metadata written
by the OCR module`_), which are searchable fields in Archive.org. For example,
to find all documents where the detected script was Fraktur, one could search
for the following::

    ocr_detected_script:Fraktur

Likewise, to find all items which were processed with the `Autonomous mode`_,
one could search for the following::

    ocr_autonomous:true

To surface all items with a detected language of French, but with the language
metadata key set to English, one could try something like this::

    ocr_detected_lang:fr AND (language:english OR language:eng)


Summary of the OCR module modes and functionality
=================================================

This section expands a little on the heuristics and computations performed by
the OCR module. In-depth analysis of the code is outside of the scope of this
document.


Normal operation
----------------

The normal mode of operation involves mapping the values in the `language`_
metadata into Tesseract language names. If this succeeds, the images are
extracted and analysed by the script-detection module (if enabled). The
confidence for each script on each page is summed up; scripts with low
confidence are filtered out.

After that step, each image is OCR'd with all the provided languages, producing
a hOCR file for each image. These files are then concatenated into a single hOCR
file containing all the pages.

Finally, the extracted text corpus is analysed by the language detected module
(not on page-by-page basis).


Autonomous mode
---------------

The autonomous mode is a multi-pass OCR mode where no knowledge of the script or
language of the content is assumed or known. This is computationally more
intensive. In most simple cases, this is a very effective way to analyse content
that is provided without the right metadata. In some cases, the result of the
module ranges from sub-optimal to unusable, depending on the script and language
of the content - especially unsupported scripts will likely not turn out well.

The first step in this process is analysing every image with the script
detection module from Tesseract. At the end of this step, one or a few scripts are
selected for the first OCR pass (Tesseract can perform OCR with just a script as
data files).

With the detected scripts, every page is OCR'd with the detected scripts. Once
that has finished, the language detection module is ran on each page in an
attempt to figure out the various languages the content is written in. Using
some simple heuristics, a final set of languages is then selected for the second
OCR pass.

The second OCR pass performs OCR as in the `Normal operation`_, using the
detected languages as input languages.


Conversion from Abbyy XML
-------------------------

If an Abbyy XML file is present, the module can instead create a hOCR from an
existing ``_abbyy.gz`` file. Whether this happens or not is decided externally
(by the ``sourceFormat`` provided to the module).



Supported languages
===================

In case a language is missing, the best way to get the Internet Archive to
support is by creating the language data is to submit the files to the Tesseract
project. We might take user contributed language packs that have not made it
into Tesseract yet, but ideally everything ends up in Tesseract.

Omissions or mistakes in the below list when it comes to detected script or
simply supporting more metadata values can also be reported.

See `Contributing` on the best way to reach us.


List of supported languages
---------------------------

.. include:: ocr-langs-table.txt


Code repositories
==================

* https://git.archive.org/www/tesseract
* https://git.archive.org/www/hocr-fts-text
* https://git.archive.org/www/hocr-pageindex
* https://git.archive.org/merlijn/archive-hocr-tools
* https://git.archive.org/merlijn/python-derivermodule
* https://git.archive.org/merlijn/hocr-char-to-word


Contributing
============

Contributions to the `Code repositories`_ are welcome. The discussion of the OCR
efforts takes place in the #ocr-g channel on the Internet Archive's Slack
channel. Feel free to reach out to the author of this document if you would like
to contribute.

Release history
===============

Tesseract module 0.0.13
-----------------------

Date: 2021-04-15

Changes:

* Switch to archive-hocr-tools 1.1.4
* Add initial support for converting from Abbyy

Tesseract module 0.0.12
-----------------------

Date: 2021-03-16

Changes:

* Switch to Tesseract 5 alpha
* Handle items without ``collection`` metadata
* Automatically use Fraktur script if detected with a confidence greater than
  ``0.7``
* Switch to archive-hocr-tools 1.1.3


Tesseract module 0.0.11
-----------------------

Date: 2021-01-26

Changes:

* Metadata is now also written to per-file metadata (_files.xml)
* Move to python-derivermodule 1.0.0

Tesseract module 0.0.10
-----------------------

Date: 2020-12-18

Changes:

* Various language mapping additions
* More clear error messages when scandata doesn't match,
* Bugfix for backslashes being rewritten to forward slashes in Leptonica, which
  were reported and fixed prompty:
  https://github.com/DanBloomberg/leptonica/issues/558


Tesseract module 0.0.9
----------------------

Date: 2020-12-08

Changes:

* Additional language mappings, supporting more exotic language codes, and some
  different spellings of language codes. (Based on an updated list from
  Tesseract, some languages from the old module, and some others)
* Module will now process items with invalid or unsupported language codes,
  where possible. The autonomous mode will be turned on in these cases, and the
  metadata will reflect the invalid or unsupported languages in
  ocr_invalid_language and ocr_unsupported_language. If the script cannot be
  detected, the module will enter the "cannot ocr path"
* The "cannot ocr path" will not perform (further) OCR on the item. The ocr
  metadata will contain "language not currently OCRable" (the same as the
  old module), and the hOCR file will contain empty pages and a hint
  in a <meta> field that OCR has not been run.
* Items that have "handwritten" in the language, or None (literal string) in the
  language field will not be OCR'd via the "cannot ocr path".  bugfix:
  hocr-combine-stream did not honour the ocr-system and ocr-capabilities <meta>
  keywords. This has now been fixed, but is still unfortunate.

Tesseract module 0.0.8
----------------------

Date: 2020-12-01

Changes:

* Introduces the `Autonomous mode`_.
* Support more languages: kur and tgl are not actually in Tesseract; replace
  them with kmr (not an exact replacement, but better than nothing for "Kurdish"
  kmr is Latin, kur used to be Arabic but is not available currently). tgl is
  Tagalog which was renamed to fil (Filipino).
* Fixup invalid metadata in items
  (not caused by us, but we can fix it, discussed with Hank)
* Add Fraktur for all languages that we know have used Fraktur in the past
  (taken from Wikipedia)
* `ocr_detected_script`_ and `ocr_detected_script_conf`_ can now have multiple
  values (only in autonomous mode at the moment)


Tesseract module 0.0.7
----------------------

Date: 2020-11-20

Changes:

* Support for collection default parameters (see `ocr_default_parameters`_)
* Image validation checks are loosened up as they were too strict.
* A division by zero has been fixed when the confidence in the script detected was 0.
* Ships with improved Fraktur model

Tesseract module 0.0.6
----------------------

Date: 2020-11-10

Changes:

* Script detection confidence is now added, with normalisation based on all the collected confidence values (metadata field: ocr_script_detect_conf). This field will be useful in the upcoming autonomous mode, where the module will be able to figure out the script and potentially even the language.
* Task arguments support for scripting flexibility. 
* Switched to hocr-tools package: https://git.archive.org/merlijn/archive-hocr-tools
* Code refactoring for the upcoming autonomous mode

Tesseract module 0.0.5
----------------------

Date: 2020-11-02

Changes:

* Script detection by sampling, not full analysis

Tesseract module 0.0.4
----------------------

Date: 2020-10-26

Changes:

* Streaming XML version of hOCR combination

Tesseract module 0.0.3
----------------------

Date: 2020-10-21

Changes:

* Can read (and honour) `Scandata`_.


