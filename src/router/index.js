import Vue from 'vue'
import Router from 'vue-router'
import Palettes from '@/components/pages/Palettes'
import CreatePalette from '@/components/pages/CreatePalette'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'Palettes',
    	component: Palettes
	},
	{
		path: '/createpalette',
		name: 'Create Palettes',
		component: CreatePalette
	}
  ]
})
