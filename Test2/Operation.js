function add(num1, num2) 
{
    
    var total=num1+num2
    return total
    

}
function Product(num1,num2)
{
    var total=num1*num2;
    return total
}
function Subtraction(num1,num2)
{
    var total=num1-num2;
    return total
}
function Division(num1,num2)
{
    var total=num1/num2;
    return total
}

exports.a=add;
exports.Product=Product;
exports.Subtraction=Subtraction;
exports.Division=Division;