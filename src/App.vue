<template>
  <div id="app">
    <AppHeader />
    <main class="main">
      <ProductList @open-modal="selectedProduct = $event" />
    </main>
    <AppFooter />

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
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
</style>
