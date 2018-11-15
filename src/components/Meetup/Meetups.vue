<template>
    <v-container>
        <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" mb-2>
            <v-flex xs12 sm8 md8 offset-sm1 offest-md2>
                <v-card class="info" >
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5>
                                <v-card-media
                                :src="meetup.imageUrl"
                                height="150px"
                                >
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h1 class="white--text">{{ meetup.title}}</h1>
                                        <div>{{meetup.date}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-action>
                                    <v-btn flat :to="'/meetups/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                        </v-btn>
                                </v-card-action>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>
