<template>
  <v-dialog
    v-model="dialog"
    max-width="300"
    :persistent="resetting"
  >
    <template v-slot:activator="{ on }">
      <v-btn large color="error" v-on="on">
        Reset data
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        Reset data?
      </v-card-title>

      <v-card-text>Elasticsearch index will be removed and recreated. All data will be lost.</v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          :disabled="resetting"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          text
          :loading="resetting"
          :disabled="resetting"
          @click="reset"
        >
          Reset
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DataResetForm extends Vue {
  dialog: boolean = false
  resetting: boolean = false

  closeDialog () {
    this.dialog = false
  }

  async reset () {
    this.resetting = true

    await this.$axios.post('/reset', undefined, {
      // @ts-ignore
      progress: false
    })

    this.resetting = false
    this.dialog = false
  }
}
</script>
