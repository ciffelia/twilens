import { Entities } from './Entities'

const expandShortenedUrl = (text: string, entities: Entities): string => {
  let extractedText = text

  const entityList = [...entities.urls, ...(entities.media ?? [])]
  for (const entity of entityList) {
    extractedText = extractedText.replace(entity.url, entity.expanded_url)
  }

  return extractedText
}

export { expandShortenedUrl }
