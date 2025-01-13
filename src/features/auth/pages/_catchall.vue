<template>
  <div>
    <h1>Dynamic Page</h1>
    <p>
      You are viewing the route: <strong>{{ routePath }}</strong>
    </p>
    <p v-if="routeParams">
      Route parameters: <strong>{{ routeParams }}</strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

// Access the current route
const route = useRoute();

// Extract the dynamic path and parameters
const routePath = route.path; // Full route path
const routeParams = route.params.pathMatch; // Dynamic segment from the catch-all route
</script>

<style scoped>
h1 {
  color: #4a5568;
}
p {
  font-size: 1.2rem;
  margin-top: 1rem;
}
strong {
  color: #2b6cb0;
}
</style>