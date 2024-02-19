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
        console.log('here')
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
    fetchVideoTitle(videoUrl){
      fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`)
          .then(response => response.json())
          .then(data => {
            const title = data["title"];
            console.log(title)
            this.$emit('add-to-queue', title);
          })
          .catch(error => {
            console.error('Error fetching video title:', error);
          });
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