<template>
  <div class="card" :class="{ 'card--sold': product.sold }">
    <div class="card__image-wrap" @click="$emit('open-modal', product)">
      <img class="card__image" :src="product.images[0]" :alt="product.name" />
    </div>

    <div class="card__divider"></div>

    <div class="card__body">
      <h3 class="card__title" @click="$emit('open-modal', product)">
        {{ product.name }}
      </h3>

      <div class="card__footer">
        <div class="card__price">
          <template v-if="product.sold">
            <span class="card__price-current">Продана на аукционе</span>
          </template>
          <template v-else>
            <span v-if="product.oldPrice" class="card__price-old">
              {{ formatPrice(product.oldPrice) }}
            </span>
            <span class="card__price-current">{{ formatPrice(product.price) }}</span>
          </template>
        </div>

        <DefaultButton
          v-if="!product.sold"
          class="card__btn"
          :type="buttonType"
          @click="handleBuy"
          @mouseenter.native="isHovered = true"
          @mouseleave.native="isHovered = false"
        >
          <DefaultSpinner v-if="isProcessing" />
          <CheckIcon v-if="isInCart && !isHovered" class="card__check-icon" />

          {{ buttonLabel }}
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/ui/DefaultButton"
import DefaultSpinner from "@/components/ui/DefaultSpinner"
import CheckIcon from "@/assets/icons/check.svg"
import { cartMixin } from "@/mixins/cartMixin"
import { formatPrice } from "@/utils/formatPrice"

export default {
  name: "ProductCard",
  components: { DefaultButton, DefaultSpinner, CheckIcon },
  mixins: [cartMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: $color-bg;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-card-border;

  &--sold {
    opacity: 0.5;
    pointer-events: none;
  }

  &__image-wrap {
    width: 100%;
    aspect-ratio: 5 / 3;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;

    .card__image-wrap:hover & {
      transform: scale(1.04);
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: $color-border;
    flex-shrink: 0;
  }

  &__body {
    padding: 11px 24px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__title {
    font-family: $font-family;
    font-size: 18px;
    font-weight: 400;
    color: $color-text;
    line-height: 1.5;
    margin: 0 0 auto;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;
    height: 48px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    height: 100%;
  }

  &__price-old {
    font-family: $font-family;
    font-size: 14px;
    font-weight: 300;
    color: $color-text-light;
    text-decoration: line-through;
  }

  &__price-current {
    font-family: $font-family;
    font-size: 16px;
    font-weight: 700;
    color: $color-text;
  }

  &__btn {
    flex-shrink: 0;
    width: 118px;
  }

  &__check-icon {
    width: 14px;
    height: 11px;
    display: inline-block;
    flex-shrink: 0;
  }
}
</style>
