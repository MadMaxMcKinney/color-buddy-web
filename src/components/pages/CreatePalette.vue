<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<form id="createPaletteForm" @submit="createPalette">
			
				<p>
					<label for="title">Title</label>
					<input type="text" name="title" id="title" v-model="title"/>
				</p>
				
				<p>
					<label>Colors</label>
					<ul class="new-color-list">
						<li v-for="(color, index) in colors" :key="index"><input type="color" :id="'color' + index" v-model="color.value"/></li>
						<li><a class="btn" id="newColorBtn" @click="newColor">+</a></li>
					</ul>
				</p>

				<p>
					<input type="submit" value="Create Palette" />
				</p>

			</form>
		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import db from '../firebaseInit'

export default {
	name: 'create-palette',
	data() {
		return {
			colors: [],
			title: null,
			user_id: null
		}
	},
	methods: {
		createPalette : function(e) {
			let newPalette = {
				colors: [],
				title: '',
				user_id: 0
			}
			console.log('New color palette made with: ');

			// Create the new color palette object to send to the db
			newPalette.title = this.title;
			newPalette.user_id = this.user_id;
			this.colors.forEach(element => {
				newPalette.colors.push(element.value);
			});
			// Add the new color palette to the database via 'add' which generates an automatic id
			db.collection('colorPalettes').add(newPalette).then(docRef => {
				console.log('Successfully added new color palette');
			});

			// Stop the submit form button from interacting with the page navigation
			e.preventDefault();
    	},
		newColor : function() {
			this.colors.push({
				value: '#123456'
			});
		}
	},
	created() {
		// Get the user id of the current logged in user
		this.user_id = 0;
	},
	components: {
		'navbar': navbar
	}
}
</script>

<style scoped>

.new-color-list {
	list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
}

</style>
