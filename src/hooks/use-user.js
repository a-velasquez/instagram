import { useState, useEffect, useContext } from "react"
import UserContext from "../context/user"
import { getUserByUserId } from "../services/firebase"

export default function useUser() {
	const [activeUser, setActiveUser] = useState({})
	const { user } = useContext(UserContext)

	useEffect(() => {
		async function getUserObjByUserId() {
			// need a function that can get user data based on ID from firebase
			const [response] = await getUserByUserId(user.uid)
			setActiveUser(response)
		}
		if (user?.uid) {
			getUserObjByUserId()
		}
	}, [user])

	return { user: activeUser }
}
