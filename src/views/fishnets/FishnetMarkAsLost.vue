<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title>Mark as lost</v-card-title>
    <v-card-subtitle>You are about to mark this fishnet as lost.</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <div class="text-center">
        <v-btn color="brown darken-4"
               @click="$router.push('/')"
               class="ml-10 mb-1"
               dark>Take me home</v-btn>
        <v-btn color="brown darken-4"
               @click="markAsLost"
               class="ml-5 mb-1"
               dark>Mark as lost</v-btn>
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

  public async markAsLost() {
    try {
      await this.fishnetsService.markAsLost(Number(this.id));
      this.$router.push('/');
    } catch (e) {
      this.errorMessage = 'Fishnet cannot be marked as lost.';
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
