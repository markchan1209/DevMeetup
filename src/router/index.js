import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from './auth-guard'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Home
        },
        {
            path: '/meetups',
            name: 'Meetups',
            component: Meetups
        },
        {
            path: '/meetup/new',
            name: 'Create Meetup',
            component: CreateMeetup,
            beforeEnter: AuthGuard
        },
        {
            path: '/meetups/:id',
            name: 'Meetup',
            props: true,
            component: Meetup
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGuard
        },
        {
            path: '/Signup',
            name: 'Sign Up',
            component: Signup
        },
        {
            path: '/Signin',
            name: 'Sing In',
            component: Signin
        }
    ],
    mode: 'history'
});
