import { Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { CartContext } from "../../../context/CartProvider"

const AddToCartForm = ({ product }) => {
	const { t } = useTranslation()
	// states
	const [selectedColor, setSelectedColor] = useState("")
	const [selectedSize, setSelectedSize] = useState("")
	const [quantity, setQuantity] = useState(0)
	const [showSelectBox, setShowSelectBox] = useState(false)
	const [errors, setErrors] = useState({})

	const ifValueFounded = () => selectedColor != "" || selectedSize != ""

	function handleChangeQuantity(e) {
		setQuantity(e.target.value)
		setErrors(pre => ({ ...pre, quantity: null }))
	}

	return (
		<div className="add-to-cart-form">
			<button onClick={() => setShowSelectBox(p => !p)}>{t("addToCart")}</button>

			{showSelectBox == true && (
				<React.Fragment>
					<div className="color-size-section">
						{product.colors && product.colors.length > 0 && (
							<div className="select-color">
								<h4>{t("selectYourColor")}</h4>

								<div id="color-items">
									{product.colors.map((color, index) => (
										<ColorItem
											setErrors={setErrors}
											color={color}
											key={index}
											setSelectedColor={setSelectedColor}
										/>
									))}
								</div>
							</div>
						)}

						{product.sizes && product.sizes.length > 0 && (
							<div className="select-size">
								<h4>{t("selectYourSize")}</h4>

								<div id="size-items">
									{product.sizes.map((size, index) => (
										<SizeItem
											setErrors={setErrors}
											size={size}
											key={index}
											setSelectedSize={setSelectedSize}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="qty">
						<FormControl fullWidth>
							<InputLabel id="quantity">{t("qty")}</InputLabel>
							<Select
								labelId="quantity"
								id="demo-simple-select"
								value={quantity}
								label="التقييم"
								onChange={handleChangeQuantity}
							>
								<MenuItem value={0}>{t("setQuantity")}</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
							</Select>
						</FormControl>
					</div>

					{ifValueFounded() && (
						<div className="selected-info">
							{selectedColor != "" && (
								<div style={{ background: selectedColor }} className="item"></div>
							)}
							{selectedSize != "" && <div className="item">{selectedSize}</div>}
						</div>
					)}

					<AddToCartButton
						product={product}
						selectedColor={selectedColor}
						selectedSize={selectedSize}
						quantity={quantity}
						errors={errors}
						setErrors={setErrors}
					/>
				</React.Fragment>
			)}
		</div>
	)
}

const AddToCartButton = ({ product, selectedColor, selectedSize, quantity, errors, setErrors }) => {
	const { t } = useTranslation()
	const { addItemToCart } = useContext(CartContext)

	function handleAddToCart() {
		if (quantity > 0) {
			let sizeFound = false
			let colorFound = false

			if (product.sizes && product.sizes.length > 0) {
				if (selectedSize) {
					sizeFound = true
				} else {
					setErrors(pre => ({ ...pre, sizes: t("selectYourSize") }))
				}
			} else {
				sizeFound = true
			}
			if (product.colors && product.colors.length > 0) {
				if (selectedColor) {
					colorFound = true
				} else {
					setErrors(pre => ({ ...pre, colors: t("selectYourColor") }))
				}
			} else {
				colorFound = true
			}

			if (sizeFound && colorFound) {
				const item = {
					product: product._id,
					selected_color: selectedColor,
					selected_size: selectedSize,
					quantity: quantity,
				}
				addItemToCart(item)
			}
		} else {
			setErrors(pre => ({ ...pre, quantity: t("setQuantity") }))
		}
	}

	return (
		<div className="add-to-cart-botton">
			{errors ? (
				<div className="errors">
					{Object.values(errors).map((err, i) => (
						<React.Fragment key={i}>{err && <Alert severity="error">{err}</Alert>}</React.Fragment>
					))}
				</div>
			) : null}
			<button onClick={handleAddToCart}>{t("sendToCart")}</button>
		</div>
	)
}

const ColorItem = ({ color, setSelectedColor, setErrors }) => {
	function handleClickItem(e) {
		const items = document.getElementById("color-items")
		items.childNodes.forEach(item => {
			item.classList.remove("active")
		})
		e.currentTarget.classList.add("active")
		setSelectedColor(e.currentTarget.childNodes[0].style.backgroundColor)
		setErrors(pre => ({ ...pre, colors: null }))
	}
	return (
		<p
			className="item"
			onClick={e => {
				handleClickItem(e)
			}}
		>
			<span style={{ backgroundColor: color }}></span>
		</p>
	)
}

const SizeItem = ({ size, setSelectedSize, setErrors }) => {
	function handleClickItem(e) {
		const items = document.getElementById("size-items")
		items.childNodes.forEach(item => {
			item.classList.remove("active")
		})
		e.currentTarget.classList.add("active")
		setSelectedSize(e.currentTarget.childNodes[0].textContent)
		setErrors(pre => ({ ...pre, sizes: null }))
	}
	return (
		<p
			className="item"
			onClick={e => {
				handleClickItem(e)
			}}
		>
			<span>{size}</span>
		</p>
	)
}

export default AddToCartForm
