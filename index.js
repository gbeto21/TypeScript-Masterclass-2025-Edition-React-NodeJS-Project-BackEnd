import express from "express";
const app = express();
const port = 3001;
app.get("/", (req, res) => {
    res.send("Express application");
});
app.listen(port, () => {
    console.log(`Server running at: ${port}`);
});
//# sourceMappingURL=index.js.map