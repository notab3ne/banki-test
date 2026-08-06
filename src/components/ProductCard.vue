<template>
  <div class="card">
    <div class="card__image-wrap" @click="$emit('open-modal', product)">
      <img class="card__image" :src="product.image" :alt="product.name" />
    </div>

    <div class="card__divider"></div>

    <div class="card__body">
      <h3 class="card__title" @click="$emit('open-modal', product)">
        {{ product.name }}
      </h3>

      <div class="card__footer">
        <div class="card__price">
          <span v-if="product.oldPrice" class="card__price-old">
            {{ formatPrice(product.oldPrice) }}
          </span>
          <span class="card__price-current">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <DefaultButton class="card__btn" :type="buttonType" @click="handleBuy">
          <DefaultSpinner v-if="isProcessing" />
          {{ buttonLabel }}
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "@/components/ui/DefaultButton"
import DefaultSpinner from "@/components/ui/DefaultSpinner"
import { formatPrice } from "@/utils/formatPrice"

const CART_KEY = "cart"

export default {
  name: "ProductCard",
  components: { DefaultButton, DefaultSpinner },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isInCart: false,
      isProcessing: false
    }
  },
  computed: {
    buttonType() {
      if (this.isInCart) return "cart"
      if (this.isProcessing) return "disabled"
      return "primary"
    },
    buttonLabel() {
      if (this.isInCart) return "В корзине"
      if (this.isProcessing) return "Обрабатывается"
      return "Купить"
    }
  },
  created() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]")
    this.isInCart = cart.includes(this.product.id)
  },
  methods: {
    formatPrice,
    handleBuy() {
      if (this.isProcessing) return

      if (this.isInCart) {
        this.isInCart = false
        this.saveCart(this.product.id, false)
        return
      }

      this.isProcessing = true
      setTimeout(() => {
        this.isProcessing = false
        this.isInCart = true
        this.saveCart(this.product.id, true)
      }, 2000)
    },
    saveCart(id, add) {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]")
      const updated = add ? [...new Set([...cart, id])] : cart.filter((i) => i !== id)
      localStorage.setItem(CART_KEY, JSON.stringify(updated))
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  background: $color-bg;
  width: 280px;
  display: flex;
  flex-direction: column;

  &__image-wrap {
    width: 100%;
    height: 168px;
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
    padding: 16px 24px 24px;
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
  }

  &__price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
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
  }
}
</style>
