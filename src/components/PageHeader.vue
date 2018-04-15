<template>
	<div class="page-header">
		<h2 v-if="subheaderTitle" class="page-subheader-title">
			{{subheaderTitle}}
		</h2>
		<h1 v-if="headerTitle" class="page-header-title">
			{{headerTitle}}
		</h1>
	</div>
</template>

<script>
export default {
	name: 'PageHeader',
	data() {
		return {

		}
	},
	props: [
		'subheaderTitle',
		'headerTitle'
	]
}
</script>

<style scoped>
.page-subheader-title {
	height: 19px;
	width: 24px;
	color: #8C8C8C;
	font-family: Lato;
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 4px;
}
.page-header-title {
	height: 39px;
	color: #1E1E1E;
	font-family: Lato;
	font-size: 32px;
	font-weight: bold;
}
.page-header {
	display: flex;
	flex-direction: column;
	margin-top: 60px;
}
</style>
