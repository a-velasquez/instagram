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
	return (
		<img
			src={`/images/avatars/${username}.jpg`}
			alt=''
			onError={(e) => {
				e.target.src = DEFAULT_IMAGE_PATH
			}}
		/>
	)
}

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired
}

// <img alt='' src={`/images/avatars/${username}.jpg`} />
