import httpServer from "./src/app.js";
import CONFIG from "./src/config/config.js";

const port = CONFIG.PORT || 3000

httpServer.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})