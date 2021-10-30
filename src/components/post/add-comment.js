import { useState, useContext } from "react"
import PropTypes from "prop-types"
import FirebaseContext from "../../context/firebase"
import UserContext from "../../context/user"

export default function AddComment({
	docId,
	comments,
	setComments,
	commentInput
}) {
	const [comment, setComment] = useState("")
	const { firebase, FieldValue } = useContext(FirebaseContext)
	// just checking the auth, dont need info from firestore
	const {
		user: { displayName }
	} = useContext(UserContext)

	const handleSubmitComment = (e) => {
		e.preventDefault()

		return null
	}

	return (
		<div className='border-t border-gray-primary'>
			<form
				className='flex justify-between pl-0 pr-5'
				method='POST'
				onSubmit={(e) =>
					comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
				}>
				<input
					aria-label='Add a comment'
					autoComplete='off'
					className='text-sm text-gray-base w-full mr-3 py-5 px-4'
					type='text'
					name='add-comment'
					placeholder='Add a comment...'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
			</form>
		</div>
	)
}

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object
}
