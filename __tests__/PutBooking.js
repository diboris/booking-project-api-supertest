// PUT
const { getToken, createRandomBooking, authHeader } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Update a booking', () => {
  let token
  let booking
  beforeEach(async () => {
    token = await getToken(api)
    booking = createRandomBooking()
  })

  it('Should return response 200 and create a booking', async () => {
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.put('/booking/' + bookingId)
       .set(authHeader(token))
      .set(COMMON_HEADERS)
      .send(booking)
      .expect('Content-Type', JSON_CONTENT_TYPE)
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

  it('Should return response 403 when a user has no rights', async () => {
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.put('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(403)
      .expect('Content-Type', TEXT_PLAIN_CONTENT_TYPE)
      .then(response => {
        expect(response.text).toBe('Forbidden')
      })

    // cleanup
    await api.delete('/booking/' + bookingId)
       .set(authHeader(token))
      .set(COMMON_HEADERS)
      .expect(201)
  })
})
