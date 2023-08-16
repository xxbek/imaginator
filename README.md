# imaginator
Module for processing complex user requests. (developed by https://drive.google.com/file/d/17L5RXm1DeM51PCEkD9CXt75QnOfENbfn/view from GreenAPI) 

- [Description](#Description)
- [Installation](#Installation)
- [Examples](#Examples)

## Description
Often in development there is a situation in which it is necessary to organize cpu bound tasks that require high 
production loads. Such loads slow down the asynchronous operation of the service and lead to users waiting.
A logical solution is an approach in which a third-party service is created that processes requests.
Below is a diagram of how this service works:

![](https://github.com/xxbek/imaginator/blob/master/desc/image.png)

- We receive an HTTP request at the M1 microservice level.
- Broadcast the HTTP request to the RabbitMQ queue. The request is transformed into a task.
- We process the task with the M2 microservice from the RabbitMQ queue.
- We put the result of processing the job in RabbitMQ.
- We return the result of the HTTP request as the result of the execution of the job from RabbitMQ.

As an example, in this task, the handler is processing the fibonacci number with a delay

## Installation
> git clone git@github.com:xxbek/imaginator.git

> docker compose up -d 

To listen logs:
> docker-compose logs --tail=0 --follow


## Examples
To test the application, you must send a POST request to `0.0.0.0:8080/handle/send` with the request body 
containing the parameter `{"proceedNum":16}`. 
You can use any client to send requests, be it curl or Postman.

```
curl --location '0.0.0.0:8080/handle/send' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
  "proceedNum": 16,
  "email": "user_new@example.com"
}'
```

You can test applications with a test script:
> cd test/ && npm i && node testWithRequest.js
