import React, { useContext, useState } from "react"
import { UserContext } from "../../../context/UserProvider"
import { AiFillEdit } from "react-icons/ai"

const InfoBox = ({ name, placeholder, handleChangeInput, showEdit }) => {
	// context
	const { user } = useContext(UserContext)

	return (
		<div className="info-box">
			<div className="label">{placeholder}</div>
			{!showEdit ? (
				<div className="info">
					<span>{user[name]}</span>
				</div>
			) : (
				<div className="info-edit">
					<input type="text" placeholder={placeholder} defaultValue={user[name]} name={name} onChange={handleChangeInput} />
				</div>
			)}
		</div>
	)
}

export default InfoBox
