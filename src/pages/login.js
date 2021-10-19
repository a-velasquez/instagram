import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"

export default function Login() {
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)

	return <p>Login Page</p>
}
