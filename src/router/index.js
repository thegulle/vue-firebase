import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if ((to.name !== 'sign-in' && to.name !== 'sign-up') && !userStore.isLoggedIn) {
        next({ name: 'sign-in' })
    }
    else {
        next()
    }
})


export default router