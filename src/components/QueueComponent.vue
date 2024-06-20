<template>
  <div class="queue-container">
    <div class="queue" :style="{ width: dynamicWidth }">
      <div class="controls-container">
        <button
            class="random-shuffle-btn"
            @click="randomiseSongs"
        >
          <font-awesome-icon :icon="['fa','fa-random']"/>
        </button>
        <button
            class="repeat-song-btn"
            @click="repeatSwitch"
        >
          <font-awesome-icon :icon="['fa','fa-exchange']"/>
        </button>
        <button
            @click="playLast"
        >
          <font-awesome-icon :icon="['fa','fa-step-backward']"/>
        </button>
        <button
            @click="playNext"
        >
          <font-awesome-icon :icon="['fa','fa-step-forward']"/>
        </button>
      </div>
      <draggable :list="videos" tag="div" class="videoList" :style="{ width: dynamicWidth }">
        <template #item="{ element: video, index }">
          <li class="video" :key="index" @dblclick="playVideo(index)" :class="{ 'current-video': video.isCurrent === true, 'non-current-video': video.isCurrent === false }" :data-video-url="video.url">
            <span class="number">{{ index + 1 }}</span>
            <span class="title">{{ video.title }}</span>
            <span class="length">{{ video.length }}</span>
            <button
                class="item-arrow-up"
                @click="moveVideoUp(index)"
                :class="{ 'current-arrow-up-btn': video.isCurrent, 'non-current-arrow-up-btn': !video.isCurrent }"
            >
              <font-awesome-icon :icon="['fa','long-arrow-up']"/>
            </button>
            <button
                class="item-arrow-down"
                @click="moveVideoDown(index)"
                :class="{ 'current-arrow-down-btn': video.isCurrent, 'non-current-arrow-down-btn': !video.isCurrent }"
            >
              <font-awesome-icon :icon="['fa','long-arrow-down']"/>
            </button>
            <button
                class="item-delete-btn"
                @click="deleteVideo(index)"
                :class="{ 'current-delete-btn': video.isCurrent, 'non-current-delete-btn': !video.isCurrent }"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
    playVideo(videoIndex) {
      this.$emit("change-video-url", videoIndex);
    },
    deleteVideo(videoIndex){
      //console.log('Emitting delete-video-url for:', videoIndex);
      this.$emit("delete-video-url", videoIndex)
    },
    moveVideoUp(videoUrl){
      this.$emit("move-video-up", videoUrl)
    },
    moveVideoDown(videoUrl){
      this.$emit("move-video-down", videoUrl)
    },
    randomiseSongs(){
      this.$emit("randomise-songs")
    },
    repeatSwitch(){
      this.$emit("repeat-switch")
    },
    playNext(){
      this.$emit("play-next")
    },
    playLast(){
      this.$emit("play-last")
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

.video:hover {
  display: flex;
}

.video .length {
  padding-right: 15px;
}

.item-delete-btn {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.item-delete-btn:hover.current-delete-btn {
  color: orange;
  background-color: black;
}

.item-delete-btn:hover.non-current-delete-btn {
  color: lightgoldenrodyellow;
  background-color: black;
}

.item-arrow-down {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.item-arrow-down:hover.current-arrow-down-btn {
  color: orange;
  background-color: black;
}

.item-arrow-down:hover.non-current-arrow-down-btn {
  color: lightgoldenrodyellow;
  background-color: black;
}

.item-arrow-up {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.item-arrow-up:hover.current-arrow-up-btn {
  color: orange;
  background-color: black;
}

.item-arrow-up:hover.non-current-arrow-up-btn {
  color: lightgoldenrodyellow;
  background-color: black;
}

.controls-container{
  padding: 5px;
  justify-content: flex-end;
  margin-top: 10px;
}

.controls-container button {
  margin-right: 5px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: white
}

.controls-container button:hover{
  color: black;
  background-color: white;
}
</style>