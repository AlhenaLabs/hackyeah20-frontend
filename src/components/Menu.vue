<template>
  <v-container>
    <v-list-item-group
        active-class="deep-purple--text text--accent-4">
      <v-list-item>
        <v-list-item-title>
          <router-link to="/" class="v-btn">Dashboard</router-link>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <a class="v-btn" @click="logout">Logout</a>
        </v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ServicesEnum} from "@/enums/ServicesEnum";
import {User} from "@/types/User";
import {AuthService} from "@/services/AuthService";

@Component
export default class Menu extends Vue {
  @$inject(ServicesEnum.AUTH_SERVICE) private readonly authService!: AuthService
  private user: User | null = null;

  public async logout(): Promise<void> {
    await this.authService.logout();
    this.$router.push('/login');
    this.$router.go(0);
  }

  public async mounted(): Promise<void> {
    this.user = this.authService.getLoggedUser();
  }
}
</script>
