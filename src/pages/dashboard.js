import { useEffect } from "react"
import Header from "../components/header"

export default function Dashboard() {
	useEffect(() => {
		document.title = "Instagram"
	}, [])

	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='grid'></div>
		</div>
	)
}
