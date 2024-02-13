<template>
  <div class="queue-container">
    <div class="queue">
      <draggable v-model="videos" tag="ul" class="videoList">
        <template #item="{ element: video, index }">
          <li class="video" :key="video.id">
            <span class="number">{{ index + 1 }}</span>
            <span class="title">{{ video.title }}</span>
            <span class="length">{{ video.length }}</span>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';
  import draggable from 'vuedraggable';

  const videos = ref([
    { id: 1, title: 'Title 1', length: '5:30' },
    { id: 2, title: 'A longer title 2', length: '4:45' },
  ]);

  const dynamicWidth = ref('');

  onMounted(() => {
  const maxTitleWidth = document.querySelector('.title').offsetWidth;
  dynamicWidth.value = `calc(${maxTitleWidth}px + 40px)`;
});


</script>

<style scoped>
.queue-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
}

.queue {
  border: 2px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  width: 300px;
}

.videoList {
  list-style: none;
  padding: 0;
}

.videoList li {
  border: 1px solid #ccc;
  border-radius: 10px; /* Adjust the radius as needed */
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
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