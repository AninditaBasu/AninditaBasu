# Create an item

Every item on Internet Archive corresponds to a thing such as a book, a movie, or a song. Each item can contain one or more file. For example, a book called `Euclid's geometry` can be an item that contains files such as `euclid_geometry_part1.txt`, `euclid_geometry_part2.txt`, and `euclid_geometry_part1.pdf`. Optionally, an item can belong to a collection.

This tutorial shows you how to upload an item to Internet Archive.

The instructions in this tutorial assume that you're using Python 3.

## Prerequisites 

- IA-S3 keys. If you don't have them, see [Get your Internet Archive credentials](tutorial-get-ia-credentials.md).
- The `internet archive` package in your environment. If it isn't, install it by running the following command: `pip install internetarchive`.

## Steps

Use the `get_item` object of the `internetarchive` module to upload an item.

Use the following code snippet as guidance.

```python
from internetarchive import get_item

md = {'collection': 'test_collection', 'title': 'My New Item', 'mediatype': 'movies'}
r = item.upload('<identifier>', files=['film.txt', 'film.mov'], metadata=md, access_key='YoUrAcCEssKey', secret_key='youRSECRETKEY')

r[0].status_code
```

If the upload was successful, you see a status code of `200`.
