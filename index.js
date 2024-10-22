const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const faker = require('faker');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB

// mongoose.connect('mongodb://127.0.0.1:27017/Student', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// // Create student schema

// const studentSchema = new mongoose.Schema({
//     name: String,
//     branch: String,
//     year: Number,
//     cgpa: Number,
//     hostelPref: String
// });

// // Define model for student

// // Define schema for HostelA
// const Student = mongoose.model('Student', studentSchema);
// const hostelASchema = new mongoose.Schema({
//     students: [studentSchema] // Embed student schema for students in HostelA
// });

// // Define model for HostelA
// const HostelA = mongoose.model('HostelA', hostelASchema);

// // Define schema for HostelB
// const hostelBSchema = new mongoose.Schema({
//     students: [studentSchema] // Embed student schema for students in HostelB
// });

// // Define model for HostelB
// const HostelB = mongoose.model('HostelB', hostelBSchema);

// // Define schema for HostelC
// const hostelCSchema = new mongoose.Schema({
//     students: [studentSchema] // Embed student schema for students in HostelC
// });

// // Define model for HostelC
// const HostelC = mongoose.model('HostelC', hostelCSchema);

// // Create student model


// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors({
//   origin: 'http://localhost:3001'
// }));


// // Routes
// // Route to add a new student
// app.post('/students', (req, res) => {
//     const { name, branch, year, cgpa, hostelPref } = req.body;
//     const newStudent = new Student({
//         name,
//         branch,
//         year,
//         cgpa,
//         hostelPref
//     });
//     newStudent.save()
//         .then(() => res.send('Student added successfully'))
//         .catch(err => res.status(400).send(err));
// });

// // Route to get all students
// app.get('/students', (req, res) => {
//     Student.find()
//         .then(students => res.json(students))
//         .catch(err => res.status(400).send(err));
// });

// // Route to allot hostels based on CGPA
// app.get('/allot-hostels', async (req, res) => {
//     try {
//         // Retrieve all students
//         const students = await Student.find().sort({ cgpa: -1 });

//         // Divide students into hostel A, B, and C based on preference and CGPA
//         const hostelA = [];
//         const hostelB = [];
//         const hostelC = [];
//         let countA = 0;
//         let countB = 0;
//         let countC = 0;

//         // Loop through students and allot to hostels
//         for (const student of students) {
//             if (student.hostelPref === 'A' && countA < 10) {
//                 hostelA.push(student);
//                 countA++;
//             } else if (student.hostelPref === 'B' && countB < 10) {
//                 hostelB.push(student);
//                 countB++;
//             } else if (student.hostelPref === 'C' && countC < 10) {
//                 hostelC.push(student);
//                 countC++;
//             }
//         }
//          await Promise.all([
//             HostelA.create(hostelA),
//             HostelB.create(hostelB),
//             HostelC.create(hostelC)
//         ]);

//         res.json({ hostelA, hostelB, hostelC });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
// Generate random students
// function generateRandomStudents(num) {
//     const randomStudents = [];
//     const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE'];
//     const hostelPrefs = ['A', 'B'];

//     for (let i = 0; i < num; i++) {
//         const student = {
//             name: `Student ${i + 1}`,
//             branch: branches[Math.floor(Math.random() * branches.length)],
//             year: Math.floor(Math.random() * 4) + 1,
//             cgpa: Math.random() * (10 - 5) + 5,
//             hostelPref: hostelPrefs[Math.floor(Math.random() * hostelPrefs.length)]
//         };
//         randomStudents.push(student);
//     }

//     return randomStudents;
// }
// Start server
mongoose.connect('mongodb://127.0.0.1:27017/HostelAllotment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create student schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber: Number,
    branch: String,
    cgpa: Number
});

// Create student model
const Student = mongoose.model('Student', studentSchema);

// Function to generate random student data
function generateStudent() {
    const name = faker.name.findName();
    const rollNumber = faker.random.number({ min: 1000, max: 9999 });
    const branch = faker.random.arrayElement(['CSE', 'ECE', 'ME', 'CE', 'EE']);
    const cgpa = parseFloat(faker.finance.amount(5, 10, 2)); // Random CGPA between 5 and 10
    return { name, rollNumber, branch, cgpa };
}

// Generate 100 students
const students = Array.from({ length: 100 }, () => generateStudent());

// Insert students into database
Student.insertMany(students)
    .then(() => console.log('Students added to database successfully'))
    .catch(err => console.error('Error adding students to database:', err));


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
