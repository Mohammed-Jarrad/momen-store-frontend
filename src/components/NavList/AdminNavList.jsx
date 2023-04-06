import React, { useContext, useEffect, useRef, useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { AiOutlineLogout } from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { FaSitemap } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { TiDocumentText } from "react-icons/ti"
import { IoMdCreate } from "react-icons/io"
import { UserContext } from "../../context/UserProvider"
import { CgMenuRound } from "react-icons/cg"
import { useTranslation } from "react-i18next"
import { MdLanguage } from "react-icons/md"

const AdminNavList = ({ showLinks, setShowLinks }) => {
	const { t, i18n } = useTranslation()

	const { logout, user } = useContext(UserContext)
	const [showMenu, setShowMenu] = useState(false)
	const menu = useRef()
	const hideMenu = e => {
		if (!menu.current.contains(e.target)) setShowMenu(false)
	}
	const links = useRef()
	const hideLinks = e => {
		if (!links.current.contains(e.target)) setShowLinks(false)
	}

	useEffect(() => {
		window.addEventListener("mousedown", hideMenu)
		window.addEventListener("mousedown", hideLinks)
		return () => {
			window.removeEventListener("mousedown", hideLinks)
			window.removeEventListener("mousedown", hideMenu)
		}
	}, [])

	return (
		<ul className="admin-nav-list">
			<li ref={menu} className={`user-profile `}>
				<img
					src={"/assets/user_default_image.jpg"}
					alt={``}
					onClick={() => setShowMenu(prev => !prev)}
				/>
				<div className={`menu ${showMenu ? "show" : ""}`}>
					<p onClick={() => setShowMenu(false)}>
						<NavLink to={"/profile"}>
							<BsPersonCircle />
							<span>{`${user?.firstName} ${user?.lastName}`}</span>
						</NavLink>
					</p>
					<hr />
					<p
						className="logout-p"
						onClick={() => {
							setShowMenu(false)
							logout()
						}}
					>
						<AiOutlineLogout />
						<span>{t("logout")}</span>
					</p>
				</div>
			</li>

			<div className="links" ref={links}>
				<CgMenuRound className="toggle-menu" onClick={e => setShowLinks(prev => !prev)} />

				<div className={`links-lists ${!showLinks ? "hide" : ""}`}>
					<li
						className="language"
						title={t("changeLanguage")}
						onClick={() => {
							i18n.changeLanguage(i18n.language == "ar" ? "he" : "ar")
							setShowLinks(false)
						}}
					>
						<MdLanguage />
					</li>

					<li>
						<NavLink to="/all_products" onClick={() => setShowLinks(false)}>
							<FaSitemap />
							<p>{t("products")}</p>
						</NavLink>
					</li>

					<li>
						<NavLink to="/all_orders" onClick={() => setShowLinks(false)}>
							<TiDocumentText />
							<p>{t("allOrders")}</p>
						</NavLink>
					</li>

					<li>
						<NavLink to="/users" onClick={() => setShowLinks(false)}>
							<FiUsers />
							<p>{t("users")}</p>
						</NavLink>
					</li>

					<li>
						<NavLink to="/create_product" onClick={() => setShowLinks(false)}>
							<IoMdCreate />
							<p>{t("createProduct")}</p>
						</NavLink>
					</li>
				</div>
			</div>
		</ul>
	)
}

export default AdminNavList
