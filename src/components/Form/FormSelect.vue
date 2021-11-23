<template>
  <div class="selected-area" ref="selectArea" v-click-outside="hide">
    <div
      :class="{ disabled: disabled, error: error }"
      class="label"
      @click="toggleShowOptions"
    >
      <i :class="iconClass"></i>
      <slot></slot>
      {{ textToDisplay || placeholderToShow }}
      <i
        class="toggle-icon bi"
        :class="showOptions ? 'bi-chevron-up' : 'bi-chevron-down'"
      ></i>
    </div>
    <ul v-if="showOptions">
      <li
        :key="i"
        v-for="(option, i) in options"
        v-show="!showChildren"
        @click.prevent="onSelect(option)"
      >
        {{ option.text }}
        <i v-if="option.children" class="bi bi-chevron-right open-children"></i>
      </li>

      <li
        ref="backList"
        id="backList"
        class="option-back"
        v-show="showChildren"
        @click.prevent="onClickBack"
      >
        <i class="bi bi-arrow-left"></i> Back
      </li>
      <li v-if="showChildren" class="option-parent">
        {{ selectedOption.selectedText || selectedOption.text }}:
      </li>
      <li
        v-for="(option, i) in children"
        :key="`Child${i}`"
        class="option-child"
        @click.prevent="onSelect(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "FormSelect",
  props: {
    value: {
      type: [Number, String, null],
    },
    options: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    iconClass: {
      type: String,
      required: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function () {
    return {
      showOptions: false,
      selected: [],
      isSelectedJustAParent: false,
    };
  },
  computed: {
    selectedOption() {
      if (!this.options || !this.options.length) return;

      return this.options.find((option) => {
        if (option.value === this.value) return option;

        if (!option.children) return false;

        return (
          option.children &&
          option.children.find((child) => child.value === this.value)
        );
      });
    },
    selectedOptionChild() {
      if (!this.selectedOption || !this.selectedOption.children) return null;

      return this.selectedOption.children.find(
        (child) => child.value === this.value
      );
    },
    selectedOptionChildName() {
      if (!this.selectedOptionChild) return null;

      return this.selectedOptionChild.selectedText
        ? this.selectedOptionChild.selectedText
        : this.selectedOptionChild.text;
    },
    textToDisplay() {
      if (this.selectedOptionChildName) return this.selectedOptionChildName;

      if (this.selectedOption)
        return this.selectedOption.selectedText
          ? this.selectedOption.selectedText
          : this.selectedOption.text;

      return "";
    },
    children() {
      return this.selectedOption &&
        this.selectedOption.children &&
        this.selectedOption.children.length
        ? this.selectedOption.children
        : [];
    },
    showChildren() {
      return this.selectedOption && this.selectedOption.children;
    },
    placeholderToShow() {
      if (
        (!this.selectedOption || !this.selectedOption.text) &&
        this.placeholder
      )
        return this.placeholder;

      return "";
    },
    showfirstLavel() {
      if (this.showChildren) return false;

      return true;
    },
  },
  methods: {
    onClickBack() {
      this.setFirtItem();
      this.showOptions = true;
    },
    setFirtItem() {
      const fisrtItem =
        this.options[0] && this.options[0].value ? this.options[0].value : 0;
      this.$emit("input", fisrtItem);
    },
    toggleShowOptions() {
      if (this.disabled) return;

      this.showOptions = !this.showOptions;
    },
    onSelect(option) {
      this.$emit("input", option.value);

      this.$emit("change", option);

      if (!option.children) {
        this.showOptions = false;
        this.isSelectedJustAParent = false;
      } else {
        this.isSelectedJustAParent = true;
      }
    },
    toggle() {
      this.showOptions = true;
    },

    hide() {
      this.showOptions = false;

      if (this.isSelectedJustAParent) {
        this.setFirtItem();
      }
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped lang="scss">
$color-sub-option: #7c7c7c;
$color-error: rgb(136, 26, 26);

.selected-area {
  position: relative;
  width: 100%;
  .label {
    padding: 0.5rem;
    text-align: left;
    width: 100%;
    border: 1px solid #e2e2e2;

    .toggle-icon {
      float: right;
    }

    &.disabled {
      opacity: 0.3;
      background-color: #d4ceeb;
    }

    &.error {
      border: 1px solid $color-error;
      background-color: rgb(247, 229, 229);
    }
  }
  ul {
    text-align: left;
    list-style: none;
    width: 100%;
    position: absolute;
    z-index: 100;
    padding-left: 0px;
    border-radius: 0 0 5px 5px;
    -webkit-box-shadow: 0px 3px 13px -4px #000000;
    box-shadow: 0px 3px 13px -4px #000000;

    li {
      position: relative;
      z-index: 100;
      padding: 0.5rem;
      background-color: #ffffff;
      cursor: pointer;
      border-radius: 0 0 5px 5px;

      &.selected {
        background-color: #e2e2e2;
      }

      &:hover {
        background-color: #f8f7fc;
      }

      .open-children {
        float: right;
      }

      &.option-child {
        padding-left: 30px;
      }

      &.option-parent {
        background-color: #ffffff;
        cursor: default;
        color: $color-sub-option;
      }

      &.option-back {
        color: $color-sub-option;
      }
    }
  }
}
</style>
