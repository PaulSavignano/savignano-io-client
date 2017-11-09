const google = window.google

const initMap = () => {
  const canvas = document.createElement('canvas')
  const map = new google.maps.Map(canvas, {
    center: new google.maps.LatLng(0, 0),
    zoom: 15
  })
  const service = new google.maps.places.PlacesService(map)
  service.getDetails({ placeId: 'ChIJhVcdqyUV6YARnU06PnUQEMw'}, (place, status) => {
    return {
      place, status
    }
  })
}

export default initMap
