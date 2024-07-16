import dbConnect from './dbConnect.js';
import 'dotenv/config';
import {Product} from './models/productModel.js';
import productData from './products.json' assert {type:"json"};

;(async() =>{
    try {
        await dbConnect(process.env.MONGO_URL);
        console.log('Database Connected...')

        await Product.deleteMany();
        console.log('All Records Deleted...')

        await Product.create(productData);
        console.log('New Data Imported');

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();