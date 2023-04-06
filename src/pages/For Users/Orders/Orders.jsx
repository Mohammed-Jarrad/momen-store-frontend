import { memo, useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingProvider"
import { OrderContext } from "../../../context/OrderProvider"
import "./Orders.scss"
import { RxDotFilled } from "react-icons/rx"
import { NavLink } from "react-router-dom"
import { CgMoreR } from "react-icons/cg"
import { Helmet } from "react-helmet"
import { t } from "i18next"
import { useTranslation } from "react-i18next"

var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"]

const Orders = memo(() => {
	const { t } = useTranslation()
	// context
	const { getUserOrders, userOrders } = useContext(OrderContext)
	const { loading } = useContext(LoadingContext)

	useEffect(() => {
		getUserOrders()
	}, [])

	return (
		<div className="orders-page">
			<Helmet title={t("ordersPage")} />
			<div className="container">
				<FilterOrders />

				<div className="orders-box">
					{[...userOrders].length == 0 && !loading && <h1>{t("noOrdersNow")}</h1>}

					{[...userOrders].length > 0 && (
						<>
							<div className="titles">
								<div className="date">{t("date")}</div>
								<div className="price">{t("price")}</div>
								<div className="status">{t("theStatus")}</div>
								<div className="more">{t("details")}</div>
							</div>
							{[...userOrders].map(order => (
								<OrderBox order={order} key={order._id} />
							))}
						</>
					)}
				</div>
			</div>
		</div>
	)
})

const FilterOrders = () => {
	const { setUserOrders, userOrdersClone } = useContext(OrderContext)
	const [acvticeButton, setActiveButton] = useState("all")

	const filterButtons = [
		{ value: "pending", text: "معلّق" },
		{ value: "confirmed", text: "تم التأكيد" },
		{ value: "delivered", text: "تم التوصيل" },
		{ value: "canceled", text: "ملغي" },
	]

	function handleButtonClick(value) {
		setActiveButton(value)
		if (value == "all") {
			setUserOrders(userOrdersClone)
		} else {
			setUserOrders([...userOrdersClone].filter(o => o.status == value))
		}
	}
	return (
		<div className="filter-orders">
			<button
				onClick={e => handleButtonClick("all")}
				className={acvticeButton == "all" ? "active" : ""}
			>
				{t("all")}
			</button>
			{filterButtons.map((item, index) => (
				<button
					key={index}
					onClick={e => handleButtonClick(item.value)}
					className={acvticeButton == item.value ? "active" : ""}
				>
					{t(`status.${item.value}`)}
				</button>
			))}
		</div>
	)
}

const OrderBox = ({ order }) => {
	const { createdAt: date, order_info, status } = order

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
	function getStatus() {
		if (status == "pending") {
			return "معلّق"
		} else if (status == "confirmed") return "تم التأكيد"
		else if (status == "delivered") return "تم التوصيل"
		else return "ملغي"
	}

	return (
		<div className="order-box">
			<div className="date">
				<GetDate date={date} />
			</div>
			<div className="price">{getFullPrice()}₪</div>
			<div className="status">
				<RxDotFilled className={status} />
				<span>{t(`status.${status}`)}</span>
			</div>
			<div className="more">
				<NavLink to={`/order/${order._id}`}>
					<CgMoreR />
				</NavLink>
			</div>
		</div>
	)
}

export const GetDate = ({ date }) => {
	const { t } = useTranslation()
	const days = [
		t("days.sun"),
		t("days.mon"),
		t("days.tus"),
		t("days.wed"),
		t("days.ther"),
		t("days.frid"),
		t("days.sat"),
	]

	function getDate(dateString) {
		let date = new Date(dateString)
		return days[date.getDay()] + ", " + date.toLocaleDateString("ar")
	}

	return getDate(date)
}

export default Orders
