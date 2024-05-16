<!--App.vue-->
<template>
  <div id="app">
    <VideoInput @add-to-queue="handleVideoAdded" />
    <PlayerComponent :videoUrl="videoUrl" />
    <QueueComponent :videos="videos" @change-video-url="handleVideoChange" @delete-video-url="handleVideoDeleted"/>
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
        { title: "Title 1", length: "3:11", url:"https://www.youtube.com/embed/Y9-uzbWmt_E", isCurrent:true},
        { title: "A longer title 2", length: "9:33", url:"https://www.youtube.com/embed/WVo3RFvddnk", isCurrent:false},
      ]
    };
  },
  computed: {
    videoUrl() {
      const video = this.videos.filter((video) => video.isCurrent === true)[0];
      return video.url;
    },
  },
  methods: {
    handleVideoAdded(videoTitle, videoUrl) {
      console.log("Video title added:", videoTitle);
      this.videos.push({ title: videoTitle, length: "4:30", url:videoUrl, isCurrent: false });
    },
    handleVideoChange(videoUrl){
      console.log("Video changed:", videoUrl);
      const videoCurrent = this.videos.filter((video) => video.isCurrent === true)[0];
      videoCurrent.isCurrent = false;
      const video = this.videos.filter((video) => video.url === videoUrl)[0];
      video.isCurrent = true;
    },
    handleVideoDeleted(videoUrl){
      console.log("Video deleted:", videoUrl);
      const videoChosen = this.videos.filter((video) => video.url === videoUrl)[0];
      const videoChosenIndex = this.video.indexOf(videoChosen);
      if (videoChosen.isCurrent){
        if (this.videos.size > 1){
          if (videoChosenIndex === this.videos.size-1) {
            // if the video is last in the list, choose the one before it to be the new current
            this.videos[videoChosenIndex - 1].isCurrent = true;
          } else {
            this.videos[videoChosenIndex + 1].isCurrent = true;
          }
        }
      }
      this.videos.splice(videoChosenIndex, 1);
    }
  },
};
</script>

<style>
</style>
