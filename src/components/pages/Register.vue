<template>
	<div class="page">
		<navbar></navbar>
		<section class="content">
			<div class="login-container">
				<div class="login-box">
					<p class="login-text-title">Register.</p>
					<label for="uname"><b>Email</b></label>
					<input type="text" placeholder="Enter Email" name="uname" v-model="email">

					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" v-model="password">

					<a class="btn btn-primary btn-fill" v-on:click="register">Register</a>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
import firebase from '../firebaseInit'

import navbar from '../Navbar'

export default {
	name: 'register',
	data() {
		return {
			email : '',
			password : ''
		}
	},
	methods : {
		register() {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
				user => {
					this.$toasted.show("Account has been created. You are now logged in!");
					this.$router.push('/');	
				},
				err => {
					alert("Error: " + err.message);
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
