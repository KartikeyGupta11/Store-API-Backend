export const notFound = (req,res) =>{
    res.status(400)
    .send("Route Not Exist");
}