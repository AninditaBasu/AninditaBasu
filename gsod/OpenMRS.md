# GSoD proposal for OpenMRS.org

(work-in-progress, in discussion with GSoD mentors)

---

##  Developing User Friendly Github Documentation for REST API

I went to look at the [Swagger documentation](https://demo.openmrs.org/openmrs/module/webservices/rest/apiDocs.htm) but couldn't log in :-( I looked at the [older documentation](https://wiki.openmrs.org/display/docs/REST+Web+Service+Resources+in+OpenMRS+1.9) and also the [sample REST calls](https://wiki.openmrs.org/display/docs/Sample+REST+calls) to get a ense of what the OpenMRS API offered. 

Based on my limited understanding of the API, and also on the [example APIs to follow](https://wiki.openmrs.org/display/RES/GSoD+2019+Project+Idea+1%3A+Developing+User+Friendly+Github+Documentation+for+REST+API) mentioned on the project page, I propose to create some documents to supplement the Swagger-generated content (I am assuming - since I can't see that page - that the Swagger content is already interactive, and that we can make at least GET calls through a 'Try Out' option?):

- A page that contains the following information:
  - Authentication
  - Rate limits
  - User accounts
  - Endpoints
  - Filtering
  - Request format
  - Response format
- A page that contains some sample use cases. For example, if I wanted to generate a list of all patients who are taking a specific drug now, what calls would I make to the API? I propose to include some common use cases, and the syntax of the requests needed to get that data, as well as sample responses. For the syntax of the requests, I propose to give the info for multiple input methods, for example, through the command line (through cURL) or through graphical user interfaces such as the Firefox RESTClient addon. (Maybe I could use the existing Swagger setup to generate example requests in multiple languages such as Python, Java, and C++?)

Also, I propose to add a description for each of the resources and sub-resources. I propose to keep these descriptions short (1-2 lines), and to describe what that specific resource does or returns. For example, a description for the Person resource could be "The name, gender, age, dates of birth and death, cause of death, and address of a person".

---
I estimate this project to be a standard-length project. Since I am already employed full time, I would be able to work only part of the day on this project. I am open to the possibility of a longer-duration project if you think my reduced working hours will need it.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to an API documentation sample](https://aninditabasu.github.io/indica/index.html)
- [Link to an example of an interactive demo](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)
