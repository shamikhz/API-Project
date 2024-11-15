import express from 'express';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import Productrouter from './src/features/product/product.routes.js';
import Userrouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cartitems.routes.js';
import apiDocs from './swagger.json' assert{type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
const server=express();
server.use(express.json())
server.use(bodyParser.json())
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs))
server.use(loggerMiddleware);
server.use("/api/products",jwtAuth,Productrouter);
server.use("/api/cartItems",jwtAuth,cartRouter);
server.use("/api/users",Userrouter);
server.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce APIs")
});
server.use((req,res)=>{
    res.status(404).send("API not found")
})
server.listen(3200,()=>{

    console.log("Server is listining at 3200")
})