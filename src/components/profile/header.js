import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Skeleton from "react-loading-skeleton"
import useUser from "../../hooks/use-user"
import { isUserFollowingProfile } from "../../services/firebase"
import { DEFAULT_IMAGE_PATH } from "../../constants/paths"

export default function Header({
	photosCount,
	followerCount,
	setFollowerCount,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		fullName,
		followers,
		following,
		username: profileUsername
	}
}) {
	const { user } = useUser() // current logged in user
	const [isFollowingProfile, setIsFollowingProfile] = useState(false)

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			)
			setIsFollowingProfile(!!isFollowing)
		}
		//   user             profile user is viewing
		if (user?.username && profileUserId) {
			isLoggedInUserFollowingProfile()
		}
	}, [user?.username, profileUserId])

	return (
		<div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
			{profileUsername ? (
				<img
					className='rounded-full h-40 w-40 flex'
					alt={`${fullName} profile`}
					src={`/images/avatars/${profileUsername}.jpg`}
					onError={(e) => {
						e.target.src = DEFAULT_IMAGE_PATH
					}}
				/>
			) : (
				<Skeleton circle height={150} width={150} count={1} />
			)}
		</div>
	)
}

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		fullName: PropTypes.string,
		username: PropTypes.string,
		followers: PropTypes.array,
		following: PropTypes.array
	}).isRequired
}
