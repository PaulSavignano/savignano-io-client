const getNavClass = (totalWidth) => {
  let navClass
  switch(true) {
    case totalWidth < 375:
      return navClass = 'largerThanIphone375'
    case totalWidth < 667:
      return navClass = 'largerThanIphone667'
    case totalWidth < 768:
      return navClass = 'largerThanIpad768'
    case totalWidth < 1024:
      return navClass = 'largerThanIpad1024'
    case totalWidth < 1366:
      return navClass = 'largerThanIpad1366'
    default:
      return navClass = 'largerThan1920'
  }
}

export default getNavClass
