<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step :complete="step > 1" step="1">
      Select tweet.js
    </v-stepper-step>
    <v-stepper-content step="1">
      <tweets-upload-form @uploadClicked="onUploadClicked" />
    </v-stepper-content>

    <v-stepper-step :complete="step > 2" step="2">
      Parse tweet.js
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-progress-linear indeterminate />
    </v-stepper-content>

    <v-stepper-step :complete="step > 3" step="3">
      Build elasticsearch request
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-progress-linear indeterminate />
    </v-stepper-content>

    <v-stepper-step :complete="complete" step="4">
      Upload and process
    </v-stepper-step>
    <v-stepper-content step="4">
      <div v-if="!complete">
        <v-progress-linear :value="uploadedPercent" />
        <span>
          Uploaded {{ uploadedChunks }} / {{ numChunks }} - {{ Math.round(uploadedPercent) }}%
        </span>
      </div>
      <v-alert v-else type="success">
        Upload completed.
      </v-alert>
    </v-stepper-content>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { parseTweetJs } from '@twilens/tweetjs-parser'
import TweetsUploadForm from '~/components/settings/TweetsUploadForm.vue'
import { sleep } from '~/utils/sleep'
import { readTextFile } from '~/utils/readTextFile'
import { buildBulkQuery } from '~/utils/elastic/buildBulkRequest'

@Component({
  components: {
    TweetsUploadForm
  }
})
export default class TweetsUploadStepper extends Vue {
  step: number = 1
  complete: boolean = false

  numChunks: number = 0
  uploadedChunks: number = 0

  get uploadedPercent (): number {
    return this.uploadedChunks / this.numChunks * 100
  }

  async onUploadClicked (screenName: string, tweetJsFile: File) {
    this.step = 2
    // Wait for loading animation
    await sleep(500)
    const tweetJsText = await readTextFile(tweetJsFile)
    const tweetList = parseTweetJs(tweetJsText, screenName)

    this.step = 3
    await sleep(500)
    const bulkQueryList = buildBulkQuery(tweetList)

    this.step = 4
    this.numChunks = bulkQueryList.length
    for (const bulkQuery of bulkQueryList) {
      await this.$axios.post('/bulk', bulkQuery, {
        headers: {
          'content-type': 'application/x-ndjson'
        },
        // @ts-ignore
        progress: false
      })
      this.uploadedChunks++
    }

    this.complete = true
  }
}
</script>
