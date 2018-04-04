<template>
	<div class="page">
		<navbar></navbar>
		<div class="login-container">
			<div class="login-box">
				<label for="uname"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="uname" required>

				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" required>

				<button type="submit">Login</button>
			</div>
		</div>
	</div>
</template>

<script>
import navbar from '../Navbar'

export default {
	name: 'login',
	data() {
		return {

		}
	},
	components: {
		'navbar': navbar
	}
}
</script>

<style scoped>

</style>
