Tools and APIs
======================

The Internet Archive is a 501(c)(3) nonprofit organization committed to Universal Access of Knowledge. The Internet Archive runs several services including the Archive.org search engine, OpenLibrary, and the Wayback Machine.

In alignment with its mission, the Internet Archive encourages developers to add media to archive.org, and to use and re-purpose media and its metadata, for the great good of the community.

Archive.org
-------------

Archive.org, the flagship service of the Internet Archive, is a public digital archive which makes tens of millions of items (texts and books, public domain movies, television shows, live concerts, and more) accessible to the public, free of charge.

Archive.org has a variety of official APIs and experimental Labs APIs for accessing item metadata, downloading and uploading content, and performing item search and fulltext search.

Wayback Machine
----------------

The Wayback Machine is a web service which crawls the world wide web and saves webpages at different points in time so their contents can be referenced in the future. This is especially important since approximately [1 out of every 3 websites doesn't survive past 2 years](https://gigaom.com/2012/09/19/the-disappearing-web-information-decay-is-eating-away-our-history/). The Wayback Machine offers a website (https://web.archive.org) which allows users to explore the histories of the websites and pages it captures.

The Internet Archive Wayback Machine supports a number of different APIs to make it easier for developers to retrieve information about Wayback capture data.

Archive-It.org
---------------

Archive-It is a subscription web archiving service from the Internet Archive that helps organizations to harvest, build, and preserve collections of digital content. Through our user friendly web application Archive-It partners can collect, catalog, and manage their collections of archived content with 24/7 access and full text search available for their use as well as their patrons. Content is hosted and stored at the Internet Archive data centers.

Books: OpenLibrary, Book Reader, Lending, IIIF & APIs
------------------------------------------------------

Books are central to the Internet Archive's goal of preserving the world's knowledge and making it universally accessible. The Internet Archive and Open Library offers over 10,000,000 fully accessible books and texts. There is also a collection of 300,000 modern eBooks that may be borrowed or downloaded by the print-disabled at OpenLibrary.org.

Both Archive.org and OpenLibrary.org provide APIs for accessing book metadata, fulltext, and more (where available) which you can learn about under this Books section.

List of APIs, tools, and services
----------------------------------
Here's a list of the Internet Archive APIs, tools, and services.

.. csv-table::
   :header: "Name", "Description", "Available as", "Interactive documentation", "Tutorials"
   :widths: 15, 30, 15, 20, 20

   :doc:`metadata-schema/index`, "Metadata is used for locating and viewing information.", "XML", "--", "--"
   :doc:`internetarchive/cli`, "The Command-Line Tool (CLI) is for interacting with various archive.org services from the command-line.", "Binary program", "--", ":doc:`Quick start with the ia command line tool<index>`"
   :doc:`internetarchive/index`, "This is a Python interface for interacting with various archive.org services.", "Python library", "--", ":doc:`tutorial-find-identifier-item`, :doc:`tutorial-read-item-metadata`, :doc:`tutorial-create-item`"
   :doc:`S3-like API <ias3>`, "This API is for creating items, uploading files, and managing metadata on an Amazon S3-like server.", "Python library, REST API, SOAP API", "--", "--"
   :doc:`metadata`, "This API is for fetching the entire metadata of an item in a single transaction.", "PHP library, REST API", "`Item Metadata API reference <./_static/item_api.html>`_", "--"
   :doc:`md-read`, "This API is for fetching metadata.", "PHP library, REST API", "--", "--"
   :doc:`md-write`, "This API is for updating metadata.", "PHP library, REST API", "--", "--"
   :doc:`md-record`, "This API is for fetching number of fields for an item.", "PHP library, REST API", "--", "--"
   :doc:`md-write-adv`, "This API is for updating item metadata through JSON patches.", "JSON", "--", "--"
   :doc:`Changes API <changes>`, "This API is for  fetching identifiers that have changed within a particular time period.", "REST API", "", ""
   :doc:`views_api`, "This API is for fetching the view data of items and collections.", "REST API", "", ""
   :doc:`iarest`, "These microservices are stateless, representational programming interfaces that accept and return JSON payloads.", "", "N/A", "N/A"
   :doc:`Tasks API <tasks>`, "This API is for fetching information about running, pending, and completed tasks.", "", "", ""
   :doc:`Relationships API <simplelists>`, "This API is for creating relationships between items on the Internet Archive.", "", "", ""
   :doc:`reviews`, "This API is for storing reviews of items. Registered users can review items.", "", "", ""
   :doc:`OCR module <ocr>`, "", "", "N/A", ""
   :doc:`PDF generation module<pdf>`, "", "", "N/A", ""
   "Wayback machine APIs", "These APIs are for determining if a URL is stored on the Wayback Machine and for querying, filtering and analysis of snapshot data.", "REST API", "`Wayback API reference <./_static/wayback_api.html>`_ and `Wayback API visualization <./_static/vis/wayback_vis.html>`_", ":doc:`tutorial-get-snapshot-wayback`, :doc:`tutorial-compare-snapshot-wayback`"
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
   item-search-apis
   memento
   book-services
   book-manifests
   experimental-book-apis
   snapshots