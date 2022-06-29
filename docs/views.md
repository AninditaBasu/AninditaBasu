
# Item Engagement counting on the archive.org website.

The Internet Archive organizes it's digital holdings into a basic unit of storage
called an item. Generally, the philosophy is that an item is the thing
which in a physical library, would have been given its own card in the card catalog.

### Views API
[Views API Reference and Examples](views_api.html)

### Example Items:
  * book: https://archive.org/details/birdbookillustra00reedrich
  * audio recording: https://archive.org/details/sci2000-10-27.tlm170.flac16
  * movie: https://archive.org/details/Sita_Sings_the_Blues

Each of these web pages represents a single item stored at the Internet Archive.
In the above cases the media can be accessed directly in the web browser by pressing the play button,
or clicking on the pages of the book as shown on the web page.

In addition to experiencing these holdings in a web browser, the files that makeup
an item may be downloaded. On the right hand side of the details page there is a 'Download options' info box
with file download links.


## Measuring use.

The Internet Archive maintains a measure of use we call a download or view.

Views work like this:

  * Each item has an view counter.

  * The view counter is increased by one when a user engages with the media in an item. This is done, for example, by pressing the play button in an audio/video player, turning pages in the bookreader or downloading data files from the item.

  * A user can only increase the view count of a particular item once per day. 

  * Downloads of files and engagements with the website's various players and viewers are treated in the same way.

  * If a user views and/or downloads from an item multiple times on the same day
    that user's activity is only counted as one view on that item.


## Collections.

The archive.org website also has web pages which we refer to as `collections` pages.

  * An example collection page: https://archive.org/details/bostonpubliclibrary

Items stored at the archive are in one or more collections.

The view count of a collection is defined as the sum of all the view counts of the items in the collection.

When an item is in more than one collection, the item's view counts are added to each collection it is in.

At IA, collections are allowed to be members of other collections.
When this happens, an item inside the child collection becomes a member of both the child and parent collections.
Because the item is a member of both collections, views of that item are credited to both collections.

When a user engages with a collection page (sorting, searching, browsing etc.), it does not count as a view of the collection.
The view counter for a collection consists only of the sum of the views from it's constituent items.




## Technical details.

Because archive.org does not employ tracking cookies to track users, our view counting system uses a privacy protecting hash of the user's IP as a user id.

At the end of each day we process all of our web server logs from all of our hosts.
This log processing extracts from the logs download events, view events, user ids and approximate geolocation for the user ID.

At the end of each day we record a snapshot of all the item collection membership data and in some cases the item's sponsor, and contributor metadata fields.

We then aggregate this data into count values for items and collections.

For monthly and annual counts, we sum up the daily values for the item counts for those time periods.


## Footnote: what is the deal with privacy protecting hashes instead of IP numbers in our logs?

In most circumstances, our web servers do not record the IP number of users which connect to them.

Instead, the first 3 bytes of md5(string_concat(daily_key, client_ip)) is logged we call this a user's obfuscated ip address.

A new daily key is generated each day at UTC midnight from a cryptographically
secure random number generator (linux's /dev/urandom). 
The same key is distributed to all of our web servers.
Old daily keys are deleted. A consequence of this process is
that the same user will be assigned a different obfuscated IP address
each day and our user analysis activities are limited to
saying things about user activity only on a per day basis.


## Differences between pre-2017 (old) counting system:

  * Old counting system did not count bookreader in browser views. New one does. (After 2 'actions' in the in browser bookreader, a view is counted for that item)

  * Old counting system counted audio items as being viewed after only the details page was loaded (audio waveforms image files accidentally triggered this...). The new system works around this to only count an audio item as viewed when an audio file is actually played.

  * Old counting system counted video items as being viewed after only the details page was loaded (this was because a filter to not count thumbs/* did not match properly the url encoded form of / (%2F)). The new system properly urldecodes paths before applying the filter, and thus only counts video items which are actually played.

