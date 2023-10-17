import * as cart from '@shopify/theme-cart'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyCd-_6-0-HRNhoopifhM5olBJITPsZAjI8',
  version: 'weekly',
  libraries: ['places'],
})

export default () => {
  return {
    products: [],
    showRepair: null,
    init() {
      this.updateRepairPopups()
    },
    uploadImage(index) {
      // console.log(this);
      this.uploading = true
      const file = this.$refs.imageInput.files[0]
      if (file) {
        if (file.type.startsWith('image/')) {
          const formData = new FormData()
          formData.append('image', file)
          fetch('https://evening-spire-07221.herokuapp.com/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              console.log(this.properties)
              this.imageUrl = data.imageUrl
              this.newProperties = {
                ...this.newProperties,
                image_url: data.imageUrl,
              }
              this.uploading = false
            })
            .catch((error) => {
              console.error(error)
              this.uploading = false
              alert('Server error, please try again')
            })
        } else {
          alert('Please select an image file')
          this.uploading = false
        }
      } else {
        alert('Please select a file')
        this.uploading = false
      }
    },
    updateRepairPopups() {
      cart.getState().then((state) => {
        if (state.items) {
          this.products = state.items.map((item) => {
            return { ...item, updatedProperties: item.properties }
          })
          this.$nextTick(() => {
            loader.load().then(() => {
              // Create the autocomplete object
              const autocomplete = new google.maps.places.Autocomplete(
                this.$refs.address,
                { types: ['geocode'] } // Restrict the search results to addresses
              )

              const repairEditAddresses = document.querySelectorAll(
                '.repair-edit-address'
              )
              repairEditAddresses?.forEach((field) => {
                // When a place is selected, get its details
                autocomplete.addListener((field, i) => {
                  const place = autocomplete.getPlace()

                  this.products[i].updatedProperties = {
                    ...this.products[i].updatedProperties,
                    'Shipping Address': place.formatted_address,
                  }
                })
              })
            })
          })
        }
      })
    },
    updateProperty(index, property, value) {},
  }
}
/*
Load products into cart container
Loop through products
    Upload image
    remove image
    cancel operation
    update properties
        Update cart

Others:
    Update popups on add to cart
    Change action of button in cart


*/
