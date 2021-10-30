import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function Comments({ docId, commentInput, comments, posted }) {
	return <p>Comments</p>
}

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired
}
