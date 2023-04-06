import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import "./ErrorPage.scss"
import NotFound from "/assets/404.jpg"

const ErrorPage = () => {
	const { t } = useTranslation()

	return (
		<div className="error-page">
			<Helmet title="404" />
			<img src={NotFound} alt="" />

			<NavLink to="/">{t("mainPage")}</NavLink>
		</div>
	)
}

export default ErrorPage
