import "./NavList.scss"
import { useContext, useState } from "react"
import UserNavList from "./UserNavList"
import NotUserNavList from "./NotUserNavList"
import AdminNavList from "./AdminNavList"
import { UserContext } from "../../context/UserProvider"
import { useTranslation } from "react-i18next"

const NavList = () => {
	const { t } = useTranslation()

	// context
	const { token, admin } = useContext(UserContext)
	// state
	const [showLinks, setShowLinks] = useState(false)

	return (
		<>
			<div className="nav-list-div">
				{token ? (
					<>
						{admin == true ? (
							<AdminNavList setShowLinks={setShowLinks} showLinks={showLinks} />
						) : admin == false ? (
							<UserNavList setShowLinks={setShowLinks} showLinks={showLinks} />
						) : (
							<>{t("loadingText")}</>
						)}
					</>
				) : (
					<NotUserNavList />
				)}
			</div>
		</>
	)
}

export default NavList
