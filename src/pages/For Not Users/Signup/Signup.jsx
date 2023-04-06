import React, { useContext, useState } from "react"
import "./Signup.scss"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { NavLink, useNavigate } from "react-router-dom"
import { Alert } from "@mui/material"
import { baseURL } from "../../../utils/Requests"
import { UserContext } from "../../../context/UserProvider"
import { LoadingContext } from "../../../context/LoadingProvider"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const Signup = () => {
	const { t } = useTranslation()
	// navigate
	const navigate = useNavigate()
	// states
	const [inputValues, setInputValues] = useState({})
	const [signupErrors, setSignupErrors] = useState({})
	const [showPass, setShowPass] = useState(false)
	// context
	const { setLoading } = useContext(LoadingContext)
	const { setAdmin } = useContext(UserContext)

	function handleChangeInput(e) {
		setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
		setSignupErrors(prev => ({ ...prev, [e.target.name]: null }))
	}

	async function signup(e) {
		e.preventDefault()
		const newUser = {
			firstName: inputValues?.firstName,
			lastName: inputValues?.lastName,
			email: inputValues?.email,
			password: inputValues?.password,
			country: inputValues?.country,
			city: inputValues?.city,
			phone: inputValues?.phone,
		}
		try {
			const res = await fetch(`${baseURL}/signup`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(newUser),
			})
			const data = await res.json()
			if (data) {
				if (data.user) {
					localStorage.setItem("token", data.token)
					data?.user?.admin == true ? setAdmin(true) : setAdmin(false)
					// window.location.replace("/")
					navigate("/", { replace: true })
				} else if (data.errors) {
					setSignupErrors(data.errors)
				}
				setLoading(false)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="signup-page">
			<Helmet title={t("signup")} />
			<div className="container">
				<div className="signup-box">
					<span>
						{t("doHaveAccount")}
						<NavLink to="/login">{t("login")}</NavLink>
					</span>
					<form onSubmit={signup}>
						<label htmlFor="firstName">
							<span>{t("infos.firstName")}</span>
							<input
								type="text"
								placeholder={t("infos.firstName")}
								name="firstName"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						<label htmlFor="lastName">
							<span>{t("infos.lastName")}</span>
							<input
								type="text"
								placeholder={t("infos.lastName")}
								name="lastName"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						<label htmlFor="email">
							<span>{t("infos.email")}</span>
							<input
								type="email"
								placeholder={t("infos.email")}
								name="email"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						<label htmlFor="password" className="pass">
							<span>{t("password")}</span>
							<input
								type={`${showPass ? "text" : "password"}`}
								placeholder={t("password")}
								name="password"
								onChange={e => handleChangeInput(e)}
							/>
							<div className="eyes" onClick={() => setShowPass(p => !p)}>
								{showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
							</div>
						</label>

						<label htmlFor="country">
							<span>{t("infos.country")}</span>
							<input
								type="text"
								placeholder={t("infos.country")}
								name="country"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						<label htmlFor="city">
							<span>{t("infos.city")}</span>
							<input
								type="text"
								placeholder={t("infos.city")}
								name="city"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						<label htmlFor="phone">
							<span>{t("infos.phone")}</span>
							<input
								type="text"
								placeholder={t("infos.phone")}
								name="phone"
								onChange={e => handleChangeInput(e)}
							/>
						</label>

						{signupErrors ? (
							<div className="errors">
								{Object.values(signupErrors).map((err, i) => (
									<React.Fragment key={i}>
										{err && <Alert severity="error">{t(`signupErrors.${err}`)}</Alert>}
									</React.Fragment>
								))}
							</div>
						) : null}

						<button className="submit">{t("signup")}</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Signup
