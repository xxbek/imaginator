import axios from "axios";

async function sendRequests() {
    const url = 'http://0.0.0.0:8080/handle/send';

    const REQUESTS_NUMBER = 50

    const requests = [];
    for (let i = 0; i < REQUESTS_NUMBER; i++) {
        const randNum = getRandomInt(-5, 33);
        const requestBody = { proceedNum: randNum };
        const requestPromise = axios.post(url, requestBody);
        requests.push(requestPromise);
    }

    try {
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
            const responseBody = JSON.stringify(response.data)
            console.log(`#${index + 1}: Fibonacci sequence number  ${response.config.data} (proceedNum) is: ${responseBody}`);
            console.log('Response:', );
        });
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

await sendRequests();

