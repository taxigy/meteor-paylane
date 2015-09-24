Paylane = function () {};

Paylane.calculateHash = function (options) {
    var text;

    if (!options) {
        throw new Meteor.Error(500, 'Must provide options to calculate hash for PayLane checkout form.');
    }

    if (!options.description) {
        throw new Meteor.Error(500, 'Description is mandatory for PayLane checkout.');
    }

    if (!options.amount) {
        throw new Meteor.Error(500, 'Amount is mandatory for PayLane checkout.');
    }

    if (!options.currency) {
        throw new Meteor.Error(500, 'Currency is mandatory for PayLane checkout');
    }

    if (!options.transaction_type && !options.status) {
        throw new Meteor.Error(500, 'Something is wrong with options. Are these pre-checkout form or post-checkout callback options?');
    }

    if (!Meteor.settings.paylane.salt) {
        throw new Meteor.Error(500, 'Cannot calculate hash for PayLane checkout without hash salt.');
    }

    text = [
        Meteor.settings.paylane.salt,
        options.status || '',
        String(options.amount) || Meteor.settings.paylane.amount,
        String(options.description).replace(/[^a-zA-Z0-9]/gi, ''),
        options.currency || Meteor.settings.paylane.currency,
        options.id_sale || options.id_authorization,
        options.transaction_type
    ].join('|').replace(/\|+/gi, '|').replace(/(^\|+|\|+$)/gi, '');

    return CryptoJS.SHA1(text).toString();
};

Meteor.methods({
    calculateHash: function (options) {
        return Paylane.calculateHash(options);
    }
});

