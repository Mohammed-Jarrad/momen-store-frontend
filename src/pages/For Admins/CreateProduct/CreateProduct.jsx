import React, { useContext, useState } from "react"
import { LoadingContext } from "../../../context/LoadingProvider"
import "./CreateProduct.scss"
import InputBox from "./InputBox"
import { Img } from "react-image"
import UserImage from "/assets/user_default_image.jpg"
import { Alert, CircularProgress } from "@mui/material"
import Sizes from "./Sizes"
import Colors from "./Colors"
import Requests from "../../../utils/Requests"
import { toast, ToastContainer } from "react-toastify"
import { Helmet } from "react-helmet"
import { HomeContext } from "../../../context/HomeProvider"

export const createInputs = [
	{ type: "text", name: "title", placeholder: "عنوان المنتج" },
	{ type: "text", name: "category", placeholder: "فئة المنتج" },
	{ type: "number", name: "price", placeholder: "سعر المنتج" },
	{ type: "number", name: "discount", placeholder: "قيمة الخصم" },
	{ type: "text", name: "imageURL", placeholder: "رابط صورة المنتج" },
	{ type: "text", name: "desc", placeholder: "مواصفات المنتج" },
]

const CreateProduct = () => {
	// notify
	const notifyCreatedProduct = () =>
		toast("تم إنشاء المنتج بنجاح", {
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
	// context
	const { setLoading } = useContext(LoadingContext)
	const { refreshProducts } = useContext(HomeContext)
	// states
	const [inputValues, setInputValues] = useState({})
	const [sizes, setSizes] = useState([])
	const [colors, setColors] = useState([])
	const [createErrors, setCreateErrors] = useState({})

	// functions
	function handleChangeInputs(e) {
		setInputValues(pre => ({ ...pre, [e.target.name]: e.target.value }))
		setCreateErrors(pre => ({ ...pre, [e.target.name]: null }))
	}

	// ! create product
	async function createProduct(e) {
		e.preventDefault()
		setLoading(true)
		const newProduct = {
			title: inputValues.title ? inputValues.title : "",
			category: inputValues.category ? inputValues.category : "",
			price: inputValues.price ? inputValues.price : null,
			discount: inputValues.discount ? inputValues.discount : 0,
			imageURL: inputValues.imageURL ? inputValues.imageURL : "",
			desc: inputValues.desc ? inputValues.desc : "",
			sizes: sizes,
			colors: colors,
		}
		try {
			const res = await req.PostRequest("/product", JSON.stringify(newProduct))
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.product) {
					notifyCreatedProduct()
					refreshProducts()
				} else {
					setCreateErrors(data.errors)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<div className="create-product">
			<Helmet title="إنشاء منتج" />
			<div className="create-box">
				<div className="form">
					{createInputs.map((box, index) => (
						<React.Fragment key={index}>
							<InputBox
								handleChangeInputs={handleChangeInputs}
								name={box.name}
								placeholder={box.placeholder}
								type={box.type}
							/>
							{createErrors[box.name] && (
								<div className="errors">
									<Alert severity="error">{createErrors[box.name]}</Alert>
								</div>
							)}
						</React.Fragment>
					))}

					<Sizes sizes={sizes} setSizes={setSizes} />

					<Colors colors={colors} setColors={setColors} />

					<button className="create" onClick={createProduct}>
						إنشاء منتج
					</button>
				</div>

				<div className="image-view">
					{inputValues.imageURL ? null : <p>سوف تظهر الصورة هنا عندما تضع رابط صحيح</p>}

					<Img src={[inputValues.imageURL, UserImage]} alt="" loader={<CircularProgress />} />
				</div>
			</div>

			<ToastContainer />
		</div>
	)
}

export default CreateProduct
