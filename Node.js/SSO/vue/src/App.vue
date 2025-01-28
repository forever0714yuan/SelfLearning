<script setup>
const token = location.search.split("=")[1];
if (!token) {
  fetch("http://localhost:3000/login?appId=9LQ8Y3mB").then((res) => {
    location.href = res.url;
  });
}
</script>

<template>
  <div>vue 技术 5174</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
