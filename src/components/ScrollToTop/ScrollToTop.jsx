import React, { useState, useEffect } from "react"
import "./ScrollToTop.scss"
import { BsCloudArrowUpFill } from "react-icons/bs"

export const handleGoTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

const ScrollToTop = () => {
	// states
	const [showTopButton, setShowTopButton] = useState(false)

	const handleScroll = _ => {
		if (window.scrollY >= 300) {
			setShowTopButton(true)
		} else {
			setShowTopButton(false)
		}
	}

	useEffect(_ => {
		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<>
			{showTopButton ? (
				<span className="go-top" onClick={handleGoTop}>
					<BsCloudArrowUpFill />
				</span>
			) : null}
		</>
	)
}

export default ScrollToTop
