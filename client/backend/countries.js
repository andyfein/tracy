Template.countries.helpers({
	countries: function() {
		return Countries.find({}, {sort: {name: 1}});
	},
});

Template.countries.events({
	"click .delete-country" : function(event, template) {
		event.preventDefault();
		Meteor.call('deleteCountry', this._id);
	},
	"click .edit-country" : function(event, template) {
		event.preventDefault();
		Session.set('dialogPresets', this);
		Session.set('dialogState', true);
	},
	"click .add-country" : function(event, template) {
		event.preventDefault();
		Session.set('dialogPresets', null);
		Session.set('dialogState', true);
	}
});


