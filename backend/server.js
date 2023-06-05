// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let posts = [];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const { title, body } = req.body;
  const newPost = {
    id: uuidv4(),
    title,
    body,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const postIndex = posts.findIndex((post) => post.id === id);
  
    if (postIndex !== -1) {
      const updatedPost = {
        ...posts[postIndex],
        title,
        body,
      };
  
      posts[postIndex] = updatedPost;
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Postagem não encontrada.' });
    }
  });
  

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Postagem não encontrada.' });
  }
});

app.listen(8000, () => {
  console.log('Backend is running on port 8000');
});
