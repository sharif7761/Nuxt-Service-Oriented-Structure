<template>
  <NuxtLayout>
    <Suspense>
      <NuxtPage />
    </Suspense>
<!--    <transition name="fade">-->
<!--      <Loader v-if="appStore.getIsInitializingStore" />-->
<!--    </transition>-->
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>