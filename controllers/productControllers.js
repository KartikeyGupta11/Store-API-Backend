import { Product } from "../models/productModel.js"

export const getAllProducts = async(req,res) => {
    console.log(req.query);
    // const products = await Product.find(req.query);
    const {featured,company,rating, name, sort, feilds, numericFilter} = req.query;
    const myQuery = {};
    if(featured){
        myQuery.featured = featured === 'true';
    }
    
    if(company){
        myQuery.company = {
            $regex:company,
            $options:'i'
        }
    }
    
    if(rating){
        myQuery.rating = Number(rating);
    }

    if(name){
        myQuery.name = {
            $regex:name,
            $options:'i'
        }
    }

    if(numericFilter){
        const operatorMap = {
            '>':'$gt',
            '<':'$lt',
            '>=':'$gte',
            '<=':'$lte',
            '=':'$eq',
            '!=':'$ne',
            '<>':'$ne'
        }

        const regEx = /\b(<|<=|>|>=|=|!=|<>)\b/g;
        let filters = numericFilter.replace(regEx,(match) => `-${operatorMap[match]}-`)
        console.log(filters);
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){
                myQuery[field.trim()] = {
                    ...myQuery[field],[operator] : Number(value)
                }
            }
        })
    }
    console.log(myQuery);

    let result = Product.find(myQuery);

    if(sort){
        let sortByfields = sort.split(',');
        sortByfields = sortByfields.map((field) => field.trim())
        console.log("after updated1",sortByfields);
        sortByfields = sortByfields.join(" ");
        console.log(sortByfields);
        result = result.sort(sortByfields);
    }
    else{
        result = result.sort("createdAt");
    }

    if(feilds){
        let selectedFeilds = feilds.split(',');
        selectedFeilds = selectedFeilds.map((feild) => feild.trim());
        console.log("after Updated: ",selectedFeilds);
        selectedFeilds = selectedFeilds.join(" ");
        result = result.select(selectedFeilds);
    }

    const pageNo = Number(req.query.page) || 1;
    const limitValue = Number(req.query.limit) || 10;
    // Concept of Pagination
    if(result.length > limitValue){
        const skipValue = (pageNo-1) * limitValue;
        result = result.skip(skipValue).limit(limitValue);
    }

    // console.log("muQuery: ",myQuery);
    const products = await result;
    // const products = await Product.find(myQuery).sort("-rating");
    res.status(200)
    .json({
        nbHits:products.length,
        products
    })
}

export const getAllProductsTest = async(req,res) =>{
    // const products = await Product.find({featured:true});
    // const products = await Product.find({name:"vase table"});

    // const products = await Product.find().sort("name -price");
    const products = await Product.find({price:{$gt:30}}).select("name price").limit(10).skip(10);

    res.status(200)
    .json({
        nbHits:products.length,
        products
    });
}