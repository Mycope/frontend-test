const fs = require('fs');
const fastify = require('fastify')({ logger: true });
var base_1 = '';
var base_2 = '';

fastify.register(require('fastify-cors'), {});

fastify.get('/', async (request, reply) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}
		
		fs.readFile('./main_1.html', 'utf-8', (err, html_data) => 			{
		  if (err) {throw err}
		  else {base_1 = util.format(html_data)};
		});
		
		fs.readFile('./main_2.html', 'utf-8', (err, html_data) => 			{
		  if (err) {throw err}
		  else {base_2 = util.format(html_data)};
		});

		if(request.query.term)
		{
			// const result = JSON.parse(data).filter((elem)=> elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
			// reply.type('text/html').send(JSON.stringify(result));
		}
		else
		{
			// reply.send(data);
			reply.type('text/html').send(`${base_1} ${data} ${base_2}`);
		}

	})
});

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();