<template>
  <div>
    <WeatherContainer />
  </div>
</template>

<script>
import WeatherContainer from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    WeatherContainer,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Raleway:wght@100;500;600&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
