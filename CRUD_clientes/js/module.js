/**
 * function to create new database
 * @param {String} dbname , Database's name
 * @param {table} table , table object
 */
function clientsdb(dbname, table) {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();

    return db;
}

// insert function
function bulkcreate(dbtable, data) {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log("Object inserted");
    } else {
        console.log("Please provide details...")
    }
    return flag;
};

// validation

const empty = object => {
    let flag = false;

    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true
        } else {
            flag = false;
        }
    }
    return flag;
};

/**
 * to get data from database
 * @param {object} dbtable 
 * @param {function} pfunction 
 */
/*function getData(dbtable, pfunction) {
    let index = 0;
    let object = {};

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
                object = SortObject(table);
                pfunction(obj, index++);
            })
        } else {
            pfunction(0);
        }
    });
};*/
const getData = (dbname, fn) => {
    let index = 0;
    let object = {};
    dbname.count(count => {
        // count rows in the table using count method
        if (count) {
            dbname.each(table => {
                // table => return the table object data
                // to arrange order we are going to create for in loop
                object = SortObject(table);
                fn(object, index++); // call function with data argument
            });
        } else {
            fn(0);
        }
    });
};

/**
 * function created to sort object
 * @param {*} pObject 
 */
function SortObject(pObject) {
    let object = {};
    object = {
        id: pObject.id,
        name: pObject.name,
        category: pObject.category,
        price: pObject.price
    }

    //returns sorted object
    return object;
};

//if a function returns another funtion as a parameter 
//then this funtion is called higher order function
const createElement = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
};

export default clientsdb;
export {
    bulkcreate,
    getData,
    SortObject,
    createElement
}