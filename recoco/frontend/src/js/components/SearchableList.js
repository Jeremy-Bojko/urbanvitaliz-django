import Alpine from 'alpinejs';
import List from 'list.js';

Alpine.data('SearchableList', SearchableList);

function SearchableList(listId, listCount, searchParams) {
  return {
    selectedList: [],
    onFocus: false,
    init() {
      if (!listCount > 0) return;

      const options = {
        valueNames: ['name'],
      };

      new List(listId, options);
      //Get already selected items
      Array.from(this.$refs.defaultField.children[listId].options).forEach(
        (option) => {
          if (option.selected && option.value != '') {
            const selectedItem = {
              name: option.innerHTML,
              value: option.value,
              element: option,
            };
            this.selectedList.push(selectedItem);
          }
        }
      );

      Array.from(this.$refs.selectList.children).forEach((li) => {
        this.selectedList.forEach((item) => {
          if (li.getAttribute('id') == item.value) {
            li.children[0].classList.add('item-selected');
          }
        });
      });
    },
    handleFocusList() {
      return (this.onFocus = true);
    },
    handleBlurList() {
      setTimeout(() => {
        return (this.onFocus = false);
      }, 100);
    },
    handleAddItem(event, value, name) {
      if (value == '' || this.selectedList.find((item) => item.value == value))
        return;

      event.target.classList.add('item-selected');

      const selectedItem = {
        name: name,
        value: value,
        element: event.target.parentNode,
      };
      this.selectedList.push(selectedItem);

      Array.from(this.$refs.defaultField.children[listId].options).forEach(
        (option) => {
          if (option.value == value) {
            option.selected = true;
          }
        }
      );
    },
    handleRemoveItem(event, el) {
      const removedItem = this.selectedList.find(
        (item) => item.value == el.value
      );
      removedItem.element.classList.remove('d-none');

      event.target.parentNode.classList.remove('d-none');
      const itemFound = this.selectedList.indexOf(el);

      this.selectedList.splice(itemFound, 1);

      Array.from(this.$refs.selectList.children).forEach((li) => {
        if (li.getAttribute('id') == removedItem.value) {
          li.children[0].classList.remove('item-selected');
        }
      });

      Array.from(this.$refs.defaultField.children[listId].options).forEach(
        (option) => {
          if (option.value == el.value) {
            option.selected = false;
          }
        }
      );
    },
  };
}
