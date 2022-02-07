// DELETE
const { getToken, createRandomBooking, authHeader } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Delete a booking', () => {
  let token
  let booking

  beforeEach(async () => {
    token = await getToken(api)
    booking = createRandomBooking()
  })

  it('Should return response 200 and delete a booking', async () => {
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    // cleanup
    await api.delete('/booking/' + bookingId)
      .set(authHeader(token))
      .set(COMMON_HEADERS)
      .expect(201)
      .expect('Content-Type', TEXT_PLAIN_CONTENT_TYPE)
      .then(response => {
        expect(response.text).toBe('Created')
      })

    await api.get('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .expect(404)
      .then(response => {
        expect(response.text).toBe('Not Found')
      })
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

    // cleanup
    await api.delete('/booking/' + bookingId)
      .set(COMMON_HEADERS)
      .expect(403)
      .expect('Content-Type', TEXT_PLAIN_CONTENT_TYPE)
      .then(response => {
        expect(response.text).toBe('Forbidden')
      })
  })
})
