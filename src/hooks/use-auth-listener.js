import { useState, useEffect, useContext } from "react"
import FirebaseContext from "../context/firebase"

export default function useAuthListener() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")))
	const { firebase } = useContext(FirebaseContext)

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged((authUser) => {
			// we have a user...can store in localstorage
			if (authUser) {
				localStorage.setItem("authUser", JSON.stringify(authUser))
				setUser(authUser)
				// else clear localStorage
			} else {
				localStorage.removeItem("authUser")
				setUser(null)
			}
		})
	}, [firebase])

	return { user }
}
