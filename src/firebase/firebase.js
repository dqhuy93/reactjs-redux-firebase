import * as firebase from 'firebase';

const prodConfig = {
	apiKey: "AIzaSyBTmiHFfti28-Kg4dnHXAK0VBS2fKzief4",
	authDomain: "tiki-demo-b774f.firebaseapp.com",
	databaseURL: "https://tiki-demo-b774f.firebaseio.com",
	projectId: "tiki-demo-b774f",
	storageBucket: "tiki-demo-b774f.appspot.com",
	messagingSenderId: "847965250045"
};

const devConfig = {
	apiKey: "AIzaSyBTmiHFfti28-Kg4dnHXAK0VBS2fKzief4",
	authDomain: "tiki-demo-b774f.firebaseapp.com",
	databaseURL: "https://tiki-demo-b774f.firebaseio.com",
	projectId: "tiki-demo-b774f",
	storageBucket: "tiki-demo-b774f.appspot.com",
	messagingSenderId: "847965250045"
};

const config = process.env.NODE_ENV === 'production'
	? prodConfig
	: devConfig;

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
	db,
	auth,
};
