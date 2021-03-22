<template>
  <v-card class="pa-6" elevation="2">
    <v-form v-if="!progress && !completed" @submit.stop.prevent>
      <v-text-field
        v-model="screenName"
        class="mt-0 pt-0"
        label="screen_name"
        prepend-inner-icon="mdi-at"
        placeholder="twitter"
        hide-details
      />

      <v-btn
        class="mt-6"
        color="error"
        :disabled="progress || completed"
        @click="onDeleteClicked"
      >
        Delete tweets
      </v-btn>
    </v-form>

    <v-progress-linear v-if="progress" color="primary" indeterminate />

    <v-alert v-if="completed" class="mb-0" type="success">
      Tweets deleted.
    </v-alert>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DataResetForm extends Vue {
  screenName: string = ''
  progress: boolean = false
  completed: boolean = false

  async onDeleteClicked() {
    this.progress = true

    await this.$axios.post(
      '/delete',
      { user: this.screenName },
      { progress: false }
    )

    this.progress = false
    this.completed = true
  }
}
</script>
