<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title>Account</v-card-title>
    <v-card-subtitle>Here you can view and edit your account information.</v-card-subtitle>
    <v-divider></v-divider>
    <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
    >
      <v-tab
          v-for="item in items"
          :key="item"
          @click="clearAlerts"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-card-text class="text-center">
    <v-alert
        dense
        outlined
        type="success"
        v-if="success"
    >
      Account updated successfully
    </v-alert>

      <template v-if="errorMessage">
        <v-alert
            v-for="error in errorMessage"
            dense
            outlined
            type="error"
            :key="error"
        >
          {{error}}
        </v-alert>
      </template>

    </v-card-text>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card-text class="text-center">
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
      </v-tab-item>
      <v-tab-item>
        <v-card-text class="text-center">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="updatePassForm.password"
                type="password"
                label="Password"
                required
                filled
            ></v-text-field>

            <v-text-field
                v-model="updatePassForm.password_confirmation"
                type="password"
                label="Password Confirmation"
                required
                filled
            ></v-text-field>

            <v-btn
                type="submit"
                color="brown darken-4"
                class="mr-4 mt-2"
                dark
                @click="processUpdatePass"
            >
              Change Password
            </v-btn>
          </v-form>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
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
import {IUpdatePasswordForm} from "@/interfaces/forms/IUpdatePasswordForm";

@Component
export default class Acc extends Vue {
  @$inject(ServicesEnum.ACCOUNT_SERVICE) private readonly accountService!: AccountService
  private updateForm: IUpdateUserForm = { name: '',email: ''};
  // eslint-disable-next-line @typescript-eslint/camelcase
  private updatePassForm: IUpdatePasswordForm = { password: '', password_confirmation: ''};
  private valid = true;
  private success = false;
  private errorMessage: string|null = null;
  private account: Account|null = null;
  private items = ['Credentials', 'Password']
  private tab = null;

  public async processUpdate(): Promise<void> {
    this.clearAlerts();
    try {
      const response = await this.accountService.updateAccount(this.updateForm);
      if(response.status === 200){
        this.success = true;
      }
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }

  public async processUpdatePass(): Promise<void> {
    this.clearAlerts();
    try {
      const response = await this.accountService.updateAccountPass(this.updatePassForm);
      if(response.status === 200){
        this.success = true;
      }
    } catch (e) {
      this.errorMessage = e.response.data.errors.password ?? e.message;
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
  public clearAlerts(){
    this.errorMessage = '';
    this.success = false;
  }
}
</script>
