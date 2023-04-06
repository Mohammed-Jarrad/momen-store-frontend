import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useContext, useEffect } from "react"
import "./Cart.scss"
import { CartContext } from "../../../context/CartProvider"
import { FaRegWindowClose } from "react-icons/fa"
import { Img } from "react-image"
import CreateOrderModal from "./CreateOrderModal"
import FinalPrice from "../../../components/FinalPrice/FinalPrice"
import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const Cart = () => {
	const { t } = useTranslation()
	const { cart, removeItemFromCart } = useContext(CartContext)
	const { cart_info } = cart

	return (
		<div className="cart-page">
			<Helmet title={t("cart")} />
			<div className="cart-box container">
				<h2 className="title">
					<p>{t("cart")}</p>
					<span>{cart_info?.length}</span>
				</h2>

				{cart_info && cart_info.length > 0 ? (
					<>
						<div className="items">
							{cart_info.map((item, index) => (
								<div className="item-box" key={index}>
									<div className="image-box">
										<Img src={item.product?.imageURL} alt="" loader={<CircularProgress />} />

										<FaRegWindowClose onClick={() => removeItemFromCart(item._id)} />
									</div>

									<div className="infos">
										<div className="title-qty">
											<div className="title">{item.product?.title}</div>

											<Qty item={item} />
										</div>

										<div className="infos-price">
											<Infos item={item} />
											<div className="price">
												<span>{t("price")}</span>
												<FinalPrice product={item.product} />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="create-order">
							<CreateOrderModal />
						</div>
					</>
				) : (
					<>
						<h3>{t("noCart")}</h3>
						<NavLink
							style={{
								background: "var(--secondColor)",
								borderRadius: "10px",
								padding: "5px",
								color: "var(--mainTextColor)",
							}}
							to={`/`}
						>
							{t("mainPage")}
						</NavLink>
					</>
				)}
			</div>
		</div>
	)
}

const Infos = ({ item }) => {
	const { t } = useTranslation()

	return (
		<>
			{item?.selected_color && (
				<div className="selected-color">
					<span>{t("selectedColor")}</span>
					<span style={{ background: item.selected_color }}></span>
				</div>
			)}
			{item?.selected_size && (
				<div className="selected-size">
					<span>{t("selectedSize")}</span>
					<span>{item.selected_size}</span>
				</div>
			)}
		</>
	)
}

const Qty = ({ item }) => {
	const { t } = useTranslation()
	const { handleUpdateQuantity } = useContext(CartContext)

	return (
		<div className="quantity">
			<FormControl fullWidth>
				<InputLabel id="qty">{t("qty")}</InputLabel>
				<Select
					labelId="qty"
					value={item.quantity}
					label={t("qty")}
					onChange={e => handleUpdateQuantity(e, item._id)}
				>
					<MenuItem value={0}>{t("setQuantity")}</MenuItem>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={6}>6</MenuItem>
					<MenuItem value={7}>7</MenuItem>
					<MenuItem value={8}>8</MenuItem>
					<MenuItem value={9}>9</MenuItem>
					<MenuItem value={10}>10</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}

export default Cart
