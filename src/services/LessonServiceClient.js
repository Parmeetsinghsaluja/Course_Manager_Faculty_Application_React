const MODULE_LESSON_API_URL =
    'http://saluja-summer1-2018.herokuapp.com/api/course/CID/module/MID/lesson';

const LESSON_API_URL =
    'http://saluja-summer1-2018.herokuapp.com/api/lesson';

let _singleton = Symbol();
export default class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForModule(courseId,moduleId) {
        return fetch(
            MODULE_LESSON_API_URL
                .replace('CID', courseId)
                .replace('MID',moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(MODULE_LESSON_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
                    { return response.json(); })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL + '/' + lessonId,
            {
                method: 'DELETE'
            })
            .then(function (response)
                 { return response; })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }
}