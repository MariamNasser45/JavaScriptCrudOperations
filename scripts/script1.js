// //task 1
// var num = prompt("Write the number : ")

// document.getElementById('num').innerHTML=num;

// //task 2
// if(num%3 || num%4)
// {
//     console.log(`Yes ${num} devided by 3 or 4`)
// }

// else
// {
//     console.log(`No ${num} can't be devided by 3 or 4`)

// }

//task 3
// var num1 = prompt("Enter number");

// var num2 = prompt("enter number");

// if(num1>num2)
// {
//     console.log(`the max value is ${num1}`);
// }
// else if(num2>num1)
// {
//     console.log(`the max value is ${num2}`);
// }
// else
// {
//     console.log(`the twop numbers are equal`);

// }

//task4

// var num3 = prompt("enter number");

// if(+num3>0)
// {
//     console.log(`positive`);
// }
// else if(+num3<0)
// {
//     console.log(`negative`);
// }

// var num = prompt("enter number");

// var i=1;

// while(i<=12)
// {
//     console.log(i*num);
//     i++;
// }


////////////////////////////////////////// CRUD Operation ////////////////////////////////////////////

var productName = document.getElementById('name');
var productCategory = document.getElementById('category');
var productPrice = document.getElementById('price');
var productDesc = document.getElementById('desc');

var storedProducts = JSON.parse(localStorage.getItem('productLst')); // get old products to print it on table if relaod page 

     // if stored in local storage is null "storage is empty" initialize product list to push in it
var productList = storedProducts!=undefined?storedProducts:[];

var tableBody = document.getElementById('body');

DisplayData();

function AddProduct()
{

var index =0;

if(productList!=null && productList.length!=0)
{

    lastIndex = (productList.length)+1; 

}

    var product = {name:productName.value,category:productCategory.value,price:productPrice.value,description:productDesc.value};

    console.log(product);

    if(product.name!='' && product.category!='' && product.price!=0 && product.description!='')
    {
        
        productList.push(product);
        
        localStorage.setItem('productLst' , JSON.stringify(productList));
        
        ResetForm();
        
        storedProducts = JSON.parse(localStorage.getItem('productLst'))

        DisplayData();
    }


};


function DeleteProduct(index)
{   
    productList.splice(index,1) // because array start with 0 index and id of list start from1 set index=index-1

    localStorage.setItem('productLst',JSON.stringify(productList))

    storedProducts = JSON.parse(localStorage.getItem('productLst'))

    DisplayData();
};

//To Apper Its data in inputs
function PrintDataToUpdateProduct(index)
{
    var printProductToEdit = productList[index];

    productName.value=printProductToEdit.name;
    productCategory.value = printProductToEdit.category;
    productPrice.value = printProductToEdit.price;
    productDesc.value = printProductToEdit.description;

    var getAddBtn = document.getElementById('addBtn');

    getAddBtn.setAttribute ("onclick",`UpdateProduct(${index})`);

    console.log(getAddBtn);

};

function UpdateProduct(index)
{
    var productToEdit = productList[index];


    if(productName.value!='' && productCategory.value!='' && productPrice.value!='' &&productDesc.value!='')
    {
        productToEdit.name = productName.value;
        productToEdit.category = productCategory.value;
        productToEdit.price = productPrice.value;
        productToEdit.description =productDesc.value;
    
        localStorage.setItem('productLst',JSON.stringify(productList))
    
        storedProducts = JSON.parse(localStorage.getItem('productLst'))
    
        ResetForm();
        DisplayData();

    }
    

};

function ResetForm()
{
    productName.value='';
    productCategory.value='';
    productPrice.value='';
    productDesc.value='';
}

function DisplayData()
{
    productList =storedProducts = JSON.parse(localStorage.getItem('productLst'))

    tableBody.innerHTML=''; // reset table to reprint data including data appeared in table

    if(productList==undefined)
    {
        productList=[]
    }
    else
    {

        var searchInput = document.getElementById('search');

        if(searchInput.value!='')
        {
            for(var i=0 ; i<productList.length ; i++)
            {
                if(!(productList[i].name.includes(searchInput.value) || productList[i].category.includes(searchInput.value) || productList[i].price.includes(searchInput.value) || productList[i].description.includes(searchInput.value)))
                {
                    productList.splice(i,1);
                }
                
            }
        }

        for(var i=0 ; i<productList?.length ; i++)
            {
                tableBody.innerHTML +=`<tr">
                <td>${i+1}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].description}</td>
                <td><input type="button" class="btn btn-outline-danger" value="Delete" onclick=DeleteProduct(${i})></td>
                <td><input type="button" class="btn btn-outline-warning" value="Update" onclick=PrintDataToUpdateProduct(${i})></td>
                </tr>`
            }
    }    
};
