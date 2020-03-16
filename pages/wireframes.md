---
layout: default
title: Wireframes
---
#### {{ page.title }}

<p>Or, designing for users</p>

{% for entry in site.data.wireframe.wireframe %}
<div class="container mt-3">
  <div class="media border p-3">
    <div class="media-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}.</p>
	  <p><a href = "{{ entry.demo }}">More...</a></p>
    </div><!-- media-body  -->
  </div><!-- media -->
</div><!-- container mt-3 -->
{% endfor %}