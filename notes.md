# Recap of project

## wrapped application in firebase so that the entire app has access to the firebase (login, signup, dashboard, profile)

```js
src / App.js

<FirebaseContext.Provider value={{ firebase, FieldValue }}>
	<App />
</FirebaseContext.Provider>
```

---

## Within the app we have an auth-listener. An authenticated user account that stores diplayName and userId, not much else to it.

```js
src / App.js

const { user } = useAuthListener()
```

---

## Used Suspense as a fallback while we wait for components to load which are lazyloaded. Also used a standard <Router> and <Switch> route setup to render pages/components

```js
src / App.js

<Suspense fallback={<p>Loading...</p>}>
	<Switch>
		<IsUserLoggedIn
			user={user}
			loggedInPath={ROUTES.DASHBOARD}
			path={ROUTES.LOGIN}>
			<Login />
		</IsUserLoggedIn>
		<IsUserLoggedIn
			user={user}
			loggedInPath={ROUTES.DASHBOARD}
			path={ROUTES.SIGN_UP}>
			<SignUp />
		</IsUserLoggedIn>
		<Route path={ROUTES.PROFILE} component={Profile} />
		<Route path={ROUTES.NOT_FOUND} component={NotFound} />
		<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
			<Route path={ROUTES.DASHBOARD} component={Dashboard} />
		</ProtectedRoute>
	</Switch>
</Suspense>
```

---

## Added a helper IsUserLoggedIn to check if user is logged in and redirect them to other components depending on whether or not they are logged in

```js
src / App.js

import IsUserLoggedIn from "./helpers/is-user-logged-in"
;<IsUserLoggedIn
	user={user}
	loggedInPath={ROUTES.DASHBOARD}
	path={ROUTES.LOGIN}>
	<Login />
</IsUserLoggedIn>
```

---

## Also brought in a protected route for the dashboard so a user can only access the dashboard if logged in

```js
src / App.js

<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
	<Route path={ROUTES.DASHBOARD} component={Dashboard} />
</ProtectedRoute>
```

---

## We have a not-found page with pretty simple styling and header to maintain access to user of logout and dashboard links

```js
import Header from "../components/header"

export default function NotFound() {
	useEffect(() => {
		document.title = "Not Found!"
	}, [])

	return (
		<div className='bg-gray-background'>
			<Header />
			<div className='mx-auth max-w-screen-lg'>
				<p className='text-center text-2xl'>Page Not Found!</p>
			</div>
		</div>
	)
}
```

---

## Added a connection to firebase. `const firebase = Firebase.initializeApp(config)` gives us access to the firestore for docs and collections

```js
import Firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const config = {
	apiKey: "AIzaSyBfi2dq71nYYZRlKDWgpa7lvyXBXOh-qXo",
	authDomain: "instagram-1138a.firebaseapp.com",
	projectId: "instagram-1138a",
	storageBucket: "instagram-1138a.appspot.com",
	messagingSenderId: "498465647294",
	appId: "1:498465647294:web:1ceb0b44d19bdeb0bbccef"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
```

---

## There's 3 custom hooks

## use-auth-listener.js which listens for authentication through firebase, and saves user data and API key to localStorage

```js
import { useState, useEffect, useContext } from "react" import
FirebaseContext from "../context/firebase"

export default function useAuthListener() { const [user, setUser] =
useState(JSON.parse(localStorage.getItem("authUser"))) const { firebase } =
useContext(FirebaseContext)

    useEffect(() => {
    	const listener = firebase.auth().onAuthStateChanged((authUser) => {
    		// we have a user...can store in localstorage
    		if (authUser) {
    			localStorage.setItem("authUser", JSON.stringify(authUser))
    			setUser(authUser)
    			// else clear localStorage
    		} else {
    			localStorage.removeItem("authUser")
    			setUser(null)
    		}
    	})

    	return () => listener()
    }, [firebase])

    return { user }

}
```

---

## use-photos.js which gets the photos for the user's timeline

```js
import { useState, useEffect, useContext } from "react"
import UserContext from "../context/user"
import { getPhotos, getUserByUserId } from "../services/firebase"

export default function usePhotos() {
	const [photos, setPhotos] = useState(null)
	const {
		user: { uid: userId = "" }
	} = useContext(UserContext)

	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserId(userId)
			let followedUserPhotos = []

			if (following.length > 0) {
				followedUserPhotos = await getPhotos(userId, following)
			}
			followedUserPhotos.sort((a, b) => b.dateCreate - a.dateCreated)
			setPhotos(followedUserPhotos)
		}
		getTimelinePhotos()
	}, [userId])

	return { photos }
}
```

---

## use-user.js makes an asynchronous call to firebase, returns user info from users collection, specifically the docId for the logged in user

```js
import { useState, useEffect, useContext } from "react"
import UserContext from "../context/user"
import { getUserByUserId } from "../services/firebase"

export default function useUser() {
	const [activeUser, setActiveUser] = useState({})
	const { user } = useContext(UserContext)

	useEffect(() => {
		async function getUserObjByUserId() {
			// need a function that can get user data based on ID from firebase
			const [response] = await getUserByUserId(user.uid)
			setActiveUser(response)
		}
		if (user?.uid) {
			getUserObjByUserId()
		}
	}, [user])

	return { user: activeUser }
}
```

---

## is-user-logged-in.js makes conditional checks to see if user is logged in. If not logged in we return the standard children, if they are logged in we allow them to view the dashboard.

```js
import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

export default function IsUserLoggedIn({
	user,
	children,
	loggedInPath,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user) {
					return React.cloneElement(children, { user })
				}

				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
								state: { from: location }
							}}
						/>
					)
				}

				return null
			}}
		/>
	)
}

IsUserLoggedIn.propTypes = {
	user: PropTypes.object,
	children: PropTypes.object.isRequired,
	loggedInPath: PropTypes.string.isRequired
}
```

---

## Protected-route.js return children if user is logged in, and redirects to the login page if user is not logged in

```js
import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import * as ROUTES from "../constants/routes"

export default function ProtectedRoute({ user, children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (user) {
					return React.cloneElement(children, { user })
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: ROUTES.LOGIN,
								state: { from: location }
							}}
						/>
					)
				}

				return null
			}}
		/>
	)
}

ProtectedRoute.propTypes = {
	user: PropTypes.object,
	children: PropTypes.object.isRequired
}
```

---

## src/context/firebase.js and user.js just creates the context and allows us to import and consume the context in other components

## **src/context/firebase.js**

```js
import { createContext } from "react"

const FirebaseContext = createContext(null)

export default FirebaseContext
```

## **src/context/user.js**

```js
import { createContext } from "react"

const UserContext = createContext(null)

export default UserContext
```

---

## A user can like and comment on another user's pictures.

![image](public/images/notes/Instagram-1.png)
