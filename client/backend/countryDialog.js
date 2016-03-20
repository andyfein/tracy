// Dialog for adding and editing Countries
Template.countryDialog.onRendered(function() {
  var self = this;
  // dialog for creation/editing of countries 
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
	for (var key in presets) {
	  if (form[key]) {
		form[key].parentNode.classList.add('is-dirty');
		form[key].value = presets[key];
	  }
	}
	if (presets._id) form.id.value = presets._id;
	self.dialog.showModal();
  }

});

Template.countryDialog.onDestroyed(function() {
  Session.set('dialogState', false);
  Session.set('dialogPresets', null);
});

Template.countryDialog.events({
  "click .cancel-country" : function(event, template) {
	event.preventDefault();
	Session.set('dialogState', false);
  },
  "submit form" : function(event, template) {
	event.preventDefault();

	var form = event.target;

	var country = {
	  name: form.name.value,
	  lng: form.lng.value,
	  lat: form.lat.value,
	  fa: form.fa.value,
	  cl: form.cl.value,
	  fs: form.fs.value,
	  wh: form.wh.value,
	  fl: form.fl.value,
	  eo: form.eo.value,
	  hs: form.hs.value,
	  sb: form.sb.value,
	}
	if (form.id.value === 'false') {
	  Meteor.call('addCountry', country);
	} else {
	  Meteor.call('updateCountry', form.id.value, country);
	}
	Session.set('dialogState', false);
  }

})
