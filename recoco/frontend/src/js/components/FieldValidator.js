import Alpine from 'alpinejs';
import {
  addClassIfNotExists,
  removeAndAddClassConditionaly,
} from '../utils/cssUtils';

/**
 * FieldValidator is a function that creates a field validator object.
 * @param {boolean} required - Indicates if the field is required.
 * @param {string} value - The value of the field.
 * @param {string} [fieldType='input'] - The type of the field.
 * @param {Array<string>} eventListened - The events to listen to.
 * @param {boolean} [submittedForm=false] - Indicates if the form has been submitted.
 * @returns {object} - The field validator object.
 */
function FieldValidator(
  required,
  value,
  fieldType = 'input',
  eventListened,
  submittedForm = false
) {
  return {
    isRequired: required,
    fieldType: fieldType,
    value: value == 'None' ? '' : value,
    init() {
      this.validateData(submittedForm);
      eventListened.forEach((event) => {
        this.$el.addEventListener(event, (e) => {
          const errors =
            required && (e.target.value === undefined || e.target.value === '');
          removeAndAddClassConditionaly(
            errors,
            e.target.parentElement,
            `fr-${fieldType}-group--valid`,
            `fr-${fieldType}-group--error`
          );
        });
      });
    },
    validateData(submittedForm = false) {
      if (this.isRequired && (this.requestMethod === 'POST' || submittedForm)) {
        if (this.value) {
          addClassIfNotExists(
            this.$el.parentElement,
            `fr-${fieldType}-group--valid`
          );
        } else {
          addClassIfNotExists(
            this.$el.parentElement,
            `fr-${fieldType}-group--error`
          );
        }
      }
    },
  };
}

Alpine.data('FieldValidator', FieldValidator);
