import User from "../sidebar/user"
import Suggestions from "../sidebar/suggestions"
import useUser from "../../hooks/use-user"

export default function Sidebar() {
	const {
		user: { fullName, username, userId, following, docId }
	} = useUser()

	return (
		<div className='p-4'>
			<User username={username} fullName={fullName} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	)
}
