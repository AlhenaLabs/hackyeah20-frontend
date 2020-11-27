<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-divider></v-divider>
    <v-container>
      <v-row cols="12" sm="12" md="6">
        <v-col>
          <v-card-title>Add fishnet</v-card-title>
          <v-card-subtitle>Here you can add new fishnet by rfid.</v-card-subtitle>
        </v-col>
        <v-col class="text-right mt-5">
          <router-link to="/">
            <v-btn
                color="brown darken-4"
                dark
            >
              <v-icon
                  dark
                  left
              >
                mdi-arrow-left
              </v-icon>
              Back
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <v-alert
          dense
          outlined
          type="error"
          v-if="errorMessage"
      >
        {{ errorMessage }}
      </v-alert>
      <v-alert
          dense
          outlined
          type="success"
          v-if="successMessage"
      >
        {{ successMessage }}
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-text-field
                v-model="createFishnetForm.rfid"
                label="Rfid"
                required
                class="required"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-col class="text-right">
              <v-btn
                  class="mr-4"
                  @click="resetForm"
              >
                Clear
              </v-btn>
              <v-btn
                  class="mr-4"
                  color="brown darken-4"
                  dark
                  @click="createFishnet"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
import {ICreateFishnetForm} from "@/interfaces/forms/ICreateFishnetForm";
import {VForm} from "@/types/Form";

@Component
export default class CreateFishnet extends Vue {
  @$inject(ServicesEnum.FISHNETS_SERVICE) private readonly fishnetsService!: FishnetsService
  @$inject(ServicesEnum.AUTH_SERVICE) private readonly authService!: AuthService
  public createFishnetForm: ICreateFishnetForm = {
    rfid: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    seller_id: Number(''),
  };

  private valid = false;
  private errorMessage: string | null = null;
  private successMessage: string | null = null;

  public async createFishnet(): Promise<void> {
    this.successMessage = null;
    this.errorMessage = null;
    const form = this.$refs.form as VForm;

    if (!form.validate() || !confirm("Are you sure?")) {
      return;
    }

    try {
      await this.fishnetsService.create(this.createFishnetForm);

      this.successMessage = 'Fishnet added to an assortment.'

      form.reset();
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }

  public async created(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.createFishnetForm.seller_id = await this.authService.getLoggedUser()?.id ?? 0;
  }

  public async resetForm(): Promise<void> {
    const form = this.$refs.form as VForm;

    this.successMessage = null;
    this.errorMessage = null;

    this.createFishnetForm.rfid = '';
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.createFishnetForm.seller_id = await this.authService.getLoggedUser()?.id ?? 0;

    form.reset();
  }
}
</script>

<style>
.required label::after {
  content: " *";
  color: red;
}
</style>