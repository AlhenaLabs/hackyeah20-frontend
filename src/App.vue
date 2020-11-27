<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" width="100%" height="100%">
      <v-app-bar v-if="token"
                 color="brown lighten-4"
                 light
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <Logo class="text-right" width="120" height="40" white="true"></Logo>
      </v-app-bar>
      <v-system-bar color="brown darken-4"></v-system-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          bottom
          temporary
      >
        <v-list
            nav
            dense
        >
          <Menu></Menu>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <router-view/>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from "@/components/Menu.vue";
import {StorageKeys} from "@/enums/StorageKeys";
import Logo from "@/components/Logo.vue";

export default Vue.extend({
  name: 'App',

  components: {
    Logo,
    Menu
  },

  data: () => ({
    drawer: false,
    group: null,
    token: !!localStorage.getItem(StorageKeys.AUTH_TOKEN)
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
});
</script>
