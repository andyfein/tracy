// definition of collections and session variables
Meteor.subscribe('world', function onReady(){
  Session.set('worldLoaded', true);
});
Session.set('worldLoaded', false);

Meteor.subscribe('countries', function onReady(){
  Session.set('countriesLoaded', true);
});
Session.set('countriesLoaded', false);

Meteor.subscribe('components', function onReady() {
  Session.set('componentsLoaded', true);
});
Session.set('componentsLoaded', false);

Meteor.subscribe('links', function onReady() {
  Session.set('linksLoaded', true);
});
Session.set('linksLoaded', false);

Session.set('selectedCountryId', null);
Session.set('selectedComponentId', null);
Session.set('selectedValue', 's');
Session.set('dialogState', false);
Session.set('dialogPresets', null);
