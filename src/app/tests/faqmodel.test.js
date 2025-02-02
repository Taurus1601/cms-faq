const chai = require('chai');
const mongoose = require('mongoose');
const faqModel = require('../src/lib/models/faq');
const expect = chai.expect;

describe('FAQ Model', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should translate question and answer', async () => {
    const faq = new faqModel({
      question: { en: 'What is your name?' },
      answer: { en: 'My name is John.' }
    });

    const translated = faq.getTranslated('en');
    expect(translated.question).to.equal('What is your name?');
    expect(translated.answer).to.equal('My name is John.');
  });
});