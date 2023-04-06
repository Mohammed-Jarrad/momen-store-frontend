import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"

export const sizeOptions = [
	{ label: "XS", value: "xs" },
	{ label: "S", value: "s" },
	{ label: "M", value: "m" },
	{ label: "L", value: "l" },
	{ label: "Xl", value: "xl" },
	{ label: "XXL", value: "xxl" },
	{ label: "35", value: "35" },
	{ label: "36", value: "36" },
	{ label: "37", value: "37" },
	{ label: "38", value: "38" },
	{ label: "39", value: "39" },
	{ label: "40", value: "40" },
	{ label: "41", value: "41" },
	{ label: "42", value: "42" },
	{ label: "43", value: "43" },
	{ label: "44", value: "44" },
	{ label: "45", value: "45" },
	{ label: "46", value: "46" },
]

const Sizes = ({ sizes, setSizes }) => {
	// states
	const [inputValue, setInputValue] = useState("")

	function removeSize(size) {
		let clone = [...sizes]
		let clone2 = clone.filter(s => s != size)
		setSizes(clone2)
	}

	function handleChangeInput(e) {
		setInputValue(e.target.value)
	}

	function handleAddSize(value) {
		let clone = [...sizes]
		if (value && !clone.includes(value)) {
			clone.push(value)
			setSizes(clone)
		}
	}

	return (
		<div className="sizes">
			<div className="label">الأحجام المتوفرة</div>

			<div className="content">
				<form
					onSubmit={e => {
						e.preventDefault()
						handleAddSize(inputValue.toLowerCase())
						setInputValue("")
					}}
				>
					<input
						type="text"
						placeholder="حجم المنتج (إن وجد)"
						value={inputValue}
						onChange={handleChangeInput}
					/>

					<button className="accept">إضافة</button>
				</form>

				{[...sizes].length > 0 && (
					<div className="selected-sizes-view">
						{[...sizes].map((size, index) => (
							<div className="selected-item" key={index}>
								<span>{size}</span>
								<AiFillCloseCircle onClick={() => removeSize(size)} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Sizes
