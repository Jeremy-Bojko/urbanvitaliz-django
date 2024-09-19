import Alpine from 'alpinejs';
import appStore from '../store/app';

/**
 * Represents a components for sharing access to survey of a project.
 * @param {string} url - The project sharing URL .
 */
function AccessUpdate(url) {
  return {
    url: url,
    isCopied: false,
    selectText: function () {
      this.$refs.input.select();
      appStore.notification.message = "L'adresse de la page a bien été copiée";
      appStore.notification.isOpen = true;
    },
    clipboardCopy: function () {
      navigator.clipboard.writeText(url).then(
        function () {
          this.isCopied = true;
          this.$refs.button.blur();
          this.selectText();
        }.bind(this)
      );
    },
  };
}

Alpine.data('AccessUpdate', AccessUpdate);
