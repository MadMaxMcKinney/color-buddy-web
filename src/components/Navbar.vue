<template>
	<div class="nav">
		<div class="nav-content">
			<div class="nav-left">
				<img src="../assets/color-buddy-logo.png" alt="Color Buddy" class="logo" />
				<ul class="nav-items">
					<li v-for="(item, index) in navItems" :key="index" v-bind:class="{selected : item.selected}">{{item.title}}</li>
				</ul>
			</div>
			<div class="nav-right">
				<a class="nav-profile"><img /></a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			navItems: [
				{title: 'Palettes', selected: true},
				{title: 'Groups', selected: false},
				{title: 'Generator', selected: false}
			]
		}
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
	box-shadow: 0 4px 22px 0 rgba(0,0,0,0.07);
}
.nav-content {
	width: 100%;
	max-width: 1100px;
	display: flex;
	justify-content: space-between;
	height: 100%;
	padding: 0px 24px;
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
}
	.nav-items li.selected {
		border-bottom: 1px solid #E74C3C;
	}
</style>
