import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signout from '@/components/User/Signout'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'

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
            component: CreateMeetup
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
            component: Profile
        },
        {
            path: '/Signout',
            name: 'Sign Out',
            component: Signout
        },
        {
            path: '/Signin',
            name: 'Sing In',
            component: Signin
        }
    ],
    mode: 'history'
});
