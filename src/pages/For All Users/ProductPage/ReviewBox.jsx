import { CircularProgress } from "@mui/material"
import React, { useContext } from "react"
import { Img } from "react-image"
import Stars from "../../../components/Stars/Stars"
import UserImage from "/assets/user_default_image.jpg"
import { MdDelete } from "react-icons/md"
import { LoadingContext } from "../../../context/LoadingProvider"
import Requests from "../../../utils/Requests"
import { toast, ToastContainer } from "react-toastify"
import { UserContext } from "../../../context/UserProvider"
import { HomeContext } from "../../../context/HomeProvider"
import { GetDate } from "../../For Users/Orders/Orders"

const ReviewBox = ({ review, refreshCurrentProduct }) => {
	// toast
	const notifyDeletedSuccess = msg =>
		toast(msg, {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			position: "top-left",
		})

	// context
	const { setLoading } = useContext(LoadingContext)
	const { user, admin } = useContext(UserContext)
	const { refreshProducts } = useContext(HomeContext)

	// variables
	const { _id, date, rating } = review

	async function deleteReview(id) {
		setLoading(true)
		try {
			const res = await new Requests().DeleteRequest(`/review/${id}`)
			const data = await res.json()

			if (data.msg == "delete success") {
				notifyDeletedSuccess("تم حذف المنتج")
				refreshCurrentProduct()
				refreshProducts()
				setLoading(false)
			} else {
				notifyDeletedSuccess("تعذر حذف المنتج")
				setLoading(false)
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<div className="review">
			<div className="user">
				<div className="user-info">
					<Img src={UserImage} loader={<CircularProgress />}></Img>

					<div className="name">
						<span>{`${review.user.firstName} ${review.user.lastName}`}</span>
						<Stars value={rating} />
					</div>

					<span className="date">
						<GetDate date={date} />
					</span>
				</div>

				{review.user._id == user._id || admin ? (
					<MdDelete onClick={() => deleteReview(review._id)} />
				) : null}
			</div>

			<div className="body">
				{typeof review.comment == "string" && (
					<div className="comment">
						{review.comment.split("\n").map((line, index) => (
							<div className="line" key={index}>
								{line}
							</div>
						))}
					</div>
				)}
			</div>

			<ToastContainer />
		</div>
	)
}

export default ReviewBox
