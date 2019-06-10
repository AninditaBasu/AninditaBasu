# GSoD proposal for OpenMRS.org

(work-in-progress, in discussion with GSoD mentors)

---

##  Developing User Friendly Github Documentation for REST API

I looked at the [older documentation](https://wiki.openmrs.org/display/docs/REST+Web+Service+Resources+in+OpenMRS+1.9), the [sample REST calls](https://wiki.openmrs.org/display/docs/Sample+REST+calls), and also the [sample of auto-generated docs](https://psbrandt.io/openmrs-contrib-apidocs/) to get a sense of the current API documentation that OpenMRS.org has. 

From the sample of the auto-generated API docs, I can see that the Swagger content is not yet interactive, and that we cannot yet make any API calls through a 'Try Out' option. Based on my limited understanding of this API, and also on the [example APIs to follow](https://wiki.openmrs.org/display/RES/GSoD+2019+Project+Idea+1%3A+Developing+User+Friendly+Github+Documentation+for+REST+API) mentioned on the project page, I propose to create some documents to supplement the current API documentation.  The documents that I am proposing to create are listed at #1, #2, and #3 in the following paragraphs.

## (1) A page that contains the following information:

  - Authentication
  - Rate limits
  - User accounts
  - Endpoints
  - Filtering
  - Request format
  - Response format

The [OpenMRS wiki](https://wiki.openmrs.org/display/docs/REST+Web+Services+API+For+Clients) contains a lot of useful information that I intend to use when creating this page. What I am trying to achieve by creating this page is: if I am someone intending to use the API, this page should be giving me info about the barest minimum things that I need to know before making the simplest of API calls.

## (2) Pages that contains sample use cases. 

For example, if I wanted to generate a list of all patients who are taking a specific drug now, what calls would I make to the API? I propose to include some common use cases, and the syntax of the requests needed to get that data, as well as sample responses. For the syntax of the requests, I propose to give the info for multiple input methods, for example, through the command line (through cURL) or through graphical user interfaces such as the Firefox RESTClient addon. (Maybe I could use the existing Swagger setup to generate example requests in multiple languages such as Python, Java, and C++?) 

I propose these use cases to be complete, standalone pages in themselves, that is, if someone lands on this page, that person whould be able to set up a user account, know the rate limits, be able to authenticate themselves, and then make the API calls. This also means that the use-cases page will have some common content that can be re-used across all of the pages. I am assuming that the pages will be authored in HTML; if so, I propose to use the HTML transclusion mechanism to re-use common content across pages (instead of the error-prone copy-paste method).

At this stage, I am not sure how many such use cases I can include, but I am hoping that the GSoD mentors can help me come up with a few very common use cases.

### (3) Better resource descriptions.

From the [sample of auto-generated docs](https://psbrandt.io/openmrs-contrib-apidocs/), I can see that all of the resources have descriptions. However, these descriptions don't always tell me _what_ exactly is it that a specific resource does or fetches. For example, the description of the GET call for the `drug` resource says "Fetch all non-retired drug resources or perform search", but as an API user, my question would be "_what_ does it fetch?" To answer this question, I'd have to click the `drug` link, and then again click a `DrugGet` link, to arrive at a `Properties` section that tells me the information that is fetched through this resource (dose strength, ingredients, max daily dose, and other info).

My proposal is to refine these descriptions, that is, the description for both the reource itself as well as the API calls that can be made for that resource. Having a description upfront is helpful since someone wouldn't have to click through to the parameters to get a sense of what a particular resource does.

I propose to keep these descriptions short (1-2 sentences), and to describe what that specific resource does or returns. For example, a description for the `Person` resource could be something along the lines of "Fetches the name, gender, age, dates of birth and death, cause of death, and address of a person by the UUID".

---

I realise that the project idea is titled **"Developing User Friendly _Github Documentation_ for REST API"** and this, essentially, means that \#3 that I outlined in a previous paragraph is not exactly in scope when OpenMRS.org listed this project idea. However, I feel it is a good-to-add point when I think about the overall API documentation. If OpenMRS.org so desires, the auto-generated files of #3 can be integrated with the file set at GitHub.

I propose to deliver \#1 and \#2 through a GitHub branch (`gh-pages` or `docs`, depending on how OpenMRS.org has its GitHub repos set up) that will contain the HTML, CSS, and JS files needed to make a complete online-help-doc-set. It would be easier to deliver Markdown files (instead of HTML) but Markdown has lesser flexibility with regard to user friendliness. For example, it is difficult to include navigation panes (whether at the top or to the left) in Markdown pages. Also, it would be easier to integrate auto-generated API content into an HTML file set rather than a Markdown one (if OpenMRS.org wants to have both the document sets at one place, that is). 

For #3, I do not know enough about the Swagger setup at OpenMRS.org to say how this part of the work is to be done. If the Swagger pipeline has any export-from-spreadsheets step, I could review and refine the descriptions in the spreadsheets. Or, maybe, there are YAML files that contain these descriptions?

Also, for \#1 and \#2, an open question I have at this stage is: Does OpenMRS.org already have a layout in mind for the public-facing side of the GitHub documentation files? Or, would something like [this wireframe](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture8.PNG) work? Does OpenMRS.org have its own CSS files for styling the look and feel of this help system, or is it okay to use a freely available CSS framework such as Bootstrap or w3schools CSS?

---
I estimate this project to be a standard-length project. Since I am already employed full time, I would be able to work only part of the day on this project. I am open to the possibility of a longer-duration project if you think my reduced working hours will need it.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to a writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to an API documentation sample](https://aninditabasu.github.io/indica/index.html)
- [Link to an example of an interactive demo](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)
