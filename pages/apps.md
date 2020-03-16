---
layout: default
title: Apps
---
#### {{ page.title }}

<p>Or, weekend projects that stretch to fill all the time available</p>

{% for entry in site.data.app.app %}
<div class="container mt-3">
  <div class="media bg-light text-dark p-3">
    <div class="media-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.type }}.</p>
	  <p>{{ entry.desc }}.</p>
	  <p>See <a href = "{{ entry.demo }}">demo</a>.</p>
	  <p>See <a href = "{{ entry.code }}">code</a>.</p>
    </div><!-- media-body  -->
	<img src="{{ entry.picture }}" alt="app screenshot" class="mr-3 mt-3 rounded img-fluid img-thumbnail">
  </div><!-- media -->
</div><!-- container mt-3 -->
{% endfor %}



