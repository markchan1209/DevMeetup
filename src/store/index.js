import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedMeetups: [
            { imageUrl: 'https://media.timeout.com/images/104692494/1372/772/image.jpg',
              id: 'asdasdasd001',
              title: 'New York',
              date: '2017-07-19'
            },
            { imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg?imwidth=1240',
              id: 'asdasdasd002',
              title: 'Paris',
              date: '2017-07-20'
            },
            { imageUrl: 'https://cdn.passporthealthglobal.com/wp-content/uploads/2017/12/advice-vaccines-taiwan.jpg?x10491',
              id: 'asdasdasd003',
              title: 'Taiwan',
              date: '2017-07-21'
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
                id:'LKJAkljsdjklasd12'
            }
            commit('createMeetup', meetup)
            // Reach out to firebase and store it
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