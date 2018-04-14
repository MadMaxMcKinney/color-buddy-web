 <template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700|Roboto:400,700');

:root {
	--primary-color: #333;
}

* {
	box-sizing: border-box !important;
}

body, html {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	font-family: 'Roboto', sans-serif;
}
h1,h2,h3,h4,h5,h6,p {
	margin: 0;
	padding: 0;
}
a {
	text-decoration: none;
	color: #1e1e1e;
	transition: opacity 0.3s;
}
	a:hover, a:focus, a:active {
		opacity: 0.8;
	}
#app {
	width: 100%;
	height: 100%;
}
.header-group {
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-flow: column;
	grid-column: center;
}
.page {
	display: grid;
	grid-template-columns: minmax(24px, 1fr) [center] minmax(0px, 1100px) minmax(24px, 1fr);
	grid-template-rows: [nav] 48px [content] 1fr [footer] 48px;
	width: 100%;
	height: 100%;
}
.content {
	grid-column: center;
	grid-row: content;
	display: flex;
	flex-direction: column;
}

/* SVG */
.svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
}

.svg-fill {
    fill: currentColor;
    stroke: none;
}

.svg-up {
    /*default*/
    transform: rotate(0deg);
}

.svg-right {
     transform: rotate(90deg);
}

.svg-down {
    transform: rotate(180deg);
}

.svg-left {
    transform: rotate(-90deg);
}

/* Buttons */
.btn {
	padding: 6px 12px;
	width: fit-content;
	display: block;
	text-decoration: none;
	border-radius: 4px;
	transition: opacity 0.3s;
	font-size: 13px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn:hover {
	cursor: pointer;
}
.btn-primary {
	background-color: #1e1e1e;
	color: white;
}
.btn-primary:hover {
	opacity: 0.8;
}
.btn-secondary {
	color: #616161;
    border: 1px solid #c7c7c7;
}
.btn-secondary:hover {
	opacity: 0.8;
}

.btn-fill {
	width: 100%;
}
.btn .svg-icon {
	margin-left: 6px;
}
.btn-return {
	position: absolute;
	top: 24px;
	left: 24px;
	animation: fade-in 3s;
}

/* Fields */
label {
	margin-bottom: 8px;
}

input {
	margin-bottom: 24px;
    margin-top: 12px;
	width: 100%;
    height: 32px;
    border-radius: 2px;
    border: none;
    padding: 0px 8px;
	transition: all 0.3s;
	box-shadow: 0px 1px 3px #0000001f;
}

input:hover, input:focus, input:active {
	box-shadow: 0px 5px 20px #00000014;
	transform: translateY(-1px);
	outline: none;
}

/* Animations */
@keyframes fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

</style>
