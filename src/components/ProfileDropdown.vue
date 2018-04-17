<template>
	<div class="nav-profile">
		<div class="login-dropdown">
			<img v-if="auth" class="profile-image" src="../assets/profile-icon.png" srcset="../assets/profile-icon@2x.png" />
			<img v-else class="profile-image" src="../assets/profile-icon-inactive.png" srcset="../assets/profile-icon-inactive@2x.png" />
			<div class="login-dropdown-content">
				<p v-show="auth"><a href="#" v-on:click="signOut">Sign out</a></p>
				<p v-show="!auth"><router-link to="login">Login</router-link></p>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from './firebaseInit'

export default {
	name: 'ProfileDropdown',
	data() {
		return {

		}
	},
	props: [
		'auth',
	],
	methods : {
		signOut() {
			firebase.auth().signOut().then(
				success => {
					this.$toasted.show('Logged out successfully');
					// Once you logout push the user back to the homepage
					this.$router.push('/');
				},
				err => {
					alert(err);
				}
			);
		}
	}
}
</script>

<style scoped>
.profile-image {
	width: 27px;
    height: 27px;
    background: #f1f1f1;
    border-radius: 100%;
}
.login-dropdown {
	position: relative;
}

.login-dropdown:hover .login-dropdown-content {
	opacity: 1;
	pointer-events: all;
}
.login-dropdown-content {
	display: flex;
	flex-direction: column;
	opacity: 0;
	position: absolute;
	background: #ffffff;
    color: #1e1e1e;
    min-width: 135px;
    right: 0;
    padding: 12px 28px;
    box-shadow: 0px 5px 15px #0000001a;
    border-radius: 4px;
	pointer-events: none;
	transition: all 0.3s;
}

	.login-dropdown-content p {
		line-height: 28px;
	}
</style>
