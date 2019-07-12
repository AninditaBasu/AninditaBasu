Third Twin Scanner
===================
This is a script that scans all DITA files in a directory and find the links that occur more than once in any DITA topic file. Relationship tables, topicref collections, inline cross-references, and links in the related-links tag are all reckoned.

Limitations
------------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

Steps: If you have Python 3.7
------------------------------

#. Download the `linkchecker-third-twin <https://github.com/AninditaBasu/linkchecker-third-twin>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Double-click ``third_twin.py``. 

#. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go to the directory where the script resides. You see a file called ``RepeatedLinks.html``. This is the report file for you to read and act upon.

Steps: If you don't have Python 3.7
------------------------------------

**Prerequisite**:  Windows operating system

#. Download the `linkchecker-third-twin <https://github.com/AninditaBasu/linkchecker-third-twin>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Use Windows Explorer to go the ``output`` folder of the extracted contents.

#. Double-click ``third_twin.exe``. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go back to the ``output`` folder. You see a file called ``RepeatedLinks.html``. This is the report file for you to read and act upon.
