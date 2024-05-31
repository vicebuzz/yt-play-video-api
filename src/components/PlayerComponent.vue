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
    }
  },
  computed: {
    computedVideoUrl() {
      return `${this.videoUrl}?enablejsapi=1`;  // Add enablejsapi parameter to use YouTube IFrame API
    }
  },
  mounted() {
    this.loadYouTubeAPI();
  },
  methods: {
    loadYouTubeAPI() {
      // Ensure the YouTube IFrame API is only loaded once
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set up a callback to initialize the player when the API is ready
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
        this.$emit('video-ended');
      }
    },
    onPlayerReady(event){
      event.target.playVideo();
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
