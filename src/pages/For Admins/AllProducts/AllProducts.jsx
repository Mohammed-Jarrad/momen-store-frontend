import React, { useContext, useEffect } from "react"
import { HomeContext } from "../../../context/HomeProvider"
import "./AllProducts.scss"
import Product from "../../../components/Product/Product"
import { NavLink } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { LoadingContext } from "../../../context/LoadingProvider"
import Requests from "../../../utils/Requests"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const AllProducts = () => {
	const { t } = useTranslation()
	// notify
	const notifyDeletedSuccess = () => {
		return toast(t("productDeleted"), {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			position: "top-left",
		})
	}
	// context
	const { loading, setLoading } = useContext(LoadingContext)
	const { products, refreshProducts } = useContext(HomeContext)

	// functions
	async function removeProduct(productId) {
		setLoading(true)
		try {
			const res = await new Requests().DeleteRequest(`/product/${productId}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.msg == "deleted success") {
					notifyDeletedSuccess()
					refreshProducts()
				} else {
					console.error("deleted failed")
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<div className="all-products">
			<Helmet title={t("productsPage")} />
			<div className="all-products-box container">
				{loading == false ? (
					<>
						{products.length > 0 ? (
							<>
								{[...products].map((pro, index) => (
									<div className="product-box" key={index}>
										<Product product={pro} />
										<div className="options">
											<NavLink to={`/update_product/${pro._id}`} className="edit">
												{t("update")}
											</NavLink>
											<button onClick={() => removeProduct(pro._id)} className="delete">
												{t("delete")}
											</button>
										</div>
									</div>
								))}
							</>
						) : products.length == 0 ? (
							<h3>{t("noProducts")}</h3>
						) : null}
					</>
				) : null}
			</div>

			<ToastContainer />
		</div>
	)
}

export default AllProducts
