Tools and APIs
======================

.. admonition:: NEEDS REVIEW

   The table on this page needs review by the maintainers of these APIs and services. `Please edit this spreadsheet <https://docs.google.com/spreadsheets/d/1dPnLzDbNz6ISdIWa41gc0Iehu03C2_hs_kuwBCyNT9k/edit?usp=sharing>`_.

Here's a list of the Internet Archive APIs, tools, and services.

.. csv-table::
   :header: "Name", "Description", "Available as", "Interactive documentation", "Tutorials"
   :widths: 15, 30, 15, 20, 20

   :doc:`metadata-schema/index`, "Metadata is used for locating and viewing information.", "XML", "N/A", ""
   :doc:`internetarchive/cli`, "The Command-Line Tool (CLI) is for interacting with various archive.org services from the command-line.", "Binary program", "N/A", ":doc:`Quick start with the ia command line tool<index>`"
   :doc:`internetarchive/index`, "This is a Python interface for interacting with various archive.org services.", "Python library", "N/A", ":doc:`tutorial-find-identifier-item`, :doc:`tutorial-read-item-metadata`, :doc:`tutorial-create-item`"
   :doc:`S3-like API <ias3>`, "This API is for creating items, uploading files, and managing metadata on an Amazon S3-like server.", "Python library, REST API, SOAP API", "", ""
   :doc:`metadata`, "This API is for fetching the entire metadata of an item in a single transaction.", "PHP library, REST API", "", ""
   :doc:`md-read`, "This API is for fetching metadata.", "PHP library, REST API", "", ""
   :doc:`md-write`, "This API is for updating metadata.", "PHP library, REST API", "", ""
   :doc:`md-record`, "This API is for fetching number of fields for an item.", "PHP library, REST API", "", ""
   :doc:`md-write-adv`, "This API is for updating item metadata through JSON patches.", "JSON", "N/A", ""
   :doc:`Changes API <changes>`, "This API is for  fetching identifiers that have changed within a particular time period.", "REST API", "", ""
   :doc:`views_api`, "This API is for fetching the view data of items and collections.", "REST API", "", ""
   :doc:`iarest`, "These microservices are stateless, representational programming interfaces that accept and return JSON payloads.", "", "N/A", "N/A"
   :doc:`Tasks API <tasks>`, "This API is for fetching information about running, pending, and completed tasks.", "", "", ""
   :doc:`Relationships API <simplelists>`, "This API is for creating relationships between items on the Internet Archive.", "", "", ""
   :doc:`reviews`, "This API is for storing reviews of items. Registered users can review items.", "", "", ""
   :doc:`OCR module <ocr>`, "", "", "N/A", ""
   :doc:`PDF generation module<pdf>`, "", "", "N/A", ""
   "Wayback machine APIs", "These APIs are for determining if a URL is stored on the Wayback Machine and for querying, filtering and analysis of snapshot data.", "REST API", "`Wayback API reference <./_static/test-wayback.html>`_ and `Wayback API visualization <./_static/vis/vis_wayback.html>`_", ":doc:`tutorial-get-snapshot-wayback`, :doc:`tutorial-compare-snapshot-wayback`"
   "Book Services", "", "", "", ""
   "Books API", "", "", "", ""
   "Works API", "", "", "", ""
   "Editions API", "", "", "", ""
   "ISBN API", "", "", "", ""
   "Authors API", "", "", "", ""
   "Subjects API", "", "", "", ""
   "Search API", "", "", "", ""
   "Search inside API", "", "", "", ""
   "Partner API", "", "", "", ""
   "Covers API", "", "", "", ""
   "Recent Changes API", "", "", "", ""
   "Editions API", "", "", "", ""

.. toctree::
   :caption: Tools and APIs
   :maxdepth: 2
   :hidden:

   items
   metadata-schema/index
   internetarchive/cli
   internetarchive/index
   ias3
   metadata
   md-read
   md-write
   md-record
   md-write-adv
   changes
   views_api
   views
   iarest
   tasks
   simplelists
   reviews
   ocr
   pdf