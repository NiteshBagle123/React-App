import config from './config';
import express from 'express';
import apiRoutes from './api/index';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(err => {
      console.error(err.toString());
      res.status(404).send('Bad Request');
    });
});

server.use('/api', apiRoutes);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.log(`Server running on port:${config.port} and host:${config.host}`);
});

// import http from 'http';
// const server = http.createServer((req, res) => {
//   res.write('Hello World');
//   setTimeout(()=> {
//     res.write('I can write streams');
//     res.end();
//   }, 3000);
// });

// server.listen(port);



