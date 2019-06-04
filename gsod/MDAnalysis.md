# GSoD proposal for MDAnalytics

Name of the project: Quick Start Guide plus Beginner tutorials
(work-in-progress, in discussion with GSoD mentors)


I am proposing to work on the Quick Start Guide as well as at least 5 beginner tutorials

---

##	1. Create user profiles

I'd begin with user profiling because it helps me craft better user stories. At this point, it looks to me like there are 2 main kinds of users:

- Scientists who do MD and want to analyze their simulations. I am assuming nil to basic Python knowledge for this group. A user story for this person could be like this: As a scientist, I want to load my data, so that I can start working with molecular simulations OR As a scientist, I want to calculate the distance between atoms, so that I can <get this result> AND similar stories.
- IT people who install MDAnalysis and help scientists with coding. I am assuming nil to basic MD knowledge for this group. A user story for this person could be: As an administrator, I want to install MDAnalysis so that scientists can use it OR As an administrator, I want to know about the attributes of an atom group, so that I can help write the code for <this task> AND other stories.

Are there any more profiles I should be considering?

## 2. Create at least 2 Quick Start Guides

I would use the material already present [MDAnalysis Docs Overview](https://www.mdanalysis.org/docs/documentation_pages/overview.html#examples) and [MDAnalysis Tutorial](http://www.mdanalysis.org/MDAnalysisTutorial/) to create a Jupyter notebook as well as a static HTML page.  See a sample [QuickStart for an administrator](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture.PNG) and [QuickStart for a scientist](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture2.PNG). The samples are very very skeletal, but am inlcuding them to give a sense of what I intend to develop.

## 3. Create titorials from user stories for at least 5 beginner tasks

For example, I could create a tutorial for a task that could be: calculate the distance between atoms. The tutorial would have three sections: (i) why do I need to do this task (ii) what are the steps to do this task (iii) what next can I do after this task is over.

Because the tutorial is targetted at beginners, I would explain the concepts and try to include conceptual diagrams as far as possible ([example diagram](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture3.PNG)). I would include code snippets, and include explanatory comments in those snippets so that users can, if they want to, change the values of variables in that code before they run it on their own. I would inlcude pictures of expected results, and, if feasible, include a troubleshooting section so that users can figure out where they went wrong and how to correct the errors.

For every tutorial, I propose to include links to other tutorials that take them to the next two levels (intermediate and advanced). I am hoping that other GSoD writers would be creating such tutorials and I can link to them.

---

I estimate this project to be a standard-length project. Since I am already employed full time, I would be able to work only part of the day on this project. I am open to the possibility of a longer-duration project if you think my reduced working hours will need it.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to another sample](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)


