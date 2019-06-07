# GSoD proposal for OpenMRS.org

(work-in-progress, in discussion with GSoD mentors)

---

##  Developing User Friendly Github Documentation for REST API

I went to look at the [Swagger documentation](https://demo.openmrs.org/openmrs/module/webservices/rest/apiDocs.htm) but couldn't log in :-( I looked at the [older documentation](https://wiki.openmrs.org/display/docs/REST+Web+Service+Resources+in+OpenMRS+1.9) and also the [sample REST calls](https://wiki.openmrs.org/display/docs/Sample+REST+calls) to get a ense of what the OpenMRS API offered. 

Based on my limited understanding of this API, and also on the [example APIs to follow](https://wiki.openmrs.org/display/RES/GSoD+2019+Project+Idea+1%3A+Developing+User+Friendly+Github+Documentation+for+REST+API) mentioned on the project page, I propose to create some documents to supplement the Swagger-generated content. I am assuming (since I can't see the Swagger-generated pages) that the Swagger content is already interactive, and that we can make at least GET calls through a 'Try Out' option? The documents that I am proposing to create are listed at #1, #2, and #3 in the following paragraphs.

(1) A page that contains the following information:

  - Authentication
  - Rate limits
  - User accounts
  - Endpoints
  - Filtering
  - Request format
  - Response format

(2) Pages that contains sample use cases. 

For example, if I wanted to generate a list of all patients who are taking a specific drug now, what calls would I make to the API? I propose to include some common use cases, and the syntax of the requests needed to get that data, as well as sample responses. For the syntax of the requests, I propose to give the info for multiple input methods, for example, through the command line (through cURL) or through graphical user interfaces such as the Firefox RESTClient addon. (Maybe I could use the existing Swagger setup to generate example requests in multiple languages such as Python, Java, and C++?) 

I propose these use cases to be complete, standalone pages in themselves, that is, if someone lands on this page, that person whould be able to set up a user account, know the rate limits, be able to authenticate themselves, and then make the API calls. This also means that the use-cases page will have some common content that can be re-used across all of the pages. I am assuming that the pages will be authored in HTML; if so, I propose to use the HTML transclusion mechanism to re-use common content across pages (instead of the error-prone copy-paste method).

At this stage, I am not sure how many such use cases I can include, but I am hoping that the GSoD mentors can help me come up with a few very common use cases.

(3) Resource descriptions.

I propose to add a description for each of the resources and sub-resources. Having a description upfront is helpful since someone wouldn't have to click through to the parameters to get a sense of what a particular resource does.

I propose to keep these descriptions short (1-2 sentences), and to describe what that specific resource does or returns. For example, a description for the Person resource could be something along the lines of "The name, gender, age, dates of birth and death, cause of death, and address of a person".

---
I estimate this project to be a standard-length project. Since I am already employed full time, I would be able to work only part of the day on this project. I am open to the possibility of a longer-duration project if you think my reduced working hours will need it.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to a writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to an API documentation sample](https://aninditabasu.github.io/indica/index.html)
- [Link to an example of an interactive demo](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)
