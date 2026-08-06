<template>
  <button
    class="btn"
    :class="`btn--${type}`"
    :disabled="type === 'disabled'"
    @click="$emit('click', $event)"
  >
    <CheckIcon v-if="type === 'cart'" class="btn__icon" />
    <slot />
  </button>
</template>

<script>
import CheckIcon from "@/assets/icons/check.svg"

export default {
  name: "DefaultButton",
  components: { CheckIcon },
  props: {
    type: {
      type: String,
      default: "primary"
    }
  }
}
</script>

<style lang="scss" scoped>

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: $font-family;
  font-size: 14px;
  font-weight: 700;
  color: $color-btn-text;
  border: none;
  padding: 0 20px;
  height: 48px;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;

  &--primary {
    background: $color-btn-primary;

    &:hover {
      background: $color-btn-primary-hover;
    }
  }

  &--disabled {
    background: $color-btn-primary-disabled;
    cursor: not-allowed;
  }

  &--cart {
    background: $color-btn-cart;
    cursor: default;
  }

  &__icon {
    flex-shrink: 0;
  }
}
</style>
