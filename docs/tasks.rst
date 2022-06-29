Internet Archive Tasks API
##########################

What is a Task?
***************
Items are updated via tasks.  Uploading new content, changing metadata, renaming and deleting files, transforming original content into derivatives—all are performed with tasks.

Tasks are queued in a system known as `catalog`:code:.  Only one task is permitted to execute on an item at a time.  `catalog`:code: schedules tasks and ensures they run in a timely manner.  When a task completes, it is stored as item history.  When a task runs, its output is stored in a log text file.  The `Changes API <changes.html>`_ allows for tracking completed task across all items as they complete.

The Tasks API exposes running, pending, and historical tasks to callers with optional criteria to filter results.  It also offers an interface for submitting a subset of the available tasks to items the user owns or has permission to edit.  It also offers an access method for each task's textual log.

Tasks API is a REST-like interface using JSON to transmit and receive payloads.

The API requires `IA-S3 keys <https://archive.org/account/s3.php>`_ for user authentication.  It currently does not accept Internet Archive cookies.

Service Overview
****************
The Tasks API is available at https://archive.org/services/tasks.php  Task logs are available at https://catalogd.archive.org/services/tasks.php

These URLs accept only two HTTP methods: `GET`:code: and `POST`:code:.  `GET`:code: is used for task listing and tasks logs, and `POST`:code: for submitting new tasks.

For more information on how to interact with the Tasks API, see `Internet Archive RESTful microservices <iarest.html>`_.

.. _json-lines:

JSON Lines
==========
In one case (explained in ":ref:`stream-task-list`" below) the server may respond with JSON-L (JSON Lines).  The `Content-Type`:code: will be `application/json-l`:code: for this type of response.

The HTTP status code should be used to determine success or failure.  On success (`200 OK`:code:) the response will be separate JSON objects, one per line.  Each JSON object is delimited with a newline (`\n`:code:) character.  Otherwise the usual JSON response format is returned with `success`:code:, `error`:code:, and `value`:code:.

See `jsonlines.org <http://jsonlines.org/>`_ for more information.

Task Listings
*************
Pending and historical tasks may be read via an HTTP `GET`:code:.  In addition to the optional `version`:code: parameter, Tasks API accepts any combination of *category* and *criteria* parameters.

Categories
==========
Three categories may be requested:

    - `summary`:code: - Total counts of catalog tasks meeting all criteria (explained below) organized by run status (queued, running, error, and paused).  Historical totals are currently unavailable
    - `catalog`:code: - A list of all active tasks (queued, running, error, or paused) matching the supplied criteria
    - `history`:code: - A list of all completed tasks matching the supplied criteria

Any combination of the above may be specified:

    https://archive.org/services/tasks.php?summary=1&history=1

    https://archive.org/services/tasks.php?catalog=1&summary=0

`summary`:code: is the default category.  It's always included unless explicitly excluded (with `summary=0`:code:).

Criteria
========
Multiple criteria may be requested:

    - `identifier`:code: (string) - item identifier (may be wildcarded, see below)
    - `task_id`:code: (integer) - task identifier
    - `server`:code: (string) - IA node task will or was executed upon (may be wildcarded)
    - `cmd`:code: (string) - Task command (e.g., `archive.php`:code:, `modify_xml.php`:code:, etc.; may be wildcarded)
    - `args`:code: (string) - Argument list (see below; may be wildcarded)
    - `submitter`:code: (string) - User submitting task (may be wildcarded)
    - `priority`:code: (integer) - Generally from 10 to -10
    - `wait_admin`:code: (integer) - Task run state (see below)

And four criteria for searching `submittime`:code: by range:

    - `submittime>`:code:
    - `submittime<`:code:
    - `submittime>=`:code:
    - `submittime<=`:code:

The `submittime`:code: parameters may be any recognizable date/time as a string; the Tasks API will attempt to parse it into the internal stored format:

    https://archive.org/services/tasks.php?submittime%3E%3D=Jan+1+2018

This will search for all tasks submitted on or after 1 January, 2018 00:00:00 UTC.  (Note that the ">=" of the submittime parameter has been encoded as %3E%3D.)

Any combination of criteria may be specified along with categories:

    https://archive.org/services/tasks.php?identifier=prelinger&cmd=archive.php&history=1

Currently only one (1) criteria of each type is respected in the search.  Specifying the same criteria more than once (such as two identifiers) will lead to unspecified results.

Logically, all criteria are AND-ed when searching.  There is currently no support for other logical operators (OR, NOT, etc.)

Limits and the Cursor
=====================
Task listings, especially history, may be voluminous.  The Tasks API will only return a limited number of tasks in a single request.  The current default is 50 tasks per request, but the caller may request more with the `limit`:code: parameter:

    https://archive.org/services/tasks.php?identifier=prelinger&catalog=1&history=1&limit=200

The current maximum limit is 500 tasks.  Values outside this range are clamped to the server maximum.

If Tasks API reaches the limit maximum and can continue, it will return a `cursor`:code: value in the JSON response.  The cursor may be included in a subsequent request to the Tasks API to continue listing.

For example, consider this request:

    https://archive.org/services/tasks.php?identifier=opensource&history=1&limit=10

This will return the most recent ten tasks from the history of the `opensource`:code: collection.  The result will also include a `cursor`:code: field with an opaque string (for example, "c:123456").  In order for the client to continue iterating the list of historical tasks, it should call:

    https://archive.org/services/tasks.php?identifier=opensource&history=1&limit=10&cursor=c%3A123456

(Note that the colon in "c:123456" has been encoded as %3A.)  This will continue listing and return the next ten tasks from the item's history.  Tasks API will again return a "cursor" which should be included in the next request.  The caller should continue until no `cursor`:code: is returned, indicating the list is completed.

The caller **must** include all criteria and categories from the original request in subsequent calls.  (In other words, it should simply send the same URL but with the `cursor`:code: parameter included.)  Sending different criteria or categories will result in undefined behavior.

.. _stream-task-list:

Streaming the Task List
=======================
If the caller wishes to receive all tasks in a single round-trip, they may set `limit=0`:code: in the request query.  If successful, the response will be in JSON-L format (explained in ":ref:`json-lines`") with a single JSON object per line.  Otherwise a normal JSON response is returned with error information.

In addition to the usual per-task information returned, another field is included: `category`:code:.  It holds one of three values: `summary`:code: (only one per request), `catalog`:code:, or `history`:code:.  This indicates which type of JSON object is being returned for that line.

Wildcards
=========
Both `*`:code: (asterisk) and `%`:code: (percentage sign) may be used as wildcard characters within criteria that accept them:

    https://archive.org/services/tasks.php?identifier=podcast-%2A

(Note the wildcard `*`:code: is encoded as `%2A`:code: here.)  This will return a summary of all pending tasks for identifiers starting with `podcast-`:code:.

wait_admin and Run States
=========================
Four official run states are supported.  Each run state has a number (`wait_admin`:code:), a color (for descriptive purposes), and a human-readable label:

    - 0: Queued (green)
    - 1: Running (blue)
    - 2: Error (red)
    - 9: Paused (brown)

Currently Tasks API only accepts `wait_admin`:code: as a request criteria, although in its result set it also returns human-readable `color`:code: and `status`:code: labels.  Future expansion may include accepting `color`:code: and/or `status`:code: strings as criteria.

Searching Task History
======================
Due to internal limitations, the `history`:code: category may only be searched if `identifier`:code: or `task_id`:code: is specified.  Other criteria may be included, but if neither `identifier`:code: nor `task_id`:code: are present, the request will fail.

When searching category `history`:code:, `identifier`:code: may **not** include wildcards.

Response Value
==============
The task list is a complex tree structure with up to four top-level keys.  Each key corresponds to one of the three categories requested (`summary`:code:, `catalog`:code:, and `history`:code:) as well as a `cursor`:code: value if the listing is truncated (explained above).

Task Logs
*********
A task's raw log file may be accessed by the Tasks API.  Unlike the Task Listing and Task Submission interfaces, no JSON is returned.  The response is merely the log file as plain text.

Request
=======
The task log is accessed by `GET`:code: with the `task_log`:code: query parameter set to the task identifier the client wishes to read.  All other query parameters are ignored.

Authorization
=============
Task logs are only available to item owners or users with privileged access.

Response
========
On success the task log is returned as a `text/plain`:code: payload with an `HTTP 200 OK`:code: response status.

Redirects
=========
Task logs are only available if the Tasks API is accessed from the catalog server (`catalogd.archive.org`:code:).  Any attempt to access a task log from a web server (`archive.org`:code:) will result in an `HTTP 301 Moved Permanently`:code: directing the client to the catalog server.

Clients are recommended to direct their request to `catalogd.archive.org`:code: for all task log requests (but `not` the other requests).

Caching
=======
The Tasks API will include a `Last-Modified`:code: HTTP header in its response.  The client can use this timestamp for caching the task log locally and detecting changes.

See the HTTP specification for more information, especially the sections on `Last-Modified <https://tools.ietf.org/html/rfc7232#section-2.2>`_ and `If-Modified-Since <https://tools.ietf.org/html/rfc7232#section-3.3>`_.

Partial and Unavailable Logs
============================
The client should be prepared for an `HTTP 404 Not Found`:code: response when accessing a log for a task that doesn't exist or has yet to run.  No log will be available in those situations.

The client should be prepared to receive partial/incomplete log files if the task is executing.  The `Last-Modified`:code: header can be used to detect when the file has changed during execution.

Task Submission
***************
Tasks may be submitted to items the user either uploaded to Internet Archive or has permissions to edit.  Tasks are submitted by HTTP `POST`:code: to the service endpoint.

Request Entity
==============
Unlike the `GET`:code: interface, `POST`:code: expects a JSON entity (payload) describing which task to submit, item identifier, and command-specific arguments.  The supplied JSON object should have the following fields:

    - `identifier`:code: (string) - Item identifier
    - `cmd`:code: (string) - Task command to submit (see below)
    - `args`:code: (array) - Map of key-value pairs (see below)
    - `priority`:code: (integer, optional) - Task priority from 10 to -10 (default: 0)

See `"Custom headers" <iarest.html#custom-headers>`_ for special request and response headers Tasks API supports when submitting tasks.

Supported Tasks
===============
Currently the following tasks are supported for submission:

    - `book_op.php`:code:
    - `bup.php`:code:
    - `delete.php`:code:
    - `derive.php`:code:
    - `fixer.php`:code:
    - `make_dark.php`:code:
    - `make_undark.php`:code:
    - `rename.php`:code:

book_op.php
-----------
Various book operations are available.  Each are activated by including an argument named `op#`:code: (where the # is replaced by a numeral) with a value specifying which book operation should be performed.  Please contact IA for more information.

bup.php
-------
Schedule a task to backup the PRIMARY copy of the item to its SECONDARY server.  Generally, this is not required, as all tasks will perform this backup when finished.

delete.php
----------
Delete the item.  This removes all files from the IA servers.

WARNING: This is not reversible.  Once data has been deleted, it cannot be restored.

derive.php
----------
Deriving performs content transformation(s) on the files in the item.  The nature and scope of those transformations is too broad to list here.

The caller may specify already-derived files be removed prior to running the derive.  Use the `remove_derived`:code: argument to specify a filename or a file specification, e.g.,`remove_derived=*.jpg`:code:  (Original files uploaded to the item are not deleted, even if they match the file specification.)

fixer.php
---------
A fixer op is a miscellaneous operation being performed on the item, usually to correct an issue with it.  Various fixer ops are available, each activated by including its name as an argument name.  Please contact IA for more information.

make_dark.php/make_undark.php
-----------------------------
Darking an item is making it unavailable to any user, including the item owner.  The item's contents are unavailable to IA's internal subsystems as well (include the Metadata API and the search engine).

A darked item may be undarked later.

Both tasks require a single argument: `comment`:code:.  The caller should provide some reasonable explanation for why the item is being darked or undarked.

rename.php
----------
Rename the item's identifier.  A `new_identifier`:code: argument must be specified as the destination identifier.

If the `new_identifier`:code: is already present, a `409 Conflict`:code: is returned.

WARNING: Many IA features (especially for `derive.php`:code:) rely on the files in an item to have a matching name as the item identifier itself.  (For example, an item named `foobar`:code: may have an image stack named `foobar_images.zip`:code:.)  `rename.php`:code: will attempt to rename item files as well, but it's possible for certain cases to be missed.

Often a better solution is to create a new item with the desired identifier and, once ready, delete the old item.

Authorization
=============
The user must either have uploaded the item or have permission to edit it.

Response Value
==============
If `success`:code: is `true`:code:, the returned `value`:code: will include two fields:

    - `task_id`:code: (integer) - The task identifier of the pending task
    - `log`:code: (string) - A URL to the task log (written to when the task starts running)

Rate Limits
===========
Users are limited to the number of tasks they may submit over a period of time.  Clients should be prepared to receive a `429 Too Many Requests`:code: response, indicating the user's threshold has been reached.  The client should either report this error or sleep for a period of time before retrying.

The server may return a `Retry-After`:code: header with the response.  The client may use this value as a suggestion for the amount of time to pause.

Rate limit reporting
--------------------
Tasks API may be queried for the client's current threshold and active task counts.  Limits are determined per-task-type.

The client should use `GET`:code: with two query values: `rate_limits=1`:code: and `cmd=<cmd>.php`:code:.  The server will respond with the user's current task limit, the number of inflight tasks for that command (tasks queued plus tasks running), and the number of tasks for that command currently blocked by OFFLINE nodes (indicating the server is unavailable or in service).

Note that IA may adjust rate limiting thresholds and policies at any time.

Rerunning a task
****************

If a task fails (`wait_admin`:code: of 2 or "red"), the user may rerun the task.  This is useful if the task failed due to a transient error (network failure, etc.)

Request Entity
==============
As with task submission, `PUT`:code: expects a JSON entity describing which task to rerun.  The supplied JSON object should have the following fields:

    - `op`:code: (string) - 'rerun'
    - `task_id`:code: (int) - Task identifier

Response Value
==============
If `success`:code: is `true`:code:, the returned `value`:code: will be a JSON object with the task identifier (as a string, not an integer) and the item identifier.  (This format is used in case support for multiple task reruns is included in the future.)

Examples
********
These examples show HTTP request and responses with extraneous headers trimmed.

In these examples although the entity may be compressed, the uncompressed data is shown.

Listing a User's Tasks
======================
To view all pending tasks for `user@example.com`:code: :

.. code-block:: http

    GET /services/tasks.php?submitter=user%40example.com&catalog=1 HTTP/1.1
    Host: archive.org
    Authorization: LOW <s3-access>:<s3-secret>
    Accept-Encoding: deflate, gzip

The response may look something like this:

.. code-block:: http

    HTTP/1.1 200 OK
    Host: archive.org
    Content-Type: application/json
    Transfer-Encoding: chunked
    Content-Encoding: gzip

    {"success":true,"value":{"summary":{"queued":0,"running":0,"error":0,"paused":0},"catalog":[]}}

Accessing a Log File
====================
To view the log file for completed task #1230802773 from catalog (`catalogd.archive.org`:code:):

.. code-block:: http

    GET /services/tasks.php?task_log=1230802773 HTTP/1.1
    Host: catalogd.archive.org
    Authorization: LOW <s3-access>:<s3-secret>
    Accept-Encoding: deflate, gzip

Results in this response:

.. code-block:: http

    HTTP/1.1 200 OK
    Content-Type: text/plain;charset=UTF-8
    Last-Modified: Fri, 14 Jun 2019 18:06:40 GMT



    -------------------------------------------------------
    Task started at: UTC: 2019-06-14 18:06:36 ( PDT: 2019-06-14 11:06:36)
    Task pid: 19879
    **... log file continues...**

Darking an Item
===============
To dark item `did_not_mean_to_upload`:code:, the caller could submit a request as so:

.. code-block:: http

    POST /services/tasks.php HTTP/1.1
    Host: archive.org
    Authorization: LOW <s3-access>:<s3-secret>
    Content-Type: application/json
    Content-Length: 93
    Accept-Encoding: deflate, gzip

    {"identifier":"did_not_mean_to_upload","cmd":"make_dark.php","args":{"comment":"my mistake"}}

Note that `args`:code: provides an object within the enclosing object.

The response may look something like this:

.. code-block:: http

    HTTP/1.1 200 OK
    Host: archive.org
    Content-Type: application/json
    Transfer-Encoding: chunked
    Content-Encoding: gzip

    {"success":true,"value":{"task_id":1234567,"log":"https://catalogd.archive.org/log/1234567"}}

Rerunning a task
================
To rerun a stopped task:

.. code-block:: http

    PUT /services/tasks.php HTTP/1.1
    Host: archive.org
    Authorization: LOW <s3-access>:<s3-secret>
    Content-Type: application/json

    {"op":"rerun","task_id":1234}

A successful response would look like this:

.. code-block:: http

    HTTP/1.1 200 OK
    Host: archive.org
    Content-Type: application/json

    {"success":true,"value":{"1234":"my_ia_item"}}

Accessing the user's task submission limits
===========================================
To get a report of the user's current rate limit situation:

.. code-block:: http

    GET /services/tasks.php?rate_limits=1&cmd=modify_xml.php HTTP/1.1
    Host: archive.org
    Authorization: LOW <s3-access>:<s3-secret>

A successful response may be:

.. code-block:: http

    HTTP/1.1 200 OK
    Host: archive.org
    Content-Type: application/json

    {"success":true,"value":{"cmd":"modify_xml.php","task_limits":500,"tasks_inflight":120,"tasks_blocked_by_offline":0}}

This indicates the user has 120 `modify_xml.php`:code: tasks (queued + running) outstanding, zero of them are blocked by an OFFLINE node, and is operating under a limit of 500 `modify_xml.php`:code: tasks total.
