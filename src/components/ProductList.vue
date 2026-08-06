<template>
  <section class="catalog" id="catalog">
    <div class="container">
      <h1 class="catalog__title">Картины эпохи Возрождения</h1>
      <TransitionGroup name="cards" tag="div" class="catalog__grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @open-modal="$emit('open-modal', $event)"
        />
      </TransitionGroup>
      <p v-if="searchQuery && !filteredProducts.length" class="catalog__empty">
        По запросу «{{ searchQuery }}» ничего не найдено
      </p>
    </div>
  </section>
</template>

<script>
import { products } from "@/data/products"
import { eventBus } from "@/utils/eventBus"
import ProductCard from "@/components/ProductCard"

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
      products,
      searchQuery: ""
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery.trim()) return this.products
      const q = this.searchQuery.toLowerCase()
      return this.products.filter((p) => p.name.toLowerCase().includes(q))
    }
  },
  created() {
    eventBus.$on("search:change", this.onSearch)
  },
  beforeDestroy() {
    eventBus.$off("search:change", this.onSearch)
  },
  methods: {
    onSearch(val) {
      this.searchQuery = val
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  padding: 45px 0 64px;

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
    margin: 0 0 39px;
  }

  &__empty {
    font-family: $font-family;
    font-size: 16px;
    color: $color-text-light;
    margin: 0;
    padding: 48px 0;
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    position: relative;
  }
}

.cards-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cards-leave-active {
  transition: opacity 0.2s ease;
  position: absolute;
}
.cards-enter {
  opacity: 0;
  transform: translateY(12px);
}
.cards-leave-to {
  opacity: 0;
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
