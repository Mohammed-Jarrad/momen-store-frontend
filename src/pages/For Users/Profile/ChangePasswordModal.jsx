import React, { useContext, useState, useTransition } from "react"
import Modal from "react-modal"
import { LoadingContext } from "../../../context/LoadingProvider"
import { AiFillCloseCircle } from "react-icons/ai"
import { Alert } from "@mui/material"
import Requests from "../../../utils/Requests"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTranslation } from "react-i18next"

Modal.setAppElement("#root")

function ChangePasswordModal() {
	const { t } = useTranslation()
	// toast
	const notifyChangePassword = () =>
		toast(t("passwordChanged"), {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			position: "top-left",
		})
	// * states
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [inputValues, setInputValues] = useState({})
	const [showPass, setShowPass] = useState(false)
	const [changeErrors, setChangeErrors] = useState({})

	// * context
	const { setLoading } = useContext(LoadingContext)

	// * functions
	function openModal() {
		setModalIsOpen(true)
	}

	function closeModal() {
		setModalIsOpen(false)
	}

	function handleChangeInput(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
		setChangeErrors({})
	}

	async function changePassword(e) {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await new Requests().PutRequest("/change_password", JSON.stringify(inputValues))
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.user) {
					localStorage.token = data.token
					setModalIsOpen(false)
					notifyChangePassword()
				} else if (data.errors) {
					setChangeErrors({
						errors: data.errors,
					})
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<div className="change-password">
			<button className="change-pass" onClick={openModal}>
				{t("changePassword")}
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				className="modal change-password-model"
				closeTimeoutMS={150}
				overlayClassName="modal-overlay"
			>
				<div className="content">
					<AiFillCloseCircle className="close" onClick={closeModal} />

					<form onSubmit={changePassword}>
						<div>
							<h4>{t("oldPass")}</h4>
							<input
								type={`${showPass ? "text" : "password"}`}
								name="enteredPassword"
								placeholder={t("oldPass")}
								required
								minLength={6}
								onChange={e => handleChangeInput(e)}
							/>
						</div>
						<div>
							<h4>{t("newPass")}</h4>
							<input
								type={`${showPass ? "text" : "password"}`}
								name="newPassword"
								placeholder={t("newPass")}
								required
								minLength={6}
								onChange={e => handleChangeInput(e)}
							/>
						</div>
						<div className="show-password">
							<input
								onChange={() => setShowPass(p => !p)}
								type="checkbox"
								name="showpass"
								id="showpass"
							/>
							<label htmlFor="showpass">{t("showPass")}</label>
						</div>

						{changeErrors ? (
							<div className="errors">
								{Object.values(changeErrors).map((err, i) => (
									<React.Fragment key={i}>
										{err && (
											<Alert severity="error">{t("كلمة المرور التي أدخلتها غير صحيحة")}</Alert>
										)}
									</React.Fragment>
								))}
							</div>
						) : null}

						<div className="options">
							<button onSubmit={changePassword} className="change">
								{t("change")}
							</button>
						</div>
					</form>

					<button onClick={e => setModalIsOpen(false)} className="cancel">
						{t("cancel")}
					</button>
				</div>
			</Modal>

			<ToastContainer />
		</div>
	)
}

export default ChangePasswordModal
