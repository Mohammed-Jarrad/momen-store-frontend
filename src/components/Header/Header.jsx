import React from "react"
import "./Header.scss"
import NavList from "../NavList/NavList"
import { NavLink, useNavigate } from "react-router-dom"
import { Img } from "react-image"

const Header = () => {
	const navigate = useNavigate()

	return (
		<header className="header">
			<div className="container">
				<NavList />
				<Img
					src={"/assets/full logo.png"}
					onClick={() => navigate("/", { replace: true })}
					className="logo"
				></Img>
			</div>
		</header>
	)
}

export default Header
