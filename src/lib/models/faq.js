const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {
        en: { type: String, required: true },
        hi: { type: String, default: "" },
        bn: { type: String, default: "" }
    },
    answer: {
        en: { type: String, required: true },
        hi: { type: String, default: "" },
        bn: { type: String, default: "" }
    },
    createdAt: { type: Date, default: Date.now }
});

faqSchema.methods.getTranslated = function (lang) {
    return {
        question: this.question[lang] || this.question.en,
        answer: this.answer[lang] || this.answer.en
    };
};

module.exports = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);