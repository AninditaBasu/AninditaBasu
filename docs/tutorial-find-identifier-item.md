---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.12
    jupytext_version: 1.8.2
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Find the unique identifier of an item in a collection

Every item in a collection on the Internet Archive has a unique identifier. When you know the identifier of an item, you can fetch and update the various elements of that item.

This tutorial shows how to fetch the unique identifiers of all items in the collection that contains committee hearing videos of the United States Senate.

## Prerequisites 

The instructions in this tutorial assume that you're using Python 3.

1. Install the `internet archive` package in your environment by running the following command: 
    ```python
    pip install internetarchive
    ```
2. Get the unique identifier of the collection that contains the videos of committee hearings of the United States senate.
    1. Go to the Internet Archive home page at https://archive.org.
    1. In the search bar, type `United States Senate`.
    1. On the results page, on the **Media Type** list, select the **Collections** check box.
    1. On the narrowed search results page, click the collection called **U. S. Senate**.
    1. Click **ABOUT**, and make a note of the value in the `Identifier` field. In this example, the value is `us_senate`. You'll use this value to fetch all items in this collection.

## Steps

Use the `search` object of the `internetarchive` module to get all items in the `us_senate` collection.

The following code snippet prints the identifiers of all items in the collection.

```python
import internetarchive

search = internetarchive.search_items('collection:us_senate')

for result in search:
    print(result['identifier'])
```

## Sample output

```terminal
appropsA022520_1
appropsA022819_1
appropsA030320_1
appropsA030420_1
appropsA030520_1
appropsA031020_1
appropsA031120_1
```

## What to do next

- Read the metadata of an item. See [Read the metadata of an item](tutorial-read-item-metadata.md).
- Get the contents of a file. See ...link to tutorial...

## Code test

<!-- Configure and load Thebe !-->
<script type="text/x-thebe-config">
  {
      requestKernel: true,
      mountActivateWidget: true,
      mountStatusWidget: true,
      binderOptions: {
      repo: "binder-examples/requirements",
      },
  }
</script>

<script src="https://unpkg.com/thebe@latest/lib/index.js"></script>

<div class="thebe-activate"></div>
<div class="thebe-status"></div>

<pre data-executable="true" data-language="python">
%matplotlib inline
import numpy as np
import matplotlib.pyplot as plt
x = np.linspace(0,10)
plt.plot(x, np.sin(x))
plt.plot(x, np.cos(x))
</pre>
