<script setup>

</script>

<template>
  <div class="input-container">
    <input type="text" id="urlInput" placeholder="Enter url:">
    <button class="input-btn">+</button>
  </div>
</template>

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