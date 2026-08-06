<template>
  <footer class="footer">
    <div class="container"></div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style lang="scss" scoped>

.footer {
  background: $color-footer-bg;
  height: 80px;

  .container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
    height: 100%;
  }
}
</style>
