import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AlbumDetail from '@/components/AlbumDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: ':id',
          component: AlbumDetail
        }
      ]
    }
  ]
})
