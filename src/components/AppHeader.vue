<template>
  <header class="header">
    <div class="container"></div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style lang="scss" scoped>

.header {
  background: $color-bg;
  border-bottom: 1px solid $color-border;
  height: 80px;

  .container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
    height: 100%;
  }
}
</style>
