<template>
  <beat-loader class="custom-loader":color="color"></beat-loader>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BeatLoader'

export default {
  name: 'CustomLoading',

  components: {
    BeatLoader
  },

  data(){
    return {
      color: '#777',
    }
  }
}
</script>

<style scoped>
.custom-loader {
  text-align: center;
  margin-top: 50px;
}
</style>
