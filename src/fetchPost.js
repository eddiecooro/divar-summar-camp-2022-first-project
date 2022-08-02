fetch("http://localhost:9000/api/v8/posts-v2/web/gYfvttZV", {
  "headers": {
    "accept": "application/json-filled",
    "accept-language": "en-US,en;q=0.9,fa;q=0.8",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://divar.ir/",
  "referrerPolicy": "origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then((r)=>r.json()).then((b)=>console.log(b))