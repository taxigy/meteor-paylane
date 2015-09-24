# meteor-paylane

This package provides a template that contstructs a [PayLane](http://paylane.com) checkout form:

```html
<div>
    {{> paylaneCheckout options...}}
</div>
```

## Settings

This package requires certain settings to be provided in `paylane` property:

* `merchant` — the merchant ID, given by PayLane.
* `salt` — the hash salt, given by PayLane.
* `amount` — default amount of purchase.
* `currency` — default currency of purchase.
* `language` — default language of PayLane checkout form.
* `backUrl` — callback URL PayLane will redirect to after successful checkout.
* `form` — form settings:
** `name` — text input field label and placeholder for full name of the customer.
** `phone` — text input field label and placeholder for phone number of the customer.
** `email` — text input field label and placeholder for email of the customer.

Example `settings.json`:

```json
{
    "paylane": {
        "merchant": "supermerch",
        "salt": "abcdefgh",
        "amount": 9.90,
        "currency": "EUR",
        "language": "en",
        "form": {
            "name": "First and last name",
            "phone": "Phone number",
            "email": "Email",
            "submit": "Go to checkout"
        }
    }
}
```

## Options

Options are defined in [PayLane form implementation guide](http://devzone.paylane.com/secure-form-guide/implementation/) and include:

* `amount` — the amount of purchase, for example `12.34`.
* `currency` — the currency of purchase, for example `USD`.
* `merchant_id` — the ID of the merchant given by PayLane when the account has been registered.
* `description` — an alphanumeric string that distinctly defines the item having been purchased.
* `transaction_description` — custom description of the transaction.
* `transaction_type` — either `S` (sale) or `A` (authorization).
* `back_url` — the URL where PayLane will redirect the customer after successful purchase, sending response parameters in query string.
* `language` — the language of PayLane checkout page.
* `hash` — a hash that has been previously calculated on server to secure against fraud.

## Templates

### Checkout form — `paylaneCheckout`

## Methods

## Todo

* [ ] Make the template less ugly in fields enumeration. One `each` instead of multiple `if`s.
* [ ] Ask for name, email and phone number before redirecting to PayLane.
* [ ] Return values from all helpers.
* [ ] Move description generation to server, add template to settings and mix it with data when invoked.