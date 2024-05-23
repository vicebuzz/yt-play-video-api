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
    videoUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    computedVideoUrl() {
      return `${this.videoUrl}?enablejsapi=1`;
    }
  },
  mounted() {
    this.initializeYouTubePlayer();
  },
  methods: {
    initializeYouTubePlayer() {
      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player('player', {
          events: {
            'onStateChange': this.onPlayerStateChange
          }
        });
      };

      // Load the YouTube IFrame API script
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        window.onYouTubeIframeAPIReady();
      }
    },
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        this.$emit('video-ended');
      }
    }
  }
};
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