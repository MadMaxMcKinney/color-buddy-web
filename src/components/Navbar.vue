<template>
	<div class="nav">
		<div class="nav-content">
			<div class="nav-left">
				<router-link to="/">
					<img src="../assets/color-buddy-logo.png" srcset="../assets/color-buddy-logo@2x.png" alt="Color Buddy" class="logo" />
				</router-link>
				<ul class="nav-items">
					<li v-for="(item, index) in navItems" :key="index" v-bind:class="{selected : index == selectedNavItemIndex}"><router-link :to="item.path">{{item.title}}</router-link></li>
				</ul>
			</div>
			<div class="nav-right">
				<profile-dropdown :auth="this.auth"></profile-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from '../components/firebaseInit'
import profileDropdown from './ProfileDropdown'

export default {
	name: 'Navbar',
	data() {
		return {
			navItems: [
				{title: 'Palettes', selected: true, path: '/' },
				{title: 'Groups', selected: false, path: 'groups' },
				{title: 'Generator', selected: false, path: 'generator'}
			],
			auth: false,
		}
	},
	props: ['selectedNavItemIndex'],
	created() {
		firebase.auth().onAuthStateChanged(user => {
			if(user) {
				this.auth = true;
			} else {
				this.auth = false;
			}
		})
	},
	components: {
		'profile-dropdown' : profileDropdown
	}
}
</script>

<style scoped>
.nav {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	grid-row: nav;
	grid-column: 1 / 4;
	box-shadow: 0 4px 22px 0 rgba(0,0,0,0.05);
}
.nav-content {
	width: 100%;
	max-width: 1100px;
	display: flex;
	justify-content: space-between;
	height: 100%;
	margin: 0px 24px;
}
.nav-left, .nav-right {
	display: flex;
    align-items: center;
}
.nav-items {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: 55px;
	height: 100%;
	align-items: center;
}
.nav-items li {
	width: 110px;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	color: #272727;
	font-size: 14px;
	margin-right: 20px;
}
	.nav-items li.selected {
		border-bottom: 1px solid #E74C3C;
	}

.logo {
	height: 20px;
}

</style>
