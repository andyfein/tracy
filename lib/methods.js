// Methods for manipulating Collections
Meteor.methods({
  addComponent: function(component) {
	return Comps.insert(component);
  },
  updateComponent: function(id, fields) {
	Comps.update({_id: id},{$set: fields});
  },
  deleteComponent: function(id) {
	Comps.remove({_id: id});
	Links.remove({target: id});
	Links.remove({source: id});
  },
  addLink: function(link) {
	Links.insert(link);
  },
  deleteLink: function(id) {
	Links.remove({_id: id});
  },
  addCountry: function(country) {
	Countries.insert(country);
  },
  updateCountry: function(id, fields) {
	Countries.update({_id: id},{$set: fields});
  },
  deleteCountry: function(id) {
	Countries.remove({_id: id});
  }
});
