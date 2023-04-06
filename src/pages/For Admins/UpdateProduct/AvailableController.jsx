import { Switch } from "@mui/material"
import React, { useState } from "react"

const AvailableController = ({ setInputValues, inputValues }) => {
	function handleChange(e) {
		setInputValues(pre => {
			return {
				...pre,
				available: !inputValues.available,
			}
		})
	}

	return (
		<div className="available-controller">
			<span>متوفر؟</span>

			<div className="content">
				<Switch checked={inputValues.available} onChange={handleChange} />
			</div>
		</div>
	)
}

export default AvailableController
