<template>
	<div class="page">
		<ul class="palette-list">
			<li class="detail-palette-color" v-for="(color, index) in colors" :key="index" v-bind:style="{backgroundColor: color}"></li>
		</ul>
	</div>
</template>

<script>

import db from '../firebaseInit'

export default {
	name: 'detail-palette',
	data() {
		return {
			colors: [],
			title: ''
		}
	},
	props: {
		id: {
			type: String,
			default: 0
		}
	},
	created() {
		// Get the palette info from the Firebase DB with the ID of the palette
		db.collection('colorPalettes').doc(this.id).get().then(doc => {
			if(doc.exists) {
				// ES6 way of expanding the colors field from the DB to the prop field on the detail palette page
				this.colors = [...doc.data().colors];
				this.title = doc.data().title;
			}
		});
	}
}
</script>

<style scoped>

.palette-list {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
	flex-direction: row;
	grid-column: 1/ 4;
    grid-row: 1/4;
}

.detail-palette-color {
	width: 100%;
	height: 100%;
	display: inline-block;
}

</style>
