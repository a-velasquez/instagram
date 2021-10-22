import { firebase, FieldValue } from "../lib/firebase"

export async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get()

	console.log(result)

	// returns user if username exists
	return result.docs.length > 0
}
