# GSoD proposal

Name of the project: Quick Start Guide plus Beginner tutorials
(work-in-progress, in discussion with GSoD mentors)


Am proposing to work on the Quick Start Guide as well as at least 5 beginner tutorials

---

##	Create user profiles

Because user profiling helps me craft better user stories. At this point, it looks like there are 2 main kinds of users:

- Scientists who do MD and want to analyze their simulations. I am assuming nil to basic Python knowledge for this group. A user story for this person could be like this: As a scientist, I want to load my data, so that I can start working with molecular simulations OR As a scientist, I want to calculate the distance between atoms, so that I can <get this result> AND similar stories.
- IT people who install MDAnalysis and help scientists with coding. I am assuming nil to basic MD knowledge for this group. A user story for this person could be: As an administrator, I want to install MDAnalysis so that scientists can use it OR As an administrator, I want to know about the attributes of an atom group, so that I can help write the code for <this task> AND other stories.

Are there any more profiles I should be considering?

## Create at least 2 Quick Start Guides

Use the material already present [MDAnalysis Docs Overview](https://www.mdanalysis.org/docs/documentation_pages/overview.html#examples) and [MDAnalysis Tutorial](http://www.mdanalysis.org/MDAnalysisTutorial/) to create a Jupyter notebook as well as a static HTML page (Sphinx generated).  See a sample [QuickStart for an administrator](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture.PNG) and [QuickStart for a scientist](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture2.PNG).

## Create user stories for at least 5 beginner tasks

For example, a task to calculate the distance between atoms. Use the existing documentation material to write these tutorials in the form of runnable Jupyter notebooks (which can be exported as HTML files and included as static pages in the documentation file-set). Make sure that each tutorial has a practice session with some related questions. For example, if I just now calculated the distance between atoms, what next can I do with this result? Include that as a question, and include a solution. Give an example image for the solution. Explain the concepts in non-code cells of the notebook, and also include explanatory comments throughout the runnable code in the notebook. To explain concepts, include diagrams ([example diagram](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture3.PNG)).

---

I'd like to give beginners a sense of what else they can do. Therefore, for every tutorial, I propose to include links to other tutorials that take them to the next two levels (intermediate and advanced). I am hoping other GSoD writers would be creating those tutorials and I can link to them.

I estimate this project to be a standard-length project. I can commit to a minimum of 10 hours a week (if not more) to this project, and am open to the possibility of a longer-duration project if you think my reduced working hours will need it.
