<template>
  <v-card class="p-3 mx-auto my-12" max-width="1000">
    <v-container>
      <v-row cols="12" sm="12" md="6">
        <v-col>
          <v-card-title>Fishnet logs</v-card-title>
        </v-col>
        <v-col class="text-right mt-5">
          <v-btn
              color="brown darken-4"
              dark
              @click="$router.push('/')"
          >
            <v-icon
                dark
                left
            >
              mdi-arrow-left
            </v-icon>
            Back
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <span v-if="!fishnet">Please wait...</span>
      <v-alert
          dense
          outlined
          type="error"
          v-else-if="fishnet && fishnet.logs.length < 1"
      >
        This fishnet log container is empty!
      </v-alert>
      <v-timeline v-else
                  align-top
                  dense
      >
        <v-timeline-item
            v-for="log in fishnet.logs"
            :key="log.id"
            color="brown darken-4"
            small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>{{ log.type }}</strong>
            </v-col>
            <v-col>
              <strong>{{ log.created_at }}</strong>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from '@vanroeybe/vue-inversify-plugin/dist/decorator';
import {ServicesEnum} from '@/enums/ServicesEnum';
import {FishnetsService} from "@/services/FishnetsService";
import {AuthService} from "@/services/AuthService";
import {Fishnet} from "@/types/Fishnet";

@Component
export default class FishnetLogs extends Vue {
  @$inject(ServicesEnum.FISHNETS_SERVICE) private readonly fishnetsService!: FishnetsService
  @$inject(ServicesEnum.AUTH_SERVICE) private readonly authService!: AuthService
  public fishnet: Fishnet | null = null;
  private valid = false;
  private errorMessage: string | null = null;
  private successMessage: string | null = null;

  public async created(): Promise<void> {
    const id = this.$route.params.id;

    if (!id) {
      this.errorMessage = 'Missing id parameter!';
    }

    this.fishnet = await this.fishnetsService.getFishnetById(Number(id));

    if (!this.fishnet) {
      this.errorMessage = 'Fishnet not exist!';
    }
  }
}
</script>
