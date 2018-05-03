import Vue from 'vue'
import Router from 'vue-router'
import TabSwiper from '@/components/TabSwiper'
import DataTest from '@/pages/DataTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabSwiper',
      component: TabSwiper
    }, {
      path: '/data',
      name: 'data',
      component: DataTest
    }
  ]
})
