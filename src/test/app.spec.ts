import httpServer from '../app';
import 'mocha';
import 'chai-http';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { unlinkSync } from "fs";

chai.use(chaiHttp);

describe('API Happy Test', () => {
  //delete data.json
  before(() => {
    unlinkSync('data.json');
  });
  //test postRequest 
  it('POST to server', () => {
    return chai.request(httpServer)
    .post('/')
    .set('content-type', 'application/json')
    .send({
      'key' : 'testKey',
      'data' : 'testValue'
    })
    .then((res) => {
      chai.expect(res.text).to.eql("{\"testKey\":\"testValue\"}");
    })
  });
  it('POST to server', () => {
    return chai.request(httpServer)
    .post('/')
    .set('content-type', 'application/json')
    .send({
      'key' : 'testKey1',
      'data' : 'testValue1'
    })
    .then((res) => {
      chai.expect(res.text).to.eql("{\"testKey1\":\"testValue1\"}");
    })
  });
  it('POST to server', () => {
    return chai.request(httpServer)
    .post('/')
    .set('content-type', 'application/json')
    .send({
      'key' : 'testKey2',
      'data' : 'testValue2'
    })
    .then((res) => {
      chai.expect(res.text).to.eql("{\"testKey2\":\"testValue2\"}");
    })
  });
  //get data for an existing key
  it('GET req for key', () => {
    return chai.request(httpServer).get('/testKey')
      .then(res => {
        chai.expect(res.text).to.eql("{\"testKey\":\"testValue\"}");
      })
  })
  //get data for unknown key
  it('GET req for unknown key', () => {
    return chai.request(httpServer).get('/blahblah')
      .then(res => {
        chai.expect(res.status).eql(404);
        chai.expect(res.text).to.eql("{\"error\":\"Key not found\"}");
      })
  })
  //delete data.json
  after(() => {
    unlinkSync('data.json');
  });
})