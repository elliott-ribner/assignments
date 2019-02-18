require('mocha')
const request = require('supertest')
const { expect } = require('chai')
const server = require('../server')
const schemas = require('../lib/schemas')

describe('API requests', function () {
  before(async () => {
    await schemas.Assignments.deleteAll()
  })

  it('/', () => {
    request(server)
      .get('/test')
      .expect(200)
      .end(function (err, res) {
        expect(err).to.eql(null)
      })
  })

  describe('/create', () => {
    it('succsesfully creates new assignment', (done) => {
      request(server)
        .post('/create')
        .send({
          description: 'Test assignment description',
          name: 'Test assignment',
          duration: 10,
          type: 'Math assignment'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end((err, resp) => {
          expect(err).to.eql(null)
          expect(resp.body).to.eql({
            url: resp.body.url
          })
          done()
        })
    })

    it('handles error when required field is missing', (done) => {
      request(server)
        .post('/create')
        .send({
          duration: 10,
          type: 'Math assignment'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400)
        .end((err, resp) => {
          expect(err).to.eql(null)
          expect(resp.body).to.eql({
            error: 'Bad parameter: Path `name` is required. Path `description` is required.'
          })
        })
        done()
    })
  })

  describe('/getAssignment', () => {
    let assignment
    before(async () => {
      assignment = await schemas.Assignments.insert({
        description: 'Test assignment description',
        name: 'Test assignment',
        duration: 10,
        tags: [],
        type: 'Math assignment'
      })
    })

    it('responds with assignment', (done) => {
      request(server)
        .get(`/getAssignment/${assignment._id}`)
        .expect(200)
        .end((err, resp) => {
          expect(err).to.eql(null)
          // TODO use moment to switch the format of date, rather than deleting it
          delete resp.body.created
          delete assignment.created
          expect(resp.body).to.eql(assignment)
          done()
        })
    })

    it('responds with 404 when no document is found', (done) => {
      request(server)
        .get(`/getAssignment/fakeId`)
        .expect(404)
        .end((err, resp) => {
          expect(err).to.eql(null)
          done()
        })
    })
  })

  describe('/searchTags', () => {
    let assignment1, assignment2, assignment3
    before(async () => {
      assignment1 = await schemas.Assignments.insert({
        description: 'Fun geometry assignment',
        name: 'Fun Geo Assignment',
        duration: 10,
        tags: ['geometry'],
        type: 'Math assignment'
      })
      assignment2 = await schemas.Assignments.insert({
        description: 'Hard geometry assignment',
        name: 'Hard Geo assignment',
        duration: 10,
        tags: ['geometry', 'algebra'],
        type: 'Math assignment'
      })
      assignment3 = await schemas.Assignments.insert({
        description: 'American history assignment',
        name: 'Civil war history assignment',
        duration: 10,
        tags: ['history'],
        type: 'History assignment'
      })
    })

    it('responds with assignments of specified tag', (done) => {
      request(server)
        .get(`/searchTags/geometry`)
        .expect(200)
        .end((err, resp) => {
          expect(err).to.eql(null)
          expect(resp.body.assignments.length).to.eql(2)
          expect(resp.body.assignments[0].name).to.eql('Fun Geo Assignment')
          done()
        })
    })

    it('responds with empty array if nothing matches specified tag', (done) => {
      request(server)
        .get(`/searchTags/calc`)
        .expect(200)
        .end((err, resp) => {
          expect(err).to.eql(null)
          expect(resp.body.assignments).to.eql([])
          done()
        })
    })
  })
})
