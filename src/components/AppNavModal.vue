<template>
  <transition name="nav-modal" appear>
    <div class="nav-modal" @click.self="$emit('close')">
      <div class="nav-modal__content">
        <button class="nav-modal__close" @click="$emit('close')">
          <CloseIcon />
        </button>
        <AppNav class="nav-modal__nav" />
      </div>
    </div>
  </transition>
</template>

<script>
import AppNav from "@/components/AppNav"
import CloseIcon from "@/assets/icons/close.svg"

export default {
  name: "AppNavModal",
  components: { AppNav, CloseIcon },
  created() {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", this.onKeyDown)
  },
  beforeDestroy() {
    document.body.style.overflow = ""
    document.removeEventListener("keydown", this.onKeyDown)
  },
  methods: {
    onKeyDown(e) {
      if (e.key === "Escape") this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;

  &__content {
    background: $color-bg;
    width: 280px;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__close {
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text-light;
    padding: 0;
    transition: color 0.2s;

    &:hover {
      color: $color-text;
    }
  }
}

::v-deep .nav__menu {
  flex-direction: column;
  gap: 32px;
}

::v-deep .nav__menu-link {
  font-size: 16px;
}
</style>

<style lang="scss">
.nav-modal-enter-active,
.nav-modal-leave-active {
  transition: opacity 0.25s ease;

  .nav-modal__content {
    transition: transform 0.25s ease;
  }
}

.nav-modal-enter,
.nav-modal-leave-to {
  opacity: 0;

  .nav-modal__content {
    transform: translateX(-100%);
  }
}
</style>
