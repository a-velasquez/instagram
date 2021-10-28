import { func } from "prop-types"
import { firebase, FieldValue } from "../lib/firebase"

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get()

	// returns user if username exists
	return result.docs.length > 0
}

// get user from firestore where userId === userId (passed from auth)
export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get()

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id
	}))

	return user
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase.firestore().collection("users").limit(10).get()

	const profiles = result.docs
		.map((user) => ({ ...user.data(), docId: userId }))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		)

	return profiles
}
