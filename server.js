
const fs = require('fs');
const jsonServer = require('json-server');
const db = require('../openAPI-server/db.json')
const server = jsonServer.create();
const router = jsonServer.router('./../openAPI-server/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;
const persistentStorage = process.env.STORE || false;
let idCounter = 0;

server.use(jsonServer.bodyParser);

function checkWriteToDb() {
	if (persistentStorage) {
		fs.writeFile('../openAPI-server/db.json', JSON.stringify(db, undefined, 2), (err) => {
			if (err) throw err;
		});
	}
}

server.use(jsonServer.rewriter({
	"/pets": "/pets",
	"/pets?limit=": "/pets",
	"/pets/:id": "/pets/:id",
	"/pets": "/pets"
}));

server.get('/pets', (req, res) => {
	console.log(`GET /pets`);
	statusCode = 200;
	responseBody = {
		"_meta": {
				"limit": 1,
				"total": 81,
				"traceId": "HWTwCl"
			},
		"data": [
				{
						"id": "89d8319e-6ca9-41f1-b9d7-20f35e213643",
						"name": "NWBXwqDzZdl",
						"tag": ""
				}
		],
		"errors": {}
};
	
	res.status(statusCode).json(responseBody);
});

server.get('/pets/:id', (req, res) => {
	console.log(`GET /pets/${req.params.id}`);
	statusCode = 200;
	responseBody = {
		"_meta": {
				"traceId": "zKRRMUUvi"
			},
		"data": {
				"id": "54b39657-4362-4af6-949b-dba49911a21a",
				"name": "ZXl",
				"tag": "KFFhEj"
		},
		"errors": {}
};
	
	res.status(statusCode).json(responseBody);
});

server.post('/pets', (req, res) => {
	console.log(`POST /pets with body ${JSON.stringify(req.body)}`);
	statusCode = 201;
	idCounter++
	db["pets"].push({
			"id": "" + idCounter,
			"name": req.body.name,
			"tag": ""
	
	})
	responseBody = {
		"_meta": {
				"traceId": "nBIUir"
			},
		"data": {
			"id": "" + idCounter,
			"name": req.body.name,
			"tag": ""
	
		},
		"errors": {}
};
	checkWriteToDb();
	res.status(statusCode).json(responseBody);
});

server.use(middlewares);
server.use(router);
server.listen(port);
