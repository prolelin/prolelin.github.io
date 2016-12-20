var express=require('express')//引入express模块
var mongoose=require('mongoose')//引入mongoose模块
var app=express()//实例化对象

app.use(express.static('./public'))

mongoose.connect('mongodb://localhost/books_db')//连接数据库名

//连接数据库表 模型，设置数据属性
var Book=mongoose.model('dangdang_book',{
    title:String,
    img:String,
    link:String,
    price:Number,
    author:String,
    publisher:String
})

app.get('/api/v1/books',function(req,res){
    var currentPage=1; 
    if(req.query.page){
        currentPage=req.query.page;
    }
    var pageSize=10;
    Book.find({},function(err,data){
        if(err){
            console.log(err)
            res.json({static:'y',data:[]});

        }
        else{
            res.json({static:'y',data:data});
        }
    }).limit(pageSize).skip((currentPage-1)*pageSize)

})

app.listen(4000,()=>{
    console.log('服务器端口运行于4000端口...')
})