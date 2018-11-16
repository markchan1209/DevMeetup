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
        user: null,
        loading: false,
        error: null,
    },
    mutations:{
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadedMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj)
                    {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            imageUrl: obj[key].imageUrl,
                            description: obj[key].description,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })
                    }
                    
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id
            }
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    commit('createMeetup', { ...meetup, id: key })
                })
                .catch((error) => {
                    console.log(error)
                })
            // Reach out to firebase and store it
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                    }
                )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        },
        clearError ({commit}) {
            commit('clearError')
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid , registeredMeetups: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
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
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})