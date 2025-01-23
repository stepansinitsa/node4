const express = require("express");
const { v4: uuid } = require("uuid");

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) 
  {
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName,
    this.id = id
  }
};

const auth = {
  id: 1,
  mail: "test@mail.ru"
};

const lib = {
  books: []
};

const app = express();
app.use(express.json());

//Авторизация пользователя
app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json(auth);
});

//Получить все книги
app.get("/api/books", (req, res) => {
  const { books } = lib;
  res.json(books);
});

//Получить книгу по ID
app.get("/api/books/:id", (req, res) => {
  const { books } = lib;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("Code: 404");
  }
});

//Создать книгу
app.post("/api/books", (req, res) => {
  const { books } = lib;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

//Редактировать книгу по ID
app.put("/api/books/:id", (req, res) => {
  const { books } = lib;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("Code: 404");
  }
});

//Удалить книгу по ID
app.delete("/api/books/:id", (req, res) => {
  const { books } = lib;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("Code: 404");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
