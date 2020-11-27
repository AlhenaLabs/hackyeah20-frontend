<template>
  <v-card class="p-3 mx-auto my-12" max-width="1000">
    <v-card-title>Users</v-card-title>
    <v-card-subtitle>Here you can manage user accounts.</v-card-subtitle>
    <v-row
        class="pa-4"
        justify="space-between"
    >
      <v-col cols="5">
        <v-treeview
            :active.sync="active"
            :items="items"
            open-all
            :load-children="fetchUsers"
            activatable
            color="warning"
            open-on-click
            transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">
              mdi-account
            </v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
          class="d-flex text-center"
      >
        <v-scroll-y-transition mode="out-in">
          <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
          >
            Select a User
          </div>
          <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
          >
            <v-card-text>
              <v-avatar
                  color="primary"
                  size="62"
              >
                <span class="white--text headline">{{ getAvatarText(selected.name) }}</span>
              </v-avatar>
              <h3 class="headline mb-2">
                {{ selected.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.email }}
              </div>
            </v-card-text>

          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>

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
  open = [];
  users: Array<User> = [];


  async fetchUsers() {
    this.users = await this.userService.getAllUsers();
  }

  get selected() {
    if (!this.active.length) return undefined

    const id = this.active[0]

    const x = this.users.find(user => user.id === id);
    console.log(x);
    return x;
  }

  get items() {
    return [
      {
        name: "Users",
        children: this.users
      }
    ]
  }

  getAvatarText(username: string) {
    const name = username.split(' ');

    return (name[0].charAt(0) + name[1].charAt(0)).toUpperCase();
  }

}
</script>

<style scoped>

</style>