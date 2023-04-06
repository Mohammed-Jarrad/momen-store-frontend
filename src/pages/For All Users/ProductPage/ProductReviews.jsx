import { Alert, FormControl, InputLabel, MenuItem, Select, TextareaAutosize } from "@mui/material"
import { t } from "i18next"
import React, { useContext, useState } from "react"
import Stars from "../../../components/Stars/Stars"
import { HomeContext } from "../../../context/HomeProvider"
import { LoadingContext } from "../../../context/LoadingProvider"
import { ReviewContext } from "../../../context/ReviewProvider"
import { UserContext } from "../../../context/UserProvider"
import ReviewBox from "./ReviewBox"

const ProductReviews = ({ product, refreshCurrentProduct }) => {
	// context
	const { createReview } = useContext(ReviewContext)
	const { loading } = useContext(LoadingContext)
	const { token, admin } = useContext(UserContext)
	const { refreshProducts } = useContext(HomeContext)

	// states
	const [rate, setRate] = useState(0)
	const [comment, setComment] = useState("")
	const [reviewErrors, setReviewErrors] = useState({})
	//
	const { reviews } = product

	function handleChangeRate(e) {
		setRate(e.target.value)
		setReviewErrors(pre => ({ ...pre, rating: null }))
	}

	function handleChangeComment(e) {
		setComment(e.target.value)
		setReviewErrors(pre => ({ ...pre, comment: null }))
	}

	async function handleAddReview(e) {
		e.preventDefault()
		const data = await createReview(rate, comment, product)
		if (data) {
			if (data.review) {
				refreshCurrentProduct()
				refreshProducts()
				setRate(0)
				setComment("")
			} else {
				setReviewErrors(data.errors)
			}
		}
	}

	return (
		<div className="product-reviews">
			{token && (
				<>
					{!admin && (
						<div className="add-review-box">
							<form onSubmit={e => handleAddReview(e)}>
								<FormControl fullWidth>
									<InputLabel id="rate">{t("qty")}</InputLabel>
									<Select
										labelId="rate"
										id="demo-simple-select"
										value={rate}
										label="التقييم"
										onChange={handleChangeRate}
									>
										<MenuItem value={0}>{t("setYourRate")}</MenuItem>
										<MenuItem value={1}>{t("rates.bad")}</MenuItem>
										<MenuItem value={2}>{t("rates.fair")}</MenuItem>
										<MenuItem value={3}>{t("rates.good")}</MenuItem>
										<MenuItem value={4}>{t("rates.veryGood")}</MenuItem>
										<MenuItem value={5}>{t("rates.excellent")}</MenuItem>
									</Select>
								</FormControl>

								<Stars value={rate} />

								<TextareaAutosize
									style={{
										resize: "vertical",
									}}
									color="warning"
									disabled={false}
									minRows={4}
									placeholder={t("writeComment")}
									size="sm"
									variant="plain"
									onChange={handleChangeComment}
									value={comment}
									className="comment-box"
								/>

								{reviewErrors && (
									<div className="errors">
										{Object.values(reviewErrors).map((err, i) => (
											<React.Fragment key={i}>
												{err && <Alert severity="error">{err}</Alert>}
											</React.Fragment>
										))}
									</div>
								)}
								<button className="add-review-button">{t("addComment")}</button>
							</form>
						</div>
					)}
				</>
			)}

			<div className="view-reviews-box">
				{reviews && reviews.length > 0 && (
					<div className="reviews">
						{reviews.map(re => (
							<ReviewBox review={re} key={re._id} refreshCurrentProduct={refreshCurrentProduct} />
						))}
					</div>
				)}

				{reviews && reviews.length == 0 && !loading && (
					<div className="no-reviews">{t("noRatesNow")}</div>
				)}
			</div>
		</div>
	)
}

export default ProductReviews
