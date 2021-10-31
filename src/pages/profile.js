import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getUserByUsername } from "../services/firebase"
import * as ROUTES from "../constants/routes"

export default function Profile() {
	const { username } = useParams()
	const history = useHistory()
	const [user, setUser] = useState(null)

	useEffect(() => {
		async function checkUserExists() {
			const [user] = await getUserByUsername(username)
			if (user?.userId) {
				setUser(user)
			} else {
				history.push(ROUTES.NOT_FOUND)
			}
		}

		checkUserExists()
	}, [username, history])

	return user?.username ? (
		<div className='bg-gray-background'>
			<div className='mx-auto max-w-screen-lg'>
				<p>{username}</p>
			</div>
		</div>
	) : null
}
