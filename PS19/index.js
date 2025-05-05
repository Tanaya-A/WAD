const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema and Model
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});
const Student = mongoose.model('studentmarks', studentSchema);

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Insert sample data (use once, then comment out)
app.get('/insert', async (req, res) => {
    const data = [
        { Name: "ABC", Roll_No: 111, WAD_Marks: 25, CC_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, AI_Marks: 25 },
        { Name: "XYZ", Roll_No: 112, WAD_Marks: 15, CC_Marks: 30, DSBDA_Marks: 22, CNS_Marks: 20, AI_Marks: 19 },
        { Name: "LMN", Roll_No: 113, WAD_Marks: 30, CC_Marks: 32, DSBDA_Marks: 27, CNS_Marks: 28, AI_Marks: 29 },
        { Name: "PQR", Roll_No: 114, WAD_Marks: 10, CC_Marks: 18, DSBDA_Marks: 15, CNS_Marks: 35, AI_Marks: 40 }
    ];
    await Student.insertMany(data);
    res.send("Sample data inserted");
});

// d) Display total count and all documents
app.get('/all', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.send(`<h3>Total Students: ${count}</h3><pre>${JSON.stringify(students, null, 2)}</pre>`);
});

// e) Students with DSBDA > 20
app.get('/dsbda20', async (req, res) => {
    const result = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.send(`<h3>Students with DSBDA > 20</h3><ul>${result.map(s => `<li>${s.Name}</li>`).join('')}</ul>`);
});

// f) Update marks of a specific student (query param)
app.get('/update/:name', async (req, res) => {
    const name = req.params.name;
    await Student.updateOne({ Name: name }, {
        $inc: {
            WAD_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_Marks: 10
        }
    });
    res.send(`Marks updated for ${name}`);
});

// g) Students with all subjects > 25
app.get('/all25', async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    });
    res.send(`<h3>All Marks > 25</h3><ul>${result.map(s => `<li>${s.Name}</li>`).join('')}</ul>`);
});

// h) Students with < 40 in both Maths and Science (e.g., WAD and CNS)
app.get('/less40', async (req, res) => {
    const result = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    res.send(`<h3>WAD & CNS < 40</h3><ul>${result.map(s => `<li>${s.Name}</li>`).join('')}</ul>`);
});

// i) Remove a student by name
app.get('/delete/:name', async (req, res) => {
    const name = req.params.name;
    await Student.deleteOne({ Name: name });
    res.send(`Student ${name} deleted`);
});

// j) Display in tabular format
app.get('/table', async (req, res) => {
    const students = await Student.find();
    res.render('table', { students });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
