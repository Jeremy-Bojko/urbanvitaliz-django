import Alpine from 'alpinejs';
import { createPopper } from '@popperjs/core';

/**
 * FileUpload component.
 * @param {string} type - The type of file upload.
 * @returns {object} - The Alpine data object.
 *
 * @property {function} getString - A function to retrieve localized strings.
 * @property {string} type - The type of file upload.
 * @property {object} popper - The Popper instance for the popover.
 * @property {boolean} isOpening - Flag indicating if the popover is opening.
 * @property {function} init - Initializes the FileUpload component.
 * @property {function} show - Shows the popover.
 * @property {function} hide - Hides the popover.
 * @property {function} onButtonClick - Event handler for button click.
 * @property {function} onOutsideClick - Event handler for outside click.
 * @property {null} pendingFile - The pending file to be uploaded.
 * @property {null} pendingTitle - The pending title for the file.
 * @property {function} reset - Resets the pending file and title.
 */
Alpine.data('FileUpload', (type) => ({
  getString,
  type,
  // Popover
  popper: null,
  isOpening: false,

  init() {
    const popper = createPopper(this.$refs.button, this.$refs.popover, {
      placement: 'bottom',
      modifiers: [
        { name: 'arrow', options: { element: this.$refs.arrow } },
        { name: 'offset', options: { offset: [0, 12] } },
      ],
    });

    this.$refs.popover.style.display = 'none';
    this.popper = popper;
  },

  async show() {
    this.$refs.popover.style.display = 'block';
    await this.popper.update();
  },

  hide() {
    this.reset();
    this.$refs.popover.style.display = 'none';
  },

  async onButtonClick() {
    await this.show();
    this.isOpening = true;
  },

  onOutsideClick() {
    if (this.isOpening) {
      this.isOpening = false;
    } else {
      this.hide();
    }
  },

  // API
  pendingFile: null,
  pendingTitle: null,

  reset() {
    (this.pendingFile = null), (this.pendingTitle = null);
  },
}));

const STRINGS = {
  types: {
    project: 'projet',
    message: 'message',
  },
};

function getString(path) {
  let temp = STRINGS;

  path.split('.').forEach((element) => {
    if (temp[element]) {
      temp = temp[element];
    } else {
      return '';
    }
  });

  return temp;
}
