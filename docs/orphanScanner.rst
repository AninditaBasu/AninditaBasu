Orphan Scanner
=================
This is a script that scans all DITA files in a directory and reports those files that are not referenced by any other file DITA in that directory. Such a check is useful for identifying image files or content files that are not called by any of your DITA files.

Usage scenario
------------------
You have several image files, topic files, and other files in the directory but hesitate to delete them because you are not sure if any of these files are referenced by the DITA files in that directory. 

You tell the script which directory it should scan. The script runs the checks and gives you a report that you can read and act upon to clean up your workspace.

Limitations
------------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

How to use (you have Python 3.7)
---------------------------------

#. Download the `orphan-scan <https://github.com/AninditaBasu/orphan-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Double-click ``orphanscan.py``. 

#. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go to the directory where the script resides. You see a file called ``orphanScan.html``. This is the report file for you to read and act upon.

How to use (you don't have Python 3.7)
---------------------------------------

**Prerequisite**:  Windows operating system

#. Download the `orphan-scan <https://github.com/AninditaBasu/orphan-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Use Windows Explorer to go the ``output`` folder of the extracted contents.

#. Double-click ``orphanscan.exe``. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go back to the ``output`` folder. You see a file called ``orphanScan.html``. This is the report file for you to read and act upon.
