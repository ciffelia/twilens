<template>
  <v-dialog v-model="dialog" max-width="300">
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
          :disabled="loading"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          text
          :loading="loading"
          :disabled="loading"
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
  loading: boolean = false

  closeDialog () {
    this.dialog = false
  }

  async reset () {
    this.loading = true

    await this.$axios.post('/reset')

    this.loading = false
    this.dialog = false
  }
}
</script>
