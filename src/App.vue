<template>
  <div id="app">
    <AppHeader />
    <main class="main">
      <ProductList @open-modal="selectedProduct = $event" />
    </main>
    <AppFooter />

    <transition name="product-modal">
      <ProductModal
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
      />
    </transition>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
import ProductList from "@/components/ProductList"
import ProductModal from "@/components/ProductModal"

export default {
  name: "App",
  components: { AppHeader, AppFooter, ProductList, ProductModal },
  data() {
    return {
      selectedProduct: null
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: $font-family;
  background: $color-bg;
  color: $color-text;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

/* ProductModal transition */
.product-modal-enter-active,
.product-modal-leave-active {
  transition: opacity 0.25s ease;

  .modal__content {
    transition: transform 0.25s ease;
  }
}

.product-modal-enter,
.product-modal-leave-to {
  opacity: 0;

  .modal__content {
    transform: translateY(32px);
  }
}
</style>
