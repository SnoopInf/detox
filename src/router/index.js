import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const MainView =  () => import('../views/MainView.vue')
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')
const EcoCaseView = () => import('../views/EcoCaseView.vue')
const EcoView = () => import('../views/EcoView.vue')
const HealthView = () => import('../views/HealthView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/main/', component: MainView },
      { path: '/eco/:page(\\d+)?', component: EcoView },
      { path: '/health/', component: HealthView },
      { path: '/ecocase/', component: EcoCaseView },
      { path: '/blog/:page(\\d+)?', component: createListView('top') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/top' }
    ]
  })
}
