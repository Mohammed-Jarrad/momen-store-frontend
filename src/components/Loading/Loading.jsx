import { Backdrop, Box, CircularProgress, LinearProgress } from "@mui/material"

export default function Loading({ open, setOpen }) {
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={open ? true : false} onClick={handleClose}>
				<CircularProgress color="success" />
			</Backdrop>
		</>
	)
}
