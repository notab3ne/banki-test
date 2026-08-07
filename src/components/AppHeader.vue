<template>
  <header class="header">
    <div class="header__container">
      <!-- Desktop -->
      <template v-if="!isMobile">
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
      </template>

      <!-- Mobile -->
      <template v-else>
        <button class="header__burger" type="button" @click="isMobileNavOpen = true">
          <BurgerIcon />
        </button>

        <div v-if="isSearchOpen" class="header__search-mobile">
          <DefaultInput
            :value="query"
            placeholder="Поиск"
            @input="onInputMobile"
            @clear="closeSearch"
          />
        </div>

        <button v-else class="header__icon-btn" type="button" @click="openSearch">
          <SearchIcon />
        </button>
      </template>
    </div>

    <AppNavModal v-if="isMobileNavOpen" @close="isMobileNavOpen = false" />
  </header>
</template>

<script>
import AppNav from "@/components/AppNav"
import AppNavModal from "@/components/AppNavModal"
import DefaultInput from "@/components/ui/DefaultInput"
import BurgerIcon from "@/assets/icons/burger.svg"
import SearchIcon from "@/assets/icons/search.svg"
import { eventBus } from "@/utils/eventBus"
import { debounce } from "@/utils/debounce"

const MOBILE_BREAKPOINT = 1200 // sync with $bp-desktop in variables.scss

export default {
  name: "AppHeader",
  components: { AppNav, AppNavModal, DefaultInput, BurgerIcon, SearchIcon },
  data() {
    return {
      query: "",
      isMobile: false,
      isSearchOpen: false,
      isMobileNavOpen: false
    }
  },
  created() {
    this._onResize = () => {
      this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      if (!this.isMobile) {
        this.isSearchOpen = false
        this.isMobileNavOpen = false
      }
    }
    this._onResize()
    window.addEventListener("resize", this._onResize)
    this.emitSearch = debounce((val) => {
      eventBus.$emit("search:change", val)
    }, 200)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this._onResize)
  },
  methods: {
    onInput(val) {
      this.query = val
    },
    onSearch() {
      eventBus.$emit("search:change", this.query)
    },
    onInputMobile(val) {
      this.query = val
      this.emitSearch(val)
    },
    clearSearch() {
      this.query = ""
      eventBus.$emit("search:change", "")
    },
    openSearch() {
      this.isSearchOpen = true
      this.$nextTick(() => {
        const input = this.$el.querySelector(".header__search-mobile input")
        if (input) input.focus()
      })
    },
    closeSearch() {
      this.isSearchOpen = false
      this.clearSearch()
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

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text;
    padding: 0;
    flex-shrink: 0;
  }

  &__search-mobile {
    display: flex;
    align-items: center;
    flex: 1;
    height: 48px;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    margin: 0 8px;
  }

  &__icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text;
    padding: 0;
    flex-shrink: 0;
  }

  @media (max-width: $bp-tablet) {
    &__container {
      height: 64px;
    }

    &__search-mobile {
      height: 40px;
    }
  }
}
</style>
