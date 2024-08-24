import app from './src/app';
import config from './src/configs/config.env';

const port = config.app.port;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})  
