import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { HomeContext } from "../../../context/HomeProvider"
import "./UpdateProduct.scss"
import { createInputs } from "../CreateProduct/CreateProduct"
import Requests from "../../../utils/Requests"
import { LoadingContext } from "../../../context/LoadingProvider"
import Sizes from "./Sizes"
import Colors from "./Colors"
import InputBox from "./InputBox"
import { Img } from "react-image"
import UserImage from "/assets/user_default_image.jpg"
import { toast, ToastContainer } from "react-toastify"
import { Alert, CircularProgress } from "@mui/material"
import AvailableController from "./AvailableController"
import { Helmet } from "react-helmet"

const UpdateProduct = () => {
	// notify
	const notifyUpdatedProduct = () =>
		toast("تم تعديل المنتج بنجاح", {
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			position: "top-left",
		})
	// req
	const req = new Requests()
	// id
	const params = useParams()
	const { id: productId } = params

	// context
	const { findProduct, refreshProducts } = useContext(HomeContext)
	const { setLoading } = useContext(LoadingContext)

	// states
	const [product, setProduct] = useState({})
	const [inputValues, setInputValues] = useState({})
	const [sizes, setSizes] = useState([])
	const [colors, setColors] = useState([])

	// functions
	function handleChangeInputs(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
	}

	async function updateProduct(e) {
		e.preventDefault()
		setLoading(true)
		const newPro = {
			...inputValues,
			sizes,
			colors,
		}
		try {
			const res = await req.PutRequest(`/product/${productId}`, JSON.stringify(newPro))
			const data = await res.json()

			if (data) {
				setLoading(false)
				if (data.product) {
					notifyUpdatedProduct()
					refreshProducts()
				} else {
					console.log(data.errors)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	async function getProduct() {
		const p = await findProduct(productId)

		if (p.product) {
			const pro = p.product
			setProduct(await pro)
			setSizes(await pro.sizes)
			setColors(await pro.colors)
			setInputValues(pre => {
				return {
					...pre,
					imageURL: pro.imageURL,
					available: pro.available,
				}
			})
		} else {
			console.log(p.errors)
		}
	}

	useEffect(() => {
		getProduct()

		return () => getProduct()
	}, [])

	return (
		<div className="update-product">
			<Helmet title="تعديل المنتج" />
			{product._id == productId && (
				<>
					<div className="edit-box">
						<div className="form" onSubmit={updateProduct}>
							{createInputs.map((box, index) => (
								<React.Fragment key={index}>
									<InputBox
										handleChangeInputs={handleChangeInputs}
										name={box.name}
										placeholder={box.placeholder}
										type={box.type}
										product={product}
									/>
								</React.Fragment>
							))}

							<Sizes sizes={sizes} setSizes={setSizes} />

							<Colors colors={colors} setColors={setColors} />

							<AvailableController inputValues={inputValues} setInputValues={setInputValues} />

							<button className="edit" onClick={updateProduct}>
								تعديل المنتج
							</button>
						</div>

						<div className="image-view">
							<Img src={[inputValues.imageURL, UserImage]} alt="" loader={<CircularProgress />} />
						</div>
					</div>
					<ToastContainer />
				</>
			)}
		</div>
	)
}

export default UpdateProduct
