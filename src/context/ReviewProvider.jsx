import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"
import { UserContext } from "./UserProvider"

export const ReviewContext = createContext({})

const ReviewProvider = ({ children }) => {
	// context
	const { setLoading } = useContext(LoadingContext)
	const { token, user } = useContext(UserContext)

	//Requests
	const req = new Requests()

	// states
	const [reviews, setReviews] = useState([])

	// functions
	async function getReviews() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/reviews")
			const data = await res.json()

			if (data) {
				setLoading(false)
				if (data?.reviews) {
					setReviews(data.reviews)
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	async function createReview(rating, comment, product) {
		const review = {
			user: user._id,
			product: product._id,
			comment,
			rating: rating == 0 ? "" : rating,
		}
		setLoading(true)
		try {
			const res = await req.PostRequest(`/review`, JSON.stringify(review))
			const data = await res.json({})
			if (data) {
				setLoading(false)
				return data
			}
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return (
		<ReviewContext.Provider
			value={{
				getReviews,
				reviews,
				setReviews,
				createReview,
			}}
			children={children}
		/>
	)
}

export default ReviewProvider
