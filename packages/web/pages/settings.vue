<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-4">
          Settings
        </h1>

        <h2 class="mb-2">
          Upload tweets
        </h2>
        <tweets-upload-stepper />

        <h2 class="mt-6 mb-2">
          Reset data
        </h2>
        <data-reset-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TweetsUploadStepper from '~/components/settings/TweetsUploadStepper.vue'
import DataResetForm from '~/components/settings/DataResetForm.vue'

@Component({
  components: {
    TweetsUploadStepper,
    DataResetForm
  }
})
export default class SettingsPage extends Vue {
  head () {
    return {
      title: 'Settings'
    }
  }
}
</script>
