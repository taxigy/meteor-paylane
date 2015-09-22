Package.describe({
    name: 'taxigy:paylane',
    version: '0.0.1',
    summary: 'Implementation of PayLane REST API as a Meteor package.',
    git: 'https://github.com/taxigy/meteor-paylane',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.addFiles('paylane.js');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('taxigy:paylane');
    api.addFiles('paylane-tests.js');
});

