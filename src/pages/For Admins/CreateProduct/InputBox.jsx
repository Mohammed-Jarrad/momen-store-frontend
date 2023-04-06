import React from "react"

const InputBox = ({ type, name, placeholder, handleChangeInputs }) => {
	return (
		<div className="input-box">
			<span>{placeholder}</span>

			{name == "desc" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					onChange={handleChangeInputs}
					// required
				/>
			) : (
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={handleChangeInputs}
					// required={name !== "discount" && true}
				/>
			)}
            
		</div>
	)
}

export default InputBox
