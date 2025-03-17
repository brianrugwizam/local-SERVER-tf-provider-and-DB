
const fs = require('fs');
const jsonServer = require('json-server');
const db = require('../openAPI-server/db.json');
const server = jsonServer.create();
const router = jsonServer.router('../openAPI-server/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;
const persistentStorage = process.env.STORE || true;
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
	result = db["pets"].find((x) => {return x.id == req.params.id})
	console.log(result)
	if (result == undefined) {
		statuscode = 404;
		responseBody = {
			"_meta": {
					"traceId": "zKRRMUUvi"
				},
			"data": {},
			"errors": {
				"msg": "pet with id " + req.params.id + " not found"
			}
		};
	} else {
	responseBody = {
		"_meta": {
				"traceId": "zKRRMUUvi"
			},
		"data": {
				"id": result.id,
				"name": result.name,
				"tag": ""
		},
		"errors": {}
};
	}
	
	res.status(statusCode).json(responseBody);
});

server.put('/pets/:id', (req, res) => {
	console.log(`PUT /pets/${req.params.id} with body ${JSON.stringify(req.body)}`);

	let petIndex = db.pets.findIndex(p => p.id === req.params.id);

	if (petIndex === -1) {
		return res.status(404).json({error: "Pet not found"});
	}

	db.pets[petIndex].name = req.body.name || db.pets[petIndex].name;
	db.pets[petIndex].tag = req.body.tag || db.pets[petIndex].tag;

	checkWriteToDb();

	res.json({data: db.pets[petIndex]});
})

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