import "dotenv/config";
import app from "./app.js";
import connectToDatabase from "./utils/db.js";

const port = process.env.PORT || 8000;

async function startServer() {
    await connectToDatabase();
    app.listen(port, () => {
        console.log("server started on port", port);
    });
}

startServer();
