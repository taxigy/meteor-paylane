Package.describe({
    name: 'rishatmuhametshin:paylane',
    version: '0.0.2',
    summary: 'Implementation of PayLane REST API as a Meteor package.',
    git: 'https://github.com/taxigy/meteor-paylane',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.use('http');
    api.use('jparker:crypto-sha1@0.1.0', 'server');
    api.use([
        'templating',
        'spacebars',
        'simple:reactive-method@1.0.2'
    ], 'client');
    api.addFiles('paylane-server.js', 'server');
    api.addFiles([
        'paylane-form.html',
        'paylane-client.js'
    ], 'client');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('http');
    api.use([
        'jparker:crypto-sha1',
        'simple:reactive-method'
    ]);
    api.use('rishatmuhametshin:paylane');
    api.addFiles('paylane-tests.js');
});

