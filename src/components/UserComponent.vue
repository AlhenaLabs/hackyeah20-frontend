<template>
  <v-contiainer>
    user component
  </v-contiainer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class UserComponent extends Vue {
  name: "UserComponent"
}
</script>

<style scoped>

</style>