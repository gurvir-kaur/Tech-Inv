/**
 * this function creates new rows and columns
 */
var row = 0;

function addProduct() {

    const tbody = document.getElementById("items");

    var elements = ["Item", '0€', 1, 0];

    createElement("tr", "", tbody, tr => {
        for (var i = 0; i < elements.length; ++i) {
            createElement("td", "", tr, td => {

                if (i == 1) {
                    createElement("textarea", "precio", td, td => {
                        td.textContent = elements[i];
                    });
                } else {
                    if (i == 2) {
                        createElement("textarea", "cantidad", td, td => {
                            td.textContent = elements[i];
                        });
                    } else {
                        if (i == 3) {
                            createElement("textarea", "precioSumado", td, td => {
                                td.textContent = elements[i];
                            });
                        } else {
                            createElement("textarea", "", td, td => {
                                td.textContent = elements[i];
                            });
                        }
                    }
                }

            });

        }
        createElement("td", "", tr, td => {
            createElement("i", "", td, i => {
                i.className += "fas fa-trash-alt btndelete";
                /*i.onclick = deletePro(row);*/
            });
        })
    });
    ++row;
    console.log("id created");
    precioTotal();
}

function precioTotal() {
    var precioUnidad = parseInt(document.getElementById("precio").value);
    var cantidad = parseInt(document.getElementById("cantidad").value);

    var mul = precioUnidad * cantidad;

    document.getElementById("precioSumado").value = mul;
}

function changed() {
    const eleChanged = document.getElementById("precio");

    eleChanged.addEventListener('change', (event) => {
        const resultado = precioTotal();
        resultado.textContent = `Te gusta el sabor ${event.target.value}`;
    });
}

function deletePro(row) {

    document.getElementById("items").deleteRow(row);
}

const createElement = (tagname, atr, appendTo, fn) => {
    const element = document.createElement(tagname);
    element.id = atr;
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
};