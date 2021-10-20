import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"

export default function Login() {
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)

	const [emailAddress, setEmailAddress] = useState("")
	const [password, setPassword] = useState("")

	const [error, setError] = useState("")
	const isInvalid = password === "" || emailAddress === ""

	const handleLogin = () => {}

	useEffect(() => {
		document.title = "Login - Instagram"
	}, [])

	return (
		<div className='container flex mx-auto mx-auto max-w-screen-md items-center h-screen'>
			<div className='flex w-3/5'>
				<img src='/images/iphone-with-profile.jpg' alt='iPhone' />
			</div>
			<div className='flex flex-col w-2/5'>Login form goes here</div>
		</div>
	)
}
