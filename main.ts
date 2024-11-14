import express from "express";
import pgp from 'pg-promise';

const app = express();
app.use(express.json());

const hostbanco = ''
const usuariobanco = 'postgres'
const senhabanco = ''
const nomebanco = ''
const portabanco = 5432

const conexaobanco = pgp()({
    host: hostbanco,
    database: nomebanco,
    user: usuariobanco,
    password: senhabanco,
    port: portabanco
})

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/funcionarios', async (req, res) => {
    const itens = await conexaobanco.query('select * from funcionarios order by id');
    res.json(itens);
})

// app.get('/funcionarios', async (req, res) => {
//     const itens = await conexaobanco.query('select * from funcionarios order by id');

//     const funcionaios = itens.map((item: any) => {
//         return {
//             id: item.id,
//             nome: item.nome,
//             status: item.status,
//             status_str: item.status == 1 ? 'Ativo' : 'Inativo'
//         }
//     })
//     res.json(funcionaios);
// })

app.post('/funcionarios', async (req, res) => {
    await conexaobanco.query('insert into funcionarios (nome, status) values($1,$2)',
        [req.body.nome, req.body.status]
    );
    res.json({mesagem: 'salvou'});
})

app.put('/funcionarios', async (req, res) => {
    await conexaobanco.query('update funcionarios set nome = $1, status = $2 where id = $3',
        [req.body.nome, req.body.status, req.body.id]
    );
    res.json({mesagem: 'atualizou'});
})

app.listen(5000, () => {
    console.log('iniciou')}
);