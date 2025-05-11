<template>
  <div class="bg-dark " data-bs-theme="dark">
    <NuxtLayout>
      <NuxtPage  />
    </NuxtLayout>
  </div>
</template>

<script setup>
const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-bs-theme', isDark.value ? 'dark' : 'light');
};
</script>

<style>
.dark-mode {
  background-color: #15151b ;
  color: #ffffff;
}
</style>
