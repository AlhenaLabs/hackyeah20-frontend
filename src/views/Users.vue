<template>
  <div>
    Users
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ServicesEnum} from "@/enums/ServicesEnum";
import {UserService} from "@/services/UserService";
import {User} from "@/types/User";

@Component
export default class UserComponent extends Vue {
  @$inject(ServicesEnum.USER_SERVICE) private readonly userService!: UserService

  active = [];
  avatar = null;
  open = [];
  users: Array<User> = [];

  getUsers() {
   /* this.users = this.userService.getAllUsers();*/
  }

  get items() {
    return {
      name: "Users",
      children: this.users
    }
  }
}
</script>

<style scoped>

</style>