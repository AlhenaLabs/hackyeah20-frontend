<template>
  <v-card class="p-3 mx-auto my-12" max-width="400">
    <Logo class="text-center" width="320" show-text="true"></Logo>
    <v-divider></v-divider>
    <v-card-title>Sing in</v-card-title>
    <v-card-subtitle>You have to sign in to use system functionalities.</v-card-subtitle>
    <v-card-text>
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
            v-model="loginForm.email"
            type="email"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="loginForm.password"
            type="password"
            label="Password"
            required
        ></v-text-field>
        <v-btn
            type="submit"
            color="primary"
            class="mr-4 mt-2"
            @click="processLogin"
        >
          Sign in
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
import {ILoginForm} from "@/interfaces/forms/ILoginForm";
import {AuthService} from "@/services/AuthService";
import Logo from "@/components/Logo.vue";
@Component({
  components: {Logo}
})
export default class Login extends Vue {
  @$inject(ServicesEnum.AUTH_SERVICE) private readonly authService!: AuthService
  private loginForm: ILoginForm = {email: '', password: ''};
  private valid = true;
  private errorMessage: string|null = null;

  public async processLogin(): Promise<void> {
    try {
      await this.authService.login(this.loginForm);
      this.$router.push('Dashboard');
      this.$router.go(0);
    } catch (e) {
      this.errorMessage = e.response.data.message ?? e.message;
    }
  }
}
</script>
