import { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function Suggestions() {
	const [profile, setProfile] = useState(null)

	return <p>Suggestions Component</p>
}

Suggestions.propTypes = {
	userId: PropTypes.string
}
