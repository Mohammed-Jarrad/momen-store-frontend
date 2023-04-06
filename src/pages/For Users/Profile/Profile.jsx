import { useContext, useState } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { InfosContext } from "../../../context/InfosProvider"
import { LoadingContext } from "../../../context/LoadingProvider"
import { UserContext } from "../../../context/UserProvider"
import Requests from "../../../utils/Requests"
import ChangePasswordModal from "./ChangePasswordModal"
import InfoBox from "./InfoBox"
import "./Profile.scss"

const boxes = [
	{ a: "الإسم الأول", e: "firstName" },
	{ a: "الإسم الأخير", e: "lastName" },
	{ a: "البريد الإلكتروني", e: "email" },
	{ a: "الدولة", e: "country" },
	{ a: "المدينة", e: "city" },
	{ a: "رقم الهاتف", e: "phone" },
]

const Profile = () => {
	const { t } = useTranslation()
	const req = new Requests()
	// context
	const { user, admin } = useContext(UserContext)
	const { setLoading } = useContext(LoadingContext)

	// states
	const [showEdit, setShowEdit] = useState(false)
	const [inputValues, setInputValues] = useState({})

	function handleChangeInput(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
	}

	// updateUser
	async function updateUser() {
		setLoading(true)
		const newUser = inputValues

		try {
			const res = await req.PutRequest(`/user`, JSON.stringify(newUser))
			const data = await res.json()

			if (data) {
				setLoading(false)
				if (data.user) {
					localStorage.token = await data.token
					setShowEdit(false)
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	return (
		<div className="profile-page">
			<Helmet title={t("profilePage")} />
			{admin == false ? (
				<div className="profile-box container">
					<div className="title">
						<img src={"/assets/user_default_image.jpg"} alt="" />
						<h1>
							{user?.firstName} {user?.lastName}
						</h1>

						<button onClick={() => setShowEdit(p => !p)}>{t("updateInfo")}</button>
						<ChangePasswordModal />
					</div>

					<div className="infos">
						{boxes.map((box, i) => {
							return (
								<InfoBox
									key={i}
									placeholder={t(`infos.${box.e}`)}
									handleChangeInput={handleChangeInput}
									name={box.e}
									showEdit={showEdit}
									setShowEdit={setShowEdit}
								/>
							)
						})}
					</div>

					{showEdit == true && (
						<div className="options">
							<button className="accept" onClick={updateUser}>
								{t("update")}
							</button>
							<button
								className="cancel"
								onClick={() => {
									setInputValues({})
									setShowEdit(false)
								}}
							>
								{t("cancel")}
							</button>
						</div>
					)}
				</div>
			) : admin == true ? (
				<AdminProfile />
			) : null}
		</div>
	)
}

export default Profile

const AdminProfile = () => {
	const { t } = useTranslation()

	const admin_boxes = [
		{ a: t("adminInfos.facebookLink"), e: "facebook_link" },
		{ a: t("adminInfos.instagramLink"), e: "instagram_link" },
		{ a: t("adminInfos.phone"), e: "phone" },
		{ a: t("adminInfos.whatsappLink"), e: "whatsapp_link" },
		{ a: t("adminInfos.email"), e: "email" },
	]
	const { infos, updateInfos } = useContext(InfosContext)
	const info = infos.length ? infos[0] : []

	const [inputValues, setInputValues] = useState({})
	function handleChangeInput(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
	}
	return (
		<div className="admin-profile">
			<ChangePasswordModal />

			{admin_boxes.map((box, index) => {
				return (
					<div className="box" key={index} style={{ marginTop: "20px" }}>
						<p>{box.a}</p>
						<input
							onChange={handleChangeInput}
							type="text"
							placeholder={box.a}
							name={box.e}
							defaultValue={info ? info[box.e] : null}
						/>
					</div>
				)
			})}

			<button onClick={() => updateInfos(info._id, inputValues)} className="change-infos-button">
				{t("changeSiteInfos")}
			</button>
		</div>
	)
}
