import { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	userId
}) {
	return <img alt='' src={`/images/avatars/${username}.jpg`} />
}

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired
}
