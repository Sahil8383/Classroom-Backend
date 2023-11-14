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

module.exports = {
    CreateClass,
    AddSubject,
    GetClass    
}