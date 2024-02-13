<!-- App.vue -->
<template>
  <div id="app">
    <VideoInput />
    <PlayerComponent :videoUrl="videoUrl" />
    <QueueComponent />
  </div>

</template>

<script>
import PlayerComponent from "@/components/PlayerComponent.vue";
import QueueComponent from "@/components/QueueComponent.vue";
import VideoInput from "@/components/VideoInput.vue";


export default {
  name:'App',
  components:{
    PlayerComponent,
    VideoInput,
    QueueComponent,
  },
  computed:{
    videoUrl() {
      return `https://www.youtube.com/embed/X2dBUVzJUts`;
    }
  }
};
</script>

<style>

</style>
