<!--App.vue-->
<template>
  <div id="app">
    <VideoInput @add-to-queue="handleVideoAdded" />
    <PlayerComponent :videoUrl="videoUrl" />
    <QueueComponent :videos="videos" @update:videos="updateVideos" />
  </div>
</template>

<script>
import PlayerComponent from "@/components/PlayerComponent.vue";
import QueueComponent from "@/components/QueueComponent.vue";
import VideoInput from "@/components/VideoInput.vue";

export default {
  name: "App",
  components: {
    PlayerComponent,
    VideoInput,
    QueueComponent,
  },
  data() {
    return {
      videos: [
        { title: "Title 1", length: "5:30" },
        { title: "A longer title 2", length: "4:45" },
      ],
      currentVideoIndex: -1,
    };
  },
  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/X2dBUVzJUts`;
    },
  },
  methods: {
    handleVideoAdded(videoTitle) {
      console.log("Video title added:", videoTitle);
      this.videos.push({ title: videoTitle, length: "4:30" });
    },
    updateVideos(newVideos) {
      this.videos = newVideos;
    },
  },
};
</script>

<style>
</style>
