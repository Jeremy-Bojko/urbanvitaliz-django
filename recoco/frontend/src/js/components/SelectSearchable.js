import Alpine from 'alpinejs';
import Select from '../utils/select-a11y';

/**
 * Initializes the SelectSearchable Alpine.js component.
 * This component enhances the accessibility of select elements.
 * It transforms the select element into a searchable select element :
 * put x-ref="selectSearchable" on the parent's select element.
 *
 * @returns {Object} The SelectSearchable component with an init method.
 */
Alpine.data('SelectSearchable', SelectSearchable);

function SelectSearchable(params) {
  return {
    selectElIsChild: params.selectElIsChild,
    init() {
      const select = this.selectElIsChild
        ? this.$refs.selectSearchable.children
        : this.$refs.selectSearchable;
      const params = new URLSearchParams(document.location.search);

      const selected_project = parseInt(params.get('project_id'));
      Array.prototype.map.call(select, function (select) {
        return new Select(select, {}, selected_project || null);
      });
    },
  };
}
