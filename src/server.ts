import httpServer from './app';

var server = httpServer.listen(3000, function(){
    console.log('Listening on port 3000');
});

export default server;