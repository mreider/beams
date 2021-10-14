const request = require('request');
const uuid = require('uuid');
var uuid_instance = uuid.v4();

function sendTransaction() {
    request.post(
        'http://transactions:3000' + '/calculate',
        { json: { payload: uuid_instance } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
            else {
                console.log(error);
            }
        }
    );
}

setInterval(function(){
    sendTransaction();
    },550);
