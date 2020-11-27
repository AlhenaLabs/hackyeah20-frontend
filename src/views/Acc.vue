<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title>Account</v-card-title>
    <v-card-subtitle>Here you can view and edit your account information.</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="text-center">

      <v-alert
          dense
          outlined
          type="success"
          v-if="success"
      >
        Your account was updated successfully
      </v-alert>

      <v-alert
          dense
          outlined
          type="error"
          v-if="errorMessage"
      >
        {{errorMessage}}
      </v-alert>

      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="updateForm.name"
            label="Name"
            required
            filled
        ></v-text-field>

        <v-text-field
            v-model="updateForm.email"
            type="email"
            label="E-mail"
            required
            filled
        ></v-text-field>

        <v-btn
            type="submit"
            color="brown darken-4"
            class="mr-4 mt-2"
            dark
            @click="processUpdate"
        >
          Update account
        </v-btn>
      </v-form>

    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from '@vanroeybe/vue-inversify-plugin/dist/decorator';
import {ServicesEnum} from "@/enums/ServicesEnum";
import {IUpdateUserForm} from "@/interfaces/forms/IUpdateUserForm";
import {AccountService} from "@/services/AccountService";
import {Account} from "@/types/Account";

@Component
export default class Acc extends Vue {
  @$inject(ServicesEnum.ACCOUNT_SERVICE) private readonly accountService!: AccountService
  private updateForm: IUpdateUserForm = { name: '',email: ''};
  private valid = true;
  private success = false;
  private errorMessage: string|null = null;
  private account: Account|null = null;

  public async processUpdate(): Promise<void> {
    try {
      const response = await this.accountService.updateAccount(this.updateForm);
      if(response.status === 200){
        this.success = true;
      }
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }

  public async created(){
    try {
      this.account = await this.accountService.getAccount();
      this.updateForm.name = this.account.name;
      this.updateForm.email = this.account.email;
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }
}
</script>
