import productdb, {
    bulkcreate,
    getData,
    createElement,
    SortObject

} from './module.js';

//window onload event
window.onload = () => {
    textID(productid);

}

function textID(textboxid) {
    getData(db.products, data => {
        textboxid.value = data.id + 1 || 1;
    })
    table();
}

let db = productdb("Productdb", {
    products: '++id, name, category, price'
});

const noDataFound = document.getElementById("notfound");

// input tags
const productid = document.getElementById("productID");
const productName = document.getElementById("productName");
const category = document.getElementById("category");
const price = document.getElementById("price");

// creating buttons -- create, update and delete
const btncreate = document.getElementById("btn-create");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// event listerner for create button
btncreate.onclick = (event) => {
    // insert values
    let flag = bulkcreate(db.products, {
        name: productName.value,
        category: category.value,
        price: price.value
    });
    // reset textbox values
    productName.value = category.value = price.value = "";

    getData(db.products, (data) => {
        productid.value = data.id + 1 || 1;
    });

    table();
};

btnupdate.onclick = () => {
    const id = parseInt(productid.value || 0);
    if (id) {
        // call dexie update method
        db.products.update(id, {
            name: productName.value,
            category: category.value,
            price: price.value
        }).then((updated) => {
            let get = updated ? `data updated` : `couldn't update data`;
            table();
            //let get = updated ? true : false;
            // display message
            //let updatemsg = document.querySelector(".updatemsg");
            //getMsg(get, updatemsg);

            //proname.value = seller.value = price.value = "";
            console.log(get);
        })
    } else {
        console.log(`Please Select id: ${id}`);
    }
}

// delete all
btndelete.onclick = () => {
    db.delete();
    db = productdb("Productdb", {
        products: '++id, name, category, price'
    });
    db.open();
    table();
}

/**
 * this function creates new rows and columns
 */
function table() {

    const tbody = document.getElementById("tbody");

    //removes all the child created before and avoid duplicating values
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.products, (data) => {
        console.log("yes", data);
        if (data) {
            createElement("tr", tbody, tr => {
                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data.price === data[value] ? `${data[value]}€` : data[value];
                    })
                }

                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-edit btnedit";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = editbtn;

                    });
                })
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-trash-alt btndelete";
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = deletebtn;
                    });
                })
            });
        } else {
            noDataFound.textContent = "No data found in the Database."
        }
    })
}

/**
 * to edit data 
 * @param {*} event 
 */
function editbtn(event) {
    let id = parseInt(event.target.dataset.id);

    //to find the type of element we can use 
    //here I have used "typeof" to find the type of id element
    //console.log(typeof id);


    db.products.get(id, data => {
        //console.log(data);

        productid.value = data.id || 0;
        productName.value = data.name || "";
        category.value = data.category || "";
        price.value = data.price || "";
    })
}

function deletebtn() {
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();

}