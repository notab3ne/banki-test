<template>
  <section class="catalog">
    <div class="container">
      <h1 class="catalog__title">Картины эпохи Возрождения</h1>
      <div class="catalog__grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @open-modal="$emit('open-modal', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products
    }
  }
}
</script>

<style lang="scss" scoped>

.catalog {
  padding: 40px 0 64px;

  .container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
  }

  &__title {
    font-family: $font-family;
    font-size: 24px;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 32px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
}

@media (max-width: $bp-desktop) {
  .catalog__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $bp-tablet) {
  .catalog__grid {
    grid-template-columns: 1fr;
  }
}
</style>
