# Snapshots APIs

An API for citing Wayback snapshots using OpenAnnotations

## Performing a Capture

For those who want to make a capture without saving a record or an annotation to the database:

`curl -X POST -H "Content-Type: application/json" -d '{"url": "https://google.com"}}' https://pragma.archivelab.org/capture`

## Creating an Annotation

Submitting a POST request to the root path (https://pragma.archivelab.org) with JSON data containing url (String) and annotation (Object) fields will save a snapshot of url using the Wayback Machine and store the annotation object, making a bidirectional link between the stored snapshot and annotation entries. Here's an example of such a request:

`curl -X POST -H "Content-Type: application/json" -d '{"url": "google.com", "annotation": {"id": "lst-ib", "message": "Theres a microphone button in the searchbox"}}' https://pragma.archivelab.org`

## Querying Annotations

Making a GET request The root path `(https://pragma.archivelab.org`) will return a list of wayback snapshots created through the system, while the path `https://pragma.archivelab.org/annotations` will return a list of annotations. In both cases, individual items can be requested by suffixing the id of the item desired, e.g. `https://pragma.archivelab.org/5` for snapshot 5, or `https://pragma.archivelab.org/annotations/13` for annotation 13.