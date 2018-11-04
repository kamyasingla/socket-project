import httpServer from './app';

//Listen to a specific port number
var server = httpServer.listen(3000, function(){
    console.log('Listening on port 3000');
});

export default server;