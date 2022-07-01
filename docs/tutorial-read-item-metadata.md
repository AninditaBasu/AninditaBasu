# Read the metadata of an item

Metadata is used, among other things, for fetching and viewing items. Sometimes, an item might not contain rich metadata and, consequently, not show up in search results.

This tutorial shows you how to read the metadata of an item on the Internet Archive.

## Prerequisites 

The instructions in this tutorial assume that you're using Python 3.

The following things must be available:

- The `internet archive` package in your environment. If it isn't, install it by running the following command:

    ```python
    pip install internetarchive
    ```
  
- The unique identifier of the item you're reading the metadata for. If you don't have it, see [Find the unique identifier of an item in a collection](tutorial-find-identifier-item.md).

## Steps

Use the `get_item` object of the `internetarchive` module to read the metadata of an item.

The following code snippet prints the metadata of an item that has `appropsA013019_1` as the unique identifier.

```python
from internetarchive import get_item

item = get_item('appropsA013019_1')

for k,v in item.metadata.items():
    print(print(k,":",v))
```

## Sample output

```
identifier : appropsA013019_1
collection : ['us_senate', 'usgovfilms', 'newsandpublicaffairs']
creator : United States Senate Committee on Appropriations
date : 01/30/19
language : English
mediatype : movies
scanner : Internet Archive Python library 3.0.0
subject : ['United States Senate Committee on Appropriations', 'Senate Committee Hearings', 'Congressional Hearing']
title : Business Meeting:Conference Meeting to Consider Homeland Security Appropriations
uploader : leschonander@gmail.com
publicdate : 2022-06-02 17:39:38
addeddate : 2022-06-02 17:39:38
```

## What to do next

-  Improve the metadata of an item. See ...link to tutorial...
