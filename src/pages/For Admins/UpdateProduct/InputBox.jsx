import React from "react"

const InputBox = ({ type, name, placeholder, handleChangeInputs, product }) => {
	return (
		<div className="input-box">
			<span>{placeholder}</span>

			{name == "desc" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					onChange={handleChangeInputs}
					required
                    defaultValue={product.desc}
				/>
			) : (
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={handleChangeInputs}
                    defaultValue={product[`${name}`]}
					required={name !== "discount" && true}
				/>
			)}
            
		</div>
	)
}

export default InputBox
