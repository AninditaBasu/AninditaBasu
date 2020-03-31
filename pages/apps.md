---
layout: default
title: Fun apps
---
#### {{ page.title }}

<p>Or, weekend projects that stretch to fill all the time available.</p>

{% for entry in site.data.app.app %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
	  <div class="row">
      <div class="col-sm-8">
      <h5>{{ entry.name }} </h5>
      <p class="lead">{{ entry.type }}.</p>
	  <p>{{ entry.desc }}</p>
	  <p class="mt-2"><a href="{{ entry.demo }}" class="btn btn-success" target="_blank">App</a>&nbsp;&nbsp;<a href="{{ entry.code }}" class="btn btn-success" target="_blank">Code</a></p>
	  </div><!-- col-sm-8 -->
	  <div class="col-sm-4">
	  <img src="{{ entry.picture }}" alt="app screenshot" class="mr-3 mt-3 rounded img-fluid img-thumbnail">
	  </div><!-- col-sm-4 -->
      </div><!-- row -->
    </div><!-- card-body  -->	
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}



