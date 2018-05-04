import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AlbumDetail from '@/components/AlbumDetail'
import TabSwiper from '@/components/TabSwiper'
import DataTest from '@/pages/DataTest'

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
      name: 'TabSwiper',
      component: TabSwiper
    }, {
      path: '/data',
      name: 'data',
      component: DataTest
    }
  ]
})
