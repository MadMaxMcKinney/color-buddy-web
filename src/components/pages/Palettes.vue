<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<div class="header-group">
				<page-header subheader-title="My" header-title="Palettes"></page-header>
				<!-- TODO: Make this button a seperate component -->
				<router-link to="CreatePalette" class="btn btn-primary" id="btnNewPalettes">Create Palette <svgicon icon="plus" color="#ffffff"></svgicon></router-link>
			</div>
			<div class="palettes">
				<!-- For each color palette in the color palette array, create a new color palette object
				with the title of the palette and the array of colors -->
				<color-palette v-for="palette in colorPalettes" :key="palette.user_id" v-bind:colors="palette.colors" v-bind:title="palette.title"></color-palette>
			</div>
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
		// Get the color palettes from the Firestore DB and push them onto the colorPalettes array
		// TODO: Make this fetch only grab the palettes from current user that is logged in
		fetchColorPalettes() {
			db.collection("colorPalettes").get().then((querySnapshot => {
				querySnapshot.forEach((doc => {
					const data = {
						title: doc.data().title,
						colors: doc.data().colors
					}
					this.colorPalettes.push(data)
				}))
			}))
			console.log("Fetching data");
		}
	},
	created() {
		this.fetchColorPalettes()
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
.btn {
	padding: 6px 12px;
	display: block;
	text-decoration: none;
	border-radius: 4px;
	transition: opacity 0.3s;
	font-size: 13px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn-primary {
	background-color: #1e1e1e;
	color: white;
}
.btn-primary:hover {
	opacity: 0.8;
}
.btn .svg-icon {
	margin-left: 6px;
}
#btnNewPalettes {
	align-self: end;
}
</style>

