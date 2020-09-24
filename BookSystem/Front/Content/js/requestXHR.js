

const Request = (method = 'GET', api = '', parameters = {}, callBackOk, callbackError) => {

    // Ajustar API:
    api = API_URL[Enviroment] + api;
    var authentication = GetCookie('Authentication');


    var requestXHR = new XMLHttpRequest();


    requestXHR.onreadystatechange = e => {

        if (requestXHR.readyState === XMLHttpRequest.DONE) {

            var statusCode = requestXHR.status;
            var response = ParseJSON(requestXHR.responseText);

            if (statusCode == 200) { if (IsFunction(callBackOk)) { callBackOk(response); } return this; }
            if (statusCode == 400) { if (IsFunction(callbackError)) { callbackError(response); } return this; }
            if (statusCode == 500) { if (IsFunction(callbackError)) { callbackError(response); } return this; }

        }

    }


    requestXHR.open(method, api, true);
    requestXHR.setRequestHeader('Content-type', 'application/json');
    if (authentication != null) { requestXHR.setRequestHeader('Authentication', authentication); }
    requestXHR.send(parameters == null ? null : JSON.stringify(parameters));

    return this;
}