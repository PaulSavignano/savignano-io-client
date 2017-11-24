import Payment from 'payment'

const validateCheckout = (values) => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'fullAddress',
    'name',
    'phone',
    'street',
    'city',
    'state',
    'zip'
  ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.phone && values.phone.replace(/\D+/g, '').length < 10) {
    errors.phone = 'Phone number must be 10 digits'
  }
  if (values.state && values.state.length < 2) {
    errors.state = 'State must be 2 characters'
  }
  if (values.zip && values.zip.length < 5) {
    errors.zip = 'Zip must be 5 characters'
  }
  return errors
}

export default validateCheckout
