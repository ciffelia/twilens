const unescapeTweetText = (text: string): string => {
  return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

export { unescapeTweetText }
