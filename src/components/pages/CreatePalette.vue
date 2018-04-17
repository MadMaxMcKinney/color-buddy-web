<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">

			<page-header header-title="Create new palette"></page-header>

			<form id="createPaletteForm">
			
				<p>
					<input type="text" name="title" id="title" v-model="title" placeholder="Palette name"/>
				</p>
				
				<span class="space"></span>

				<p>
					<label>Colors</label>
					<ul class="new-color-list">
						<li class="new-color-btn-container"><a class="btn" id="newColorBtn" @click="newColor">+</a></li>
						<li v-for="(color, index) in colors" :key="index"><input type="color" :id="'color' + index" v-model="color.value"/>
							<a class="new-color-close-btn" v-on:click="removeColor(color, index)"><svgicon icon="close" color="#ffffff"></svgicon></a>
						</li>
					</ul>
				</p>

				<span class="space"></span>

				<a class="btn btn-primary" v-on:click="createPalette">Create Palette</a>

			</form>
		</section>
	</div>
</template>

<script>
import navbar from '../Navbar'
import pageHeader from '../PageHeader'
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
			if(this.colors.length >= 1) {
				let newPalette = {
					colors: [],
					title: '',
					user_id: 0
				}
				console.log('New color palette made with: ');

				// Create the new color palette object to send to the db
				newPalette.title = this.title;
				newPalette.user_id = firebase.auth().currentUser.uid;
				this.colors.forEach(color => {
					newPalette.colors.push(color);
				});
				// Add the new color palette to the database via 'add' which generates an automatic id
				firebase.firestore().collection('colorPalettes').add(newPalette).then(docRef => {
					console.log('Successfully added new color palette');
				});

				// Stop the submit form button from interacting with the page navigation
				e.preventDefault();

				this.$toasted.show(`Created palette '${newPalette.title}'`);

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
		removeColor : function(colorToRemove, indexOfColor) {
			this.colors.splice(indexOfColor, 1);
			this.$toasted.show('Removed color');
		}
	},
	components: {
		'navbar': navbar,
		'page-header': pageHeader
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
	animation: fade-in 0.3s;
}

.new-color-list li:hover {
	box-shadow: 0px 5px 20px #00000080;
	transform: translateY(-2px);
}

.new-color-list li.new-color-btn-container {
	animation: none;
}

.new-color-close-btn {
	position: absolute;
	top: 4px;
	right: 8px;
	opacity: 0;
	z-index: 3;
	transition: opacity 0.3s;
}

.new-color-list li:hover .new-color-close-btn {
	opacity: 1;
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
