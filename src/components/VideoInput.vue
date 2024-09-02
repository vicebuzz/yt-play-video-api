<template>
  <div class="input-container">
    <input type="text" v-model="videoUrl" placeholder="Enter URL">
    <button class="input-btn" @click="fetchVideoURL">+</button>
    <button @click="recordAudio" :class="isRecording ? 'recording-on' : 'input-btn'">
      <font-awesome-icon :icon="['fa', 'microphone']" />
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      videoUrl: '',
      videoId: '',
      isRecording: false,
    };
  },
  methods: {
    fetchVideoURL(){
      if (this.videoUrl.trim() !== '') {
        this.videoId = this.extractVideoId(this.videoUrl);
        if (this.videoId) {
          this.fetchVideoTitle(this.videoUrl);
        } else {
          console.error('Invalid YouTube URL');
        }
      } else {
        console.error('Invalid YouTube URL');
      }
      this.videoUrl = ''
    },
    extractVideoId(url){
      const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
      return match ? match[1] : null;
    },
    async fetchVideoTitle(videoUrl){
      const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`);
      const data = await response.json();

      const videoTitle = data.title;
      const videoDuration = await this.fetchVideoDuration(videoUrl);

      this.$emit('add-to-queue', videoTitle, `https://www.youtube.com/embed/${this.extractVideoId(videoUrl)}`, videoDuration);
    },
    async fetchVideoDuration(url) {
      const videoId = this.extractVideoId(url);
      const apiKey = 'AIzaSyC0S402IMSA4vkYRIrL02UXthPYSXrxpNs'; // Replace with your YouTube Data API key
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const duration = data.items[0].contentDetails.duration;
        return this.convertISO8601ToDuration(duration);
      } else {
        throw new Error('Video not found');
      }
    },
    convertISO8601ToDuration(isoDuration) {
      const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = (parseInt(match[1], 10) || 0);
      const minutes = (parseInt(match[2], 10) || 0);
      const seconds = (parseInt(match[3], 10) || 0);
      return `${hours ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    async recordAudio() {
      this.isRecording = !this.isRecording
      console.log(this.isRecording)
    }
  }
};
</script>

<style scoped>
.input-container {
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container input {
  min-height: 10%;
  min-width: 50%;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  background: white;
  color: black;
}

.input-btn {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  background: white;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.input-btn:hover {
  background: transparent;
  color: #ffffff;
}

.recording-on {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  background: white;
  color: red;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recording-on:hover {
  background: red;
  color: white;
}
</style>