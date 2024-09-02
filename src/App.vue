<!--App.vue-->
<template>
  <div id="app">
    <VideoInput @add-to-queue="handleVideoAdded" />
    <div id="mainContainer">
      <PlayerComponent :videoUrl="videoUrl" :repeatFlag="repeatFlag" @video-ended="playNextVideo"/>
      <QueueComponent
          :videos="videos"
          @change-video-url="handleVideoChange"
          @delete-video-url="handleVideoDeleted"
          @move-video-up="handleVideoMoveUp"
          @move-video-down="handleVideoMoveDown"
          @randomise-songs="handleSongRandomise"
          @repeat-switch="handleRepeatSwitch"
          @play-next="playNextVideo"
          @play-last="playLastVideo"
      >
      </QueueComponent>
    </div>
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
    QueueComponent
  },
  data() {
    return {
      videos: [
         { title: "Title 1", length: "3:11", url:"https://www.youtube.com/embed/Y9-uzbWmt_E", isCurrent:true},
         { title: "A longer title 2", length: "9:33", url:"https://www.youtube.com/embed/WVo3RFvddnk", isCurrent:false},
      ],
      repeatFlag: false
    };
  },
  computed: {
    videoUrl() {
      const video = this.videos.filter((video) => video.isCurrent === true)[0];
      if (video) {
        return video.url;
      }
      return null;
    },
  },
  methods: {
    handleVideoAdded(videoTitle, videoUrl, videoLength) {
      console.log("Video title added:", videoTitle);
      this.videos.push({ title: videoTitle, length: videoLength, url:videoUrl, isCurrent: false });
      if (this.videos.length === 1){
        this.videos[0].isCurrent = true;
      }
    },
    handleVideoChange(videoIndex){
      const videoCurrent = this.videos.filter((video) => video.isCurrent === true)[0];
      if (videoCurrent){
        videoCurrent.isCurrent = false;
      }
      const video = this.videos[videoIndex];
      video.isCurrent = true;
    },
    handleVideoDeleted(videoIndex){
      const videoChosen = this.videos[videoIndex];
      if (videoChosen.isCurrent){
        if (this.videos.length > 1){
          if (videoIndex === this.videos.length-1) {
            // if the video is last in the list, choose the one before it to be the new current
            this.videos[videoIndex - 1].isCurrent = true;
          } else {
            this.videos[videoIndex + 1].isCurrent = true;
          }
        }
      }
      videoChosen.isCurrent = false
      this.videos.splice(videoIndex, 1);
    },
    playNextVideo() {
      const currentIndex = this.videos.findIndex(video => video.isCurrent);
      if (this.repeatFlag === false){
        if (currentIndex !== -1) {
          this.videos[currentIndex].isCurrent = false;
          const nextIndex = (currentIndex + 1) % this.videos.length;
          this.videos[nextIndex].isCurrent = true;
        }
      }
    },
    handleVideoMoveUp(videoIndex){
      const video = this.videos[videoIndex]
      const currentIndex = this.videos.findIndex(video => video.isCurrent);
      if (videoIndex > currentIndex){
        this.videos.splice(videoIndex,1)
        this.videos.splice(currentIndex+1,0,video)
      } else {
        this.videos.splice(videoIndex,1)
        this.videos.splice(0,0,video)
      }
    },
    handleVideoMoveDown(videoIndex){
      const video = this.videos[videoIndex]
      this.videos.splice(videoIndex,1)
      this.videos.splice(this.videos.length,0,video)
    },
    handleSongRandomise(){
      if (this.videos){
        this.videos.filter((video) => (video.isCurrent === true))[0].isCurrent = false
        for (let i = this.videos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.videos[i], this.videos[j]] = [this.videos[j], this.videos[i]];
        }
        this.videos[0].isCurrent = true
      }
    },
    handleRepeatSwitch(){
      this.repeatFlag = !this.repeatFlag;
    },
    playLastVideo(){
      const currentIndex = this.videos.findIndex(video => video.isCurrent);
    }
  },
};

</script>

<style>
/*body {
  background-color: #87a4e5;
  background-image: url('moroccan-flower-dark.png');
}*/
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body{
  /*background: linear-gradient(135deg, #FF7E5F, #FEB47B);
  background: linear-gradient(120deg, #00C9FF, #92FE9D);
  background: linear-gradient(120deg, #D4FC79, #96E6A1);
  background: linear-gradient(120deg, #654EA3, #EAAFc8);
  background: linear-gradient(120deg, #FFB75E, #ED8F03);*/
  background: linear-gradient(120deg, #0F2027, #203A43, #2C5364);
  /*background: linear-gradient(120deg, #FFDEE9, #B5FFFC);
  background: linear-gradient(120deg, #FDC830, #F37335);
  background: linear-gradient(120deg, #11998E, #38EF7D);
  background: linear-gradient(120deg, #43C6AC, #191654);*/
  color: #111827;
}
#mainContainer{
  display: flex;
  justify-content: space-between;
  gap: 0;
  padding: 20px;
}

#mainContainer > * {
  margin: 0;
  padding: 0;
}

#recorderComponent{

}

</style>
