# Socket-Project

Socket-Project is an Express.js server that uses the socket.io library for communicating events to the client.

  - It updates a text file containing JSON data with the contents of the JSON payload recieved with the request.
  - It also returns value associated with given key from JSON file. If it does not exist, it returns an error.
  - It also updates all clients on the 'update' channel whenever new data is added to the file. 

#Setup

1. Clone project
git@github.com:kamyasingla/socket-project.git

2. Install dependencies
npm install
3. Start development server
npm start
4. Making requests
Use curl/Postman to make requests to localhost:3000/
https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en


#Usage

    - To start the server, type "npm start".
    - Install postman - https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en
    - Select POST and type "http://localhost:3000" in the URL input field and click on body tab to enter the key and data values in the format {
        "key" : "keyValue"
        "data" : "dataValue"
    } and click on SEND.
    - After that, select GET and type "http://localhost:3000/keyValue" in the URL input field and hit SEND.
    - To run a test suite, type "npm test".
    

