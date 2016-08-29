import './public-body.html';

Template.Public_body.onCreated(function publicBodyOnCreated() {
  //Better place to subscribe? Better structure?
  this.subscribe('regions');
  this.subscribe('lcmodels');
  this.subscribe('riskmodels.public');
  this.subscribe('riskmodels.private');
});

