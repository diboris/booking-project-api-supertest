// POST
const { getToken, createRandomBooking, authHeader } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Create a booking', () => {
  it('Should return response 200 and create a booking', async () => {
    const token = await getToken(api)
    const booking = createRandomBooking()
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .expect('Content-Type', JSON_CONTENT_TYPE)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.get('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .expect(200)
      .then(response => {
        expect(response.body).toStrictEqual(booking)
      })

    // cleanup
    await api.delete('/booking/' + bookingId)
       .set(authHeader(token))
      .set(COMMON_HEADERS)
      .expect(201)
  })
})
