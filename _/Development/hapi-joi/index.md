# 2019-12-05 What's @hapi/joi and what can it be used for?

# Joi

:!: First of all a note on versions; the *real* joi has moved to @hapi/joi and there's a ton of examples on the net which are incompatible with @hapi/joi. Make sure you're working with the right package.

## Minimal example

```javascript
const Joi = require('@hapi/joi');

const schema = Joi.object({
	birth_year: Joi.number().integer().min(1900).max(2013)
});

console.log(schema.validate({ birth_year: 2015 }));
```

### More complicated schema example

```javascript
const schema = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),

	password: Joi.string()
		.pattern(/^[a-zA-Z0-9]{3,30}$/),

	repeat_password: Joi.ref('password'),

	access_token: [
		Joi.string(),
		Joi.number()
	],

	birth_year: Joi.number()
		.integer()
		.min(1900)
		.max(2013),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

console.log(schema.validate({ birth_year: 2015 }));
```

## Rejecting unknown parameters

```javascript
    return Joi.object().keys({
        username: this.username,
        password: this.custompwchecker.default()
        })
        .unknown(false);  // Add this
```

## Crosschecking parameters

```javascript
const schema = Joi.object().keys({
	a: Joi.any()
		.valid('x')
		.when('b', {
			is: 5,
			then: Joi.valid('y'),
			otherwise: Joi.valid('z')
		}),
	b: Joi.any()
})```


## Extensions

Simple example (email validation is built in, this is for example.)

```javascript
const Joi = require("@hapi/joi");
const rfc822_validate = require('rfc822-validate');

class JoiHelper {

    username;
    password;
    email;

    constructor() {

        this.username = Joi.string().min(2).max(10);
        this.password = Joi.string().min(2).max(10);

        this.email = Joi.extend((joi) => {
            return {
                type: 'rfc1822',
                base: joi.string(),
                messages: {
                    'notvalid': 'Sorry, that is not a valid email adress. {{#label}}={{#value}}'
                },
                validate(value, helpers) { // Always runs
                    if (!rfc822_validate(value))
                        return {value, errors: helpers.error('notvalid')};
                }
            };
        });
    }

    usernameAndPasswordSchema() {
        return Joi.object().keys({
            email: this.email.rfc1822(),
            password: this.password
        });
    }

}

module.exports = {
    JoiHelper: JoiHelper
}

// ---------------------------------------------

var joihelper = new JoiHelper();

let validateresult = joihelper.usernameAndPasswordSchema().validate({
    email: "user1@usera.com",
    password: "mypw"
});

console.log(validateresult);
```

## Extensions example 2

Another extensions example

```javascript
const Joi = require('@hapi/joi');

const custom = Joi.extend((joi) => {

    return {
        type: 'numbercheck',
        base: joi.number(),
        messages: {
            'numbercheck.base': '"{{#label}}" must be at least 5',
            'numbercheck.toobig': '"{{#label}}" must be maximum 10',
        },
        validate(value, helpers) {  // Always runs
            if (value < 5) {
                return { value, errors: helpers.error('numbercheck.base') };
            }
        },
        rules: {
            isNotTooBig: {          // Adds .isNotToobig() call
                validate(value, helpers, args, options) {

                    if (value > 10)
                        return helpers.error('numbercheck.toobig');

                      return value;
                }
            }
        }
    };
});

const schema = Joi.object({
    thenumber: custom.numbercheck(),
    thenumber2: custom.numbercheck().isNotTooBig()
});
  

console.log(schema.validate({thenumber: 5, thenumber2: 10 }));
```

## Enjoy

:)
