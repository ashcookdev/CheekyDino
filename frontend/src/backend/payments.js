const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 4430;

app.use(express.json());


// start the server

function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }

    );
}


    module.exports = startServer;


