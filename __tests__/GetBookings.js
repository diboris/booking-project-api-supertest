// GET
const { createRandomBooking } = require('./helpers/util')
const supertest = require('supertest')
const api = supertest(BASE_URL)

describe('Get info about bookings', () => {
  it('Should return response 200 show info about bookings', async () => {
    const booking = createRandomBooking()
    let bookingId

    await api.post('/booking')
      .set(COMMON_HEADERS)
      .send(booking)
      .expect(200)
      .then(response => {
        bookingId = response.body.bookingid
      })

    await api.get('/booking')
      .set(COMMON_HEADERS)
      .expect(200)
      .expect('Content-Type', JSON_CONTENT_TYPE)
      .then(response => {
        const bookings = response.body
        let found = false
        for (let i = 0; i < bookings.length; i++) {
          const booking = bookings[i]
          if (booking.bookingid === bookingId) {
            found = true
            break
          }
        }
        expect(found).toBe(true)
      })
  })
})
