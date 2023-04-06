import { useContext, useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { CartContext } from "../../context/CartProvider"
import { UserContext } from "../../context/UserProvider"
import { RiShoppingBag3Fill } from "react-icons/ri"
import { BsPersonCircle } from "react-icons/bs"
import { AiFillHome, AiOutlineLogout, AiOutlineUnorderedList } from "react-icons/ai"
import { TiDocumentText } from "react-icons/ti"
import UserImage from "/assets/user_default_image.jpg"
import { CgMenuRound } from "react-icons/cg"
import { useTranslation } from "react-i18next"
import { MdLanguage } from "react-icons/md"

const UserNavList = ({ showLinks, setShowLinks }) => {
	const { t, i18n } = useTranslation()
	// context
	const { user } = useContext(UserContext)
	const { cart, getUserCart } = useContext(CartContext)

	// states
	const [showMenu, setShowMenu] = useState(false)
	// context
	const { logout } = useContext(UserContext)

	// ref
	const menu = useRef()
	const links = useRef()
	const hideLinks = e => {
		if (!links.current.contains(e.target)) setShowLinks(false)
	}
	const hideMenu = e => {
		if (!menu.current.contains(e.target)) setShowMenu(false)
	}

	useEffect(() => {
		getUserCart()
		window.addEventListener("mousedown", hideMenu)
		window.addEventListener("mousedown", hideLinks)

		return () => {
			window.removeEventListener("mousedown", hideMenu)
			window.removeEventListener("mousedown", hideLinks)
		}
	}, [])

	return (
		<ul className="user-nav-list">
			{/* if singed user */}
			<li ref={menu} className={`user-profile `}>
				<img
					src={UserImage}
					alt={`${user?.firstName} ${user?.lastName} image`}
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
				<button className="toggle-menu" onClick={() => setShowLinks(p => !p)}>
					<CgMenuRound />
				</button>

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
						<NavLink to="/" onClick={() => setShowLinks(false)}>
							<AiFillHome />
							<p>{t("mainPage")}</p>
						</NavLink>
					</li>

					<li>
						<NavLink to="/orders" onClick={() => setShowLinks(false)}>
							<TiDocumentText />
							<p>{t("orders")}</p>
						</NavLink>
					</li>

					<li>
						<NavLink to="/cart" onClick={() => setShowLinks(false)}>
							<RiShoppingBag3Fill />
							<p>{t("cart")}</p>
							<span className="cart-length">{cart.cart_info?.length}</span>
						</NavLink>
					</li>
				</div>
			</div>
		</ul>
	)
}

export default UserNavList
