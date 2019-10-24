Anin's Documentation Tools
============================

These are scripts for your DITA files.

All of these scripts are available to you under a `GPL 3 licence <https://opensource.org/licenses/GPL-3.0>`_, which is a copyleft licence. You are free to use and distribute the code as-is. You are also free to modify and distribute this code provided you distribute such modified code in its entirety under the same licence as this one (GPL 3).

- **Word List Scanner**
    Scan all DITA files in a directory recursively for occurrences of an entire list of words and phrases. See :doc:`Word List Scanner <wordListScanner>`.

- **Third Twin Scanner**
    Scan a directory recursively to identify duplicate, triplicate, or n-cate topic-to-topic links in DITA files. See :doc:`Third Twin Scanner <thirdTwinScanner>`.

- **Orphan Scanner**
    Scan a directory recursively to identify files that are not referenced by any DITA file in that directory. See :doc:`Orphan Scanner <orphanScanner>`.


.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Scanners

   wordListScanner
   thirdTwinScanner
   orphanScanner
