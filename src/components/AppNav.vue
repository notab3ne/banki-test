<template>
  <nav class="nav">
    <ul class="nav__menu">
      <li v-for="item in items" :key="item.label" class="nav__menu-item">
        <a :href="item.href" class="nav__menu-link">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
const NAV_ITEMS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Доставка", href: "#" },
  { label: "Оплата", href: "#" },
  { label: "Контакты", href: "#" },
  { label: "О компании", href: "#" }
]

export default {
  name: "AppNav",
  data() {
    return { items: NAV_ITEMS }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  &__menu {
    display: flex;
    gap: 48px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__menu-link {
    font-family: $font-family;
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s;

    &:hover {
      color: $color-btn-primary-hover;
    }
  }
}
</style>
