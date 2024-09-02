<template>
  <div class="player-container">
    <iframe id="player"
            :src="computedVideoUrl"
            width="100%"
            height="100%"
            ref="iframe"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    repeatFlag: {
      type: Boolean,
      required:true
    }
  },
  watch: {
    videoUrl(newVal) {
      if (document.getElementById('iframe_api') != null) {
        const videoId = this.extractVideoId(newVal);
        this.player.loadVideoById(videoId);
      } else {
        this.loadYouTubeAPI();
      }
    }
  },
  computed: {
    computedVideoUrl() {
      return `${this.videoUrl}?enablejsapi=1`;
    }
  },
  mounted() {
    this.loadYouTubeAPI();
  },
  methods: {
    loadYouTubeAPI() {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = this.initializeYouTubePlayer;
      } else if (window.YT && window.YT.Player) {
        this.initializeYouTubePlayer();
      }
    },
    initializeYouTubePlayer() {
      this.player = new YT.Player(this.$refs.iframe, {
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    },
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        console.log("ended")
        if (this.repeatFlag){
          event.target.loadVideoById(this.extractVideoId(this.videoUrl), 0, 'large');
        } else{
          this.$emit('video-ended');
        }
      }
    },
    onPlayerReady(event){
      event.target.loadVideoById(this.extractVideoId(this.videoUrl), 0, 'large');
    },
    extractVideoId(url){
      const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
      return match ? match[1] : null;
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }
};
</script>

<style scoped>
.player-container {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 50px;
  padding-left: 25%;
  width: 50%;
  height: 50vh;
}
</style>
