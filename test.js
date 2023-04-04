//console.log(Math.floor(Math.random() * (5 - 1 + 1) + 1))

let x ={
    name:"Anil"
}

let y= {
    surname:"dollor"
}

let z = {
    ...x, //Spread opertor === copy opertor
    ...y
}

console.log(z);


let xx = [
    {
        "id": 101,
        "attributes": {
            "name": "Hotel98",
            "createdAt": "2023-04-04T03:25:54.181Z",
            "updatedAt": "2023-04-04T03:25:54.181Z",
            "publishedAt": "2023-04-04T03:25:54.175Z",
            "locale": "en",
            "phone": null,
            "star": "1"
        }
    },
]

let yy = [
    {
        "id": 102,
        "attributes": {
            "name": "Hotel99",
            "createdAt": "2023-04-04T03:25:54.181Z",
            "updatedAt": "2023-04-04T03:25:54.181Z",
            "publishedAt": "2023-04-04T03:25:54.175Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 119,
        "attributes": {
            "name": "Hotel116",
            "createdAt": "2023-04-04T03:25:54.849Z",
            "updatedAt": "2023-04-04T03:25:54.849Z",
            "publishedAt": "2023-04-04T03:25:54.843Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 120,
        "attributes": {
            "name": "Hotel117",
            "createdAt": "2023-04-04T03:25:54.884Z",
            "updatedAt": "2023-04-04T03:25:54.884Z",
            "publishedAt": "2023-04-04T03:25:54.880Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 121,
        "attributes": {
            "name": "Hotel118",
            "createdAt": "2023-04-04T03:25:54.916Z",
            "updatedAt": "2023-04-04T03:25:54.916Z",
            "publishedAt": "2023-04-04T03:25:54.913Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 124,
        "attributes": {
            "name": "Hotel121",
            "createdAt": "2023-04-04T03:25:55.024Z",
            "updatedAt": "2023-04-04T03:25:55.024Z",
            "publishedAt": "2023-04-04T03:25:55.019Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 125,
        "attributes": {
            "name": "Hotel122",
            "createdAt": "2023-04-04T03:25:55.055Z",
            "updatedAt": "2023-04-04T03:25:55.055Z",
            "publishedAt": "2023-04-04T03:25:55.050Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 126,
        "attributes": {
            "name": "Hotel123",
            "createdAt": "2023-04-04T03:25:55.096Z",
            "updatedAt": "2023-04-04T03:25:55.096Z",
            "publishedAt": "2023-04-04T03:25:55.090Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 127,
        "attributes": {
            "name": "Hotel124",
            "createdAt": "2023-04-04T03:25:55.132Z",
            "updatedAt": "2023-04-04T03:25:55.132Z",
            "publishedAt": "2023-04-04T03:25:55.125Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 134,
        "attributes": {
            "name": "Hotel131",
            "createdAt": "2023-04-04T03:25:55.409Z",
            "updatedAt": "2023-04-04T03:25:55.409Z",
            "publishedAt": "2023-04-04T03:25:55.407Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    },
    {
        "id": 137,
        "attributes": {
            "name": "Hotel134",
            "createdAt": "2023-04-04T03:25:55.513Z",
            "updatedAt": "2023-04-04T03:25:55.513Z",
            "publishedAt": "2023-04-04T03:25:55.510Z",
            "locale": "en",
            "phone": null,
            "star": "5"
        }
    }
]

let zz = [
    ...xx,
    ...yy
]

console.log(zz);