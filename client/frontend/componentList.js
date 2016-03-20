// Logic for Component List

Template.componentList.helpers({
  currentListName: function() {
	if(Session.get('currentMode') == 'map') {
	  if(Session.get('selectedCountryId')) {
		return Countries.findOne({_id: Session.get('selectedCountryId')}).name;
	  } else {
		return "Select a Country";
	  }
	}
  },
  currentListSubtext: function() {
	if(Session.get('currentMode') == 'map') {
	  if(Session.get('selectedCountryId')) {
		var selectedCountryName = Countries.findOne(
		  {_id: Session.get('selectedCountryId')}
		).name;
		return 'These components are produced in ' + selectedCountryName + ':';
	  } else {
		return '';
	  }
	}
  },
  currentComponents: function() {

	if(Session.get('selectedCountryId')) {
	  return Comps.find({siteLocation: Session.get('selectedCountryId')});
	}
  }

});

Template.componentList.events({
  'click .select-component': function(event, template) {
	Session.set('selectedComponentId', this._id);
  }
});

