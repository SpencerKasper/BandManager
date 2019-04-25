export default {
    buildAPIURL: (controller, pathParams, setStateFunction) => {
        var URL = process.env.REACT_APP_API_DOMAIN;
        
        URL = URL + controller;

        if(pathParams === null || pathParams.length === 0){
            setStateFunction(URL);
        }

        else{
            for(var i = 0; i < pathParams.length; i++){
                URL = URL + "?" + pathParams[i];
            }

            setStateFunction(URL);
        }
    },
    buildRedirectURL: (controller, pathParams, setStateFunction, callbackFunction) => {
        var URL = process.env.REACT_APP_WEBSITE_DOMAIN;
        
        URL = URL + controller;
        
        if(pathParams === null || pathParams.length === 0){
            if(callbackFunction != "undefined" || callbackFunction !== null){
                setStateFunction(URL);
            } else {
                setStateFunction(URL, callbackFunction);
            }
        }

        else{
            for(var i = 0; i < pathParams.length; i++){
                URL = URL + "/" + pathParams[i];
            }

            if(callbackFunction != "undefined" || callbackFunction !== null){
                setStateFunction(URL);
            } else {
                setStateFunction(URL, callbackFunction);
            }
            
        }
    }
}