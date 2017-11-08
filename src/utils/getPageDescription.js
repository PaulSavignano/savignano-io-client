import flattenArray from './flattenArray'

const getPageDescription = (page) => {
  const sections = page.sections.map(section => {
    return section.items.find(item => {
      return item.item.values.h1Text || item.item.values.h2Text || item.item.values.h3Test
    })
  })
  return sections[0].item.values.h1Text || sections[0].item.values.h2Text || sections[0].item.values.h3Text
}

export default getPageDescription
