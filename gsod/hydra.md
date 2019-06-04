# GSoD proposal for Hydra Ecosystem

(work-in-progress, in discussion with GSoD mentors)

---

## 1. Recast the [current documentation](https://www.hydraecosystem.org/ ) into a bi-pane one

With a contents table to the left, and the contents page to the right. For this, I propose to use a free, standard style (such as the CSS framework provided by either Bootstrap or w3schools). See a [wireframe](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture6.PNG) of the proposed bi-pane solution. For this help system, the deliverable will be a fileset consisting of HTML files, together with their required CSS and JS files. This entire fileset can be deployed on a public-facing Hydra machine, or through GitHub pages (if Hydra has a GitHub account).

To make the maintenance of this help system easier, I propose to create the documentation in HTML itself (which can be edited with any help authoring system that Hydra chooses, or even with Notepad). I also propose to use the system of HTML transclusion for common items that are displayed on every page, such as headers, footer, and the table of contents.

## 2. Reorganize the content into a task-based scenario 

The current documentation is a mix of concepts and tasks). The chapters would mainly be answering questions like “How do I do <task>” or “What do I need for doing <task>”. I’d like to have the concepts (the explanations) within the task chapters themselves (so that every chapter is more or less self-contained and can stand alone.) 
  
I understand that there would be other writers working under the GSoD program to write conceptual or overview topics, and task topics. All of these, in addition to the existing material, would go into this help system. I am assuming that the writers would be authoring their topics in HTML. If required, I can also provide an annotated HTML template that follows the look and feel of the solution discussed at #1. 

## 3. Recast the Getting Started chapter

I propose that the chapter have a complete “thread” for a minimal setup of the Hydra environment. If possible, I’d like to include demo script or code that users can use to get started with minimal fuss (something like a tutorial, without calling it a ‘tutorial’.) Although I am not sure how feasible technically it is to supply a demo code because it needs databases to be set up (I’d need SME help here) I don’t know, maybe we could put some sample code out on GitHub for people to use, along with the Getting Started instructions?

I do not have the skills to write sample code but cab work with SMEs to create use cases for them to write the sample code.

## 4. Make the [API documentation](https://hydrus.readthedocs.io/en/latest/hydrus.html#submodules) interactive

Maybe by providing sample YAML files (with testable endpoints that link back to a demo Hydra environment), so that users can use online pages such as https://editor.swagger.io/ to actually play around with the API. See [example screenshot 1](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture4.PNG) and [example screenshot 2](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture5.PNG).

If YAML files are to be provided, I also propose to add documentation for (i) status of the demo Hydra environment (whether up, or down for maintenance), and (ii) instructions to use the YAML files with the Swagger editor to not only get an interactive version of the API, but to also generate server and client SDKs in a language of the user’s choice.

Alternatively, explore other options to make the API documentation more usable. For example, if Hydra is already using the Open API specs or Swagger to design and write APIs, I could work to create a Swagger-based help doc that has interactive APIs. Or, discuss with you to implement other possible alternatives, such as using [API Docs](https://api-docs.io/).

For any of these solutions to work, the ask from Hydra is to make available a demo environment to the public where the API packet is hosted and can be tried out with sample parameters

---

I estimate this project to be slightly longer than a standard-length project, mainly because point at #4 is a mini project in itself. But I am not sure at this point if this project could become a long-running one.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to another sample](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)
