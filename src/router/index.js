import Vue from 'vue'
import Router from 'vue-router'
import TabSwiper from '@/components/TabSwiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TabSwiper',
      component: TabSwiper
    }
  ]
})
