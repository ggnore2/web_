let table = document.querySelector("table");

function createProductRow(productId,imageLink,  productTitle, productSize, productQuantity, productPrice){
    return `
        <tr>
            <td>${productId}</td>
            <td><img src="${imageLink}" style = "width: 40px; height: 60px"/></td>
            <td>${productTitle}</td>
            <td>${productSize}</td>
            <td>${productQuantity}</td>
            <td>${productPrice}</td>
        </tr>
    `;
}
window.onload = function(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("orderId") !== null || !/^\d+$/.test(urlParams.get("orderId"))){
        let orderId = parseInt(urlParams.get("orderId")) ;
        let orderProductObjects = getObjectsByAnAttribute("Đơn hàng sản phẩm", "id", orderId); 
        console.log(orderProductObjects);
        
        orderProductObjects.forEach(orderProductObject =>{
            let size = orderProductObject["kích cỡ"];
            let quantity = orderProductObject["số lượng"];
            let productId = orderProductObject["id sản phẩm"];
            let productObject= getObjectByAnAttribute("Sản phẩm", "id", productId);
            let productTitle = productObject["tên sản phẩm"];
            let productPrice = productObject["giá"];
            let imageLink = getObjectByAnAttribute("Ảnh", "id", productId)["link"];
            let row =createProductRow(productId, imageLink, productTitle, size, quantity,productPrice);
            table.insertAdjacentHTML("beforeend", row);
        });
    }
}

function getObjectByAnAttribute(tableName, attributeName, value){
    let table = JSON.parse(localStorage.getItem(tableName));
    for(let i = 0; i < table.length; i++){
        if(table[i][attributeName] === value){
            return table[i];
        }
    }
    return -1;
}

function getObjectsByAnAttribute(tableName, attributeName, value){
    let table = JSON.parse(localStorage.getItem(tableName));
    let objects = [];
    for(let i = 0; i < table.length; i++){
        if(table[i][attributeName] === value){
            objects.push(table[i]);
        }
    }
    if(objects.length > 0){
        return objects;
    }
    return -1;
}