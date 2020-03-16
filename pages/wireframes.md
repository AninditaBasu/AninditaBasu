---
layout: default
title: Wireframes
---
#### {{ page.title }}

<p>Or, designing for users</p>

{% for entry in site.data.wireframe.wireframe %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}</p>
	  <p><a href = "{{ entry.demo }}">More...</a></p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}