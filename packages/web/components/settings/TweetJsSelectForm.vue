<template>
  <v-form @submit.stop.prevent>
    <v-text-field
      v-model="screenName"
      label="screen_name"
      prepend-inner-icon="mdi-at"
      placeholder="twitter"
      hide-details
    />

    <div
      @dragover.stop.prevent="$event.dataTransfer.dropEffect = 'copy'"
      @drop.stop.prevent="onFileDrop"
    >
      <v-file-input
        label="Select tweet.js"
        :prepend-icon="null"
        prepend-inner-icon="$file"
        accept=".js"
        @change="onFileSelected"
      />
    </div>

    <v-btn
      color="primary"
      :disabled="tweetJsFile == null"
      @click="onUploadClicked"
    >
      Upload
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TweetJsSelectForm extends Vue {
  screenName: string = ''
  tweetJsFile: File | null = null

  onFileDrop(event: any) {
    this.onFileSelected(event.dataTransfer.files[0])
  }

  onFileSelected(file: File) {
    if (!file.type.includes('javascript')) {
      throw new Error(`Unsupported mime type: ${file.type}`)
    }

    this.tweetJsFile = file
  }

  onUploadClicked() {
    if (this.tweetJsFile == null) {
      throw new Error('tweet.js file not selected.')
    }

    this.$emit('upload-clicked', this.screenName, this.tweetJsFile)
  }
}
</script>
