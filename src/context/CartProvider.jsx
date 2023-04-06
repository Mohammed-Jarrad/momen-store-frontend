import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"

export const CartContext = createContext({})

const CartProvider = ({ children }) => {
	// req
	const req = new Requests()
	// context
	const { setLoading } = useContext(LoadingContext)

	// states
	const [cart, setCart] = useState([])

	const navigate = useNavigate()
	// function
	async function getUserCart() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/cart/user")
			const data = await res.json()

			if (data) {
				setLoading(false)

				if (data.cart) {
					setCart(data.cart)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	async function removeItemFromCart(itemId) {
		setLoading(true)
		try {
			const res = await req.PutRequest(`/cart/user/remove_item/${itemId}`)
			const data = await res.json()

			if (data) {
				setLoading(false)
				if (data.msg == "Success") {
					getUserCart()
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	async function handleUpdateQuantity(e, itemId) {
		const newQty = e.target.value
		if (newQty != 0) {
			setLoading(true)
			const body = {
				quantity: newQty,
			}
			try {
				const res = await req.PutRequest(`/cart/user/edit_qty/${itemId}`, JSON.stringify(body))
				const data = await res.json()
				if (data) {
					setLoading(false)
					if (data.msg == "Success") {
						getUserCart()
					}
				}
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}
	}
	/* 
		const item = {
			product: product._id,
			selected_color: selectedColor,
			selected_size: selectedSize,
			quantity,
		}
	 */
	async function addItemToCart(item) {
		setLoading(true)
		try {
			const res = await req.PutRequest(`/cart/user/add_item`, JSON.stringify(item))
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.msg == "Success") {
					getUserCart()
					navigate("/cart")
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				getUserCart,
				removeItemFromCart,
				handleUpdateQuantity,
				addItemToCart,
			}}
			children={children}
		/>
	)
}

export default CartProvider
