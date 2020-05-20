var user;
window.onload = function() {

    console.log(document.readyState, ", Main Index Class");

    if (document.readyState === "complete") {
        console.log("user login created");

        user = new clsApplication(window, document);
        //Reference code numbers Randomly created !!!
        this.user.ramdom();

    }
}

////////////////////////////////////////////////////////////////////////////////////////