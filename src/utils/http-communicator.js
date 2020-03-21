export default class HttpCommunicator {

    constructor() {
        this.buffer = [];
        this.firing = false;
    }

    prep(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ((xhttp) => {
            if (xhttp.readyState == 4) {
                var jsonGo = false;
                try {
                    JSON.parse(xhttp.response);
                    jsonGo = true;
                }
                catch (SyntaxError) {
                       
                }
                if (!jsonGo) {
                    callback(xhttp.response, xhttp.status);
                }
                else {
                    callback(JSON.parse(xhttp.response), xhttp.status);
                }
                this.fireNext();
            }
        }).bind(undefined, xhttp);
        return xhttp;
    }

    send(bufferItem) {
        var xhttp = bufferItem.tried;
        xhttp.open(bufferItem.method, bufferItem.url);
        xhttp.send(JSON.stringify(bufferItem.method == "POST" ? bufferItem.body : null));
    }

    addPostToBuffer(url, callback, body) {
        this.buffer.push({tried: this.prep(callback), url: url, body: body, method: "POST"});
        if (!this.firing) this.fireNext();
    }

    addGetToBuffer(url, callback) {
        this.buffer.push({tried: this.prep(callback), url: url, method: "GET"});
        if (!this.firing) this.fireNext();
    }

    fireNext() {
        if (this.buffer.length == 0) {
            this.firing = false;
            return;
        }
        this.firing = true;
        this.send(this.buffer[0]);
        this.buffer.splice(0, 1);
    }

}