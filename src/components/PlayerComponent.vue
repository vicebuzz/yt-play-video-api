<template>
  <div class="player-container">
    <iframe id="player"
            :src="videoUrl"
            width=100%,
            height=100%
    ></iframe>
    <youtube></youtube>
    <div class="control-buttons">

    </div>
  </div>
</template>

<script>
import VueYouTubeEmbed from 'vue-youtube-embed'



export default {
  props: {
    videoUrl: "https://www.youtube.com/embed/X2dBUVzJUts",
  },
  methods: {
    getNext(){

    }
  },
  components: {
    VueYouTubeEmbed
  }
}
</script>

<style scoped>
.player-container{
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 50px;
  padding-left: 25%;
  width: 50%;
  height: 50vh;
}
</style>