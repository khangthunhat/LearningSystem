
import app from './src/app';
import config from './src/configs/config.env';
import { v2 as cloudinary } from 'cloudinary';

const port = config.app.port;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})  
