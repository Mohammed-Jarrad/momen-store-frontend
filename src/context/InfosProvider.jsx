import React, { createContext, useContext, useState } from "react"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"

export const InfosContext = createContext()

const InfosProvider = ({ children }) => {
	const { loading, setLoading } = useContext(LoadingContext)
	const req = new Requests()

	const [infos, setInfos] = useState([])

	async function getInfos() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/alkanz_info")
			const data = await res.json()

			if (data) {
				setLoading(false)
				setInfos(data.informations)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	async function updateInfos(id, newInfos) {
		setLoading(true)
		try {
			const res = await req.PutRequest(`/alkanz_info/${id}`, JSON.stringify(newInfos))
			const data = await res.json()

			if (data) {
				setLoading(false)
				getInfos()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<InfosContext.Provider
			value={{
				infos,
				setInfos,
				getInfos,
				updateInfos,
			}}
		>
			{children}
		</InfosContext.Provider>
	)
}

export default InfosProvider
