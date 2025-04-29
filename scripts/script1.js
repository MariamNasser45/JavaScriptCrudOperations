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
        var length = (productList.length); 

        var lastIndex = (productList[length-1].id)+1
    }
    else
    lastIndex=1;

    var product = {id:lastIndex,name:productName.value,category:productCategory.value,price:productPrice.value,description:productDesc.value};

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


function DeleteProduct(id)
{   
    productList = JSON.parse(localStorage.getItem('productLst'));

    itemIndex = productList.findIndex(lst=>lst.id==id);


    productList.splice(itemIndex,1) // because array start with 0 index and id of list start from1 set index=index-1

    localStorage.setItem('productLst',JSON.stringify(productList))

    storedProducts = JSON.parse(localStorage.getItem('productLst'))

    DisplayData();
};

//To Apper Its data in inputs
function PrintDataToUpdateProduct(id)
{
    var itemIndex = productList.findIndex(lst=>lst.id==id);

    var printProductToEdit = productList[itemIndex]

    productName.value=printProductToEdit.name;
    productCategory.value = printProductToEdit.category;
    productPrice.value = printProductToEdit.price;
    productDesc.value = printProductToEdit.description;

    var getAddBtn = document.getElementById('addBtn');

    getAddBtn.setAttribute ("onclick",`UpdateProduct(${id})`);

    console.log(getAddBtn);

};

function UpdateProduct(id)
{
    storedProducts = JSON.parse(localStorage.getItem('productLst'))

    itemIndex = storedProducts.findIndex(lst=>lst.id==id);

    var productToEdit = storedProducts[itemIndex];

    if(productName.value!='' && productCategory.value!='' && productPrice.value!='' &&productDesc.value!='')
    {
        storedProducts[itemIndex].name = productName.value;
        storedProducts[itemIndex].category = productCategory.value;
        storedProducts[itemIndex].price = productPrice.value;
        storedProducts[itemIndex].description =productDesc.value;
    
        localStorage.setItem('productLst',JSON.stringify(storedProducts))
    
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
    productList = JSON.parse(localStorage.getItem('productLst'))

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
            var lstToDisplay = [];

            for(var i=0 ; i<productList.length ; i++)
            {
                if((productList[i].name.includes(searchInput.value) || productList[i].category.includes(searchInput.value) || productList[i].price.includes(searchInput.value) || productList[i].description.includes(searchInput.value)))
                {
                    lstToDisplay.push(productList[i]);
                }
                
            }

            productList = lstToDisplay;
        }


        for(var i=0 ; i<productList?.length ; i++)
            {
                tableBody.innerHTML +=`<tr">
                <td>${productList[i].id}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].description}</td>
                <td><input type="button" class="btn btn-outline-danger" value="Delete" onclick=DeleteProduct(${productList[i].id})></td>
                <td><input type="button" class="btn btn-outline-warning" value="Update" onclick=PrintDataToUpdateProduct(${productList[i].id})></td>
                </tr>`
            }
    }    
};


////////////////////// DOM ///////////////////////

// var elem = document.getElementById("x");

// elem.style.width = "100px";
// elem.style.height = "200px";


// document.addEventListener("mousemove",moveImage)

// function moveImage(e)
// {
//     console.log(e.clientY);
//     console.log(e.clientX);

//     elem.style.left = e.clientX;
//     elem.style.top = e.clientY;
// };


////////////////Regular Expression //////////////////////////////

var nameAndcategoryRegex = /^[A-Z][a-z]{2,10}$/
var descriptionRegex = /^[A-Z][a-z]{10,}$/
var priceRegex = /^[1-9][0-9]{2,3}|10000$/

var nameErrorBlock = document.getElementById("nameErr");
var categoryErrorBlock = document.getElementById("catErr");
var priceErrorBlock = document.getElementById("priceErr");
var descriptionErrorBlock = document.getElementById("descErr");




function CheckNameAndCategory(name=null , category = null)
{
    if(name!=null)
    {
        if(nameAndcategoryRegex.test(name) == true)
            {
                productName.classList.add("is-valid");
                productName.classList.remove("is-invalid");
        
                nameErrorBlock.classList.add("d-none")
                nameErrorBlock.classList.remove("d-block")
            }
            else
            {
                productName.classList.remove("is-valid");
                productName.classList.add("is-invalid");
        
                nameErrorBlock.innerText= "Product name must be start with capital letter and contain small letters and it's minimum lenght is 2"
                nameErrorBlock.classList.remove("d-none")
                nameErrorBlock.classList.add("d-block")
        
            }
    }

    if(category!=null)
        {
            if(nameAndcategoryRegex.test(category) == true)
                {
                    productCategory.classList.add("is-valid");
                    productCategory.classList.remove("is-invalid");
            
                    categoryErrorBlock.classList.add("d-none")
                    categoryErrorBlock.classList.remove("d-block")
                }
                else
                {
                    productCategory.classList.remove("is-valid");
                    productCategory.classList.add("is-invalid");
            
                    categoryErrorBlock.innerText= "Product Category must be start with capital letter and contain small letters and it's minimum lenght is 2"
                    categoryErrorBlock.classList.remove("d-none")
                    categoryErrorBlock.classList.add("d-block")
            
                }
        }

}

function CheckPrice(price)
{
    if(priceRegex.test(price) == true)
        {
            productPrice.classList.add("is-valid");
            productPrice.classList.remove("is-invalid");
    
            priceErrorBlock.classList.add("d-none")
            priceErrorBlock.classList.remove("d-block")
        }
        else
        {
            productPrice.classList.remove("is-valid");
            productPrice.classList.add("is-invalid");
    
            priceErrorBlock.innerText= "Price Must Be Between 100 and 10000"
            priceErrorBlock.classList.remove("d-none")
            priceErrorBlock.classList.add("d-block")
    
        }



}

function CheckDescription(description)
{
    if(descriptionRegex.test(description) == true)
        {
            productDesc.classList.add("is-valid");
            productDesc.classList.remove("is-invalid");
    
            descriptionErrorBlock.classList.add("d-none")
            descriptionErrorBlock.classList.remove("d-block")
        }
        else
        {
            productDesc.classList.remove("is-valid");
            productDesc.classList.add("is-invalid");
    
            descriptionErrorBlock.innerText= "Product Description can't be less than 10 degits"
            descriptionErrorBlock.classList.remove("d-none")
            descriptionErrorBlock.classList.add("d-block")
    
        }

}

productName.addEventListener("keyup", function(){
    
 CheckNameAndCategory(productName.value , null)}
);

productCategory.addEventListener("keyup" , function()
{
    CheckNameAndCategory(null,productCategory.value)}

);

productPrice.addEventListener("keyup" , function()
{
    CheckPrice(productPrice.value)}

);

productDesc.addEventListener("keyup" , function()
{
    CheckDescription(productDesc.value)}

);