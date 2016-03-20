// Logic for model creation
// initialize model template
Template.model.onCreated(function() {
  //var self = this;
});

// render model
Template.model.onRendered(function() {
  var self = this;
  self.MODE_ADD_COMPONENT = 0;
  self.MODE_ADD_LINK = 1;
  self.MODE_MOVE = 2;
  // initial mode is move
  self.mode = self.MODE_MOVE;
  // tracy diagram
  self.diagram = new tracy.Diagram();

  // initialize canvas behavior
  self.translate = [0,0]
  self.scale = 1;
  var zoom = d3.behavior.zoom()
  .scaleExtent([-5, 9])
  .on('zoom', function() {
	if (self.mode !== self.MODE_MOVE) {
	  // preserve current zoom and translate
	  zoom.translate(self.translate);
	  zoom.scale(self.scale);
	  return;
	}

	// zoom/pan
	self.translate = d3.event.translate;
	self.scale = d3.event.scale; 

	var width = self.svg.node().getBoundingClientRect().width;
	var height = self.svg.node().getBoundingClientRect().height;

	zoom.translate(self.translate);
	componentGroup.attr("transform", "translate(" + self.translate 
						+ ")scale(" + self.scale + ")");
	linkGroup.attr("transform", "translate(" + self.translate 
				   + ")scale(" + self.scale + ")");

  });
  self.svg = d3.select('#canvas')
  .attr('width', '100%')
  .attr('height', '100%')
  .call(zoom);

  // inizialize drag behavior for adding/moving components and links
  var dragStartX = 0;
  var dragStartY = 0;
  self.drag = d3.behavior.drag()
  .on('drag', function(d) { 
	if (self.mode == self.MODE_MOVE) {
	  d.x = Number(d.x) + (Number(d3.mouse(this)[0] - dragStartX));
	  d.y = Number(d.y) + (Number(d3.mouse(this)[1] - dragStartY));
	  var transformString = 'translate(' + d.x + ',' +  d.y + ')';
	  d3.select(this).attr('transform', transformString);
	  redrawLinks();
	} else if (self.mode == self.MODE_ADD_LINK) {
	  dragLine.attr('stroke-width', (self.scale * 4) + 'px');
	  dragLine.attr('d', 'M' + (((d.x  + d.width/2) * self.scale) 
								+ self.translate[0]) 
					+ ',' + (((d.y - 10) * self.scale) 
							 + self.translate[1]) 
					+ 'L' + d3.mouse(canvas)[0] + ',' + d3.mouse(canvas)[1]);
	}
  })
  .on('dragstart', function(d) {
	if (self.mode == self.MODE_MOVE) {
	  d3.event.sourceEvent.stopPropagation();
	  dragStartX = d3.mouse(this)[0]; 
	  dragStartY = d3.mouse(this)[1]; 
	} else if (self.mode == self.MODE_ADD_LINK) {
	  dragLine.style('marker-end', 'url(#end-arrow)')
	  .classed('hidden', false)
	  .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);


	}
  })
  .on('dragend', function(d) {
	if (self.mode == self.MODE_MOVE) {
	  Meteor.call('updateComponent', d._id, {x: d.x, y: d.y});
	} else if (self.mode == self.MODE_ADD_LINK) {
	  dragLine.classed('hidden', true);
	  if (mouseoverComp && mouseoverComp._id !== d._id) {
		var linkExists = _.find(self.diagram.links, function(link) { 
		  return (d._id == link.source._id) && 
			(mouseoverComp._id == link.target._id);
		});
		if (! linkExists) {
		  Meteor.call('addLink', {source: d._id, target: mouseoverComp._id});
		}
	  }
	}
  });

  // line displayed when dragging new nodes
  var dragLine = self.svg.append('svg:path')
  .attr('class', 'dragline hidden')
  .attr('d', 'M0,0L0,0');
  var mouseoverComp;

  // handles to link and component element groups
  var linkGroup = self.svg.append('svg:g');
  var componentGroup = self.svg.append('svg:g');
  var links= linkGroup.selectAll('g')
  var components = componentGroup.selectAll('g'); 

  // observe collections and react to changes
  Comps.find().observe({
	added: function(newComponent) {
	  self.diagram.addComponent(newComponent);
	  if (self.svg) drawComponents();
	},
	removed: function(oldComponent) {
	  self.diagram.deleteComponent(oldComponent._id);
	  if (self.svg) drawComponents();
	}
  });
  Comps.find().observeChanges({
	changed: function(id, fields) {
	  self.diagram.updateComponent(id, fields);
	  if (self.svg) redrawComponent(id, fields);
	} 
  });
  Links.find().observe({
	added: function(newLink) {
	  self.diagram.addLink(newLink);
	  if (self.svg) drawLinks();
	},
	removed: function(oldLink) {
	  self.diagram.deleteLink(oldLink._id);
	  if (self.svg) drawLinks();
	}
  });

  

 

  
 



  function drawLinks() {
	links = links.data(self.diagram.links, function(d) { return d._id; });


	var enteringLinks = links.enter().append('svg:g');
	enteringLinks.append('svg:path')
	.attr('class', 'link')
	.style('marker-end', 'url(#end-arrow)')


	enteringLinks.append('svg:text')
	.attr('data-link', function(d) { return d._id; })
	.attr('class', 'tracy-action-link tracy-action-delete-link')
	.text('X');

	redrawLinks();

	// remove old links
	links.exit().remove();
  }
  function redrawLinks() {
	links.selectAll('path').attr('d', function(d) {
	  d.sourceX = d.source.x + (d.source.width/2);
	  d.sourceY = d.source.y - 10;//+ d.source.height + 10;
	  d.targetX = d.target.x + (d.target.width/2); 
	  d.targetY = d.target.y + d.target.height + 10; 

	  return 'M' + d.sourceX + ',' + d.sourceY + 'L' + d.targetX + ',' + d.targetY;
	});
  self.svg.selectAll().remove();
	links.selectAll('text')
	.attr('x', function(d) {
	  return d.sourceX + ((d.targetX - d.sourceX) / 2);	
	})
	.attr('y', function(d) {
	  return d.sourceY + ((d.targetY - d.sourceY) / 2);	
	});
  }

  function drawComponents() {
	components = components.data(self.diagram.components, function(d) { 
	  return d._id; 
	});

	var enteringComponents = components.enter().append('svg:g');
	enteringComponents.call(self.drag)
	.on('mouseover', function(d) { mouseoverComp = d; })
	.on('mouseout', function() { mouseoverComp = null; })
	.attr('transform', function(d) {
	  return 'translate(' + d.x + ',' + d.y + ')';	
	});
	enteringComponents.append('svg:rect')
	.attr('rx', 2)
	.attr('ry', 2)
	.attr('width', 200)
	.attr('height', 200)
	.attr('fill', 'gray')
	.attr('filter', 'url(#drop-shadow)');

	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 36)
	.attr('class', 'mdl-card__title-text tracy-component-text')
	.attr('id', function(d) {return 'name_component_' + d._id})
	.text(function(d){ return d.name; });

	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 90)
	.attr('class', 'mdl-card__supporting-text tracy-component-text tracy-component-text-supporting')
	.attr('id', function(d) {return 'firmName_component_' + d._id})
	.text(function(d){ return d.firmName; });
	enteringComponents.append('svg:text')
	.attr('x', 16)
	.attr('y', 108)
	.attr('class', 'mdl-card__supporting-text tracy-component-text tracy-component-text-supporting')
	.attr('id', function(d) {return 'siteLocation_component_' + d._id})
	.text(function(d){ 
	  var country = Countries.findOne({_id: d.siteLocation});
	  return country.name; 
	});



	enteringComponents.append('svg:g')
	.attr('transform', 'translate(0,150)')
	.attr('id', function(d) {return 'activities_' + d._id; });

	enteringComponents.each(function(d) { 
	  drawActivities(d._id, d.activities);
	});

	enteringComponents.append('svg:text')
	.attr('x', 170)
	.attr('y', 190)
	.attr('data-component', function(d) { return d._id; })
	.attr('class', 'tracy-action-link tracy-action-edit')
	.text('Edit');

	enteringComponents.append('svg:text')
	.attr('x', 120)
	.attr('y', 190)
	.attr('data-component', function(d) { return d._id; })
	.attr('class', 'tracy-action-link tracy-action-delete')
	.text('Delete');

	components.exit().remove();
  }

  function drawActivities(id, activities) {
	var width = 20, padding = 15;
	var boxLength = (activities.length * width) + ((activities.length - 1) * padding);
	var xPos = (200 - boxLength) / 2;
	for (var i = 0; i < activities.length; i++) {
	  d3.select('#activities_' + id).append("svg:use").attr('xlink:href', '#icon-' + activities[i]).attr('x', xPos);
	  xPos += (width + padding);
	}
  }

  function redrawComponent(id, fields) {
	if(fields.name) {
	  d3.select('#name_component_' + id).text(fields.name);
	}
	if(fields.siteLocation) {
	  var country = Countries.findOne({_id: fields.siteLocation});
	  d3.select('#siteLocation_component_' + id).text(country.name);

	}
	if(fields.firmName) {
	  d3.select('#firmName_component_' + id).text(fields.firmName);
	}
	if(fields.activities) {
	  d3.select('#activities_' + id).selectAll('use').remove();
	  drawActivities(id, fields.activities);
	}
  }

});

Template.model.onDestroyed(function() {
  var self = this;
  self.svg.selectAll().remove();
});


Template.model.events({
  'click .tracy-actions-add-component': function(event, template) {
	event.preventDefault();
	template.find('.tracy-actions-add-link').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-add-link').classList.add('mdl-button--colored');
	template.find('.tracy-actions-move').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-move').classList.add('mdl-button--colored');

	template.find('.tracy-actions-add-component').classList.remove('mdl-button--colored');
	template.find('.tracy-actions-add-component').classList.add('mdl-button--accent');

	template.mode = template.MODE_ADD_COMPONENT;
  },
  'click .tracy-actions-move': function(event, template) {
	event.preventDefault();
	template.find('.tracy-actions-add-component').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-add-component').classList.add('mdl-button--colored');
	template.find('.tracy-actions-add-link').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-add-link').classList.add('mdl-button--colored');

	template.find('.tracy-actions-move').classList.remove('mdl-button--colored');
	template.find('.tracy-actions-move').classList.add('mdl-button--accent');

	template.mode = template.MODE_MOVE;
  },
  'click .tracy-actions-add-link': function(event, template) {
	event.preventDefault();
	template.find('.tracy-actions-add-component').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-add-component').classList.add('mdl-button--colored');
	template.find('.tracy-actions-move').classList.remove('mdl-button--accent');
	template.find('.tracy-actions-move').classList.add('mdl-button--colored');

	template.find('.tracy-actions-add-link').classList.remove('mdl-button--colored');
	template.find('.tracy-actions-add-link').classList.add('mdl-button--accent');

	template.mode = template.MODE_ADD_LINK;
  },

  'click #canvas': function(event, template) {
	event.preventDefault();
	if (template.mode !== template.MODE_ADD_COMPONENT) return;

	var offset = $('#canvas').offset();
	var x = (event.pageX - offset.left - template.translate[0]) 
										 / template.scale;
	var	y = (event.pageY - offset.top - template.translate[1]) 
										/ template.scale;

	Session.set('dialogPresets', {x: x, y: y});
	Session.set('dialogState', true);
  },
  'click .tracy-action-delete': function(event, template) {
	event.preventDefault();
	event.stopPropagation();
	var component = event.target.getAttribute('data-component');
	Meteor.call('deleteComponent', component);
  },
  'click .tracy-action-delete-link': function(event, template) {
	event.preventDefault();
	event.stopPropagation();
	var link = event.target.getAttribute('data-link');
	Meteor.call('deleteLink', link);
  },

  'click .tracy-action-edit': function(event, template) {
	event.preventDefault();
	event.stopPropagation();
	var componentId = event.target.getAttribute('data-component');
	var component = _.find(template.diagram.components, function(component) { 
	  return component._id == componentId; 
	});

	Session.set('dialogPresets', component);
	Session.set('dialogState', true);
  }

});




