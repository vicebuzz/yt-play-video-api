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
}
</style>