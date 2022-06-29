Developer Portal
=================================

Welcome to the Internet Archive Developer Portal.

.. admonition:: What is Internet Archive?

   Once upon a time, there was the Library of Alexandria, which housed thousands of papyrus scrolls and codices. It was available to scholars and students.

   Today, there's Internet Archive, which contains thousands of books, videos, pictures, music, games, websites, cultural artifacts, and more. All of these are in digital form and freely available to anyone with an internet connection (`read about Internet Archive <https://archive.org/about/>`_).

This portal contains information to help you access data from, integrate with, or contribute to Internet Archive.

Some of the things that you can do are:

-  Use the APIs and services to read data, for example, see what the first edition of Shakespeare's *Hamlet* looked like.
-  Update or modify data, for example, change the metadata of an item.
-  Upload items. For example, add a video file to Internet Archive.

.. tip::
   A complete list of the APIs and services is at :doc:`index-apis`, and some step-by-step tutorials are at :doc:`index-tutorials`.

How to use this portal
-----------------------

To locate something on this portal, type a phrase in the Search bar at the top right and press Enter. You're shown a list of pages that contain the search term.

To move between the sections on a page, use the links under **Contents** at the right of the page.

To browse the portal, use the navigation at the left.

Definitions
-----------

.. include:: glossary.rst

Quick start with the `ia` command line tool
--------------------------------------------

Get started with the various Internet Archive services by using the command-line interface (CLI). (For details on the CLI tool, see :doc:`internetarchive/cli`.)

Prerequisites
*************

*  Python 3
*  `archive.org` credentials if you're doing the following actions:
    *  Uploading, searching, and modifying metadata
    *  Downloading access-restricted content
    *  Viewing your task history

Steps
*****

These steps assume you're using a Unix-like environment.

#.  Download the Python binary by running the following command: ``curl -LOs https://archive.org/download/ia-pex/ia``

#.  Make the binary an executable file by running the following commands: ``chmod +x ia``

#.  Try out some operations:

    - To read the metadata of an item, run the following command: ``ia metadata <unique_item_identifier>``. For example, to read the metadata of the song called *We are the world*, run the following command: ``ia metadata U_S_A_For_Africa_We_Are_The_World``.
    - To upload an item, run a command with the following syntax: ``ia upload <identifier> file1 file2 --metadata="mediatype:texts" --metadata="param:arg"``
        where ``<identifier>`` is a unique string. See `Item`_.

Licensing
---------

The Internet Archive does not assert any new copyright or other proprietary rights over any of the material in its database. The legal issues for community projects like Internet Archive can be confusing, but Internet Archive aims to make available database that can be freely used.

.. toctree::
    :caption: Developer Portal
    :maxdepth: 1
    :hidden:

    index.rst
    index-tutorials.rst
    index-apis.rst
    glossary.rst
