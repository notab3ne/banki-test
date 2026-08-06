<template>
  <SpinnerSvg class="spinner" />
</template>

<script>
import SpinnerSvg from "@/assets/icons/spinner.svg"

export default {
  name: "DefaultSpinner",
  components: { SpinnerSvg }
}
</script>

<style lang="scss" scoped>
.spinner {
  animation: spin 0.7s linear infinite;
  display: inline-block;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
