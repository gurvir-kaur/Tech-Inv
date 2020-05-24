////////////////////// MAIN FILE TO COMUNICATE THE CLASS WITH HTML ////////////////////
var user;
window.onload = function() {

    if (document.readyState === "complete") {

        // CLASS OBJECT
        user = new clsApplication(window, document);

        //Reference code numbers Randomly created !!!
        this.user.ramdom();

    }
}

////////////////////////////////////////////////////////////////////////////////////////