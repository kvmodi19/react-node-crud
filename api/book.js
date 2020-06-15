module.exports = (app, db) => {
	app.get('/books', (req, res) =>
		db.Book.findAll().then((result) => res.json(result))
	);

	app.get('/books/:id', (req, res) =>
		db.Book.findByPk(req.params.id).then((result) => res.json(result))
	);

	app.post('/books', (req, res) =>
		db.Book.create({
			title: req.body.title,
			author: req.body.author
		}).then((result) => res.json(result))
	);

	app.put('/books/:id', (req, res) =>
		db.Book.update({
				title: req.body.title,
				author: req.body.author
			},
			{
				where: {
					id: req.params.id
				}
			}).then((result) => res.json(result))
	);

	app.delete('/books/:id', (req, res) =>
		db.Book.destroy({
			where: {
				id: req.params.id
			}
		}).then((result) => res.json(result))
	);
};