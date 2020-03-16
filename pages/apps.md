---
layout: default
title: Apps
---
# {{ page.title }}

{% for entry in site.data.app.app 
<div class="container mt-3">  
  <div class="media border p-3">
    <img src="{{ entry.picture }}" alt="John Doe" class="mr-3 mt-3 rounded-circle" style="width:100px;">
    <div class="media-body">
      <h4>{{ entry.name }} <small>{{ entry.type }}</small></h4>
      <p> {{ entry.desc }}</p>
	  <p>See <a href = "{{ entry.demo }}">demo</a>. See <a href = "{{ entry.code }}">code</a>.</p>
    </div><!-- media-body  -->
  </div><!-- media -->
{% endfor %}
</div><!-- container mt-3 -->


