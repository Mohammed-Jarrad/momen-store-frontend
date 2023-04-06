import { memo, useContext, useEffect, useState } from "react"
import "./ProductPage.scss"
import { HomeContext } from "../../../context/HomeProvider"
import { UserContext } from "../../../context/UserProvider"
import { useParams } from "react-router-dom"
import ProductDetails from "./ProductDetails"
import ProductReviews from "./ProductReviews"
import AddToCartForm from "./AddToCartForm"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const ProductPage = memo(() => {
	const { t } = useTranslation()
	// id
	const { id: productId } = useParams()
	// context
	const { findProduct } = useContext(HomeContext)
	const { token, admin } = useContext(UserContext)

	// states
	const [product, setProduct] = useState({})
	const [reFetchCurrentProduct, setReFetchCurrentProduct] = useState(false)

	async function getCurrentProduct() {
		const pData = await findProduct(productId)

		if (pData?.product) {
			setProduct(await pData.product)
		} else {
			console.log(await pData.errors)
		}
	}

	useEffect(() => {
		getCurrentProduct()

		return () => getCurrentProduct()
	}, [reFetchCurrentProduct])

	function refreshCurrentProduct() {
		setReFetchCurrentProduct(!reFetchCurrentProduct)
	}

	return (
		<div className="product-page">
			<Helmet title={t("productPage")} />

			{product && product._id == productId && (
				<div className="product-box container">
					<ProductDetails product={product} />

					{token && <>{!admin && <AddToCartForm product={product} />}</>}

					<ProductReviews product={product} refreshCurrentProduct={refreshCurrentProduct} />
				</div>
			)}
		</div>
	)
})

export default ProductPage
