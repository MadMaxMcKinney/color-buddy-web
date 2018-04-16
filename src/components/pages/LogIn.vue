<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<div class="login-container">
				<div class="login-box">
					<p class="login-text-title"><span>Already have an account?</span> Sign in.</p>
					<label for="uname"><b>Email</b></label>
					<input type="text" placeholder="Enter Email" name="uname" v-model="email">

					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" v-model="password">

					<a class="btn btn-primary btn-fill" v-on:click="login">Login</a>
					
					<p class="login-register-text">No account? Register below to create one and sync your palettes.</p>

					<router-link class="btn btn-secondary btn-fill" to="register">Register</router-link>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
import firebase from '../firebaseInit'

import navbar from '../Navbar'

export default {
	name: 'login',
	data() {
		return {
			email : '',
			password : '',
		}
	},
	methods : {
		login : function() {
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
			.then(
				user => {
					this.$toasted.show('Logged in successfully');
					this.$router.push('/');
				}
			)
			.catch(
				error => {
					this.$swal({
					title: 'Error',
					text: error,
					type: 'error',
					confirmButtonColor: '#1e1e1e',
				});
				}
			);
		}
	},
	components: {
		'navbar': navbar
	}
}
</script>

<style scoped>

.login-box {
	display: flex;
    max-width: 350px;
    margin: 0 auto;
    flex-direction: column;
    margin-top: 42px;
    margin-bottom: 42px;
}

.login-register-text {
	margin-top: 24px;
    margin-bottom: 12px;
    font-size: 11px;
    color: #929292;
    text-align: center;
}

.login-text-title {
	font-size: 32px;
    margin-bottom: 32px;
    font-weight: 600;
}

.login-text-title span {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
	font-weight: 300;
	color: #929292;
}

</style>
