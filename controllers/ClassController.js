const Class = require('../models/Class');



const GetClass = async (req, res) => {

    try {
        
        const allClasses = await Class.find({});

        res.status(200).json({
            message: 'All classes',
            allClasses
        });
    } catch (error) {
        
        res.status(500).json({
            message: 'Error in getting all classes',
            error
        });

    }


}

const CreateClass = async (req, res) => {

    try {
        
        const  {
            className,
            subjectName,
            chapterName,
            topicName,
            theory,
            videos,
            questions
        } = req.body;
    
        const newClass = new Class({
            className,
            subjects: [{
                subjectName,
                chapters: [{
                    chapterName,
                    topics: [{
                        topicName,
                        theory,
                        videos,
                        questions
                    }]
                }]
            }]
        });

        await newClass.save();

        res.status(200).json({
            message: 'Class created successfully',
            newClass
        });

    } catch (error) {
        
        res.status(500).json({
            message: 'Error in creating class',
            error
        });

    }
}


const AddSubject = async (req, res) => {

    try {
        
        const { id } = req.params;

        const {
            subjectName,
            chapterName,
            topicName,
            theory,
            videos,
            questions
        } = req.body;

        const newClass = await Class.findById(id);

        newClass.subjects.push({
            subjectName,
            chapters: [{
                chapterName,
                topics: [{
                    topicName,
                    theory,
                    videos,
                    questions
                }]
            }]
        });

        await newClass.save();

        res.status(200).json({
            message: 'Subject added successfully',
            newClass
        });

    } catch (error) {
        
        res.status(500).json({
            message: 'Error in adding subject',
            error
        });

    }

}


const AddChapter = async (req, res) => {

    const classId = req.params.classId;
    const subId = req.params.subId;

    try {
        
        const {
            chapterName,
            topics,
        } = req.body;

        const newClass = await Class.findById(classId);
        const singleSubject = newClass.subjects.id(subId);

        const allTopics = [];

        topics.forEach(topic => {
            allTopics.push({
                topicName: topic.topicName,
                theory: topic.theory,
                videos: topic.videos,
                questions: topic.questions
            });
        });

        singleSubject.chapters.push({
            chapterName,
            topics: allTopics
        });

        await newClass.save();

        res.status(200).json({
            message: 'Chapter added successfully',
            newClass
        });

    } catch (error) {
        
        res.status(500).json({
            message: 'Error in adding chapter',
            error
        });

    }

}


const GetSingleClass = async (req, res) => {

    const classId = req.params.classId;
    const subId = req.params.subId;

    try {
        
        const singleClass = await Class.findById(classId);
        const singleSubject = singleClass.subjects.id(subId);

        res.status(200).json({
            singleSubject
        });

    } catch (error) {
        
        res.status(500).json({
            message: 'Error in getting single subject',
            error
        });

    }

}



module.exports = {
    CreateClass,
    AddSubject,
    GetClass   ,
    GetSingleClass,
    AddChapter
}