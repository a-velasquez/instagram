import { useState, useContext } from "react"
import PropTypes from "prop-types"
import FirebaseContext from "../../context/firebase"
import UserContext from "../../context/user"

export default function AddComment({
	docId,
	comments,
	setComments,
	commentInput
}) {
	const [comment, setComment] = useState("")
	const { firebase, FieldValue } = useContext(FirebaseContext)
	// just checking the auth, dont need info from firestore
	const {
		user: { displayName }
	} = useContext(UserContext)

	const handleSubmitComment = (e) => {
		e.preventDefault()

		return null
	}

	return null
}

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object
}
