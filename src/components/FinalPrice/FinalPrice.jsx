import React, { useContext } from "react"
import { HomeContext } from "../../context/HomeProvider"
import "./FinalPrice.scss"

const FinalPrice = ({ product }) => {
	const { getFinalPrice } = useContext(HomeContext)

	return (
		<div className="final-price">
			{product?.discount > 0 ? (
				<>
					<span className="origin-with-dis">{product?.price}₪</span>
					<span className="discount">{getFinalPrice(product)}₪</span>
				</>
			) : (
				<>
					<span className="origin">{product?.price}₪</span>
				</>
			)}
		</div>
	)
}

export default FinalPrice
