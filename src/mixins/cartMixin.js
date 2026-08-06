import { eventBus } from "@/utils/eventBus"

const CART_KEY = "cart"

export const cartMixin = {
  data() {
    return {
      isInCart: false,
      isProcessing: false,
      isHovered: false
    }
  },
  created() {
    this.isInCart = this.readCart().includes(this.product.id)
    eventBus.$on("cart:change", this.onCartChange)
  },
  beforeDestroy() {
    eventBus.$off("cart:change", this.onCartChange)
  },
  computed: {
    buttonType() {
      if (this.isInCart) return "cart"
      if (this.isProcessing) return "disabled"
      return "primary"
    },
    buttonLabel() {
      if (this.isInCart) return this.isHovered ? "Удалить?" : "В корзине"
      if (this.isProcessing) return ""
      return "Купить"
    }
  },
  methods: {
    readCart() {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]")
    },
    handleBuy() {
      if (this.isProcessing) return
      if (this.isInCart) {
        this.updateCart(false)
        return
      }
      this.isProcessing = true
      setTimeout(() => {
        this.isProcessing = false
        this.updateCart(true)
      }, 2000)
    },
    updateCart(add) {
      const cart = this.readCart()
      const updated = add
        ? [...new Set([...cart, this.product.id])]
        : cart.filter((i) => i !== this.product.id)
      localStorage.setItem(CART_KEY, JSON.stringify(updated))
      eventBus.$emit("cart:change", updated)
    },
    onCartChange(cart) {
      this.isInCart = cart.includes(this.product.id)
    }
  }
}
