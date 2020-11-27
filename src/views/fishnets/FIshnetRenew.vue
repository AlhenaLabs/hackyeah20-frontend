<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title class="justify-center">Renew</v-card-title>
    <v-card-subtitle class="text-center">You are about to renew status of this fishnet.</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <v-alert
          v-if="errorMessage"
          dense
          outlined
          type="error">
        {{this.errorMessage}}
      </v-alert>
      <div class="text-center">
        <v-btn color="brown darken-4"
               @click="$router.push('/')"
               class="ml-10 mb-1"
               dark>Take me home</v-btn>
        <v-btn color="brown darken-4"
               @click="renew"
               class="ml-5 mb-1"
               dark>Renew</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {Fishnet} from "@/types/Fishnet";
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ServicesEnum} from "@/enums/ServicesEnum";
import {FishnetsService} from "@/services/FishnetsService";

@Component
export default class FishnetMarkAsLost extends Vue {
  @$inject(ServicesEnum.FISHNETS_SERVICE) private readonly fishnetsService!: FishnetsService
  private id: number | null = null;
  private errorMessage: string | null = null;
  private fishnet: Fishnet | null = null

  public async renew() {
    try {
      await this.fishnetsService.renew(Number(this.id));
      this.$router.push('/');
    } catch (e) {
      this.errorMessage = 'Fishnet cannot be renewed.';
    }
  }

  public async created() {
    this.id = Number(this.$route.params.id);

    if (!this.id) {
      this.errorMessage = 'Missing id parameter!';
    }

    this.fishnet = await this.fishnetsService.getFishnetById(Number(this.id));

    if (!this.fishnet) {
      this.errorMessage = 'Fishnet not exist!';
    }
  }
}
</script>
