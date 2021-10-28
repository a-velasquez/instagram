import Skeleton from "react-loading-skeleton"
import usePhotos from "../hooks/use-photos"

export default function Timeline() {
	// TODO
	// need to grab logged in user's photos
	// use react skeleton for loading photos
	// if photos, render post component
	// if !photos, ask user to upload photo to post

	return (
		<div className='container col-span-2'>
			<p>Timeline Component</p>
			{/* {photos} */}
		</div>
	)
}
