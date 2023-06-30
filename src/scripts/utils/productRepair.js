import * as cart from "@shopify/theme-cart";
import * as currency from "@shopify/theme-currency";
import { cartUpdateAll } from "../utils/cart";
import { isEqual } from "lodash";
import { Loader } from "@googlemaps/js-api-loader";

export default (product) => {
	// console.log("product", product);
	const currentVariant = product.product.variants[0];

	const loader = new Loader({
		apiKey: "AIzaSyCd-_6-0-HRNhoopifhM5olBJITPsZAjI8",
		version: "weekly",
		libraries: ["places"],
	});

	return {
		//defaults
		price: product.price,
		submitText: "Add to Cart",
		disabled: currentVariant.available ? false : true,
		button: currentVariant.available ? "Add to Cart" : "Unavailable",
		properties: {
			"Shipping Address": "",
		},
		formData: {
			id: currentVariant.id,
			qty: 1,
		},
		init() {
			loader.load().then(() => {
				// Create the autocomplete object
				const autocomplete = new google.maps.places.Autocomplete(
					this.$refs.address,
					{ types: ["geocode"] } // Restrict the search results to addresses
				);

				// When a place is selected, get its details
				autocomplete.addListener("place_changed", () => {
					const place = autocomplete.getPlace();
					console.log(place.formatted_address);
					this.properties["Shipping Address"] =
						place.formatted_address;
				});
			});
		},
		onUpdate(field, value) {
			this.properties[field] = value;
		},
		onSubmit() {
			this.button = "Adding...";
			this.disabled = true;
			fetch(window.Shopify.routes.root + "cart/add.js", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: [
						{
							id: this.formData.id,
							quantity: this.formData.qty,
							properties: this.properties,
						},
					],
				}),
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					cart.getState().then((state) => {
						cartUpdateAll(state);
						this.button = "Add to Cart";
						this.disabled = false;
						this.selectedAddOnProducts = [];
						window.dispatchEvent(
							new CustomEvent("updatecartstatus", {
								detail: { cartOpen: true },
							})
						);
					});
				})
				.catch((e) => {
					// console.log(e)
					alert(`This product is unavailable at the moment`);
					this.button = "Unavailable";
					this.disabled = true;
				});
		},
		//Image Uploader for repair
		buttonText: "Upload Image",
		uploading: false,
		imageUrl: null,
		error: "There has been an error uploading",
		uploadImage() {
			this.uploading = true;
			const file = this.$refs.imageInput.files[0];
			if (file) {
				if (file.type.startsWith("image/")) {
					const formData = new FormData();
					formData.append("image", file);
					fetch("https://evening-spire-07221.herokuapp.com/upload", {
						method: "POST",
						body: formData,
					})
						.then((response) => response.json())
						.then((data) => {
							this.imageUrl = data.imageUrl;
							this.properties["image_url"] = data.imageUrl;
							this.uploading = false;
						})
						.catch((error) => {
							console.error(error);
							this.uploading = false;
							alert("Server error, please try again");
						});
				} else {
					alert("Please select an image file");
					this.uploading = false;
				}
			} else {
				alert("Please select a file");
				this.uploading = false;
			}
		},
		date: "",
		formatDate(value) {
			// Remove any non-numeric characters from the input value
			value = value.replace(/\D/g, "");

			// Format the date value as mm/dd/yyyy
			if (value.length > 2) {
				value = value.substring(0, 2) + "/" + value.substring(2);
			}
			if (value.length > 5) {
				value = value.substring(0, 5) + "/" + value.substring(5);
			}

			// Update the input field with the formatted date
			return value;
		},
	};
};
