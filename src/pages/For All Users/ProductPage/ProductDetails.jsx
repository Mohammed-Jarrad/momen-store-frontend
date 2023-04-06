import React, { useContext, useState } from "react"
import { Img } from "react-image"
import Stars from "../../../components/Stars/Stars"
import { ReviewContext } from "../../../context/ReviewProvider"
import FinalPrice from "../../../components/FinalPrice/FinalPrice"
import { useTranslation } from "react-i18next"

const ProductDetails = ({ product }) => {
	const { t } = useTranslation()
	return (
		<div className="product-details">
			<div className="details-box">
				<div className="box">
					<span>{t("name")}</span>
					<p>{product.title}</p>
				</div>
				<div className="box">
					<span>{t("category")}</span>
					<p>{product.category}</p>
				</div>
				<div className="box">
					<span>{t("rate")}</span>
					<Stars value={product.averageRate} />
				</div>
				{product.discount && (
					<div className="box">
						<span>{t("discountAmount")}</span>
						<p>{product.discount}%</p>
					</div>
				)}
				<div className="box">
					<span>{t("price")}</span>
					<FinalPrice product={product} />
				</div>
				{product.colors && product.colors.length > 0 && (
					<div className="box">
						<span>{t("colors")}</span>
						<p>
							{[...product.colors].map(color => (
								<span
									key={color}
									className="color-item"
									style={{
										backgroundColor: color,
									}}
								></span>
							))}
						</p>
					</div>
				)}
				{product.sizes && product.sizes.length > 0 && (
					<div className="box">
						<span>{t("sizes")}</span>
						<p>
							{[...product.sizes].map(size => (
								<span key={size} className="size-item">
									{size}
								</span>
							))}
						</p>
					</div>
				)}
			</div>

			<div className="image-box">
				<Img src={product.imageURL} />
				<span>{t("desc")}</span>
				{typeof product.desc == "string" && (
					<div className="desc">
						{product.desc.split("\n").map((line, index) => (
							<div className="line" key={index}>
								{line}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductDetails
