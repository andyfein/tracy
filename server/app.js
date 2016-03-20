// publish collections to client
Meteor.startup(function () {
  //Startup code
})
Meteor.publish("components", function() {
	return Comps.find();
});

Meteor.publish("links", function() {
	return Links.find();
});
Meteor.publish("countries", function() {
	return Countries.find();
});
Meteor.publish("world", function() {
	return World.find();
});
