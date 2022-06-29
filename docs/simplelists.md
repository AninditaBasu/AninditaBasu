# Simple Lists (Relationships API)

## Introduction

Simple Lists is a service allowing applications to create relationships among items in the Internet Archive corpus.  The current implementation only allows for these relationships to be between items.  Future expansion plans include allowing relationships between items and other identifiers, such as URLs and ISBNs.

### Operations

When thinking of a hierarchical relationship system (much like a file system's) it's useful to consider a desirable list of operations for managing the organization:

#### Reading

1. `list-children`: List all children of a parent (e.g., `ls` or `dir`)
2. `list-parents`: List all parents of a child (if the system allows for multiple parents; most file systems do not)

#### Writing

1. `add-child`: Make a child a descendent of the parent (e.g., creating or linking a file within a directory)
2. `remove-child`: Remove child's relationship to the parent (e.g., unlinking a file)

### Collections

Internet Archive's [items](items.html#what-is-an-item) are organized hierarchically.  Each item may either hold content or stand as a collection other child items belong to (a logical folder).  Items are organized across the data cluster in this tree.  Thus, to organize items such as music albums, library holdings, magazine runs, etc., each item is the child of one or more collections (which themselves are stored within appropriate media collections such as `audio`, `texts`, etc.)  It's allowable for a child item to have multiple immediate parents.

There are limitations to this approach.  Creating new IA collections requires special privileges and is not available to all users.  Relationships are stored within each child item; adding one million items to a collection requires touching all million items, a lengthy process that requires write permissions to all children.

These limitations make creating arbitrary collections (for music playlists, favorite items, bookmarks, and more) difficult for application programmers.

Using collections for organization requires these APIs to satisfy the above operations:

* `list-children`: Search API
* `list-parents`: Metadata Read of child
* `add-child` and `remove-child`: Metadata Write to child

### JSON lists

JSON lists are another approach: storing a JSON file (`members.json`) within the parent item using the Metadata Write API and JSON patches.  In this case, only a single item is written to (the parent), which means the caller need only have write permissions to it and not the children.

Due to technical limitations, the JSON list is stored as a flat file and so its practical maximum size is constrained.  Adding additional relationships outside of `members.json` requires specialized treatment by the Search API and is not generalizable.

* `list-children`: Metadata Read of parent
* `list-parents`: Search API
* `add-child` and `remove-child`: Metadata Write to parent

### Simple Lists

To address these issues, the Simple Lists service was created.  It offers:

* creating custom lists outside of the collection hierarchy
* associating items without writing to the items themselves
* creating these associations with less stringent permissions
* fast lookup of relationships (both parents and children)
* large, near-unconstrained lists
* future expansion to allow relationships to non-IA identifiers

Its operations are:

* `list-children`: Search API
* `list-parents`: Metadata Read of child
* `add-child` and `remove-child`: Metadata Write to child (does not involve writing to child item, however)

Although Simple Lists uses Metadata Write (as with the other approaches), Metadata applies a different set of permissions for this write path versus the others (explained below).

## Simple Lists Relationships

Simple Lists defines a relationship as a triplet of identifiers: a parent, a list name, and a child.

* The parent must be an Internet Archive item identifier.  Currently the Metadata Write API requires the parent be a collection item; this may change in the future.
* The list is an arbitrary name which describes the relationship between the parent and the child.  Currently there is no registry of names; please contact Internet Archive before selecting one.
* The child is an item identifier.

Future expansion plans include allowing children to be URLs, ISBNs, etc.  For now, all parents and children are items.

## Fetching relationships

For the examples which follow, these identifiers are used:

* Parent: `library_of_atlantis` (a collection)
* Child: `isbn_9780920303122` (book item)
* List name: `holdings`

### Enumerate a child's parents and list memberships

To read a list of all parent relationships a child item is a member of, perform an HTTP `GET` of the `simplelists` branch of its metadata record via the Metadata Read API:

  [`https://archive.org/metadata/isbn_9780920303122/simplelists`](https://archive.org/metadata/isbn_9780920303122/simplelists)

This book is in the `holdings` of several libraries, including `library_of_atlantis`:

```json
{
  "result": {
    "holdings": {
      "library_of_atlantis": {
        "notes": {
          "isbn":"9781453262825"
        },
        "sys_changed_by": {
          "source":"task",
          "task_id":"718194457"
        },
        "sys_last_changed": "2017-08-09 01:27:03.751945"
      }
    }
  }
}
```

Here `holdings` is the list name and `library_of_atlantis` is the parent.

In addition to the relationship itself, Simple Lists stores user-defined structured data in its `notes` field.  In the above example, the user stored the book's ISBN number.  Since `notes` is stored as JSON, the user may submit an arbitrary data structure with any information that encoding supports (within reasonable size limits).

Simple Lists also stores update history in the form of which subsystem made the most recent edit (`sys_changed_by`) and when it occurred (`sys_last_changed`).  These fields are not user-modifiable and only presented for informational purposes.

### Enumerate all children of a list for a single parent

To read a list of all children in a particular list for a parent item, use the Search API:

  [https://archive.org/advancedsearch.php?q=simplelists__holdings:library_of_atlantis&fl=identifier&output=json&rows=10&page=1](https://archive.org/advancedsearch.php?q=simplelists__holdings:library_of_atlantis&fl=identifier&output=json&rows=10&page=1)

Formatting the request uses this query pattern:

  `q=simplelists__<list-name>:<parent-item>`

Note there are two underscores after `simplelists`.

The `rows` parameter indicates the maximum number of identifiers to return with the request.  Since the number of children a parent may have can be large, the search engine can return the results in pages.  To continue the listing, add subsequent page numbers (one-based) for each group:

  `page=2`

A complete list may be obtained using `rows=*`.  The returned JSON can be quite large depending on the list members.

### Enumerate all children of a list

To get all children in a particular list, use the Search API:

  [https://archive.org/advancedsearch.php?q=simplelists__holdings:*&fl=identifier&output=json&rows=10&page=1](https://archive.org/advancedsearch.php?q=simplelists__holdings:*&fl=identifier&output=json&rows=10&page=1)

Note the query format for this operation:

  `q=simplelists__<list-name>:*`

Again, there are two underscores after `simplelists`.

### Enumerate all children of a parent

To get all children of a parent, use the Search API:

  [https://archive.org/advancedsearch.php?q=simplelists__catchall:library_of_atlantis&fl=identifier&output=json&rows=10&page=1](https://archive.org/advancedsearch.php?q=simplelists__catchall:library_of_atlantis&fl=identifier&output=json&rows=10&page=1)

The query format for this operation uses the special `catchall` operator:

  `q=simplelists__catchall:<parent-item>`

Again, two underscores after `simplelists`.

Unfortunately, there's no way today to format the query to include the list name for each identifier in the output.

## Modifying relationships

Relationships are added, modified, and removed via the Metadata Write API.  The caller must POST a request to the child item in the relationship:

  [`https://archive.org/metadata/isbn_9780920303122`](https://archive.org/metadata/isbn_9780920303122)

The caller must supply credentials either in the form of an Internet Archive cookie or S3 keys; see [Metadata API](metadata.html#metadata-write) for more information.

The following must be true when updating a relationship:

* The parent item exists and is a collection,
* the caller has permission to write to the list (contact Internet Archive for more information),
* the child item exists,
* and neither item is darked.

The requirement that the parent be a collection is currently enforced by Metadata API and is not inherent to Simple Lists.  This requirement may be relaxed or removed by Metadata API in the future.

Whether adding, updating, or deleting a relationship, the change will be immediately visible _if read through the Metadata API_.  It may take several minutes or more for the change to be visible when using the Search API to read relationships.

For the `POST` payload, the `-target` field should be `simplelists` in all cases.  The `-patch` field is a JSON-encoded string as defined in the following sections.

### Adding / updating a relationship

To add or update a relationship, the MD Write `-patch` should be structured as this JSON:

```json
{
  "op": "set",
  "parent": "library_of_atlantis",
  "list": "holdings",
  "notes": "(optional)"
}
```

`notes` is optional and may be any valid JSON data type, including an array or object (map).

### Removing a relationship

To remove a relationship, the MD Write `-patch` should be structured as this JSON:

```json
{
  "op": "delete",
  "parent": "library_of_atlantis",
  "list": "holdings"
}
```
