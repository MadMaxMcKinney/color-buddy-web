<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<div class="header-group">
				<page-header subheader-title="My" header-title="Palettes"></page-header>
				<!-- TODO: Make this button a seperate component -->
				<router-link to="createpalette" class="btn btn-primary" id="btnNewPalettes">Create Palette <svgicon icon="plus" color="#ffffff"></svgicon></router-link>
			</div>
			<transition-group name="palette-list" class="palettes" tag="div">
				<!-- For each color palette in the color palette array, create a new color palette object
			with the title of the palette and the array of colors -->
				<color-palette v-for="palette in colorPalettes" :key="palette.id" v-bind:colors="palette.colors" v-bind:title="palette.title" v-on:click.native="viewDetailPalette(palette.title, palette.id)"></color-palette>
			</transition-group>
		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import pageHeader from '../PageHeader'
import colorPalette from '../PaletteCard'
import iconPlus from '../../compiled-icons/plus'

import db from '../firebaseInit'

export default {
	name: 'palettes',
	data() {
		return {
			colorPalettes: []
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
		// Get the color palettes from the Firestore DB and push them onto the colorPalettes array
		// TODO: Make this fetch only grab the palettes from current user that is logged in
		fetchColorPalettes() {
			var newPaletteArray = []
			db.collection("colorPalettes").get().then((querySnapshot => {
				querySnapshot.forEach((doc => {
					const palette = {
						title: doc.data().title,
						colors: doc.data().colors,
						id: doc.id
					}
					newPaletteArray.push(palette)
				}))
				// Update the page's colorPaletts array by expanding (ES6) with the newPaletteArray.
				// This will prevent any duplication of items by fully replacing the array.
				// TODO: Ideally we would like to only update a specific palette if it changes, not the whole array
				this.colorPalettes = [...newPaletteArray]
			}))
			console.log("Fetching data");
		},
		updateColorPalette(indexOfPalette) {

		}
	},
	created() {
		// Initially pull from our Firestore DB when this page is created
		this.fetchColorPalettes()
		// Link our firestore database realtime functions to our fetchColorPalettes method whenever it updates
		db.collection("colorPalettes").onSnapshot(doc => this.fetchColorPalettes())
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

</style>

