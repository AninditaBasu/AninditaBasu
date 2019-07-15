Word List Scanner
=================
This is a script that scans all DITA files in a directory for occurrences of all words and phrases that you specify, at one go. 

Markup tags (without the angle brackets) are also reckoned as words.

Usage scenario
----------------
You want to scan all files in a directory for several words, all at once. 

Maybe these words are a list of do-not-use words that your style guide specifies, but you don't have an automated word checker to look for such occurrences. Maybe you want to know if you've used certain DITA tags in your files but do not want to run a system search for each tag, one by one. 

This script searches for multiple words at one go, and also phrases and DITA tags. You specify a list of words and phrases, and tell the script which directory it should scan. The script runs the checks and gives you a report that you can read and act upon.

Limitations
-------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

How to use
------------

#. Download the `word-list-scan <https://github.com/AninditaBasu/word-list-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Go to the directory where you extracted the contents, and open the ``wordlist.txt`` file in a notepad. This file contains example words. Delete them, and enter the words and phrases you want the script to look for. Put each word or phrase on a new line. Do not enter a new line after the last item in this file. Save the file and close it.

#. Depending on whether you have Python 3.7 on your computer:

   - If you have Python, go to the ``source`` directory of the extracted contents, and double-click ``word_list.py``.
   - If you don't have Python, go the ``output`` directory of the extracted contents, and double-click ``word_list.exe``.

#. When prompted, enter the full path of the directory to be scanned, for example, ``c:\documentation\myProduct\``. Do not forget to enter the trailing ``\`` for the directory. The script will scan all of the subdirectories of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go to the directory that contains the script you used. Depending on your choice at a previous step, this directory is either ``source`` or ``output``. You see a file called ``wordListScan.html`` in that directory. This is the report file for you to read and act upon.

Troubleshooting
----------------
Raise an `issue <https://github.com/AninditaBasu/word-list-scan/issues>`_.
