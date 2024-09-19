import Alpine from 'alpinejs';
import {
  addClassIfNotExists,
  removeAndAddClassConditionaly,
  removeClassIfExists,
} from '../utils/cssUtils';

/**
 * CitySearch component.
 * @param {boolean} required - Indicates if the city search is required.
 * @param {string} requestMethod - The HTTP request method to use.
 * @param {boolean} dsfr - Indicates if the DSFR library is used.
 * @returns {object} - CitySearch object.
 *
 * @property {boolean} isLoading - Indicates if the component is in a loading state.
 * @property {string|null} postal - The postal code.
 * @property {array|null} cities - The list of cities.
 * @property {boolean} required - Indicates if the city search is required.
 * @property {string|null} currentPostal - The current postal code.
 * @property {string|null} currentInsee - The current INSEE code.
 * @property {string} requestMethod - The HTTP request method to use.
 * @property {boolean} dsfr - Indicates if the DSFR library is used.
 */
function CitySearch(required = false, requestMethod = 'GET', dsfr = false) {
  return {
    // other default properties
    isLoading: false,
    postal: null,
    cities: null,
    required: required,
    currentPostal: null,
    currentInsee: null,
    requestMethod: requestMethod,
    dsfr: dsfr,

    init() {
      if (!this.$refs.postcode || !this.$refs.insee) {
        return;
      }
      ['focusout', 'input'].forEach((event) => {
        this.$refs.postcode.addEventListener(event, (e) => {
          const errors = required && e.target.value.length < 5;
          removeAndAddClassConditionaly(
            errors,
            e.target.parentElement,
            'fr-input-group--valid',
            'fr-input-group--error'
          );
        });
      });

      ['change'].forEach((event) => {
        this.$refs.insee.addEventListener(event, (e) => {
          const errors = required && e.target.value == '';
          removeAndAddClassConditionaly(
            errors,
            e.target.parentElement,
            'fr-select-group--valid',
            'fr-select-group--error'
          );
        });
      });
    },
    validateData(submittedForm = false) {
      if (
        this.$refs.postcode &&
        this.$refs.insee &&
        this.required &&
        (this.requestMethod === 'POST' || submittedForm)
      ) {
        addClassIfNotExists(
          this.$refs.postcode.parentElement,
          `fr-input-group--${this.$refs.postcode.value ? 'valid' : 'error'}`
        );

        addClassIfNotExists(
          this.$refs.insee.parentElement,
          `fr-select-group--${this.$refs.insee.value ? 'valid' : 'error'}`
        );
      }
    },
    getPostcode(postcode, insee) {
      const postCodeString = JSON.parse(postcode.textContent);
      const inseeString = JSON.parse(insee.textContent);
      this.currentPostal = postCodeString;
      this.currentInsee = inseeString;

      if (postCodeString) this.postal = postCodeString;
      if (inseeString) this.fetchCities(inseeString);
    },
    fetchCities(currentInsee = null) {
      if (this.postal == '') return;

      this.isLoading = true;
      fetch(`/api/communes/?postal=${this.postal}`)
        .then((res) => res.json())
        .then((data) => {
          this.isLoading = false;
          this.cities = data;
          if (dsfr && this.cities.length == 1) {
            removeAndAddClassConditionaly(
              true,
              this.$refs.insee.parentElement,
              'fr-select-group--error',
              'fr-select-group--valid'
            );
          } else {
            removeClassIfExists(
              this.$refs.insee.parentElement,
              'fr-select-group--valid'
            );
          }
        })
        .finally(() => {
          if (currentInsee) this.$refs.insee.value = currentInsee;
        });
    },
  };
}

Alpine.data('CitySearch', CitySearch);
