Word List Scanner
=================
This is a script that scans all DITA files in a directory for occurrences of all words and phrases that you specify, at one go. 

Markup tags (without the angle brackets) are also reckoned as words.

Usage scenario
------------------
You want to scan all files in a directory for several words, all at once. 

Maybe these words are a list of do-not-use words that your style guide specifies, but you don't have an automated word checker to look for such occurrences. Maybe you want to know if you've used certain DITA tags in your files but do not want to run a system search for each tag, one by one. 

This script searches for multiple words at one go, and also phrases and DITA tags. You specify a list of words and phrases, and tell the script which directory it should scan. The script runs the checks and gives you a report that you can read and act upon.


Limitations
------------------
It is assumed that all DITA topic files have the ``.dita`` extension. If your files use the ``.xml`` extension, this script will not work in its present form.

How to use (you have Python 3.7)
---------------------------------

#. Download the `word-list-scan <https://github.com/AninditaBasu/word-list-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Open the ``wordlist.txt`` file in a notepad. It contains some example words. Delete them, and enter the words and phrases to be searched for. Put each word or phrase on a new line. Do not enter a new line after the last item in this file. Save the file and close it.

#. Double-click ``word_list.exe``. When prompted, enter the full path of the directory to be scanned, for example, c:\\documentation\\myProduct\\. Do not forget to enter the trailing \\ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go to the directory where the script resides. You see a file called ``wordListScan.html``. This is the report file for you to read and act upon.

How to use (you don't have Python 3.7)
---------------------------------------

**Prerequisite**:  Windows operating system

#. Download the `word-list-scan <https://github.com/AninditaBasu/word-list-scan>`_ repository as a ``.zip`` file and extract the contents to any directory on your computer.

#. Use Windows Explorer to go the ``output`` folder of the extracted contents.

#. Use a notepad to open the ``wordlist.txt`` file. It contains some example words. Delete them, and enter the words and phrases you want to search for. Put each word or phrase on a new line. Do not enter a new line after the last item in this file. Save the file and close it.

#. Double-click ``word_list.exe``. When prompted, enter the full path of the directory to be scanned, for example, c:\documentation\myProduct\. Do not forget to enter the trailing \ for the directory. The script will scan all of the subfolders of the specified directory. When the scan is complete, you see a message on the console: ``Press any key to exit.`` Press any key.

#. Go back to the ``output`` folder. You see a file called ``wordListScan.html``. This is the report file for you to read and act upon.
