# Third twin scanner

This is a script that scans all DITA files in a directory and find the links that occur more than once in any DITA topic file. Relationship tables, topicref collections, inline cross-references, and links in the related-links tag are all reckoned.

## Use case

When DITA topics are transformed to HTML, the following links are auto-generated and inserted inside the topic:

- Links to nested `topicref` elements in a DITA map file
- Links to topics in the same row in a relationship table

Additionally, DITA topics might have the following links inserted manually in the topic:

- Through an `xref` tag
- Through the `related-links` tag

The net effect is, after the transforms, a topic might contain a link to the same target more than once. Maybe yours is a multi-writer team, maybe you inherited the files and haven't done a link check, maybe you yourself linked to a topic twice: once through a `.ditamap` file and once again through an in-topic related link.

This script will find all such links: links that occur more than once in a topic. The script will, then, generate a report for you. Read the report and delete the extra links.

## Limitations

It is assumed that all DITA topic files have the `.dita` extension. If your files use the `.xml` extension, this script doesn't work.

## How to use


1.  Download the [linkchecker-third-twin](https://github.com/AninditaBasu/linkchecker-third-twin) repository as a `ZIP` file and extract the contents to any directory on your computer.
1.  Depending on whether you have Python 3.7 on your computer:
    - If you have Python, go to the `source` directory of the extracted contents, and double-click `third_twin.py`.
    - If you don't have Python, go the `output` directory of the extracted contents, and double-click `third_twin.exe`.
1.  When prompted, enter the full path of the directory to be scanned, for example, `c:\documentation\myProduct\`. Do not forget to enter the trailing `\` for the directory. The script will scan all of the subdirectories of the specified directory. When the scan is complete, you see a message on the console: `Press any key to exit.` Press any key.
1.  Go to the directory that contains the script you used. Depending on your choice at a previous step, this directory is either `source` or `output`. You see a file called `RepeatedLinks.html` in that directory. This is the report file for you to read and act upon.

## Troubleshooting

Raise an [issue](https://github.com/AninditaBasu/linkchecker-third-twin/issues).
