import React, { useContext, useEffect, useTransition } from "react"
import "./Footer.scss"
import {
	AiFillLinkedin,
	AiFillInstagram,
	AiFillHome,
	AiFillPhone,
	AiFillMail,
} from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { IoLogoWhatsapp } from "react-icons/io"
import { HomeContext } from "../../context/HomeProvider"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { InfosContext } from "../../context/InfosProvider"
import { useTranslation } from "react-i18next"

const Footer = () => {
	const { t } = useTranslation()

	const { categories } = useContext(HomeContext)
	const { getInfos, infos } = useContext(InfosContext)

	useEffect(() => {
		getInfos()
	}, [])

	const website_info = infos[0]

	return (
		<footer className="footer">
			<div className="container">
				<div className="info">
					<div className="categories">
						<h3 className="title">{t("categories")}</h3>

						<div className="items">
							{categories.map(cate => (
								<NavLink to={`/category/${cate}`} key={cate}>
									{cate}
								</NavLink>
							))}
						</div>
					</div>

					<div className="contact">
						<h3 className="title">{t("toConnect")}</h3>
						<div className="content">
							<div className="phone">
								<AiFillPhone />
								<p>{website_info?.phone}</p>
							</div>
							<div>
								<AiFillMail />
								<p>{website_info?.email}</p>
							</div>
						</div>
					</div>

					<div className="logo">
						<img src="/assets/full logo.png" alt="" width={200} />
					</div>
				</div>

				<hr />

				<div className="social">
					<div className="copy">2023 &copy; Copyright</div>
					<div className="icons">
						<Link to={website_info?.facebook_link}>
							<BsFacebook className="facebook-icon" />
						</Link>
						<Link to={website_info?.instagram_link}>
							<AiFillInstagram className="instagram-icon" />
						</Link>
						<Link to={website_info?.whatsapp_link}>
							<IoLogoWhatsapp className="whatsapp-icon" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
