Orphan Scanner
===============
This is a script that scans all DITA files in a directory and reports those files that are not referenced by any other file DITA in that directory. Such a check is useful for identifying image files or content files that are not called by any of your DITA files.

Usage scenario
----------------
You have several image files, topic files, and other files in the directory but hesitate to delete them because you are not sure if any of these files are referenced by the DITA files in that directory. 

You tell the script which directory it should scan. The script runs the checks and gives you a report that you can read and act upon to clean up your workspace.

Limitations
-------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

How to use
------------

#. Download the `orphan-scan <https://github.com/AninditaBasu/orphan-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Depending on whether you have Python 3.7 on your computer:
    - If you have Python, go to the ``source`` folder and double-click ``orphanscan.py``.
    - If you don't have Python, go the ``output`` folder and double-click ``orphanscan.exe``.

#. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go to the folder that contains the script you used. Depending on your choice at a previous step, this folder is either ``source`` or ``output``. You see a file called ``orphanScan.html``. This is the report file for you to read and act upon.

Troubleshooting
----------------
For bugs and feature requets, raise an `issue <https://github.com/AninditaBasu/orphan-scan/issues>`_.
