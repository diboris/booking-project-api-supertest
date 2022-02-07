// PATCH

const { getToken, createRandomBooking, authHeader } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Update info about a booking', () => {
  let booking
  let updatedBooking
  beforeEach(async () => {
    booking = createRandomBooking()
    updatedBooking = createRandomBooking()
  })

  it('Should return response 200 partly update info about the booking', async () => {
    const token = await getToken(api)
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.patch('/booking/' + bookingId)
       .set(authHeader(token))
      .set(COMMON_HEADERS)
      .send(updatedBooking)
      .expect(200)
      .expect('Content-Type', JSON_CONTENT_TYPE)
      .then(response => {
        expect(response.body).toStrictEqual(updatedBooking)
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

    await api.patch('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .send(updatedBooking)
      .expect(403)
      .expect('Content-Type', TEXT_PLAIN_CONTENT_TYPE)
      .then(response => {
        expect(response.text).toBe('Forbidden')
      })
  })
})
