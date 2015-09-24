Paylane = function () {};

Paylane.calculateHash = function (options) {
    var text;

    if (!options) {
        throw new Meteor.Error(500, 'Must provide options to calculate hash for PayLane checkout form.');
    }

    if (!options.description) {
        throw new Meteor.Error(500, 'Description is mandatory for PayLane checkout.');
    }

    if (!Meteor.settings.paylane.salt) {
        throw new Meteor.Error(500, 'Cannot calculate hash for PayLane checkout without hash salt.');
    }

    text = [
        Meteor.settings.paylane.salt,
        String(options.description).replace(/[^a-zA-Z0-9]/gi, ''),
        Number(options.amount || Meteor.settings.paylane.amount),
        options.currency || Meteor.settings.paylane.currency,
        options.transactionType || 'S'
    ].join('|').replace(/\|+/gi, '|').replace(/(^\|+|\|+$)/gi, '');

    return CryptoJS.SHA1(text).toString();
};

Meteor.methods({
    getAmount: function () {
        return Meteor.settings.paylane.amount;
    },
    getCurrency: function () {
        return Meteor.settings.paylane.currency;
    },
    getMerchant: function () {
        return Meteor.settings.paylane.merchant;
    },
    getBackUrl: function () {
        return Meteor.settings.paylane.backUrl;
    },
    getLanguage: function () {
        return Meteor.settings.paylane.language;
    },
    getFormFieldLabel: function (fieldName) {
        if (!fieldName) {
            throw new Meteor.Error(400, 'Must provide field name when requesting for the corresponding label');
        }

        return Meteor.settings.paylane.form[fieldName];
    },
    getFormSubmit: function () {
        return Meteor.settings.paylane.form.submit;
    },
    calculateHash: function (options) {
        return Paylane.calculateHash(options);
    },
    validateHash: function (hash) {
    }
});

