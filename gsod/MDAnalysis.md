# GSoD proposal for MDAnalytics

Name of the project: Quick Start Guide plus Beginner tutorials

I am proposing to work on a Quick Start Guide as well as 3 beginner tutorials. I discussed my ideas with Oliver Beckstein, whose [feedback](https://github.com/AninditaBasu/AninditaBasu.github.io/issues/1) has helped me draft this proposal.

I looked at the extant [docs](https://www.mdanalysis.org/docs/), [tutorial](https://www.mdanalysis.org/MDAnalysisTutorial/), and [other information](https://www.mdanalysis.org/2019/04/20/mdanalysis-as-a-building-block/). I also looked at the [Binder notebooks](https://mybinder.org/v2/gh/MDAnalysis/binder-notebook/master?filepath=notebooks). The good thing about all of this material is...it's there and it's very good material. The not-so-good thing about the material is that it's not user-focussed, and is scattered over several places (thus reducing discoveribility). The material explains what MDAnalysis does, but not how it is relevant to me (as a user). They're written from a maker's perspective and explain how each and every feature can be used; what they're lacking is a user perspective, where users will have questions like, "I have this data set from my experiments. Now, I want to visialize this protein. How do I?" To get this answer, the user will have to sift through the documentation.

I propose to bridge this gap - the gap between the already available material and its user-friendliness - by first making user profiles, and then creating a quick start guide and beginner tutorials. My approach is explained in the following paragraphs.

---

##	1. Create user profiles

I'd begin with user profiling because it helps me craft better user stories. At this point, it looks to me like there are 2 main kinds of users:

- Scientists who do MD and want to analyze their simulations. I am assuming nil to basic Python knowledge for this group. A user story for this person could be like this: As a scientist, I want to load my data, so that I can start working with molecular simulations OR As a scientist, I want to calculate the distance between atoms, so that I can <get this result> OR As a user of X tool, I want to know how it's different from MDAnalysis, so that I can start using MDAnalysis immediately.
- IT people who install MDAnalysis and help scientists with coding. I am assuming nil to basic MD knowledge for this group. A user story for this person could be: As an administrator, I want to install MDAnalysis so that scientists can use it OR As an administrator, I want to know about the attributes of an atom group, so that I can help write the code for <this task>.

Because my proposal is centred around making the docs user-focussed, it would be great if the user profiles are referred to every time someone writes any documentation (which will continue to be written long after GSoD is over). So, I propose that the user profiles be created in a specific template that contains the following details, at the very least: Fictitious name of the user, fictitious description w.r.t. work and education, and the all of the tasks that this fictitious person can do with MDAnalysis. For example, a user named JDoe who is an intern at the university in its Bachelors of Science programme, and has tasks such as installing MDAnalysis on a lab machine. Another user profile could be for someone named DJoe who is a computer administrator looking after the internal network of a university and has tasks such as task1, task2, task3. Every time someone creates an documentation, they'll also simultaneously mention who, among the user profiles, that bit of documentation is meant for. 

## 2. Create at least 2 Quick Start Guides

I would use the material already present to create a Jupyter notebook as well as a static HTML page.  See a sample [QuickStart for an administrator](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture.PNG) and [QuickStart for a scientist](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture2.PNG). The samples are very very skeletal, but am inlcuding them to give a sense of what I intend to develop.

## 3. Create tutorials from user stories for at least 3 beginner tasks

For example, I could create a tutorial for a task that could be: Calculate the distance between atoms. The tutorial would have three sections: (i) why do I need to do this task (ii) what are the steps to do this task (iii) what next can I do after this task is over.

I do not know enough science or enough about MDAnalysis to know what could be good examples of beginner tasks but, if my proposal gets selected, I intend to finalise these tasks as soon as possible.

Because the tutorial is intended for beginners, I would explain the concepts and try to include conceptual diagrams as far as possible ([example diagram](https://github.com/AninditaBasu/AninditaBasu.github.io/blob/master/gsod/Capture3.PNG)). I would include code snippets, and include explanatory comments in those snippets so that users can, if they want to, change the values of variables in that code before they run it on their own. I would include pictures of expected results, and, if feasible, include a troubleshooting section so that users can figure out where they went wrong and how to correct the errors.

For every tutorial, I propose to include links to other tutorials that take them to the next two levels (intermediate and advanced). I am hoping that other GSoD writers would be creating such tutorials and I can link to them.

---

I estimate this project to be a standard-length project. Since I am already employed full time, I would be able to work only part of the day on this project. I am open to the possibility of a longer-duration project if you think my reduced working hours will need it.

---

##### Other information

- [Link to short CV](http://aninditabasu.github.io/README.html) and to [LinkedIn profile]( https://www.linkedin.com/in/aninditabasu/)
- [Link to a writing sample](https://www.ibm.com/developerworks/library/cc-ask-watson-part1-bluemix-trs/index.html?ca=drs-) (Part 1 has links to the remaining 3 parts)
- [Link to an API documentation sample](https://aninditabasu.github.io/indica/index.html)
- [Link to an example of an interactive demo](https://mybinder.org/repo/AninditaBasu/indica) (the .ipynb files)


