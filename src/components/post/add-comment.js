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

	return null
}
