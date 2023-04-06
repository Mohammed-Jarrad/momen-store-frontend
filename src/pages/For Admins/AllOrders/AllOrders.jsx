import { memo, useContext, useEffect, useState } from "react"
import { LoadingContext } from "../../../context/LoadingProvider"
import { OrderContext } from "../../../context/OrderProvider"
import "./AllOrders.scss"
import { RxDotFilled } from "react-icons/rx"
import { NavLink } from "react-router-dom"
import { CgMoreR } from "react-icons/cg"
import { Helmet } from "react-helmet"
import { GetDate } from "../../For Users/Orders/Orders"
import { useTranslation } from "react-i18next"

const AllOrders = memo(() => {
	const { t } = useTranslation()

	// context
	const { getAllOrders, allOrders } = useContext(OrderContext)
	const { loading } = useContext(LoadingContext)

	useEffect(() => {
		getAllOrders()
	}, [])

	return (
		<div className="all-orders-page">
			<Helmet title={t("allOrdersPage")} />
			<div className="container">
				{loading == false ? (
					<>
						<FilterOrders />
						{allOrders.length > 0 ? (
							<>
								<div className="orders-box">
									{[...allOrders].length == 0 && !loading && <h1>{t("noOrdersNow")}</h1>}

									{[...allOrders].length > 0 && (
										<>
											<div className="titles">
												<div className="name">{t("name")}</div>
												<div className="date">{t("date")}</div>
												<div className="price">{t("price")}</div>
												<div className="status">{t("theStatus")}</div>
												<div className="more">{t("details")}</div>
											</div>
											{[...allOrders].map(order => (
												<OrderBox order={order} key={order._id} />
											))}
										</>
									)}
								</div>
							</>
						) : allOrders.length == 0 && !loading ? (
							<h2>{t("noOrdersNow")}</h2>
						) : null}
					</>
				) : null}
			</div>
		</div>
	)
})

const FilterOrders = () => {
	const { t } = useTranslation()
	const [activeButton, setActiveButton] = useState("all")
	const { handleFilterAllOrders, getAllOrders, setAllOrders, allOrders, allOrdersClone } =
		useContext(OrderContext)
	const filterButtons = [
		{ value: "pending", text: "معلّق" },
		{ value: "confirmed", text: "تم التأكيد" },
		{ value: "delivered", text: "تم التوصيل" },
		{ value: "canceled", text: "ملغي" },
	]
	function handleButtonClick(value) {
		setActiveButton(value)
		// handleFilterAllOrders(value)

		if (value == "all") {
			// getAllOrders()
			setAllOrders(allOrdersClone)
		} else {
			setAllOrders([...allOrdersClone].filter(o => o.status == value))
		}
	}
	return (
		<div className="filter-orders" id="f">
			<button
				onClick={() => handleButtonClick("all")}
				className={activeButton == "all" ? "active" : ""}
			>
				{t("all")}
			</button>
			{filterButtons.map((item, index) => (
				<button
					key={index}
					onClick={() => handleButtonClick(item.value)}
					className={activeButton == item.value ? "active" : ""}
				>
					{t(`status.${item.value}`)}
				</button>
			))}
		</div>
	)
}

const OrderBox = ({ order }) => {
	const { t } = useTranslation()

	const { createdAt: date, order_info, status, user } = order

	const { firstName, lastName } = user
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
		<div className="order-box">
			<div className="name">
				{firstName} {lastName}
			</div>
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

export default AllOrders
