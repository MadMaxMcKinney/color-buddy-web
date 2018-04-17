import Vue from 'vue'
import Router from 'vue-router'
import Palettes from '@/components/pages/Palettes'
import CreatePalette from '@/components/pages/CreatePalette'
import LogIn from '@/components/pages/LogIn'
import DetailPalette from '@/components/pages/DetailPalette'
import Register from '@/components/pages/Register'
import EditPalette from '@/components/pages/EditPalette'

import firebase from '../components/firebaseInit'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'palettes',
    	component: Palettes
	},
	{
		path: '/createpalette',
		name: 'createpalette',
		component: CreatePalette,
		beforeEnter: (to, from, next) => {
			if(firebase.auth().currentUser) {
				next();
			} else {
				next(false);
				Vue.toasted.show('Must be logged in');
			}
		}
	},
	{
		path: '/login',
		name: 'login',
		component: LogIn,
		beforeEnter: (to, from, next) => {
			if(firebase.auth().currentUser) {
				next(false);
				Vue.toasted.show('Already logged in');
			} else {
				next();
			}
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/palette/:id',
		component: DetailPalette,
		props: true,
		name: 'palette'
	},
	{
		path: '/edit/:id',
		component: EditPalette,
		props: true,
		name: 'editpalette',
		beforeEnter: (to, from, next) => {
			// First check if the user is logged in
			if(firebase.auth().currentUser) {
				// Then check the user id of the logged in user to see if it matches the user id that was assigned to the color palette
				firebase.firestore().collection('colorPalettes').doc(to.params.id).get().then(doc => {
					let color = doc.data();
					if(firebase.auth().currentUser.uid == color.user_id) {
						next();
					} else {
						next(false);
						Vue.toasted.show('This is not your palette to edit');
					}
				});
			} else {
				next(false);
				Vue.toasted.show('Must be logged in to edit a palette');
			}
		}
	}
  ]
})
