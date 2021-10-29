import { useState, useEffect, useContext } from "react"
import UserContext from "../context/user"
import { getPhotos, getUserByUserId } from "../servies/firebase"

export default function usePhotos() {
	const [photos, setPhotos] = useState(null)
	const {
		user: { uid: userId = "" }
	} = useContext(UserContext)

	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(userId)
			let followedUserPhotos = []

			console.log("following", following)
			if (following.length > 0) {
				followedUserPhotos = await getPhotos(userId, following)
			}
			followedUserPhotos.sort((a, b) => b.dateCreate - a.dateCreated)
			setPhotos(followedUserPhotos)
		}
		getTimelinePhotos()
		console.log(userId)
	}, [userId])

	return { photos }
}
