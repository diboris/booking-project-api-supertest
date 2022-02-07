// GET
const { getToken, createRandomBooking, authHeader } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Get info about a booking', () => {
  let booking

  beforeEach(async () => {
    booking = createRandomBooking()
  })

  it('Should return response 200 show info about a booking', async () => {
    let bookingId
    const token = await getToken(api)

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.get('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .expect(200)
      .expect('Content-Type', JSON_CONTENT_TYPE)
      .then(response => {
        expect(response.body).toStrictEqual(booking)
      })

    // cleanup
    await api.delete('/booking/' + bookingId)
       .set(authHeader(token))
      .set(COMMON_HEADERS)
      .expect(201)
  })

  it('Should return response 404 when a booking is not found', async () => {
    await api.get('/booking/2000')
      .set(COMMON_HEADERS)
      .expect(404)
      .expect('Content-Type', TEXT_PLAIN_CONTENT_TYPE)
      .then(response => {
        expect(response.text).toBe('Not Found')
      })
  })
})
