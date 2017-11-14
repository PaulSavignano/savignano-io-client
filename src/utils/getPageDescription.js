const getPageDescription = (page) => {
  const paragraphs = page.sections.filter(section => section.items.find(({item}) => item.values.pText && item.values.pText.length > 9))
  const h3Texts = page.sections.find(section => section.items.find(({item}) => item.values.h3Text && item.values.h3Text.length > 0))
  const h2Texts = page.sections.find(section => section.items.find(({item}) => item.values.h2Text && item.values.h2Text.length > 0))
  const h1Texts = page.sections.find(section => section.items.find(({item}) => item.values.h1Text && item.values.h3Text.length > 0))
  const paragraph = paragraphs.length ? paragraphs[0].items[0].item.values.pText.replace(/(<([^>]+)>)/ig, '') : null
  if (paragraph) return paragraph
  return
}

export default getPageDescription
