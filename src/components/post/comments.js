import { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns"

// aliased comments prop (allComments) there will be
// a state value of comments, setComments
export default function Comments({
	docId,
	comments: allComments,
	posted,
	commentInput
}) {
	const [comments, setComments] = useState(allComments)

	return (
		<>
			<div className='p-4 pt-1 pb-4'>
				{comments.map((item) => (
					<p key={`${item.comment}-${item.displayName}`} className='mb-1'>
						<Link to={`/p/${item.displayName}`}>
							<span className='mr-1 font-bold'>{item.displayName}</span>
						</Link>
						<span>{item.comment}</span>
					</p>
				))}
			</div>
		</>
	)
}

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired
}
