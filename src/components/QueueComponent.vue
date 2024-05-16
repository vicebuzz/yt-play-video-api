<template>
  <div class="queue-container">
    <div class="queue" :style="{ width: dynamicWidth }">
      <draggable :list="videos" tag="div" class="videoList" :style="{ width: dynamicWidth }">
        <template #item="{ element: video, index }">
          <li class="video" :key="index" @dblclick="playVideo(video.url)" :class="{ 'current-video': video.isCurrent === true, 'non-current-video': video.isCurrent === false }" :data-video-url="video.url">
            <span class="number">{{ index + 1 }}</span>
            <span class="title">{{ video.title }}</span>
            <span class="length">{{ video.length }}</span>
            <div class="popup-menu">
              <button class="popup-menu-item-delete" @click="deleteVideo(video.url)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    videos: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      dynamicWidth: "",
    };
  },
  mounted() {
    this.calculateDynamicWidth();
    window.addEventListener("resize", this.calculateDynamicWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculateDynamicWidth);
  },
  methods: {
    calculateDynamicWidth() {
      const maxTitleWidth = document.querySelector(".title").offsetWidth;
      this.dynamicWidth = `calc(${maxTitleWidth}px + 40px)`;
    },
    playVideo(videoUrl) {
      this.$emit("change-video-url", videoUrl);
    },
    deleteVideo(videoUrl){
      this.$emit("delete-video-url", videoUrl)
    }
  },
  components: {
    FontAwesomeIcon,
    draggable,
  },
};
</script>


<style scoped>
.queue-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-left: 25%;
  width: 50%;
}

.queue {
  border: 2px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  width: 100%;
}

.videoList {
  list-style: none;
  padding: 0;
}

.videoList li {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: move;
}

.non-current-video {
  background-color: lightgoldenrodyellow;
}

.current-video {
  background-color: orange;
}

.number {
  margin-right: 10px;
  font-weight: bold;
}

.title {
  flex-grow: 1;
  margin-right: 10px;
}

.length {
  font-style: italic;
}

.videoList li:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
}

.video:hover .popup-menu {
  display: flex;
}

.popup-menu {
  display: none;
  padding: 5px;
}

.popup-menu-item-play{
  cursor: pointer;
}

.popup-menu-item-delete{
  cursor: pointer;
}
</style>