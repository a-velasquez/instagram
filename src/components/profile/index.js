import { useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import Header from "./header"

export default function Profile({ username }) {
	const reducer = (state, newState) => ({ ...state, ...newState })
	const intialState = {
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
			return null
		}
	}, [])
}
