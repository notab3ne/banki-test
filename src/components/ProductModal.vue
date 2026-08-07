<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal__content">
      <button class="modal__close" @click="$emit('close')">
        <CloseIcon />
      </button>

      <div class="modal__slider">
        <div ref="swiperEl" class="swiper">
          <div class="swiper-wrapper">
            <div v-for="(img, i) in product.images" :key="i" class="swiper-slide">
              <img class="modal__image" :src="img" :alt="product.name" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>

      <div class="modal__body">
        <h2 class="modal__title">{{ product.name }}</h2>

        <p class="modal__description">{{ product.description }}</p>

        <div class="modal__footer">
          <div class="modal__price">
            <span v-if="product.oldPrice" class="modal__price-old">
              {{ formatPrice(product.oldPrice) }}
            </span>
            <span class="modal__price-current">{{ formatPrice(product.price) }}</span>
          </div>

          <DefaultButton :type="buttonType" @click="handleBuy">
            <DefaultSpinner v-if="isProcessing" />
            <CheckIcon v-if="isInCart && !isHovered" class="modal__check-icon" />
            {{ buttonLabel }}
          </DefaultButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from "swiper"
import "swiper/swiper.min.css"
import "swiper/modules/navigation/navigation.min.css"
import "swiper/modules/pagination/pagination.min.css"
import DefaultButton from "@/components/ui/DefaultButton"
import DefaultSpinner from "@/components/ui/DefaultSpinner"
import CheckIcon from "@/assets/icons/check.svg"
import CloseIcon from "@/assets/icons/close.svg"
import { cartMixin } from "@/mixins/cartMixin"
import { formatPrice } from "@/utils/formatPrice"

export default {
  name: "ProductModal",
  components: { DefaultButton, DefaultSpinner, CheckIcon, CloseIcon },
  mixins: [cartMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.swiper = new Swiper(this.$refs.swiperEl, {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    })
    document.addEventListener("keydown", this.onKeyDown)
  },
  beforeDestroy() {
    this.swiper && this.swiper.destroy()
    document.removeEventListener("keydown", this.onKeyDown)
  },
  methods: {
    formatPrice,
    onKeyDown(e) {
      if (e.key === "Escape") this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 24px;

  &__content {
    background: $color-bg;
    display: flex;
    flex-wrap: wrap;
    max-width: 980px;
    width: 100%;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: $color-bg;
    border: none;
    cursor: pointer;
    color: $color-text-light;
    padding: 0;
    z-index: 10;
    transition: color 0.2s;
    border-radius: 50%;

    &:hover {
      color: $color-text;
    }
  }

  &__slider {
    flex: 0 0 55%;
    min-width: 300px;
    max-width: 100%;
    align-self: stretch;
    overflow: hidden;
    position: relative;
    aspect-ratio: 4 / 3;
  }

  &__image {
    height: 100%;
    width: auto;
    display: block;
  }

  &__body {
    flex: 1;
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
  }

  &__title {
    font-family: $font-family;
    font-size: 24px;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 16px;
    line-height: 1.4;
    padding-right: 24px;
  }

  &__description {
    font-family: $font-family;
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    line-height: 1.7;
    margin: 0 0 auto;
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-top: 32px;
  }

  &__price {
    display: flex;
    flex-direction: column;
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
    font-size: 18px;
    font-weight: 700;
    color: $color-text;
  }

  &__check-icon {
    width: 14px;
    height: 11px;
    display: inline-block;
    flex-shrink: 0;
  }
}

.swiper {
  height: 100%;
}

.swiper-slide {
  width: 100%;
  height: 100%;
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  color: $color-bg;
  width: 32px;
  height: 32px;

  &::after {
    font-size: 14px;
    font-weight: 700;
  }
}

::v-deep .swiper-pagination-bullet-active {
  background: $color-bg;
}

@media (max-width: $bp-tablet) {
  .modal {
    padding: 16px;

    &__slider {
      flex: 0 0 100%;
    }

    &__body {
      flex: 0 0 100%;
      padding: 20px 16px 24px;
    }

    &__close {
      top: 8px;
      right: 8px;
    }
  }
}

@media (max-width: $bp-mobile) {
  .modal {
    &__title {
      font-size: 18px;
    }
  }
}
</style>
