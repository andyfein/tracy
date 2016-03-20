tracy = {};
/** 
 * A tracy diagram consisting of Components and links.
 * @constructor 
 */
tracy.Diagram = function() {
  this.components = [];
  this.links = [];
};
/**
 * Adds a component to the diagram.
 * @param {tracy.Component} component The component that is to be added. 
 */
tracy.Diagram.prototype.addComponent = function(component) {
  this.components.push(component);
};
/**
 * Deletes a component from the diagram.
 * @param compId Component that is to be deleted.
 */
tracy.Diagram.prototype.deleteComponent = function(compId) {
  var delComp = _.find(this.components, function(comp) { 
	return comp._id == compId; 
  });
  var delIndex = this.components.indexOf(delComp);
  this.components.splice(delIndex, 1);
};
tracy.Diagram.prototype.updateComponent = function(id, fields) {
  var updateComp = _.find(this.components, function(comp) { 
	return comp._id == id; 
  }); 
  var updateIndex = this.components.indexOf(updateComp);
  this.components[updateIndex].name = fields.name || 
	this.components[updateIndex].name;
  this.components[updateIndex].siteLocation = fields.siteLocation || 
	this.components[updateIndex].siteLocation;
  this.components[updateIndex].firmName = fields.firmName || 
	this.components[updateIndex].firmName;
  this.components[updateIndex].activities = fields.activities || 
	this.components[updateIndex].activities;
  this.components[updateIndex].x = fields.x || this.components[updateIndex].x;
  this.components[updateIndex].y = fields.y || this.components[updateIndex].y;
}
/**
 * Links two components.
 * @param source Origin of link.
 * @param target Target of link.
 */
tracy.Diagram.prototype.addLink = function(link) {
  link.source = _.find(this.components, function(comp) { 
	return comp._id == link.source; });
  link.target = _.find(this.components, function(comp) { 
	return comp._id == link.target; });
  this.links.push(link);
};
/**
 * Deletes a link.
 * @param link Link that is to be deleted.
 */
tracy.Diagram.prototype.deleteLink = function(linkId) {
  var delLink = _.find(this.links, function(link) { 
	return link._id == linkId; 
  });
  var delIndex = this.links.indexOf(delLink);
  this.links.splice(delIndex, 1);
};
/** 
 * @constructor 
 * @param x Horizontal position of component.
 * @param y Vertical position of component.
 * @param name Name of component.
 * @param firmName Name of producing firm.
 * @param siteLocation Location of site (e.g. factory or mine).
 */
tracy.Component = function(name, firmName, siteLocation, activities, x, y) {
  this.id = null;
  this.x = x || 0;
  this.y = y || 0;
  this.width = 200;
  this.height = 200;
  this.name = name;
  this.firmName = firmName;
  this.siteLocation = siteLocation;
  this.activities = activities;
}

