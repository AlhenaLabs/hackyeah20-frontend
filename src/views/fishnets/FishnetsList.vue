<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" width="100%" height="100%">
      <v-container>
        <v-row>
          <v-col cols="12"
                 sm="12"
                 md="6">
            <v-card-title>Manage fishnets</v-card-title>
            <v-card-subtitle>
              Here you can manage your fishnets.
            </v-card-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-md-right text-sm-center mt-md-5">
            <v-btn
                color="brown darken-4"
                dark
                class="ml-2"
                @click="$router.push('/fishnets/create')"
            >
              Add fishnet
              <v-icon
                  dark
                  right
              >
                mdi-database-plus
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="fishnets"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
        >
          <template v-slot:item.seller="{ item }">
            {{item.seller ? item.seller.name : ''}}
          </template>
          <template v-slot:item.customer="{ item }">
            {{item.customer ? item.customer.name : ''}}
          </template>
          <template v-slot:item.action="{ item }">
            <v-menu
                bottom
                left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    light
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                    v-for="(action, i) in actions"
                    :key="i"
                >
                  <v-list-item-title>
                    <v-icon>{{ action.icon }}</v-icon>
                    <v-divider vertical></v-divider>
                    <router-link v-bind:to="action.href.replace(':id', item.id)" class="v-btn">
                      {{ action.title }}
                    </router-link>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {$inject} from "@vanroeybe/vue-inversify-plugin/dist/decorator";
import {ServicesEnum} from "@/enums/ServicesEnum";
import {FishnetsService} from "@/services/FishnetsService";
import {Fishnet} from "@/types/Fishnet";
import {RolesEnum} from "@/enums/RolesEnum";
import {AuthService} from "@/services/AuthService";

@Component
export default class FishnetsList extends Vue {
  @$inject(ServicesEnum.FISHNETS_SERVICE) private readonly fishnetsService!: FishnetsService
  @$inject(ServicesEnum.AUTH_SERVICE) private readonly authService!: AuthService
  private fishnets: Array<Fishnet> = [];
  private search = '';
  private actions = [
    {
      title: 'Update',
      href: '',
      icon: 'mdi-pencil',
      roles: [RolesEnum.SELLER, RolesEnum.ADMINISTRATOR, RolesEnum.CUSTOMER]
    },
    {title: 'Change status', href: '/fishnets/:id/change-status', icon: 'mdi-apple-icloud', roles: [RolesEnum.SELLER, RolesEnum.ADMINISTRATOR]},
    {title: 'Show logs', href: '/fishnets/:id/logs', icon: 'mdi-card-text-outline', roles: [RolesEnum.SELLER, RolesEnum.ADMINISTRATOR]},
    {
      title: 'Mark as lost',
      href: 'fishnets/:id/mark-as-lost',
      icon: 'mdi-bash',
      roles: [RolesEnum.SELLER, RolesEnum.ADMINISTRATOR, RolesEnum.CUSTOMER]
    },
    {title: 'Delete', href: 'fishnets/:id/delete', icon: 'mdi-cancel', roles: [RolesEnum.ADMINISTRATOR]},
    {title: 'Renew', href: 'fishnets/:id/renew', icon: 'mdi-history', roles: [RolesEnum.CUSTOMER]},
  ];
  private headers = [
    {text: 'Id', value: 'id'},
    {text: 'Seller', value: 'seller'},
    {text: 'Customer', value: 'customer'},
    {text: 'State', value: 'state'},
    {text: 'Added at', value: 'created_at'},
    {text: 'Action', value: 'action'},
  ];

  public async created(): Promise<void> {
    const user = this.authService.getLoggedUser();

    if (user?.role === RolesEnum.ADMINISTRATOR) {
      this.fishnets = await this.fishnetsService.getAllFishnets();
      return;
    }

    this.fishnets = await this.fishnetsService.getMyFishnets();
  }
}
</script>
