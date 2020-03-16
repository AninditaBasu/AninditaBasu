---
layout: default
title: About Anindita Basu
---
<div class = "card p-3">
<div class = "card-body">
<h4>Anindita Basu</h4>
<p>I've been a technical communicator since 2006. At various points during this journey, I've been a technical writer, technical editor, UI prototypers, UI reviewer, and self-taught coder. I continue to be a learner.</p>
</div><!-- /card-body -->
</div><!-- card -->

<div class="container">  
  <!-- Button to open the modal -->
  <a data-toggle="modal" data-target="#myCV">My CV</a>
  <!-- The modal -->
  <div class="modal" id="myCV">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">      
        <!-- Modal header -->
        <div class="modal-header">
          <h1 class="modal-title">Anindita Basu</h1>
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div><!-- /modal header -->     
        <!-- Modal body -->
        <div class="modal-body">
          <p>ab.techwriter@gmail.com</p>
		  <ul>
		  <li>Writes, edits, and designs user documentation and user interfaces</li>
		  <li>Is keen on design thinking, minimalism, user experience, and content strategy</li>
		  <li>Contributes to open source</li>
		  </ul>
		  <h2>Tools and languages</h2>
		  <ul>
		  <li>Expert
			<ul>
			<li>DITA, Markdown, HTML</li>
			<li>Arbortext Editor, oXygen XML Editor</li>
			<li>Viewlet Builder</li>
			</ul>
		  </li>
		  <li>Advanced
			<ul>
			<li>DocBook, Madcap Flare</li>
			<li>Camtasia</li>
			<li>Pencil, JustInMind, Maqetta</li>
			</ul>
		  </li>
		  <li>Intermediate
			<ul>
			<li>Swagger</li>
			<li>Jekyll, Liquid</li>
			<li>Python</li>
			</ul>
		  </li>
		  </ul>
		  <h2>Certifications</h2>
		  {% for entry in site.data.certification.certification reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h5>{{ entry.certificate }}</h5></div>
			<div class="card-body">
			<p>{{ entry.year }}</p>
			<p>{{ entry.institution }}</p>
			</div><!-- card-body  -->
			</div><!-- card -->
			</div><!-- container mt-3 -->
		  {% endfor %}
		  <h2>Employment</h2>
		  {% for entry in site.data.employment.employment reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h5>{{ entry.role }}</h5></div>
			<div class="card-body">
			<h6>{ entry.company }}, {{entry.year1}} to {{entry.year2}}</h6>
			{% for item in entry.achievements %}
			<p> - {{item}}</p>
			{% endfor %}
			</div><!-- card-body  -->
			</div><!-- card -->
			</div><!-- container mt-3 -->
		  {% endfor %}
		  <h2>Education</h2>
		  {% for entry in site.data.education.education reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h5>{{ entry.degree }}</h5></div>
			<div class="card-body">
			<p>{{entry.year1}} to {{entry.year2}}</p>
			<p>{{ entry.institution }}</p>
			</div><!-- card-body  -->
			</div><!-- card -->
			</div><!-- container mt-3 -->
		  {% endfor %}
        </div><!-- /modal body -->      
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div><!-- /modal footer -->       
      </div><!-- /modal content -->
    </div><!-- /modal dialog -->
  </div><!-- /modal -->
</div><!-- container for modal -->
