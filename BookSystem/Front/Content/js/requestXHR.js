

const Request = (method = 'GET', api = '', parameters = {}) => {

    var callBackOK = null, callbackError = null
    this.Success = (callback) => { callBackOK = callback; return this; }
    this.Error = (callback) => { callbackError = callback; return this; }


    // Ajustar API:
    api = API_URL[Enviroment] + api;
    var authentication = GetCookie('Authentication');


    var requestXHR = new XMLHttpRequest();


    requestXHR.onreadystatechange = e => {

        if (requestXHR.readyState === XMLHttpRequest.DONE) {

            var statusCode = requestXHR.status;
            var response = ParseJSON(requestXHR.responseText);

            if (statusCode == 200) {
                if (IsFunction(callBackOK)) { callBackOK(response); }
            }

        }

    }


    requestXHR.open(method, api, true);
    requestXHR.setRequestHeader('Content-type', 'application/json');
    requestXHR.setRequestHeader('Authentication', authentication == null ? '' : authentication);
    requestXHR.send(parameters == null ? null : JSON.stringify(parameters));

    return this;
}