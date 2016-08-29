import './model-body.html';

Template.Model_body.onCreated(function lcmodelBodyOnCreated() {
  //Better place to subscribe? Better structure?
  this.subscribe('regions');
  this.subscribe('lcmodels');
  this.subscribe('riskmodels.public');
  this.subscribe('riskmodels.private');
});

Template.Model_body.onRendered(function lcmodelBodyOnRendered() {
  $('.button-collapse').sideNav({
	closeOnClick: true,
  });
});
