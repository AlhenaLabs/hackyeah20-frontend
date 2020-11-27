<template>
  <v-card class="p-3 mx-auto my-12" max-width="600">
    <v-card-title>Create user</v-card-title>
    <v-card-subtitle>Here you can create new user.</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="text-center">

      <v-alert
          dense
          outlined
          type="success"
          v-if="success"
      >
        User created
      </v-alert>

      <v-alert
          dense
          outlined
          type="error"
          v-if="errorMessage"
      >
        {{ errorMessage }}
      </v-alert>

      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="form.name"
            label="Name"
            required
            filled
        ></v-text-field>

        <v-text-field
            v-model="form.email"
            type="email"
            label="E-mail"
            required
            filled
        ></v-text-field>
        <v-select
            v-model="form.role"
            :items="roles"
            label="Role"
            dense
        ></v-select>

        <v-btn
            type="submit"
            color="brown darken-4"
            class="mr-4 mt-2"
            dark
            @click="createUser"
        >
          Create user
        </v-btn>
      </v-form>

    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ICreateUserForm from "@/interfaces/forms/ICreateUserForm";
import {RolesEnum} from "@/enums/RolesEnum"
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ServicesEnum} from "@/enums/ServicesEnum";
import {UserService} from "@/services/UserService";

@Component
export default class CreateUser extends Vue {
  private valid = true;
  private success = false;
  private errorMessage: string | null = null;
  private form: ICreateUserForm = {name: '', email: '', role: null}
  private roles = [RolesEnum.ADMINISTRATOR, RolesEnum.CUSTOMER, RolesEnum.SELLER];
  @$inject(ServicesEnum.USER_SERVICE) private readonly userService!: UserService

  async createUser(): Promise<void> {
    try {
      const response = await this.userService.createUser(this.form);
      if (response.status === 201) {
        this.success = true;
      }
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }
}
</script>

<style scoped>

</style>