import { TiUserAdd } from "react-icons/ti"
import { AiOutlineLogin } from "react-icons/ai"

import React from "react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MdLanguage } from "react-icons/md"

const NotUserNavList = () => {
	const { t, i18n } = useTranslation()

	return (
		<ul className="not-user-nav-list">
			{/* if not signed user */}

			<li
				className="language"
				title={t("changeLanguage")}
				onClick={() => {
					i18n.changeLanguage(i18n.language == "ar" ? "he" : "ar")
				}}
			>
				<MdLanguage />
			</li>

			<li title={t("login")}>
				<NavLink to="/login">
					<p>{t("login")}</p>
					<AiOutlineLogin />
				</NavLink>
			</li>

			<li title={t("signup")}>
				<NavLink to="/signup">
					<p>{t("signup")}</p>
					<TiUserAdd />
				</NavLink>
			</li>
		</ul>
	)
}

export default NotUserNavList
