const rp = require('request-promise');

function sendTransaction() {
    rp({method: 'GET',
    uri: 'http://transactions:3000' +'/calculate'
    });
}

setInterval(sendTransaction(),1000);
