import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"
import Post from "./post"

export default function Timeline() {
	const { photos } = usePhotos()

	return (
		<div className='container col-span-2'>
			{!photos ? (
				<Skeleton count={2} width={640} height={500} className='mb-5' />
			) : photos ? (
				photos.map((content) => <Post key={content.docId} content={content} />)
			) : (
				<p>Follow people to see photos!</p>
			)}
		</div>
	)
}
