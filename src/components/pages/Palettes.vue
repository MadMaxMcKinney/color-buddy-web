<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<div class="header-group">
				<page-header subheader-title="My" header-title="Palettes"></page-header>
				<!-- TODO: Make this button a seperate component -->
				<router-link to="createpalette" class="btn btn-primary" id="btnNewPalettes">Create Palette <svgicon icon="plus" color="#ffffff"></svgicon></router-link>
			</div>
			<transition-group v-if="auth" name="palette-list" class="palettes" tag="div">
				<!-- For each color palette in the color palette array, create a new color palette object
			with the title of the palette and the array of colors -->
				<color-palette v-for="palette in colorPalettes" :key="palette.id" v-bind:colors="palette.colors" v-bind:title="palette.title" v-on:click.native="viewDetailPalette(palette.title, palette.id)"></color-palette>
			</transition-group>
			<p v-if="!auth" class="palette-empty-text">Login to view your palettes</p>
		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import pageHeader from '../PageHeader'
import colorPalette from '../PaletteCard'
import iconPlus from '../../compiled-icons/plus'

import firebase from '../firebaseInit'
import { firestore } from 'firebase';

export default {
	name: 'palettes',
	data() {
		return {
			colorPalettes: [],
			auth: true
		}
	},
	components: {
		'navbar': navbar,
		'page-header': pageHeader,
		'color-palette': colorPalette
	},
	methods: {
		viewDetailPalette(paletteTitle, paletteId) {
			this.$router.push({ name: 'palette', params: { id: paletteId} });	
		},
		fetchColorPalettes() {
			let palettesToShow = [];

			if(firebase.auth().currentUser) {
				// Get the current user id
				let currentUid = firebase.auth().currentUser.uid;
				// Query under colorPalettes collection for any item that was made with the same user id as the current logged in user.
				// Create a temp object and add it to the array of palettes to show
				firebase.firestore().collection("colorPalettes").where("user_id", "==", currentUid).get().then(snapshot => {
					snapshot.forEach(doc => {
						let palette = {
							title: doc.data().title,
							colors: doc.data().colors,
							user_id: doc.data().user_id,
							id: doc.id
						}
						palettesToShow.push(palette)
					});
					// Update the page's colorPaletts array by expanding (ES6) with the palettesToShow.
					// This will prevent any duplication of items by fully replacing the array.
					// TODO: Ideally we would like to only update a specific palette if it changes, not the whole array
					this.colorPalettes = [...palettesToShow];
				});
			}
		}
	},
	created() {
		// Watch for changes in auth to modify the auth variable to update the palettes that are viewable
		firebase.auth().onAuthStateChanged(user => {
				if(user) {
					this.auth = true;
				} else {
					this.auth = false;
				}
			}
		);

		// Link our firestore database realtime functions to our fetchColorPalettes method whenever it updates, also runs once when the page first is visible
		firebase.firestore().collection("colorPalettes").onSnapshot(doc => this.fetchColorPalettes());

	}
}
</script>

<style scoped>
.palettes {
	display: grid;
	margin-top: 50px;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 24px;
	grid-column: center;
	grid-row: content;
	margin-bottom: 40px;
}
#btnNewPalettes {
	align-self: end;
}

.palette-list-enter-active, .palette-list-leave-active {
	transition: all 1s;
}

.palette-list-enter {
	opacity: 0;
}

.palette-list-enter-to {
	opacity: 1;
}

.palette-list-leave-to {
	opacity: 0;
}

.palette-empty-text {
	font-size: 23px;
    text-align: center;
    margin-top: 120px;
    color: gray;
	animation: fade-in 0.4s;
}

</style>

