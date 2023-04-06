import React, { useContext, useState } from "react"
import Modal from "react-modal"
import { LoadingContext } from "../../../context/LoadingProvider"
import { AiFillCloseCircle } from "react-icons/ai"
import { Alert } from "@mui/material"
import Requests from "../../../utils/Requests"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CartContext } from "../../../context/CartProvider"
import { useNavigate } from "react-router-dom"

Modal.setAppElement("#root")

function CreateOrderModal() {
	// * states
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [inputValues, setInputValues] = useState({})
	const [errors, setErrors] = useState({})

	// * context
	const { setLoading } = useContext(LoadingContext)
	const { cart, getUserCart } = useContext(CartContext)
	const cart_info = [...cart.cart_info]

	const navigate = useNavigate()

	// * functions
	function openModal() {
		setModalIsOpen(true)
	}

	function closeModal() {
		setModalIsOpen(false)
	}

	function handleChangeInput(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
		setErrors(pre => ({ ...pre, [e.target.name]: null }))
	}

	async function createOrder(e) {
		e.preventDefault()
		setLoading(true)
		try {
			const order_info = []
			cart_info.forEach(item => {
				order_info.push({
					product: item.product._id,
					quantity: item.quantity,
					selected_size: item?.selected_size || "",
					selected_color: item?.selected_color || "",
				})
			})
			const newOrder = {
				location: {
					country: inputValues?.country || "",
					city: inputValues?.city || "",
					address: inputValues?.address || "",
				},
				order_info,
			}
			const res = await new Requests().PostRequest(`/order`, JSON.stringify(newOrder))
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.order) {
					// getUserOrders()
					getUserCart()
					navigate("/orders")
				} else {
					setErrors(data.errors)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<div className="create-modal">
			<button className="create-order-button" onClick={openModal}>
				تقديم الطلب
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				className="modal create-order-modal"
				closeTimeoutMS={150}
				overlayClassName="modal-overlay"
			>
				<div className="content">
					<AiFillCloseCircle className="close" onClick={closeModal} />

					<h3>تأكيد معلومات الطلب</h3>

					<form onSubmit={createOrder}>
						<div className="input-box">
							<p>أدخل الدولة</p>
							<input onChange={handleChangeInput} type="text" name="country" placeholder="الدولة..." />
						</div>
						<div className="input-box">
							<p>أدخل المدينة</p>
							<input onChange={handleChangeInput} type="text" name="city" placeholder="المدينة..." />
						</div>
						<div className="input-box">
							<p>أدخل العنوان التفصيلي</p>
							<input onChange={handleChangeInput} type="text" name="address" placeholder="العنوان..." />
						</div>

						{errors ? (
							<div className="errors">
								{Object.values(errors).map((err, i) => (
									<React.Fragment key={i}>{err && <Alert severity="error">{err}</Alert>}</React.Fragment>
								))}
							</div>
						) : null}

						<button>تقديم الطلب</button>
					</form>
				</div>
			</Modal>

			<ToastContainer />
		</div>
	)
}

export default CreateOrderModal
