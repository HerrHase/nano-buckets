import validate from 'validate.js'
import serialize from 'form-serialize'

/**
 *  Form Validator with RiotJS Components
 *
 *
 *
 *
 */
class FormValidator
{
    /**
     *
     *  @param {[type]} formSelector [description]
     *  @param {[type]} constraits   [description]
     */
    constructor(formSelector, constraits, onSuccess)
    {
        // getting selector to find form-element
        this.formSelector = formSelector

        // constraits for validate.js
        this.constraits = constraits

        // get form and elements
        this.form = document.querySelector(this.formSelector)
        this.elements = this.form.querySelectorAll('field-error')

        // adding submit event
        this.form.addEventListener('submit', (event) => {
            this.onSubmit(event)
        })

        // adding event if a element is updated
        this.form.addEventListener('field-update', (event) => {
            this.onFieldUpdate(event)
        })

        this.onSuccess = onSuccess
    }

    /**
     *
     *  @param  {[type]} event [description]
     *  @return {[type]}       [description]
     */
    onSubmit(event)
    {
        event.preventDefault()

        let errors = validate(serialize(event.target, {
            hash: true
        }), this.constraits, {
            fullMessages: false
        })

        if (errors) {

            // send each element a event
            this.elements.forEach((element) => {
                let elementErrors = false

                // check for errors by name
                if (errors[element.attributes.name.nodeValue]) {
                    elementErrors = errors[element.attributes.name.nodeValue]
                }

                this.dispatchCustomEvent(elementErrors, element)
            })
        } else {
            this.onSuccess(event, serialize(event.target, {
                hash: true
            }))
        }
    }

    /**
     *
     *
     *  @param  {Event} event
     *
     */
    onFieldUpdate(event)
    {
        // workaround, make sure that value for single is undefined if it is empty
        if (event.detail.value == '') {
            event.detail.value = undefined
        }

        let errors = validate.single(event.detail.value, this.constraits[event.detail.name])

        // search for element by name and dispatch event
        this.elements.forEach((element) => {
            if (element.attributes.name.nodeValue == event.detail.name) {
                this.dispatchCustomEvent(errors, element)
            }
        })
    }

    /**
     *  dispatch event to single element
     *
     *  @param  {Array} errors
     *  @param  {Element} element
     *
     */
    dispatchCustomEvent(errors, element)
    {
        let detail = false

        if (errors) {
            detail = errors
        }

        const formValidationEvent = new CustomEvent('form-validation', {
            'detail': detail
        })

        element.dispatchEvent(formValidationEvent)
    }
}

export default FormValidator