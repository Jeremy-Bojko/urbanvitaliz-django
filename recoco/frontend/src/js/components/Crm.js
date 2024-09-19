import Alpine from 'alpinejs';

/**
 * Crm component, manage sidebar in crm.
 * @returns {Object} The Crm component object.
 */
function Crm() {
  return {
    init() {
      // Sidebar behaviour
      const sidebar = this.$refs.sidebar;
      const sidebarHeight = sidebar.offsetHeight;
      const windowHeight = window.innerHeight;

      if (sidebarHeight > windowHeight) {
        sidebar.classList.remove('crm-sticky');
        sidebar.classList.add('crm-relative');
      }
    },
    goBack() {
      console.debug('go back');
      window.history.back();
    },
  };
}
Alpine.data('Crm', Crm);

/**
 * Note component, manage toggle button for crm note.
 * @returns {Object} The Note component object.
 */
function Note() {
  return {
    isOpen: false,
    init() {
      const note = this.$refs.note;
      const noteToggleButton = this.$refs.noteToggleButton;

      if (note && note.offsetHeight < 200) {
        note.classList.add('is-small');

        if (noteToggleButton) noteToggleButton.classList.add('hidden');
      }
    },
  };
}
Alpine.data('Note', Note);
