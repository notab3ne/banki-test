<template>
  <header class="header">
    <div class="header__container">
      <AppNav class="header__nav" />

      <div class="header__search">
        <DefaultInput
          :value="query"
          placeholder="Поиск по названию картины"
          @input="onInput"
          @clear="onSearch"
          @keydown.enter.native="onSearch"
        />
        <button class="header__search-btn" type="button" @click="onSearch">Найти</button>
      </div>
    </div>
  </header>
</template>

<script>
import AppNav from "@/components/AppNav"
import DefaultInput from "@/components/ui/DefaultInput"
import { eventBus } from "@/utils/eventBus"

export default {
  name: "AppHeader",
  components: { AppNav, DefaultInput },
  data() {
    return {
      query: ""
    }
  },
  methods: {
    onInput(val) {
      this.query = val
    },
    onSearch() {
      eventBus.$emit("search:change", this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: $color-bg;
  border-bottom: 1px solid $color-border;
  position: sticky;
  top: 0;
  z-index: 100;

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    padding-left: 96px;
  }

  &__search {
    display: flex;
    flex-shrink: 0;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    width: 416px;
    height: 48px;
  }

  &__search-btn {
    font-family: $font-family;
    font-size: 14px;
    font-weight: 700;
    color: $color-bg;
    background: $color-search-btn;
    border: none;
    width: 122px;
    flex-shrink: 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;

    &:hover {
      background: lighten($color-search-btn, 8%);
    }
  }
}
</style>
