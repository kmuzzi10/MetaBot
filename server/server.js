import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import bodyParser from "body-parser";
import cors from "cors";
import cardRoutes from "./routes/cardsRoutes.js"
import serviceCardRoutes from "./routes/serviceCardRoutes.js"
import newsCardRoutes from "./routes/newsCardRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import clientRoutes from "./routes/clientRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import trainingRoutes from "./routes/trainingRoutes.js"
import nodemailer from "nodemailer"

dotenv.config();

//database config
connectDB();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors({
    origin: 'http://localhost:3000', //frontend link
    methods:["GET","POST","PUT","DELETE"], 
    credentials: true,  
}));

// Add this middleware to set headers for preflight requests
app.options('*', cors());

app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))

// Routes
app.get('/', (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Hello this is Software House Backend"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "internal server error",
            error
        })
    }
})


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/service-cards", serviceCardRoutes);
app.use("/api/v1/news-cards", newsCardRoutes);
app.use("/api/v1/project-cards", projectRoutes);
app.use("/api/v1/client-cards", clientRoutes);
app.use("/api/v1/training-cards", trainingRoutes);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER, // Apna email address yahan likhein
        pass: process.env.PASS // Apna email ka password yahan likhein
    }
});

// Contact form route
app.post('/send-email', (req, res) => {
    const { name, email, comments } = req.body;

    // Email options
    const mailOptions = {
        from: email,
        to: process.env.USER, // Apna email address yahan likhein
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nComments: ${comments}`
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Error: Something went wrong!');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully!');
        }
    });
});


// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});