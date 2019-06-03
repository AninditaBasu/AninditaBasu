# GSoD proposal

(work-in-progress, in discussion with GSoD mentors)

---

## Recast the [current documentation](https://www.hydraecosystem.org/ ) into a bi-pane one

With a contents table to the left, and the contents page to the right. For this, I propose to use a free, standard style (such as the CSS framework provided by either Bootstrap or w3schools). 

## Reorganize the content into a task-based scenario 

The current documentation is a mix of concepts and tasks). The chapters would mainly be answering questions like “How do I do <task>” or “What do I need for doing <task>”. I’d like to have the concepts (the explanations) within the task chapters themselves (so that every chapter is more or less self-contained and can stand alone.) See a [wireframe](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture6.PNG).
  
I understand that there would be otehr writers working under teh GSoD program to write conceptual or overview topics, and task topics. All of these, in addition to the existing material, would go into this help system.

## Recast the Getting Started chapter

I’d like it to have a complete “thread” for a minimal setup of the Hydra environment. If possible, I’d like to include demo script or code that users can use to get started with minimal fuss (something like a tutorial, without calling it a ‘tutorial’.) Although I am not sure how feasible technically it is to supply a demo code because it needs databases to be set up (I’d need SME help here) I don’t know, maybe we could put some sample code out on GitHub for people to use, along with the Getting Started instructions?

## Make the [API documentation](https://hydrus.readthedocs.io/en/latest/hydrus.html#submodules) interactive

Maybe by providing sample YAML files (with testable endpoints that link back to a demo Hydra environment), so that users can use online pages such as https://editor.swagger.io/ to actually play around with the API. See [example screenshot 1](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture4.PNG) and [example screenshot 2](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture5.PNG).

If YAML files are to be provided, I also propose to add documentation for (i) status of the demo Hydra environment (whether up, or down for maintenance), and (ii) instructions to use the YAML files with the Swagger editor to not only get an interactive version of the API, but to also generate server and client SDKs in a language of the user’s choice.

Alternatively, explore other options to make the API documentation more usable. For example, if Hydra is already using the Open API specs or Swagger to design and write APIs, I could work to create a Swagger-based help doc that has interactive APIs. Or, discuss with you to implement other possible alternatives, such as using [API Docs](https://api-docs.io/).

For any of these solutions to work, the ask from Hydra is to make available a demo environment to the public where the API packet is hosted and can be tried out with sample parameters


---

For points #1 to #3, the deliverables would be a set of HTML files, together with their required CSS and JS files. For bullet point #3, if sample code is to be included, I don’t think I have the skill to write the sample code, but I’ll happily collaborate with SMEs to create the use case for the sample code.

For point #4, the deliverable would be an YAML file or...

I estimate this project to be slightly longer than a standard-length project, mainly because point at #4 is a mini project in itself. But I am not sure at this point if this project could become a long-running one.

