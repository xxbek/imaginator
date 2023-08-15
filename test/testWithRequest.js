import axios from "axios";

async function sendPostRequests() {
    const url = 'http://0.0.0.0:8080/handle/send';
    const numberOfRequests = 20;

    const promises = [];

    for (let i = 1; i <= numberOfRequests; i++) {
        promises.push(axios.post(url, { someInfo: true, proceedNum: i} ));
    }

    try {
        const responses = await Promise.all(promises);
        responses.forEach((response, index) => {
            console.log(`Request ${index + 1} - Status: ${response.status}`);
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

sendPostRequests();
