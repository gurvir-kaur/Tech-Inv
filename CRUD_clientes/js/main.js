import clientsdb, {
    bulkcreate,
    getData,
    createElement,
    SortObject

} from './module.js';

//window onload event
window.onload = () => {
    textID(clientid);

}

/**
 * showa the id on the screen
 * @param {*} textboxid 
 */
function textID(textboxid) {
    getData(db.clients, data => {
        textboxid.value = data.id + 1 || 1;
    })
    table();
}

let db = clientsdb("Clientsdb", {
    clients: '++id, name, surname, address'
});

const noDataFound = document.getElementById("notfound");

// input tags
const clientid = document.getElementById("clientid");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const address = document.getElementById("address");

// creating buttons -- create, update and delete
const btncreate = document.getElementById("btn-create");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

// event listerner for create button
btncreate.onclick = (event) => {
    // insert values
    let flag = bulkcreate(db.clients, {
        name: name.value,
        surname: surname.value,
        address: address.value
    });
    // reset textbox values
    name.value = surname.value = address.value = "";

    getData(db.clients, (data) => {
        clientid.value = data.id + 1 || 1;
    });

    table();
};

btnupdate.onclick = () => {
    const id = parseInt(clientid.value || 0);
    if (id) {
        // call dexie update method
        db.clients.update(id, {
            name: name.value,
            surname: surname.value,
            address: address.value
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
    db = clientsdb("Clientsdb", {
        clients: '++id, name, surname, address'
    });
    db.open();
    table();
}

/**
 * this function is used to create new rows and columns
 */
function table() {

    const tbody = document.getElementById("tbody");

    //removes all the child created before and avoid duplicating values
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.clients, (data) => {
        console.log("yes", data);
        if (data) {
            createElement("tr", tbody, tr => {
                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data[value];
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

        clientid.value = data.id || 0;
        name.value = data.name || "";
        surname.value = data.surname || "";
        address.value = data.address || "";
    })
}

/**
 * deletes one item
 */
function deletebtn() {
    let id = parseInt(event.target.dataset.id);
    db.clients.delete(id);
    table();

}


//////////////////////////////////////////////////////////////////////////////