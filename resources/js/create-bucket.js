import * as riot from 'riot'

import FieldError from './components/field-error.riot'
import FormValidator from './../../node_modules/@tentakelfabrik/tiny-validator/src/FormValidator'

riot.register('field-error', FieldError)
riot.mount('field-error')

const formValidation = new FormValidator('form', {
    'title': {
        'presence': true,
        'length': {
            'maximum': 255
        }
    },
    'description': {
        'length': {
            'maximum': 255
        }
    },
    'type': {
        'presence': true
    },
    'visiblity': {
        'presence': true
    }
})