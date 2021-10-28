import { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { DEFAULT_IMAGE_PATH } from "../../constants/paths"

export default function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	userId
}) {
	const [followed, setFollowed] = useState(false)
	return !followed ? (
		<div className='flex flex-row items-center align-items justify-between'>
			<div className='flex items-center justify-between'>
				<img
					className='rounded-full w-10 flex mr-3'
					src={`/images/avatars/${username}.jpg`}
					alt='profile'
					onError={(e) => {
						e.target.src = DEFAULT_IMAGE_PATH
					}}
				/>
				<Link to={`/p/${username}`}>
					<p className='font-bold text-sm'>{username}</p>
				</Link>
			</div>
			<button
				type='button'
				className='text-xs font-bold text-blue-medium'
				onClick={() => console.log("Followed this user!")}>
				Follow
			</button>
		</div>
	) : null
}

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired
}
