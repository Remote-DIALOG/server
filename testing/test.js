const { expect } = require('chai')
const express = require('express')
const chai = express('chai')
const request = require('supertest')

const app = express()

describe('Ping the server', () => {
    it('shoule be status of server', () => {
        request(app)
        .post('/ping')
        .send({})
        .expect(200)
        .then((res) => {
            console.log(res)
            expect(res.body).to.have.property('message', 'OK')
        })
    })
})