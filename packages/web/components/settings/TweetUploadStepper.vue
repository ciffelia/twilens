<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step :complete="step > 1" step="1">
      Select tweet.js
    </v-stepper-step>
    <v-stepper-content step="1">
      <tweet-js-select-form @upload-clicked="onUploadClicked" />
    </v-stepper-content>

    <v-stepper-step :complete="step > 2" step="2">
      Parse and validate
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-progress-linear indeterminate />
    </v-stepper-content>

    <v-stepper-step :complete="complete" step="3">
      Upload and index
    </v-stepper-step>
    <v-stepper-content step="3">
      <div v-if="!complete">
        <v-progress-linear :value="uploadedPercent" />
        <span>
          Uploaded {{ uploadedChunks }} / {{ numChunks }} -
          {{ Math.round(uploadedPercent) }}%
        </span>
      </div>
      <v-alert v-else type="success"> Upload completed. </v-alert>
    </v-stepper-content>
  </v-stepper>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { classToPlain } from 'class-transformer'
import { parseTweetJs } from '@twilens/tweetjs-parser'
import TweetJsSelectForm from '~/components/settings/TweetJsSelectForm.vue'
import { sleep } from '~/utils/sleep'
import { readTextFile } from '~/utils/readTextFile'

@Component({
  components: {
    TweetJsSelectForm
  }
})
export default class TweetsUploadStepper extends Vue {
  step: number = 1
  complete: boolean = false

  numChunks: number = 0
  uploadedChunks: number = 0

  get uploadedPercent(): number {
    return (this.uploadedChunks / this.numChunks) * 100
  }

  async onUploadClicked(screenName: string, tweetJsFile: File) {
    this.step = 2
    // Wait for loading animation
    await sleep(500)
    const tweetJsText = await readTextFile(tweetJsFile)
    const tweets = await parseTweetJs(tweetJsText, screenName)

    this.step = 3
    this.numChunks = Math.ceil(tweets.length / 500)
    for (let i = 0; i < tweets.length; i += 500) {
      const tweetChunk = tweets.slice(i, i + 500)

      await this.$axios.post(
        '/create',
        { tweets: classToPlain(tweetChunk) },
        { progress: false }
      )

      this.uploadedChunks++
    }

    this.complete = true
  }
}
</script>
