import { useContext } from "react"
import { Img } from "react-image"
import { HomeContext } from "../../context/HomeProvider"
import { ReviewContext } from "../../context/ReviewProvider"
import FinalPrice from "../FinalPrice/FinalPrice"
import Stars from "../Stars/Stars"
import "./Product.scss"
import { AiOutlinePlusSquare } from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../context/UserProvider"
import { CircularProgress } from "@mui/material"
import { useTranslation } from "react-i18next"

const Product = ({ product }) => {
	const { t } = useTranslation()
	// context
	const { admin } = useContext(UserContext)

	return (
		<div className="product">
			<div className="image-box">
				<Img src={product.imageURL} loader={<CircularProgress />} />
				{product.discount > 0 && (
					<span className="discount">
						{t("discount")} <span>{product.discount}%</span>
					</span>
				)}

				{product.available == false && <div className="overlay">{t("notAvailable")}</div>}
			</div>

			<div className="title">{product.title}</div>

			<div className="rating">
				{product.averageRate > 0 && <Stars value={product.averageRate} />}
				<span>
					{product?.reviews?.length} {t("comment")}
				</span>
			</div>

			<div className="bottom">
				<FinalPrice product={product} />

				<NavLink to={`/product/${product._id}`}>{t("more")}</NavLink>
			</div>
		</div>
	)
}

export default Product
