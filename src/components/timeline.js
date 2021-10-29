import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"
import Post from "./post"

export default function Timeline() {
	// TODO
	// need to grab logged in user's photos
	const { photos } = usePhotos()
	// use react skeleton for loading photos
	// if photos, render post component
	// if !photos, ask user to upload photo to post
	console.log("user photos", photos)
	return (
		<div className='container col-span-2'>
			{!photos ? (
				<Skeleton count={2} width={640} height={500} className='mb-5' />
			) : photos ? (
				photos.map((content) => <img src={content.imageSrc} alt='' />)
			) : (
				<p>Follow people to see photos!</p>
			)}
		</div>
	)
}
