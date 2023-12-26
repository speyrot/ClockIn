const express = require('express');
const app = express();
const port = 3001; // Different from the React app's port

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
