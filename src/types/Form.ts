import {Vue} from "vue/types/vue";

export type VForm = Vue & { validate: () => boolean, reset: () => void }