<script>
export default {
  props: {
    videoUrl: "https://www.youtube.com/embed/X2dBUVzJUts",
  }
}
</script>

<template>
  <div class="player-container">
    <iframe id="player"
            :src="videoUrl"
            width=100%,
            height=100%
    ></iframe>
    <div class="control-buttons">

    </div>
  </div>
</template>

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