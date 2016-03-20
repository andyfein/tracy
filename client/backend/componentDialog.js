// Dialog for adding and editing Components.
// dialog template helpers
Template.componentDialog.helpers({
  countries: function() {
	return Countries.find({});
  }
});

Template.componentDialog.onRendered(function() {
  var self = this;
  // dialog for creation/editing of components
  self.dialog = document.querySelector('dialog');
  if (! self.dialog.showModal) {
	dialogPolyfill.registerDialog(self.dialog);
  }

  self.autorun(function() {
	if (Session.get('dialogState')) {
	  openDialog(Session.get('dialogPresets'), self);
	} else {
	  Session.set('dialogPresets', null);
	  if (self.dialog.open) {
		self.dialog.close();
	  }
	}
  });

  function openDialog(presets, template) {
	var form = template.find('form');
	form.reset();
	form.name.parentNode.classList.add('is-dirty');
	form.firmName.parentNode.classList.add('is-dirty');
	form.siteLocation.parentNode.classList.add('is-dirty');
	form.id.value = "false";

	if (presets.activities && _.contains(presets.activities, 'contacted')) {
	  form.contacted.parentNode.MaterialCheckbox.check();
	} else {
	  form.contacted.parentNode.MaterialCheckbox.uncheck();
	}
	if (presets.activities && _.contains(presets.activities, 'visited')) {
	  form.visited.parentNode.MaterialCheckbox.check()
	} else {
	  form.visited.parentNode.MaterialCheckbox.uncheck()
	}
	if (presets.activities && _.contains(presets.activities, 'negotiating')) {
	  form.negotiating.parentNode.MaterialCheckbox.check()
	} else {
	  form.negotiating.parentNode.MaterialCheckbox.uncheck()
	}
	for (var key in presets) {
	  if (form[key]) {
		if (form[key].type !== "checkbox") {
		  form[key].value = presets[key];
		}
	  }
	}
	if (presets._id) form.id.value = presets._id;
	self.dialog.showModal();
  }
});

Template.componentDialog.onDestroyed(function() {
  Session.set('dialogState', false);
  Session.set('dialogPresets', null);
});

Template.componentDialog.events({
  'click .cancel-component': function(event, template) {
	event.preventDefault();
	Session.set('dialogState', false);
  },
  'submit form': function(event, template) {
	event.preventDefault();
	var form = event.target;
	var activities = [];
	if (form.contacted.checked) activities.push('contacted');
	if (form.visited.checked) activities.push('visited');
	if (form.negotiating.checked) activities.push('negotiating');

	var component = new tracy.Component(form.name.value, 
										form.firmName.value, 
										form.siteLocation.value, 
										activities); 
	if (form.id.value === 'false') {
	  component = _.extend(component, {x: form.x.value, y: form.y.value});
	  Meteor.call('addComponent', component);
	} else {
	  Meteor.call('updateComponent', event.target.id.value, component);
	}
	Session.set('dialogState', false);
  }
});
