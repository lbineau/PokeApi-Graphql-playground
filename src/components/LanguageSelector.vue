<script setup>
import _get from 'lodash/get'

const props = defineProps({
  modelValue: String,
  languages: Object
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="languages" v-if="languages?.length">
    <div class="select">
      <select :value="modelValue" @change="$event => $emit('update:modelValue', $event.target.value)">
          <option
            v-for="language in languages"
            :value="language.name"
            v-text="language.i18nName"
          >
          </option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.languages {
  /**
  * Styles for the wrapping element and
  * the custom down arrow / background
  */
  .select {
    background-color: #2a2a2a;
    position: relative;
  }

  .select:after,
  .select:before {
    bottom: 0;
    content: "";
    pointer-events: none;
    position: absolute;
    top: 0;
  }

  .select:before {
    right: 0;
    width: 1.85em;
  }

  .select:after {
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    height: .5em;
    margin: auto;
    right: .75em;
    transform-origin: center right;
    transform: rotate(45deg);
    width: .5em;
    z-index: 2;
  }

  .select:focus-within:before {
    background-color: #016e53;
  }

  /**
  * Target only select elements that are
  * child elements of the custom style.
  * These styles could really mess up other
  * selects that aren't within the parent wrapper.
  */
  .select select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    line-height: normal;
    max-width: 100%;
    padding: .75em 2em .75em .75em;
    width: 100%;
  }

  /*.select select:focus-visible*/
  .select select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #fff;
  }

  .select select:focus {
    border-color: #016e53;
    box-shadow: inset 0 0 0 1px #016e53, 0 0 0 2px #016e53;
    outline: none;
  }

  .select select:disabled {
    color: rgba(255,255,255,.75);
    cursor: not-allowed;
    opacity: .75;
  }

  .select select:invalid {
    background: darkred;
  }

  /* firefox will change the background of options to
    match the select's background. */
  .select select:invalid option {
    background: lightgrey;
  }

  /**
  * 1. remove background focus style from IE11 while keeping
  *    focus style available on option elements
  * 2. remove the default down arrow in IE/Edge
  */
  .select select::-ms-value {
    background: transparent; /* 1 */
  }

  .select select::-ms-expand {
    display: none; /* 2 */
  }


  /**
  * Child elements of the select
  */
  .select select:focus option:not(:disabled),
  .select select:focus optgroup:not(:disabled) {
    color: #111;
    text-shadow: none;
  }

  .select option:disabled,
  .select optgroup:disabled {
    color: rgba(50,50,50,.75);
  }
}
</style>
