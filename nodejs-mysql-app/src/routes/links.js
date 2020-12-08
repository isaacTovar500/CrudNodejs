const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLogeedIn } = require('../lib/auth')

router.get('/add', isLogeedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLogeedIn,  async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Agregado correctamente');
    res.redirect('/links');
});

router.get('/', isLogeedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', {links});
});

router.get('/delete/:id', isLogeedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Eliminado correctamente');
    res.redirect('/links');
});

router.get('/edit/:id', isLogeedIn, async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLogeedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Actualizado correctamente');
    res.redirect('/links');
});

module.exports = router;