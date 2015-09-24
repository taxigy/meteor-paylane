/* global Meteor, Template */

Template.paylaneCheckout.helpers({
    amount: function () {
    },
    currency: function () {
    },
    merchantId: function () {
    },
    description: function (text) {
        var description = String(text);

        return description.replace(/[^a-zA-Z0-9]/gi, '');
    },
    transactionDescription: function () {
    },
    transactionType: function (type) {
        if (!type) {
            return 'S';
        } else {
            return type;
        }
    },
    backUrl: function (text) {
        var url = text || Meteor.settings.public.appRootUrl || '';

        return url;
    },
    language: function () {
    },
    hash: function () {
        var options = {};

        options.description = this.description;
        options.amount = this.amount;
        options.currency = this.currency;
        options.transaction_type = this.transactionType;
        
        return ReactiveMethod.call('calculateHash', options);
    },
    buttonText: function () {
        return 'Submit';
    }
});

