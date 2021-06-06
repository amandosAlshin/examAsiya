const apiUrl = process.env.REACT_APP_API;

const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
});

export default function api (url, params) {
    return fetch(`${apiUrl}${url}`, params)
        .then(res => res.json())
}

export const post = (url, body, options) => {
  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return api(url, { headers, ...options,method: "POST", body: formBody });
}
