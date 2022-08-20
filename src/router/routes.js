import Home from '@/views/Home.vue'
import Todos from '@/views/Todos.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'

const routes = [
    { path: '/', name: 'sign-in', component: SignIn },
    { path: '/home', name: 'home', component: Todos },
    { path: '/todos', name: 'todos', component: Todos },
    { path: '/sign-up', name: 'sign-up', component: SignUp },
]

export default routes