<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">

			<page-header header-title="Edit palette"></page-header>

			<form id="createPaletteForm">
			
				<p>
					<input type="text" name="title" id="title" v-model="title" :placeholder="title" />
				</p>
				
				<span class="space"></span>

				<p>
					<label>Colors</label>
					<ul class="new-color-list">
						<li class="new-color-btn-container"><a class="btn" id="newColorBtn" @click="newColor">+</a></li>
						<li v-for="(color, index) in colors" :key="index"><input type="color" :id="'color' + index" v-model="color.value"/></li>
					</ul>
				</p>

				<span class="space"></span>

				<a class="btn btn-primary" v-on:click="modifyPalette">Save Changes</a>

			</form>

		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import pageHeader from '../PageHeader'
import firebase from '../firebaseInit'

export default {
	name: 'edit-palette',
	data() {
		return {
			colors: [],
			colorLimit: 6,
			currentPalette:{}
		}
	},
	props: {
		id: {
			type: String,
			default: 0
		}
	},
	methods: {
		modifyPalette : function(e) {
			// TODO: Make sure the user can't go to edit palette page if they aren't the one who made the palette
			if(this.colors.length >= 1) {
				let newPalette = {
					colors: [],
					title: '',
					user_id: 0
				}

				// Create the new color palette object to send to the db
				newPalette.title = this.title;
				newPalette.user_id = firebase.auth().currentUser.uid;
				this.colors.forEach(color => {
					newPalette.colors.push(color);
				});

				// Add the new color palette to the database via 'add' which generates an automatic id
				firebase.firestore().collection('colorPalettes').doc(this.id).set(newPalette).then(docRef => {
					console.log(this.id);
					console.log('Successfully added new color palette');
				});

				// Stop the submit form button from interacting with the page navigation
				e.preventDefault();

				this.$toasted.show(`Modified palette '${this.title}'`);

				this.$router.push('/');
			} else {
				this.$swal({
					title: 'Error',
					text: 'Must have at least one color.',
					type: 'error',
					confirmButtonColor: '#1e1e1e',
				})
			}
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
		'navbar': navbar,
		'page-header': pageHeader
	},
	created() {
		firebase.firestore().collection('colorPalettes').doc(this.id).get().then(doc => {
			if(doc.exists) {
				// Grab the current color palette and assign it to a locally stored object
				this.title = doc.data().title;
				this.colors = doc.data().colors;
			}
		});
	}
}
</script>

<style scoped>

#createPaletteForm {
	margin-top: 60px;
}

	#createPaletteForm input[type='text'] {
		box-shadow: none;
		border-bottom: 1px solid #1e1e1e;
		border-radius: 0px;
		height: 50px;
		font-size: 17px;
		padding: 0px;
		max-width: 350px;
		margin-bottom: 0px;
	}

	#createPaletteForm input[type='text']:hover, #createPaletteForm input[type='text']:focus, #createPaletteForm input[type='text']:active {
		transform: translateY(0);
	}

	#createPaletteForm input::placeholder {
		color: #8c8c8c;
	}

	#createPaletteForm label {
		font-size: 16px;
		color: #8C8C8C;
	}

#newColorBtn {
	width: 100%;
    height: 100%;
    background: black;
    color: white;
    font-size: 32px;
	cursor: default;
}

	.new-color-list .new-color-btn-container:hover, .new-color-list .new-color-btn-container:active, .new-color-list .new-color-btn-container:focus {
		transform: translateY(0);
		box-shadow: 0px 5px 20px #00000014;
	}

.new-color-list {
	list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
}

.new-color-list li {
    box-shadow: 0px 5px 20px #00000014;
    margin-top: 24px;
	margin-right: 24px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
	overflow: hidden;
	border-radius: 4px;
	transition: all 0.3s;
}

.new-color-list li:hover {
	box-shadow: 0px 5px 20px #00000080;
	transform: translateY(-2px);
}

#createPaletteForm input[type='color'] {
	width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
	box-shadow: none;
}

#createPaletteForm input[type='color']::-webkit-color-swatch-wrapper {
	padding: 0;
}
#createPaletteForm input[type='color']::-webkit-color-swatch {
	border: none;
}

#createPaletteForm input[type='color']:hover, #createPaletteForm input[type='color']:focus, #createPaletteForm input[type='color']:active {
	box-shadow: none;
	transform: translateY(0);
}

</style>
