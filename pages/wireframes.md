---
layout: default
title: Wireframes
---
#### {{ page.title }}

<p>Or, designing for users</p>
<p class="small">The wireframes pages listed here are best viewed on a laptop or desktop; they aren't optimised for handheld devices.</p>

{% for entry in site.data.wireframe.wireframe %}
<div class="container mt-3">
  <div class="card bg-light text-dark p-3">
    <div class="card-body hoveff">
      <h5>{{ entry.name }} </h5>
      <p>{{ entry.desc }}</p>
	  <p><a href="{{ entry.demo }}">More...</a></p>
	  {% assign taglist = entry.tags | split: ", " %}	  
	  <p>{% for item in taglist %}<span class="badge badge-secondary">{{ item }}</span>&nbsp;&nbsp;{% endfor %}</p>
    </div><!-- card-body  -->
  </div><!-- card -->
</div><!-- container mt-3 -->
{% endfor %}
