<template>
  <div id="app">
    <Home></Home>
  </div>
  <!-- <v-app>
    <v-container class="grey lighten-4" fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <Home></Home>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app> -->
</template>

<script>
import Home from './components/Home'
export default {
  components:{
    Home
  }
}
</script>

<style>
@import './assets/css/common.css';
@import './assets/css/reset.css';
@import './assets/css/mediaqueries.css';

</style>
