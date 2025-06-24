const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
require('dotenv').config();


const posts=[{
    id:1,
    username:'testuser',
    post:'123'
},{
    id:2,
    username:'ali',
    post:'456'
}]

app.use(express.json())

app.get('/posts',authenticateToken,(req,res)=>{
    res.json(posts.filter(post=>post.username===req.user.name))
})

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    })
}
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})