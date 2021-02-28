const API_HOST = "http://localhost:3001";

async function apiGET(uri) {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();

        req.open("GET", API_HOST + uri, true);
        req.onload = () => {
            if (req.status == 200) {
                res(req.responseText);
            } else {
                const error = JSON.parse(req.responseText);
                alert(error.error.message);
                rej(req.status);
            }
        };

        req.send();
    });
    
}

async function apiPOST(uri, data) {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();

        req.open("POST", API_HOST + uri, true);
        req.onload = () => {
            if (req.status == 200) {
                res(req.responseText);
            } else {
                const error = JSON.parse(req.responseText);
                alert(error.error.message);
                rej(req.status);
            }
        };
        console.log(data);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(data));
    });
}