<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div>
      <wTable></wTable>
    </div>
  </div>
</template>

<script>
import wTable from '../src/lib/MyTable/index.js'
export default {
  name: 'app',
  components:{
    wTable
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>