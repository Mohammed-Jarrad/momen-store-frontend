import { useContext, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { OrderContext } from "../../../context/OrderProvider"
import "./OrderPage.scss"
import { Img } from "react-image"
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { MdPayment } from "react-icons/md"
import { TiLocation } from "react-icons/ti"
import { UserContext } from "../../../context/UserProvider"
import FinalPrice from "../../../components/FinalPrice/FinalPrice"
import { Helmet } from "react-helmet"
import { GetDate } from "../Orders/Orders"
import { useTranslation } from "react-i18next"
import { t } from "i18next"

const OrderPage = () => {
	const { t } = useTranslation()
	// id
	const { id } = useParams()
	// context
	const { findOrder } = useContext(OrderContext)
	const { admin } = useContext(UserContext)

	const [order, setOrder] = useState({})

	async function getCurrentOrder() {
		const data = await findOrder(id)
		if (data.order) {
			setOrder(data.order)
		} else if (data.errors) {
			console.log(data.errors)
		}
	}

	useEffect(() => {
		getCurrentOrder(id)
	}, [])

	return (
		<div className="order-page">
			{order._id == id && (
				<div className="order-box container">
					<OrderLocation order={order} />

					<StatusControl order={order} getCurrentOrder={getCurrentOrder} />

					<OrderDetails order={order} />
					<OrderPrice order={order} />
					{admin == true && <RemoveOrderButton order={order} />}
				</div>
			)}
		</div>
	)
}

export default OrderPage

const OrderLocation = ({ order }) => {
	const { t } = useTranslation()

	const { country, city, address } = order?.location
	const { firstName, lastName, email, phone } = order?.user

	return (
		<div className="order-location">
			<Helmet title={t("orderDetails")} />

			<div className="box">
				<Img src={"/assets/user_default_image.jpg"} loader={<CircularProgress />}></Img>
				<p>
					{firstName} {lastName}
				</p>
				<p>{email}</p>
				<p>{phone}</p>
			</div>
			<div className="box">
				<MdPayment />
				<p>{t("payMethod")}</p>
				<p>{t("uponReceipt")}</p>
			</div>
			<div className="box">
				<TiLocation />
				<p>
					{country}/{city}
				</p>
				<p>{address}</p>
			</div>
		</div>
	)
}

const StatusControl = ({ order, getCurrentOrder }) => {
	const { t } = useTranslation()

	const { order_info, status } = order
	const { admin } = useContext(UserContext)
	const { changeOrderStatus } = useContext(OrderContext)

	function getStatus() {
		if (status == "pending") {
			return "معلّق"
		} else if (status == "confirmed") return "تم التأكيد"
		else if (status == "delivered") return "تم التوصيل"
		else return "ملغي"
	}
	async function handleChangeStatus(newStatus, orderId) {
		const data = await changeOrderStatus(newStatus, orderId)
		if (data.msg == "success") {
			getCurrentOrder()
		} else {
			console.log(data.errors)
		}
	}
	return (
		<div className="status-control">
			<div className="status">
				{t("orderStatus")}: {t(`status.${status}`)}
			</div>
			{admin == true && (
				<div className="control">
					<FormControl fullWidth>
						<InputLabel id="status">{t("theStatus")}</InputLabel>
						<Select
							labelId="status"
							value={status}
							label="الحالة"
							onChange={e => handleChangeStatus(e.target.value, order._id)}
						>
							<MenuItem value="pending">{t("status.pending")}</MenuItem>
							<MenuItem value="confirmed">{t("status.confirmed")}</MenuItem>
							<MenuItem value="delivered">{t("status.delivered")}</MenuItem>
							<MenuItem value="canceled">{t("status.canceled")}</MenuItem>
						</Select>
					</FormControl>
				</div>
			)}
		</div>
	)
}

const OrderDetails = ({ order }) => {
	const { order_info, createdAt } = order

	return (
		<div className="order-details">
			<p>{t("orderContent")}</p>
			<p>
				<GetDate date={createdAt} />
			</p>
			<div className="items">
				{[...order_info].map(item => (
					<div className="item" key={item._id}>
						<NavLink to={`/product/${item?.product?._id}`}>
							<Img src={item?.product?.imageURL} loader={<CircularProgress />} />
						</NavLink>
						<div className="quantity">
							<span>{t("qty")}</span>
							<span>{item.quantity}</span>
						</div>
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
						<div className="price">
							<span>{t("fullPrice")}</span>
							<FinalPrice
								product={{
									price: item.product?.price * item?.quantity,
									discount: item.product?.discount,
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const OrderPrice = ({ order }) => {
	const { t } = useTranslation()
	const { order_info } = order

	function getFinalPrice(product) {
		if (product?.discount > 0) {
			return product.price - product.price * (product.discount / 100)
		} else {
			return product?.price
		}
	}
	function getFullPrice() {
		let fullPrice = 0
		order_info.forEach(order => {
			const { product, quantity } = order
			fullPrice += getFinalPrice(product) * quantity
		})
		return fullPrice
	}
	return (
		<div className="order-price">
			<p>{t("fullOrderPrice")}</p>
			<h3>{getFullPrice()}₪</h3>
		</div>
	)
}

const RemoveOrderButton = ({ order }) => {
	const { deleteOrder } = useContext(OrderContext)

	return (
		<button
			onClick={() => {
				deleteOrder(order._id)
			}}
			className="remove-order"
		>
			{t("deleteOrder")}
		</button>
	)
}
