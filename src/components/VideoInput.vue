<template>
  <div class="input-container">
    <input type="text" v-model="videoUrl" placeholder="Enter URL">
    <button class="input-btn" @click="fetchVideoURL">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: '',
      videoId: ''
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
      let title = ''
      fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            title = data["title"];
          })
          .catch(error => {
            console.error('Error fetching video title:', error);
          });
      const videoDuration = await this.fetchVideoDuration(this.videoUrl);
      this.$emit('add-to-queue', title, `https://www.youtube.com/embed/` + this.extractVideoId(videoUrl), videoDuration);
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
}

.input-container button {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  background: white;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.input-container button:hover {
  background: #000000;
  color: #ffffff;
}
</style>