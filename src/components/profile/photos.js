import PropTypes from "prop-types"
import Skeleton from "react-loading-skeleton"

export default function Photos({ photos }) {
	return (
		<div>
			{photos.map((photo) => (
				<div key={photo.docId} className='relative group'>
					<img src={photo.imageSrc} alt={photo.caption} />
				</div>
			))}
		</div>
	)
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired
}
