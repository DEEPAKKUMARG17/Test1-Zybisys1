const errorhandler = (error,req,res,next)=>
{
    console.log(error);
    res.status(400).send(error.message)
}
 
module.exports=errorhandler;