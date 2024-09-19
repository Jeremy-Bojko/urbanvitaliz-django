import Alpine from 'alpinejs';
import axios from 'axios';

/**
 * Cookie banner component.
 * @returns {Object} The Consent component object.
 */
function Consent() {
  return {
    userHasSelectedCookies: false,
    init() {
      this.userHasSelectedCookies = document.cookie.includes('cookie_consent');
    },
    async handleAcceptAllCookies(url) {
      try {
        await axios.post(url);
        location.reload();
      } catch (err) {
        console.error('Something went wrong : ', err);
      }
    },
    async handleRejectAllCookies(url) {
      try {
        await axios.post(url);
        location.reload();
      } catch (err) {
        console.error('Something went wrong : ', err);
      }
    },
  };
}
Alpine.data('Consent', Consent);
