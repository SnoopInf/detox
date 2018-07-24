import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const MapView =  () => import('../views/MapView.vue')
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/map/', component: MapView },
      { path: '/eco/:page(\\d+)?', component: createListView('eco') },
      { path: '/health/:page(\\d+)?', component: createListView('health') },
      { path: '/ecocase/:page(\\d+)?', component: createListView('ecocase') },
      { path: '/blog/:page(\\d+)?', component: createListView('blog') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/top' }
    ]
  })
}
