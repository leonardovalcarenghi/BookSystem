

const Request = (method = 'GET', api = '', parameters = {}) => {

    var callBackOK = null, callbackError = null
    this.Success = (callback) => { callBackOK = callback; return this; }
    this.Error = (callback) => { callbackError = callback; return this; }



    var requestXHR = new XMLHttpRequest();


    requestXHR.open(method, api, true);
    requestXHR.setRequestHeader('Content-type', 'application/json');
    requestXHR.send(parameters == null ? null : JSON.stringify(parameters));

    return this;
}