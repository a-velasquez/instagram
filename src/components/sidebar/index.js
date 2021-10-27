import useUser from "../../hooks/use-user"
import User from "../sidebar/user"
import Suggestions from "../sidebar/suggestions"

export default function Sidebar() {
	const {
		user: { fullName, username, userId }
	} = useUser()

	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestions userId={userId} />
		</div>
	)
}
