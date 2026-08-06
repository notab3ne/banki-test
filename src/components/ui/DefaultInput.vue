<template>
  <div class="input">
    <input
      class="input__field"
      :value="value"
      :placeholder="placeholder"
      type="text"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "DefaultInput",
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
  border: 1px solid $color-border;
  height: 48px;
  background: $color-bg;

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
}
</style>
