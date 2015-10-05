Paylane = function () {};

Paylane.calculateSubmitHash = function (options) {
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
    ].join('|');

    return CryptoJS.SHA1(text).toString();
};

Paylane.calculateCallbackHash = function (options) {
    var salt = Meteor.settings.paylane.salt;
    var hash;
    var text;
    var id;
    var status;
    var description;
    var amount;
    var currency;

    if (!options || !options.hash) {
        throw new Meteor.Error(400, 'Must provide options object that contains hash.');
    }

    hash = options.hash;
    id = options.id_sale || options.id_authorization || '';

    if (!id) {
        throw new Meteor.Error(400, 'Expected either id_sale or id_authorization but both are nil.');
    }

    status = options.status;

    if (!status) {
        throw new Meteor.Error(400, 'Expected status but it is nil.');
    }

    description = options.description;

    if (!description) {
        throw new Meteor.Error(400, 'Expected description but it is nil.');
    }

    amount = options.amount;

    if (!amount) {
        throw new Meteor.Error(400, 'Expected amount but it is nil.');
    }

    currency = options.currency;

    if (!currency) {
        throw new Meteor.Error(400, 'Expected currency but it is nil.');
    }

    text = [
        salt,
        status,
        description,
        amount,
        currency,
        id
    ].join('|');

    return CryptoJS.SHA1(text).toString() === hash;
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
        return Paylane.calculateSubmitHash(options);
    },
    validateHash: function (options) {
        return Paylane.calculateCallbackHash(options);
    }
});

