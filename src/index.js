import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import FirebaseContext from "./context/firebase"

ReactDOM.render(
	<FirebaseContext.Provider value={{ firebase, FieldValue }}>
		<App />
	</FirebaseContext.Provider>,
	document.getElementById("root")
)

// client-side rendered app: react (cra)
// -> Firebase database
// -> react-loading-skeleton
// tailwind

// folder structure
// src
// components
// constants
// context
// helpers
// lib (firebase)
// services (firebase functions)
// styles (tailwind folder (app/tailwind))
