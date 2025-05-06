const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Mongoose Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});
const Song = mongoose.model('Song', songSchema);

// (c) Insert 5 songs
app.get('/insert', async (req, res) => {
    const songs = [
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", Singer: "Arijit Singh" },
        { Songname: "Zingaat", Film: "Sairat", Music_director: "Ajay-Atul", Singer: "Ajay Gogavale" },
        { Songname: "Kun Faya Kun", Film: "Rockstar", Music_director: "A.R. Rahman", Singer: "Javed Ali" },
        { Songname: "Chaiyya Chaiyya", Film: "Dil Se", Music_director: "A.R. Rahman", Singer: "Sukhwinder Singh" },
        { Songname: "Kal Ho Naa Ho", Film: "Kal Ho Naa Ho", Music_director: "Shankar-Ehsaan-Loy", Singer: "Sonu Nigam" }
    ];
    await Song.insertMany(songs);
    res.send("5 Songs inserted");
});

// (d) Display count and list all
app.get('/', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('index', { songs, count });
});

// (e) Songs by Music Director
app.get('/musicdirector/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.render('index', { songs, count: songs.length });
});

// (f) Songs by Music Director and Singer
app.get('/musicdirector/:md/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.md, Singer: req.params.singer });
    res.render('index', { songs, count: songs.length });
});

// (g) Delete song by name
app.get('/delete/:name', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.redirect('/');
});

// (h) Add a new favourite song
app.get('/add', async (req, res) => {
    const fav = { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", Singer: "Arijit Singh" };
    await Song.create(fav);
    res.redirect('/');
});

// (i) Songs by singer from a film
app.get('/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Film: req.params.film, Singer: req.params.singer });
    res.render('index', { songs, count: songs.length });
});

// (j) Update by adding Actor and Actress
app.get('/update/:name', async (req, res) => {
    await Song.updateOne(
        { Songname: req.params.name },
        { $set: { Actor: "Ranbir Kapoor", Actress: "Alia Bhatt" } }
    );
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
