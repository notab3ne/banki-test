<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__nav">
        <AppNav />
      </div>

      <div class="footer__contacts">
        <a href="tel:+78125555555" class="footer__contact">
          <PhoneIcon class="footer__icon" />
          +7 (812) 555-55-55
        </a>
        <span class="footer__contact">
          <LocationIcon class="footer__icon footer__icon--location" />
          г. Санкт-Петербург, ул. Ефимова, 3
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import AppNav from "@/components/AppNav"
import PhoneIcon from "@/assets/icons/phone.svg"
import LocationIcon from "@/assets/icons/location.svg"

export default {
  name: "AppFooter",
  components: { AppNav, PhoneIcon, LocationIcon }
}
</script>

<style lang="scss" scoped>
.footer {
  background: $color-footer-bg;

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

  ::v-deep .nav__menu-link {
    color: $color-footer;

    &:hover {
      color: $color-btn-primary-hover;
    }
  }

  &__contacts {
    display: flex;
    align-items: center;
    gap: 75px;
  }

  @media (max-width: $bp-desktop) {
    &__container {
      height: auto;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 32px;
      padding-bottom: 32px;
      gap: 32px;
    }

    &__nav {
      padding-left: 0;
    }

    ::v-deep .nav__menu {
      flex-direction: column;
      gap: 20px;
    }

    &__contacts {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
  }

  &__contact {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 400;
    color: $color-footer;
    white-space: nowrap;
    text-decoration: none;
  }

  &__icon {
    flex-shrink: 0;
    color: $color-footer;
    width: 14px;
    height: 14px;

    &--location {
      width: 10px;
      height: 14px;
    }
  }
}
</style>
