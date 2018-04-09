<template>
	<div class="page">
		<router-link to="/" class="btn-return"><svgicon width="32" height="32" icon="arrow-left" color="#ffffff"></svgicon></router-link>
		<transition-group name="detail-palette-color-group" tag="ul" class="palette-list">
			<li class="detail-palette-color" v-for="(color, index) in colors" :key="index" v-bind:style="{backgroundColor: color}"></li>	
		</transition-group>
	</div>
</template>

<script>
import iconArrowLeft from '../../compiled-icons/arrow-left'

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
				var dbColors = doc.data().colors;
				this.colors = [...dbColors];
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

.detail-palette-color-group-enter-active, .detail-palette-color-group-leave-active {
	transition: all 0.4s;
}

.detail-palette-color-group-enter {
	opacity: 0;
	transform: scale(0.9);
}

.detail-palette-color-group-enter-to {
	opacity: 1;
	transform: scale(1);
}

.detail-palette-color-group-leave-to {
	opacity: 0;
}

</style>
