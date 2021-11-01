import { useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Photos from "./photos"
import { getUserPhotosByUserId } from "../../services/firebase"

export default function Profile({ user }) {
	const reducer = (state, newState) => ({ ...state, ...newState })
	const initialState = {
		profile: {},
		photosCollection: [],
		followerCount: 0
	}
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = await getUserPhotosByUserId(user.userId)
			dispatch({
				profile: user,
				photosCollection: photos,
				followerCount: user.followers.length
			})
		}
		getProfileInfoAndPhotos()
	}, [user.username])

	return (
		<>
			<Header />
			<Photos photos={photosCollection} />
		</>
	)
}

Profile.propTypes = {
	user: PropTypes.string.isRequired
}
