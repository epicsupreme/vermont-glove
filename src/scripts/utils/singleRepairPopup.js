import * as cart from '@shopify/theme-cart'
import { Loader } from '@googlemaps/js-api-loader'

export default (product) => {
  console.log('singleRepair', product)

  const loader = new Loader({
    apiKey: 'AIzaSyCnwNJFrWDA3y5YFeYXHDRifHIvlX9QQHc',
    version: 'weekly',
    libraries: ['places'],
  })

  return {
    properties: product.properties,
    updatedProperties: product.properties,
    buttonText: 'Upload Image',
    uploading: false,
    imageUrl: null,
    error: 'There has been an error uploading',
    init() {
      console.log('product', product)
      loader.load().then(() => {
        // Create the autocomplete object
        const autocomplete = new google.maps.places.Autocomplete(
          this.$refs.address,
          { types: ['geocode'] } // Restrict the search results to addresses
        )

        // When a place is selected, get its details
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()

          this.updatedProperties = {
            ...this.updatedProperties,
            'Shipping Address': place.formatted_address,
          }
        })
      })
    },
    updateRepair() {
      cart.updateItem(key, { properties: updatedProperties }).then((state) => {
        cartUpdateAll(state)
      })
    },
    uploadImage() {
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
  }
}
