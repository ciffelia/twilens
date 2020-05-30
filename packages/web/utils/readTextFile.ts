const readTextFile = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const fileReader = new FileReader()

  fileReader.onload = (_e) => {
    resolve(fileReader.result as string)
  }

  fileReader.onerror = (e) => {
    reject(e)
  }

  fileReader.readAsText(file)
})

export { readTextFile }
