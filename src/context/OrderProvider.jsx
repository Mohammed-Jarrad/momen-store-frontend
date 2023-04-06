import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"
import { UserContext } from "./UserProvider"

export const OrderContext = createContext({})

const OrderProvider = ({ children }) => {
	// req
	const req = new Requests()
	// navigate
	const navigate = useNavigate()

	// context
	const { setLoading } = useContext(LoadingContext)
	const { user } = useContext(UserContext)
	// states
	const [allOrders, setAllOrders] = useState([])
	const [allOrdersClone, setAllOrdersClone] = useState([])
	const [userOrders, setUserOrders] = useState([])
	const [userOrdersClone, setUserOrdersclone] = useState([])
	// * functions

	async function getUserOrders() {
		setLoading(true)
		try {
			const res = await req.GetRequest(`/orders/user`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.orders) {
					setUserOrders(data.orders)
					setUserOrdersclone(data.orders)
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function handleFilterUserOrders(value) {
		if (value == "all") {
			getUserOrders()
		} else {
			setLoading(true)
			try {
				const res = await req.GetRequest(`/orders/user/status/${value}`)
				const data = await res.json()
				if (data) {
					setLoading(false)
					if (data.orders) {
						setUserOrders(data.orders)
					} else {
						console.log(data.errros)
					}
				}
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}
	}

	async function findOrder(orderId) {
		setLoading(true)
		try {
			const res = await req.GetRequest(`/order/${orderId}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				return data
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function changeOrderStatus(newStatus, orderId) {
		setLoading(true)
		try {
			const res = await req.PutRequest(
				`/order/${orderId}`,
				JSON.stringify({
					status: newStatus,
				}),
			)
			const data = await res.json()
			if (data) {
				setLoading(false)
				return data
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function deleteOrder(orderId) {
		setLoading(true)
		try {
			const res = await req.DeleteRequest(`/order/${orderId}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.msg == "delete success") {
					navigate("/all_orders")
				} else {
					console.log(data.msg)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function getAllOrders() {
		setLoading(true)
		try {
			const res = await req.GetRequest(`/orders`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.orders) {
					setAllOrders(data.orders)
					setAllOrdersClone(data.orders)
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function handleFilterAllOrders(value) {
		if (value == "all") {
			getAllOrders()
		} else {
			setLoading(true)
			try {
				const res = await req.GetRequest(`/orders/status/${value}`)
				const data = await res.json()
				if (data) {
					setLoading(false)
					if (data.orders) {
						setAllOrders(data.orders)
					} else {
						console.log(data.errros)
					}
				}
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}
	}

	return (
		<OrderContext.Provider
			value={{
				getUserOrders,
				userOrders,
				setUserOrders,
				handleFilterUserOrders,
				findOrder,
				changeOrderStatus,
				allOrders,
				setAllOrders,
				getAllOrders,
				handleFilterAllOrders,
				deleteOrder,
				allOrdersClone,
				setAllOrdersClone,
				userOrdersClone,
			}}
			children={children}
		/>
	)
}

export default OrderProvider
