const getNavClass = (totalWidth) => {
  let navClass
  switch(true) {
    case totalWidth < 375:
      navClass = 'largerThanIphone375'
      break
    case totalWidth < 667:
      navClass = 'largerThanIphone667'
      break
    case totalWidth < 768:
      navClass = 'largerThanIpad768'
      break
    case totalWidth < 1024:
      navClass = 'largerThanIpad1024'
      break
    case totalWidth < 1366:
      navClass = 'largerThanIpad1366'
      break
    default:
      navClass = 'largerThan1920'
  }
}

export default getNavClass
