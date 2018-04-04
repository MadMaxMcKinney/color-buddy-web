import Vue from 'vue'
import Router from 'vue-router'
import Palettes from '@/components/pages/Palettes'
import CreatePalette from '@/components/pages/CreatePalette'
import LogIn from '@/components/pages/LogIn'
import DetailPalette from '@/components/pages/DetailPalette'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	name: 'palettes',
    	component: Palettes
	},
	{
		path: '/createpalette',
		name: 'createpalette',
		component: CreatePalette
	},
	{
		path: '/login',
		name: 'login',
		component: LogIn
	},
	{
		path: '/palette/:id',
		component: DetailPalette,
		props: true,
		name: 'palette'
	}
  ]
})
