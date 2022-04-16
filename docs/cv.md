---
layout: default
title: CV
nav_order: 6
---

# {{ page.title }}

I can write documentation from scratch. I can also coach, guide, and handhold non-writers (for example, coders) when they write.

My interests include design thinking, information architecture, content strategy, rest APIs, and DITA.

_Page under construction_

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>Skills</h5>
      <ul class="list-unstyled">
      <li><span class="badge badge-primary">Expert</span> DITA, Markdown, HTML, reStructured Text, Arbortext Editor, oXygen XML Editor, Viewlet Builder</li>
      <li><span class="badge badge-primary">Advanced</span> Madcap Flare, Camtasia, Pencil, JustInMind, Maqetta</li>
      <li><span class="badge badge-primary">Intermediate</span> Swagger, XML, XSL, Python, Git, GitHub, Liquid</li>
      </ul>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>Career highlights</h5>
      <ul>
	  <li>Set up a docs-like-code authoring toolchain</li>
      <li>Defined style guidelines for in-product text</li>
      <li>Defined style guidelines for videos</li>
      <li>Implemented SEO practices, and laid down the process and guidelines</li>
      <li>Implemented progressive disclosure</li>
      <li>While creating wireframes for a product, filed a defensive patent disclosure</li>
      </ul>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>Professional details</h5>
      <ul>
      <li class="p-3"><a data-toggle="modal" data-target="#myjobs" class="text-primary">Employment</a></li>
      <li class="p-3"><a data-toggle="modal" data-target="#mycertifications" class="text-primary">Certifications</a></li>
      <li class="p-3"><a data-toggle="modal" data-target="#myeducation" class="text-primary">Education</a></li>
      </ul>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>Contact information</h5>
      <p class="mt-2">ab.techwriter@gmail.com</p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->


<div class="container">
  <!-- The modal -->
  <div class="modal" id="myjobs">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">      
        <!-- Modal header -->
        <div class="modal-header">
          <h5 class="modal-title">Employment history</h5>
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div><!-- /modal header -->     
        <!-- Modal body -->
        <div class="modal-body">		
		  {% for entry in site.data.employment.employment reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h6>{{ entry.role }}</h6></div>
			<div class="card-body">
			<h6>{{ entry.company }}, {{entry.year1}} to {{entry.year2}}</h6>
			{% for item in entry.achievements %}
			<p> - {{item}}</p>
			{% endfor %}
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
</div><!-- /container for modal -->

<div class="container">
  <!-- The modal -->
  <div class="modal" id="mycertifications">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">      
        <!-- Modal header -->
        <div class="modal-header">
          <h5 class="modal-title">Certifications</h5>
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div><!-- /modal header -->     
        <!-- Modal body -->
        <div class="modal-body">		
		  {% for entry in site.data.certification.certification reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h6>{{ entry.certificate }}</h6></div>
			<div class="card-body">
			<p>{{ entry.year }}</p>
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
</div><!-- /container for modal -->

<div class="container">
  <!-- The modal -->
  <div class="modal" id="myeducation">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">      
        <!-- Modal header -->
        <div class="modal-header">
          <h5 class="modal-title">Education</h5>
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div><!-- /modal header -->     
        <!-- Modal body -->
        <div class="modal-body">		
		  {% for entry in site.data.education.education reversed %}
			<div class="container mt-3">
			<div class="card bg-light text-dark p-3">
			<div class="card-header"><h6>{{ entry.degree }}</h6></div>
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
</div><!-- /container for modal -->
