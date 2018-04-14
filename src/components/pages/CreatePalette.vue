<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<form id="createPaletteForm">
			
				<p>
					<label for="title">Title</label>
					<input type="text" name="title" id="title" v-model="title"/>
				</p>
				
				<p>
					<label>Colors</label>
					<ul class="new-color-list">
						<li><a class="btn" id="newColorBtn" @click="newColor">+</a></li>
						<li v-for="(color, index) in colors" :key="index"><input type="color" :id="'color' + index" v-model="color.value"/></li>
					</ul>
				</p>

				<a class="btn btn-primary" v-on:click="createPalette">Create Palette</a>

			</form>
		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import firebase from '../firebaseInit'

export default {
	name: 'create-palette',
	data() {
		return {
			colors: [],
			title: null,
			colorLimit: 6
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
			newPalette.user_id = firebase.auth().currentUser.uid;
			this.colors.forEach(element => {
				newPalette.colors.push(element.value);
			});
			// Add the new color palette to the database via 'add' which generates an automatic id
			firebase.firestore().collection('colorPalettes').add(newPalette).then(docRef => {
				console.log('Successfully added new color palette');
			});

			// Stop the submit form button from interacting with the page navigation
			e.preventDefault();

			this.$toasted.show('Created Palette');

			this.$router.push('/');
    	},
		newColor : function() {
			if(this.colors.length < this.colorLimit) {
				this.colors.push({
					value: '#123456'
				});
			}
		},
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

.new-color-list li {
    box-shadow: 0px 5px 20px #00000014;
    margin: 24px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
