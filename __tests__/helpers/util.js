const faker = require('faker')

async function getToken (api) {
  let token
  const auth = {
    'username': 'admin',
    'password': 'password123',
  }
  await api.post('/auth')
    .set(COMMON_HEADERS)
    .send(auth)
    .expect(200)
    .then(response => {
      token = response.body.token
    })
  return token
}

function randomDate (from, to) {
  const date = faker.date.between(from, to)
  return date.toISOString().split('T')[0]
}

function createRandomBooking () {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    totalprice: faker.datatype.number({ min: 1, max: 100 }),
    depositpaid: faker.random.arrayElement([false, true]),
    bookingdates: {
      checkin: randomDate('2019-01-01', '2021-12-31'),
      checkout: randomDate('2021-02-02', '2022-12-31'),
    },
    additionalneeds: faker.lorem.word()
  }
}

function authHeader (token) {
  return {
    'Cookie': 'token=' + token
  }
}

exports.authHeader = authHeader
exports.getToken = getToken
exports.randomDate = randomDate
exports.createRandomBooking = createRandomBooking
