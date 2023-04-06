import { memo, useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Product from "../../../components/Product/Product"
import { HomeContext } from "../../../context/HomeProvider"
import { LoadingContext } from "../../../context/LoadingProvider"
import Requests from "../../../utils/Requests"
import "./CategoryPage.scss"

const CategoryPage = memo(() => {
	const { category } = useParams()
	const req = new Requests()

	const { setLoading } = useContext(LoadingContext)

	const [items, setItems] = useState([])

	async function get_products_by_category(cate) {
		setLoading(true)
		try {
			const res = await req.GetRequest(`/products/category/${cate}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				data.products ? setItems(data.products) : console.log(data.errors)
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	useEffect(() => {
		get_products_by_category(category)
	}, [])

	return (
		<div className="category-page">
			<Helmet title={category} />

			<div className="container">
				<h2 className="title">{category}</h2>
				{items.length > 0 && (
					<div className="category-products">
						{items.map((product, i) => (
							<Product product={product} key={i} />
						))}
					</div>
				)}
			</div>
		</div>
	)
})

export default CategoryPage
