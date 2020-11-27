<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" width="100%" height="100%">
      <v-container>
        <v-row>
          <v-col cols="12"
                 sm="12"
                 md="6">
            <v-card-title>Manage tenants</v-card-title>
            <v-card-subtitle>
              Here you can manage IMPALO Tenants.
            </v-card-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-md-right text-sm-center mt-md-5">
            <router-link to="/tenant/create">
              <v-btn
                  color="primary"
                  dark
                  class="mt-1"
              >
                Create tenant
                <v-icon
                    dark
                    right
                >
                  mdi-database-plus
                </v-icon>
              </v-btn>
            </router-link>

            <v-btn
                color="purple"
                dark
                class="ml-1 mt-1"
            >
              Reinitialize demo
              <v-icon
                  dark
                  right
              >
                mdi-autorenew
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items="tenants"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
        >
          <template v-slot:item.info="{ item }">
            <v-chip
                :color="item.account_created && item.confirmation_sent ? (item.active ? 'success' : 'red') : 'orange'"
                dark
                outlined
                small chip
                class="ml-1 mt-1"
            >
              {{ item.account_created && item.confirmation_sent ? (item.active ? 'active' : 'inactive') : 'init WiP' }}
            </v-chip>

            <v-chip
                v-if="item.is_demo"
                dark
                :color="'primary'"
                outlined
                small chip
                class="ml-1 mt-1"
            >
              demo
            </v-chip>

            <v-chip
                dark
                :color="item.type === 'dpo' ? 'purple' : 'indigo'"
                outlined
                small chip
                class="ml-1 mt-1"
            >
              {{ item.type }}
            </v-chip>
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
import {TenantsService} from "@/services/TenantsService";
import {Tenant} from "@/types/Tenant";

@Component
export default class Dashboard extends Vue {
  @$inject(ServicesEnum.TENANTS_SERVICE) private readonly tenantsService!: TenantsService
  private tenants: Array<Tenant> = [];
  private search = '';
  private actions = [
    {title: 'Update', href: '', icon: 'mdi-pencil'},
    {title: 'Toggle status', href: '', icon: 'mdi-wrench'},
    {title: 'Delete', href: 'tenants/:id/delete', icon: 'mdi-cancel'},
    {title: 'Backup', href: '', icon: 'mdi-cloud-upload'},
    {title: 'Details', href: '', icon: 'mdi-ballot-outline'},
    {title: 'Reinitialize', href: 'tenants/:id/reinitialize', icon: 'mdi-autorenew'},
  ];
  private headers = [
    {text: 'Instance', value: 'instance'},
    {text: 'VAT ID', value: 'vat_id'},
    {text: 'Info', value: 'info'},
    {text: 'Created at', value: 'created_at'},
    {text: 'Action', value: 'action'},
  ];

  public async created(): Promise<void> {
    const tenants = await this.tenantsService.getTenants();
    this.tenants = [...tenants.organization, ...tenants.dpo];
  }
}
</script>
