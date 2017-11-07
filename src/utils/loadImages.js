const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    let loaded = true
    const img = new Image()
    img.src = `${process.env.REACT_APP_IMAGE_ENDPOINT}${src}`
    if (img.complete) {
      return resolve({ img, loaded })
    }
    img.onload = () => {
      loaded = false
      resolve({ img, loaded })
    }
  })
}

const loadImages = (srcs) => {
  console.log(srcs)
  const promises = srcs.map(src => loadImage(src));
  return Promise.all(promises).catch((err) => {
      console.warn(err.message)
  })
}

export default loadImages
