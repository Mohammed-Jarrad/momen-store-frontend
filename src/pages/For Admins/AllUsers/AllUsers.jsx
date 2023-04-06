import { useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { LoadingContext } from "../../../context/LoadingProvider"
import { UserContext } from "../../../context/UserProvider"
import "./AllUsers.scss"
import UserBox from "./UserBox"

const AllUsers = () => {
	const { t } = useTranslation()
	// context
	const { allUsers, getAllUsers } = useContext(UserContext)
	const { loading } = useContext(LoadingContext)

	useEffect(() => {
		getAllUsers()
	}, [])

	return (
		<div className="all-users">
			<Helmet title={t("usersPage")} />
			{!loading && [...allUsers].length !== 1 && (
				<div className="users-box container">
					{[...allUsers]
						.filter(user => user.admin == false)
						.map(user => (
							<UserBox key={user._id} user={user} />
						))}
				</div>
			)}

			{!loading && [...allUsers].length == 1 && <h1>{t("noUsers")}</h1>}
		</div>
	)
}

export default AllUsers
