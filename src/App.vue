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

body, html {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
}
h1,h2,h3,h4,h5,h6,p {
	margin: 0;
	padding: 0;
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
</style>
