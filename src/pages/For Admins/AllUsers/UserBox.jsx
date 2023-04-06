import { memo, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { LoadingContext } from "../../../context/LoadingProvider"
import { OrderContext } from "../../../context/OrderProvider"
import { UserContext } from "../../../context/UserProvider"
import Requests from "../../../utils/Requests"
import UserImage from "/assets/user_default_image.jpg"

const UserBox = memo(({ user }) => {
	const { t } = useTranslation()

	// req
	const req = new Requests()
	// context
	const { setLoading } = useContext(LoadingContext)
	const { getAllUsers } = useContext(UserContext)
	// states
	const [ordersForUser, setOrdersForUser] = useState([])

	async function getOrdersForUser(userId) {
		setLoading()
		try {
			const res = await req.GetRequest(`/orders/user/${userId}`)
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.orders) {
					setOrdersForUser(data.orders)
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	useEffect(() => {
		getOrdersForUser(user._id)
	}, [])

	async function removeUser() {
		setLoading(true)
		try {
			const res = await req.DeleteRequest(`/user/${user._id}`)
			const data = await res.json()

			if (data) {
				setLoading(false)
				if (data.msg == "Deleted Success") {
					getAllUsers()
				} else {
					console.log(data.msg)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<div className="user-box" key={user._id}>
			<img src={UserImage} alt={`${user.firstName}`} />
			<div className="title">{`${user.firstName} ${user.lastName}`}</div>
			<div className="email" title={user.email}>
				{user.email}
			</div>
			<div className="location">{`${user.country}/${user.city}`}</div>
			<div className="phone">{user.phone}</div>
			<div className="orders-length">
				{t("ordersCount")}:<span> {ordersForUser.length}</span>
			</div>
			<button className="delete" onClick={removeUser}>
				{t("deleteUser")}
			</button>
		</div>
	)
})

export default UserBox
