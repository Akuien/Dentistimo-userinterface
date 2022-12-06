<template>
      <!-- <div class="container-md"> -->
          <div class="grid">
             <ul v-if="layout === 'grid'" class="card-list">
           <p v-if="!dentists.length && message === ''">There are no dentists yet.</p>
      <b-container class="listitem"
         v-for="dentist in denstists"
        v-bind:key="dentist._id">
            <p><b-col>{{ dentist.id }}</b-col></p>
            <b-col>Title: {{ dentist.name}}</b-col>
            <b-col> Description: {{ dentist.city }}</b-col>
            <b-col> posted on: {{ dentist.address }}</b-col>
      </b-container>
         </ul>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'dentists',
  props: ['dentist'],
  mounted() {
    console.log('dentists page is loaded')
    this.retrieveAllPosts()
  },
  data() {
    return {
      dentists: [],
      message: '',
      error: '',
      layout: 'grid'
    }
  },
  methods: {
    retrieveAllPosts() {
      Api.get('/dentits')
        .then((response) => {
          this.dentists = response.data.dentists
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
