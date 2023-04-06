import React, { createContext, useState } from "react"

export const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)

	return (
		<LoadingContext.Provider
			children={children}
			value={{ loading, setLoading }}
		/>
	)
}

export default LoadingProvider
