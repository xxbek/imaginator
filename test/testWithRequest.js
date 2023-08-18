import axios from "axios";

async function sendRequests() {
    const url = 'http://0.0.0.0:8080/handle/send';

    const REQUESTS_NUMBER = 30

    const requests = [];
    for (let i = 0; i < REQUESTS_NUMBER; i++) {
        const randNum = getRandomInt(1, 20);
        const requestBody = { proceedNum: randNum };
        const requestPromise = axios.post(url, requestBody);
        requests.push(requestPromise);
    }

    try {
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
            console.log(`Request ${index + 1} sent with proceedNum: ${response.config.data}`);
            console.log('Response:', response.data);
        });
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

await sendRequests();

