const LESSON_TOPIC_API_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic';

const TOPIC_API_URL =
    'http://localhost:8080/api/topic';

let _singleton = Symbol();
export default class TopicServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(
            LESSON_TOPIC_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(LESSON_TOPIC_API_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId),
            {
                body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            })
            .then(function (response)
            { return response.json(); })
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_API_URL + '/' + topicId,
            {
                method: 'DELETE'
            })
            .then(function (response)
            { return response; })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }
}