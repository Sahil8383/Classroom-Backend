const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicName: String,
    theory: String,
    videos: [String],
    questions: [String],
});

const chapterSchema = new Schema({
    chapterName: String,
    topics: [topicSchema],
});

const subjectSchema = new Schema({
    subjectName: String,
    chapters: [chapterSchema],
});

const classSchema = new Schema({
    className: String,
    subjects: [subjectSchema],
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;