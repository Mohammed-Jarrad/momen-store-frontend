import React, { createContext, useContext, useEffect, useReducer, useState } from "react"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"

export const HomeContext = createContext({})

const HomeProvider = ({ children }) => {
	// context
	const { setLoading } = useContext(LoadingContext)

	//Requests
	const req = new Requests()

	// states
	const [products, setProducts] = useState([])
	const [productsClone, setProductsClone] = useState([])
	const [categories, setCategories] = useState([])
	const [topRating, setTopRating] = useState([])
	const [bigDiscount, setBigDiscount] = useState([])
	const [catesWithProducts, setCatesWithProducts] = useState({})
	// force update
	const [reFetchProducts, setReFetchProducts] = useState(false)

	useEffect(() => {
		getProducts()
	}, [reFetchProducts])

	// functions
	async function getProducts() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/products")
			const data = await res.json()
			if (data) {
				if (data.products) {
					const pros = [...data.products]
					const all_cates = [...new Set([...pros].map(p => p.category))]
					setProducts(pros)
					setCategories(all_cates)

					all_cates.map(cate => {
						setCatesWithProducts(pre => ({
							...pre,
							[cate]: pros.filter(pro => pro.category == cate),
						}))
					})

					setTopRating([...pros].filter(p => p.averageRate == 4 || p.averageRate == 5))
					setBigDiscount([...pros].filter(p => p?.discount >= 10))
					setLoading(false)
					return pros
				} else {
					setLoading(false)
					console.log(data.errors)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	function refreshProducts() {
		setReFetchProducts(!reFetchProducts)
	}

	async function findProduct(productId) {
		setLoading(true)
		try {
			const res = await req.GetRequest(`/product/${productId}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				return data
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	function getFinalPrice(product) {
		if (product.discount > 0) {
			let price = product.price
			let dis = product.discount
			let final = price - price * (dis / 100)
			return Math.floor(final)
		} else {
			return product.price
		}
	}

	return (
		<HomeContext.Provider
			value={{
				products,
				setProducts,
				productsClone,
				setProductsClone,
				setCategories,
				categories,
				setReFetchProducts,
				reFetchProducts,
				getFinalPrice,
				getProducts,
				findProduct,
				topRating,
				setTopRating,
				bigDiscount,
				setBigDiscount,
				refreshProducts,
				catesWithProducts,
			}}
		>
			{children}
		</HomeContext.Provider>
	)
}

export default HomeProvider
