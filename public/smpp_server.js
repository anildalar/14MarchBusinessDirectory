var smpp = require('smpp');

async function checkAsyncUserPass(system_id, password,cbfn){
    console.log("system_id --->",system_id);
    console.log("password --->",password);
    if(system_id ==='smppusername' && password === 'smpppassword'){
        cbfn();
    }else{
        cbfn(new Error());
    }
   
}
var port = 2775;
var server=[]
for (let index = 0; index <= 9 ; index++) {
    //const element = array[index];
    server[index] = smpp.createServer({
        debug: true
    }, function(session) {
        
        session.on('error', function (err) {
            // Something ocurred, not listening for this event will terminate the program
          });
        session.on('bind_transceiver', async function(pdu) {
            // we pause the session to prevent further incoming pdu events,
            // untill we authorize the session with some async operation.
            session.pause();
            await checkAsyncUserPass(pdu.system_id, pdu.password, function(err) {
                if (err) {
                    session.send(pdu.response({
                        command_status: smpp.ESME_RBINDFAIL
                    }));
                    session.close();
                    return;
                }
                session.send(pdu.response());
                session.resume();
            });
        });
    });
    server[index].listen(port,()=>{
        console.log("Server is listening on port "+port);
    });
    port++;
}

console.log(server);