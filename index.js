
const webstore = new Vue({
  el: '#app',
  created() {
    axios.get('./assets/products.json')
    .then((response) => {
      this.products = response.data.products
      console.log(this.products)
    })
  },
  data: {
    sitename: 'Vue.js Pet Depot',
    order: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      states: {
        AL: 'Alabama',
        AR: 'Arizona',
        CA: 'California',
        NV: 'Nevada'
      },
      method: 'Home Address',
      business: 'Business Address',
      home: 'Home Address',
      gift: 'Send As A Gift',
      sendGift: 'Send As A Gift',
      dontSendGift: 'Do Not Send As A Gift'
    },
    products: '',
    showProduct: true,
    cart: []
  },
  computed: {
    cartItemCount() {
      return this.cart.length || ''
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productArray = this.products.slice(0)
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1
          }
          return 0
        }
        return productArray.sort(compare)
      }
    }
  },
  filters: {
    formatPrice(price) {
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    }
  },
  methods: {
    addToCart(aProduct) {
      this.cart.push( aProduct.id )
    },
    canAddToCart(aProduct) {
      return aProduct.availableInvetory > this.cartCount(aProduct.id)
    },
    cartCount(id) {
      let count = 0
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) count++
      }
      return count;
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true
    },
    submitForm() {
      alert('Submitted')
    },
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0
    }
  }
})
