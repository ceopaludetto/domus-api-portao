const ip = require('ip');
const cors = require('cors');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT, URL } = require('./config.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/portao/abrir', (req, res) => {
    try {
        request.post(
            `${URL}/auth/portao`,
            {
                json: {
                    MOR_INT_PSWPORTA: req.body.MOR_INT_PSWPORTA
                },
                headers: {
                    authorization: req.headers.authorization
                }
            },
            (err, httpRes, body) => {
                if (httpRes.statusCode === 200) {
                    // LISP VEM AQUI (Aquela func q chama o pyton)
                    res.send({ ok: true });
                } else {
                    res.status(400).send({ error: body.error });
                }
            }
        );
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao abrir portão' });
    }
});

app.post('/portao/fechar', (req, res) => {
    try {
        // LISP VEM AQUI (Aquela func q chama o pyton)
        res.send({ ok: false });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao fehcar portão' });
    }
});

app.listen(PORT, () => {
    console.log(`Server aberto, acessar em localhost:${PORT} ou ${ip.address()}:${PORT}`);
});
