<template>
  <div class="input">
    <input
      class="input__field"
      :value="value"
      :placeholder="placeholder"
      type="text"
      @input="$emit('input', $event.target.value)"
    />
    <button v-if="value" class="input__clear" type="button" @click="onClear">
      <CloseIcon />
    </button>
  </div>
</template>

<script>
import CloseIcon from "@/assets/icons/close.svg"

export default {
  name: "DefaultInput",
  components: { CloseIcon },
  methods: {
    onClear() {
      this.$emit("input", "")
      this.$emit("clear")
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;
  height: 48px;
  background: $color-bg;
  width: 100%;

  &__field {
    flex: 1;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    border: none;
    outline: none;
    padding: 0 16px;
    height: 100%;
    background: transparent;
    width: 100%;

    &::placeholder {
      color: #9f9f9f;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text-light;
    padding: 0;
    transition: color 0.2s;

    &:hover {
      color: $color-text;
    }
  }
}
</style>
