const getPageDescription = (page) => {
  const sections = page.sections.filter(section => {
    return section.items.filter(({ item }) => {
      return item.values.pText.length >9
    })
  })
  const items = sections.filter(section => section.items.find(({item}) => item.values.pText.length > 9))
  if (items[0]) {
    const paragraph = items[0].items[0].item.values.pText
    if (paragraph) return paragraph.replace(/(<([^>]+)>)/ig, '')
    return
  }
  return
}

export default getPageDescription
