import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Requests from "../utils/Requests"
import { LoadingContext } from "./LoadingProvider"

export const UserContext = createContext({})

const UserProvider = ({ children }) => {
	// req
	const req = new Requests()
	// context
	const { setLoading } = useContext(LoadingContext)
	// navigate
	const navigate = useNavigate()
	// states
	const [user, setUser] = useState({})

	const [token, setToken] = useState(null)
	const [admin, setAdmin] = useState(null)
	const [allUsers, setAllUsers] = useState([])

	useEffect(() => {
		if (token) {
			getCurrentUser()
		}
	}, [token])

	useLayoutEffect(() => {
		setToken(localStorage?.token)
	}, [localStorage.token])

	// getCurrentUser
	async function getCurrentUser() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/current_user")
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.user != null) {
					setUser(data.user)
					data?.user?.admin == true ? setAdmin(true) : setAdmin(false)
				} else if (data.user == null) {
					localStorage.removeItem("token")
					setToken("")
					location.assign("/login")
				}
			}
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	// logout
	function logout() {
		localStorage.removeItem("token")
		setToken("")
		setAdmin(null)
		setUser({})
		// window.location.replace("/login")
		navigate("/login", { replace: true })
	}

	// get all users
	async function getAllUsers() {
		setLoading(true)
		try {
			const res = await req.GetRequest("/users")
			const data = await res.json()
			if (data) {
				setLoading(false)
				if (data.users) {
					setAllUsers(data.users)
				} else {
					console.log(data.errors)
				}
			}
		} catch (err) {
			setLoading(false)
			console.log(err)
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				admin,
				token,
				setAdmin,
				setToken,
				logout,
				allUsers,
				setAllUsers,
				getAllUsers,
			}}
			children={children}
		/>
	)
}

export default UserProvider
