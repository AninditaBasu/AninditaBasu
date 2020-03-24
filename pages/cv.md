---
layout: default
title: Anindita Basu's CV
---

<h4>{{ page.title }}</h4>

<p>Interests include <code>design thinking</code>, <code> information architecture</code>, <code>content strategy</code>, <code>docs like code</code>, <code>APIs</code>, <code>DITA</code></p>

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body">
      <h5>Highlights</h5>
      <ul>
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
    <div class="card-body">
      <h5>Details</h5>
      <p class="mt-2"><a data-toggle="modal" data-target="#myjobs" class="shadow-lg text-primary">Employment</a></p>
      <p class="mt-2"><a data-toggle="modal" data-target="#mycertifications class="shadow-lg text-primary">Certifications</a></p>
      <p class="mt-2"><a data-toggle="modal" data-target="#myeducation class="shadow-lg text-primary">Education</a></p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->

<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body">
      <h5>Contact</h5>
      <p class="mt-2">
      ab.techwriter@gmail.com
      </p>
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
