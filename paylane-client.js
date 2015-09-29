Template.paylaneCheckout.helpers({
    amount: function () {
        return this.amount || ReactiveMethod.call('getAmount');
    },
    currency: function () {
        return this.currency || ReactiveMethod.call('getCurrency');
    },
    merchant: function () {
        return ReactiveMethod.call('getMerchant');
    },
    description: function () {
        var description = this.description;

        if (!description) {
            throw new Meteor.Error(400, 'Must provide description in the checkout form.');
        }

        return String(description).replace(/[^a-zA-Z0-9]/gi, '');
    },
    transactionDescription: function () {
        var transactionDescription = this.transactionDescription;

        if (!transactionDescription) {
            throw new Meteor.Error(400, 'Must provide transaction description');
        }

        return transactionDescription;
    },
    transactionType: function () {
        return this.transactionType || 'S';
    },
    backUrl: function () {
        return this.backUrl || ReactiveMethod.call('getBackUrl');
    },
    language: function () {
        return this.language || ReactiveMethod.call('getLanguage');
    },
    hash: function () {
        return ReactiveMethod.call('calculateHash', this);
    },
    label: function (fieldName) {
        return ReactiveMethod.call('getFormFieldLabel', fieldName);
    },
    customerName: function () {
        return this.customerName || '';
    },
    customerPhone: function () {
        return this.customerPhone || '';
    },
    customerEmail: function () {
        return this.customerEmail || '';
    },
    customFields: function () {
        return this.customFields || [];
    },
    submit: function () {
        return ReactiveMethod.call('getFormSubmit');
    },
    showField: function (fieldName) {
        var fields = this.fields || '';

        if (!fieldName) {
            throw new Meteor.Error(400, 'When showing or hiding a field, must provide its name.');
        }

        if (fields.indexOf(fieldName) > -1) {
            return true;
        }

        return false;
    }
});
