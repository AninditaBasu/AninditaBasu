---
layout: default
title: Apps
---
#### {{ page.title }}

<p>Or, weekend projects that stretch to fill all the time available</p>

{% for entry in site.data.app.app %}
<div class="container mt-3">
  <div class="media border bd-color bg-light text-dark p-3">
    <div class="media-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.type }}.</p>
	  <p>{{ entry.desc }}.</p>
	  <img src="{{ entry.picture }}" alt="app screenshot" class="mr-3 mt-3 rounded img-fluid img-thumbnail">
	  <p><a href = "{{ entry.demo }}" class="btn btn-success">See app</a>&nbsp;&nbsp;<a href = "{{ entry.code }}" class="btn btn-success">See code</a></p>
    </div><!-- media-body  -->	
  </div><!-- media -->
</div><!-- container mt-3 -->
{% endfor %}



