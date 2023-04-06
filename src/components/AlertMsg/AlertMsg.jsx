import React from "react"
import { Alert, Snackbar } from "@mui/material"
import { toast, ToastContainer } from "react-toastify"

const AlertMsg = ({ msg }) => {
	const notify = () => {
		return toast(msg, {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			position: "top-left",
		})
	}

	return <ToastContainer>

            {notify()}
        
    </ToastContainer>
}

export default AlertMsg
