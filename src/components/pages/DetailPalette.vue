<template>
	<div class="page">
		<transition-group name="detail-palette-color-group" tag="ul" class="palette-list">
			<li class="detail-palette-color" v-for="(color, index) in colors" :key="index" v-bind:style="{backgroundColor: color.value}">
				<a class="detail-palette-color-selector" v-on:click="copyColorInfo(color.value, $event)"></a>	
			</li>	
		</transition-group>

		<router-link to="/" class="btn-return"><svgicon width="32" height="32" icon="arrow-left" color="#ffffff"></svgicon></router-link>
		<router-link :to="{ name: 'editpalette', params: {id: id}}" id="editPaletteBtn" v-on:click="deletePalette"><svgicon width="32" height="32" icon="pencil" color="#ffffff"></svgicon></router-link>
		<a id="deletePaletteBtn" v-on:click="deletePalette"><svgicon width="32" height="32" icon="delete" color="#ffffff"></svgicon></a>
	</div>
</template>

<script>
import iconArrowLeft from '../../compiled-icons/arrow-left'
import iconDelete from '../../compiled-icons/delete'
import iconPencil from '../../compiled-icons/pencil'

import firebase from '../firebaseInit'

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
	methods: {
		deletePalette() {
			this.$swal({
				title: 'Delete Palette?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#1e1e1e',
			}).then(result => {
				if(result.value) {
					firebase.firestore().collection('colorPalettes').doc(this.id).delete();
					this.$toasted.show(`Deleted palette '${this.title}'`);
					this.$router.push('/');
				}
			});
		},
		copyColorInfo(colorValue, event) {
			// Get the currently clicked color
			let detailColor = event.target;
			// Add the flashing animation class
			detailColor.classList.add('detail-palette-color-selector-active');
			// Listen for the animation to end and remove the class
			detailColor.addEventListener('animationend', () => {
				detailColor.classList.remove('detail-palette-color-selector-active');
			});
			const el = document.createElement('textarea');
			el.value = colorValue;
				el.setAttribute('readonly', '');
				el.style.position = 'absolute';
				el.style.left = '-9999px';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			// Notify the copying as finished
			this.$toasted.show(`Copied ${colorValue} to clipboard`);
		}
	},
	created() {
		// Get the palette info from the Firebase DB with the ID of the palette
		firebase.firestore().collection('colorPalettes').doc(this.id).get().then(doc => {
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

.detail-palette-color-selector {
	width: 100%;
	height: 100%;
	display: block;
}

.detail-palette-color-selector-active {
	background: black;
	animation: flash 0.4s;
	animation-fill-mode: forwards;
}

#deletePaletteBtn {
	position: absolute;
	top: 24px;
	right: 24px;
	animation: fade-in 3s;
}

#editPaletteBtn {
	position: absolute;
	top: 24px;
	right: 90px;
	animation: fade-in 3s;
}

</style>
