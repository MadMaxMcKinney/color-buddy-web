import Vue from 'vue'
import Router from 'vue-router'
import Palettes from '@/components/pages/Palettes'
import NewPalette from '@/components/pages/NewPalette'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'Palettes',
    	component: Palettes
	},
	{
		path: '/newpalette',
		name: 'New Palettes',
		component: NewPalette
	}
  ]
})
