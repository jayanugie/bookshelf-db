const express = require('express');
const app = express();
const port = 3000;
const { Unread, Finished } = require('./models');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MENAMPILKAN HALAMAN UTAMA
app.get('/', (req, res) => {
    Unread.findAll()
    .then(unread => {
        res.render('index.ejs', {
            unread
        });
    });
});

// MENAMBAH BUKU BARU
app.post('/', (req, res) => {
    Unread.create({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    })
    .then(unread => {
        res.redirect('/');
    });
});

// MENGHAPUS DATA BUKU
app.get('/delete/:id', (req, res) => {
    Unread.destroy({
        where: { id: req.params.id }
    });
    return res.redirect('/');
});



app.listen(port);