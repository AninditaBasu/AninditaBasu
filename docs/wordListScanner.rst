Word List Scanner
=================
This is a script that scans all DITA files in a directory for occurrences of all words and phrases that you specify, at one go. 

Markup tags (without the angle brackets) are also reckoned as words.

Limitations
------------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

Prerequisites
-------------
Windows operating system

Steps
------------------
#. Download the `word-list-scan <https://github.com/AninditaBasu/word-list-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Use Windows Explorer to go the ``output`` folder of the extracted contents.

#. Use a notepad to open the ``wordlist.txt`` file. It contains some example words. Delete them, and enter the words and phrases you want to search for. Put each word or phrase on a new line. Do not enter a new line after the last item in this file. Save the file and close it.

#. Double-click ``word_list.exe``. When prompted, enter the full path of the directory to be scanned, for example, c:\documentation\myProduct\. Do not forget to enter the trailing \ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go back to the ``output`` folder. You see a file called ``wordListScan.html``. This is the report file for you to read and act upon.

Bugs and enhancements
----------------------
File an issue on `GitHub <https://github.com/AninditaBasu/word-list-scan/issues>`_.

