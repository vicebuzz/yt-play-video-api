<template>
  <div class="queue-container">
    <div class="queue" :style="{ width: dynamicWidth }">
      <draggable :list="videos" @update="handleUpdate" tag="div" class="videoList" :style="{ width: dynamicWidth }">
        <template #item="{ element: video, index }">
          <li class="video" :key="index">
            <span class="number">{{ index + 1 }}</span>
            <span class="title">{{ video.title }}</span>
            <span class="length">{{ video.length }}</span>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    videos: {
      type: Array,
      required: true,
    },
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
    handleUpdate(newList) {
      this.$emit("update:videos", newList); // Emitting event to update videos in parent component
    },
  },
  components: {
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
  cursor: pointer;
}

.current {
  background-color: orange;
}

.videoList div{
  cursor: move;
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

.videoList div:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
}
</style>