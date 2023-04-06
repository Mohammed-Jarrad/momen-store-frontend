import "./Login.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Alert } from "@mui/material"
import React, { useContext, useState } from "react"
import { LoadingContext } from "../../../context/LoadingProvider"
import { UserContext } from "../../../context/UserProvider"
import { baseURL } from "../../../utils/Requests"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const Login = () => {
	const { t } = useTranslation()
	// navigate
	const navigate = useNavigate()
	// states
	const [showPass, setShowPass] = useState(false)
	const [loginErrors, setLoginErrors] = useState({})
	const [inputValues, setInputValues] = useState({})

	const { setLoading } = useContext(LoadingContext)
	const { setToken, setUser, setAdmin } = useContext(UserContext)

	//handleChangeInput
	const handleChangeInput = e => {
		setInputValues(prevValue => ({
			...prevValue,
			[e.target.name]: e.target.value,
		}))
		setLoginErrors(prev => ({ ...prev, [e.target.name]: null }))
	}
	//login
	async function login(e) {
		e.preventDefault()
		setLoading(true)
		const user = {
			email: inputValues?.email,
			password: inputValues?.password,
		}
		try {
			const res = await fetch(`${baseURL}/login`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(user),
			})
			const data = await res.json()
			if (data) {
				if (data.user) {
					localStorage.setItem("token", data.token)
					data?.user?.admin == true ? setAdmin(true) : setAdmin(false)
					navigate("/", { replace: true })
				} else if (data.errors) {
					setLoginErrors(data.errors)
				}
				setLoading(false)
			}
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	return (
		<div className="login-page">
			<Helmet title={t("login")} />
			<div className="container">
				<div className="login-box">
					<span>
						{t("dontHaveAccount")}
						<NavLink to="/signup">{t("signup")}</NavLink>
					</span>

					<form onSubmit={login}>
						<div className="inputs">
							<div className="input-box">
								<AiOutlineUser />
								<input
									name="email"
									type="email"
									placeholder={t("email")}
									onChange={e => handleChangeInput(e)}
									required
								/>
							</div>
							<div className="input-box">
								<AiOutlineLock />
								<input
									type={`${showPass ? "text" : "password"}`}
									name="password"
									placeholder={t("password")}
									onChange={e => handleChangeInput(e)}
									required
									minLength={6}
								/>
								<div className="eyes" onClick={() => setShowPass(p => !p)}>
									{showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
								</div>
							</div>
						</div>

						{loginErrors ? (
							<div className="errors">
								{Object.values(loginErrors).map((err, i) => (
									<React.Fragment key={i}>
										{err && <Alert severity="error">{t(`loginErrors.${err}`)}</Alert>}
									</React.Fragment>
								))}
							</div>
						) : null}

						<button className="submit">{t("login")}</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
