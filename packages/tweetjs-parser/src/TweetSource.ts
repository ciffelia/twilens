class TweetSource {
  name: string
  url: string

  constructor(text: string) {
    const match = text.match(/^<a href="(.+)" rel="nofollow">(.+)<\/a>$/)

    if (match == null) {
      throw new Error(`Invalid source string: ${text}`)
    }

    this.name = match[2]
    this.url = match[1]
  }
}

export { TweetSource }
