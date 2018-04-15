<template>
	<div class="page">
		<navbar :selectedNavItemIndex=0></navbar>
		<section class="content">
			<div class="header-group">
				<page-header subheader-title="My" header-title="Palettes"></page-header>
				<!-- TODO: Make this button a seperate component -->
				<router-link v-show="auth" to="createpalette" class="btn btn-primary" id="btnNewPalettes">Create Palette <svgicon icon="plus" color="#ffffff"></svgicon></router-link>
			</div>

			<transition-group v-if="auth" name="palette-list" class="palettes" tag="div">
				<!-- For each color palette in the color palette array, create a new color palette object
			with the title of the palette and the array of colors -->
				<color-palette v-for="palette in colorPalettes" :key="palette.id" v-bind:colors="palette.colors" v-bind:title="palette.title" v-on:click.native="viewDetailPalette(palette.title, palette.id)"></color-palette>
			</transition-group>

			<div v-if="!auth" class="palette-empty">
				<svg width="100" height="100" viewBox="0 0 496 496" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="Canvas" fill="none">
				<g id="Vector">
				<path d="M 248 48C 358.532 48 448 137.451 448 248C 448 358.532 358.549 448 248 448C 137.468 448 48 358.549 48 248C 48 137.468 137.451 48 248 48ZM 248 0C 111.033 0 0 111.033 0 248C 0 384.967 111.033 496 248 496C 384.967 496 496 384.967 496 248C 496 111.033 384.967 0 248 0ZM 312 136C 302.465 136 293.488 138.386 285.63 142.589L 285.647 142.589C 298.382 142.589 308.706 152.913 308.706 165.648C 308.706 178.383 298.382 188.707 285.647 188.707C 272.912 188.707 262.588 178.383 262.588 165.648L 262.588 165.631C 258.386 173.488 256 182.465 256 192C 256 222.928 281.072 248 312 248C 342.928 248 368 222.928 368 192C 368 161.072 342.928 136 312 136ZM 184 136C 174.465 136 165.488 138.386 157.63 142.589L 157.647 142.589C 170.382 142.589 180.706 152.913 180.706 165.648C 180.706 178.383 170.382 188.707 157.647 188.707C 144.912 188.707 134.588 178.383 134.588 165.648L 134.588 165.631C 130.386 173.488 128 182.465 128 192C 128 222.928 153.072 248 184 248C 214.928 248 240 222.928 240 192C 240 161.072 214.928 136 184 136ZM 355.547 337.782C 298.952 260.818 197.164 260.717 140.49 337.781C 121.67 363.374 160.348 391.799 179.16 366.219C 216.671 315.209 279.525 315.423 316.877 366.218C 335.386 391.39 374.698 363.823 355.547 337.782Z" fill="#8C8C8C"/>
				</g>
				</g>
				</svg>
				<p class="palette-empty-text">Login to view/create your palettes</p>
			</div>
			
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
	margin-top: 40px;
    color: #8C8C8C;
	animation: fade-in 0.4s;
}

.palette-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: center;
    margin-bottom: 24px;
	margin-top: 120px;
}

</style>

