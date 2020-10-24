<template>
  <div id="app">
    
    <router-view v-if="isRouterAlive"></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
    
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  components: {
    FooterGuide
  },
   mounted(){
     this.$store.dispatch('getUserInfo');
  },
    data () {
            return {
                isRouterAlive: true
            }
          },
        provide(){ //提供
            return {
                reload: this.reload
            }
        },
        methods: {
            reload(){
                this.isRouterAlive = false
                this.$nextTick( function () {
                    this.isRouterAlive = true
                })
            }
        }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
