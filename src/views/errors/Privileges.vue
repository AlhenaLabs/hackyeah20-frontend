<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title>Privileges error</v-card-title>
    <v-card-subtitle>You are about to access prohibited page.</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <v-alert
          dense
          outlined
          type="error"
      >
        Sorry! You can not access this page!
      </v-alert>
      <v-btn color="brown darken-4"
             @click="$router.push('/')"
             class="mr-4 mt-2"
             dark>Take me home</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class Privileges extends Vue {

}
</script>
