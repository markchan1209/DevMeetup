import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedMeetups: [
            { imageUrl: 'https://media.timeout.com/images/104692494/1372/772/image.jpg',
              id: 'asdasdasd001',
              title: 'New York',
              date: new Date(),
              location: 'New York',
              description: 'New York Pic'
            },
            { imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1240',
              id: 'asdasdasd002',
              title: 'Paris',
              date: new Date(),
              location: 'Paris',
              description: 'Paris Pic'
            },
            { imageUrl: 'https://cdn.passporthealthglobal.com/wp-content/uploads/2017/12/advice-vaccines-taiwan.jpg?x10491',
              id: 'asdasdasd003',
              title: 'Taiwan',
              date: new Date(),
              location: 'Taiwan',
              description: 'Taiwan Pic'
            }
        ],
        user: {
            id: 'askljdajlksdlkj12',
            registeredMeetups: ['aadsfhbklajsdjalsjkdl123']
        }
    },
    mutations:{
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                id:'LKJAkljsdjklasd12'
            }
            commit('createMeetup', meetup)
            // Reach out to firebase and store it
        },
        signUserUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        signUserIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        }
     },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort(
                (meetupA , meetupB) => {
                    return meetupA.date > meetupB.date
                }
            )
        },
        freaturedMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5);
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        }
    }
})