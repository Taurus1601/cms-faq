const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust the path to your server file
const expect = chai.expect;

chai.use(chaiHttp);

describe('FAQ API', () => {
  it('should GET all FAQs', (done) => {
    chai.request(server)
      .get('/api/faq?lang=en')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should POST a new FAQ', (done) => {
    chai.request(server)
      .post('/api/faq')
      .send({ question: 'What is your name?', answer: 'My name is John.', lang: 'en' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should PUT an existing FAQ', (done) => {
    const faqId = 'some-faq-id'; // Replace with a valid FAQ ID
    chai.request(server)
      .put(`/api/faq?id=${faqId}`)
      .send({ question: 'What is your updated name?', answer: 'My updated name is John.' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id').eql(faqId);
        done();
      });
  });
});