Router.configure({
  layoutTemplate: 'backend'
});
Router.configure({
  layoutTemplate: 'frontend'
});
Router.route('/', function() {
  this.redirect('/model');
});
Router.route('/model', {
  layoutTemplate: 'backend',
  template: 'model'
});
Router.route('/countries', {
  layoutTemplate: 'backend',
  template: 'countries'
});
Router.route('/map', {
  layoutTemplate: 'frontend',
  template: 'map'
});
Router.route('/graph', {
  layoutTemplate: 'frontend',
  template: 'graph'
});
