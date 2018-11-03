import httpServer from '../app';
import 'mocha';
import 'chai-http';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { unlinkSync } from "fs";

chai.use(chaiHttp);

describe('API Happy Test', () => {
  before(() => {
    unlinkSync('data.json');
  });
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
  it('GET req for key', () => {
    return chai.request(httpServer).get('/testKey')
      .then(res => {
        chai.expect(res.text).to.eql("{\"testKey\":\"testValue\"}");
      })
  })

  it('GET req for unknown key', () => {
    return chai.request(httpServer).get('/blahblah')
      .then(res => {
        chai.expect(res.status).eql(404);
        chai.expect(res.text).to.eql("{\"error\":\"Key not found\"}");
      })
  })
  after(() => {
    unlinkSync('data.json');
  });
})