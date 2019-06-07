import express from 'express';
import * as database from '../services/database';

const router = express.Router();

router.post('/api/books', async (req, res, next) => {
  try {
    const results = await database.query('insert into book (isbn, title) values ($1, $2) returning (id)', [ req.body.isbn, req.body.title ]);    
    if (results.rowCount > 0) {
      const { id } = results.rows[0];
      res.status(201).set('Location', `/api/book/${ id }`).send();
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/api/books', async (req, res, next) => {
  try {
    const results = await database.query('select * from book');    
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/api/book/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const results = await database.query('select * from book where id = $1', [ id ]);    
    if (results.rows.length) {
      res.status(200).json(results.rows[0]);
    } else {
      res.sendStatus(404); 
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/api/book/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const results = await database.query('delete from book where id = $1', [ id ]);    
    if (results.rowCount > 0) {
      res.sendStatus(204); 
    } else {
      res.sendStatus(404); 
    }
  } catch (err) {
    next(err);
  }
});



export default router;
