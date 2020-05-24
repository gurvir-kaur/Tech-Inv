class clsApplication {

    /**
     * Parameters from HTML 
     * @param {window} pwin 
     * @param {document} pdoc 
     */
    constructor(pwin, pdoc) {

        console.log("clsApplication ACTIVE")
        this.win = pwin;
        this.doc = pdoc;


        //password pattern 
        this.password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;;


        //INICIALIZATION 
        this.init();

    }

    ////////////////////////////////////////////////////////////////////////////////////////
    init() {}

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * THIS FUNCTION VERIFIES THE USERNAME
     */
    LoginUser() {

        var tusername = this.GetScreenValue('user_name');

        if (tusername.length > 0) {
            if (tusername.length > 4) {
                if (this.GetScreenValue('enter_OTP') > 0) {
                    if (this.Validate_REF_CODE() == true) {

                        //if everything is OK then it navigates to necxt screen
                        this.NavigateTo('passwordScreen');

                    } else {
                        this.GenerateScreenErr("Reference Code Wrong!");
                    }
                } else {
                    this.GenerateScreenErr("Reference Code missing.");
                }
            } else {
                this.GenerateScreenErr("Username must have 4 chatacters.");
            }
        } else {
            this.GenerateScreenErr("Username missing");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * THIS FUNCTION VERIFIES THE PASSWORD PATTERN
     */
    LoginPassword() {
        var tpassword = this.GetScreenValue('password');

        if (tpassword.match(this.password)) {
            this.NavigateTo('home');

            return true
        } else {
            this.GenerateScreenErr("Incorrect format of password");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * TO CHANGE THE SCREEN 
     * @param {screen} pScreen 
     */
    NavigateTo(pScreen) {
        if (pScreen == 'home') {
            this.win.location.href = "../CRUD_productos/index.html";
        }

        if (pScreen == 'passwordScreen') {
            this.win.location.href = "../html/password.html";
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * VALIDATES THE REFERENCE CODE 
     */
    Validate_REF_CODE() {

        var temporal = this.GetScreenValue("enter_OTP");
        var refCode = this.GetScreenValue(1);
        for (var i = 2; i < 5; ++i) {
            refCode += this.GetScreenValue(i);
        }

        if (refCode == temporal) return true;
        else return false;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * TO CREATE RANDOM NUMBERS 
     */
    ramdom() {

        for (var i = 1; i < 6; i++) {
            var ran = Math.floor(Math.random() * 8);
            this.SetScreenValue(i, ran);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * WRITES THE VALUE OF THE BUTTON WHICH IS CLICKED
     * @param {button number} pi 
     */
    writeCodeNumber(pi) {

        if (this.GetScreenValue("enter_OTP") != " ") {
            var tmp = this.GetScreenValue("enter_OTP");
            tmp = tmp + this.GetScreenValue(pi);
            this.SetScreenValue("enter_OTP", tmp);
        } else {
            this.SetScreenValue("enter_OTP", this.GetScreenValue(pi));
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * GETS THE VALUE OF THE ELEMENT
     * @param {element name} pFieldName 
     */
    GetScreenValue(pFieldName) {
        var tS = this.doc.getElementById(pFieldName).value;
        return tS;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * ASSIGNES NEW VALUE THE SELECTED ELEMENT
     * @param {element name} pFieldName 
     * @param {value} pValue 
     */
    SetScreenValue(pFieldName, pValue) {

        if (pValue != " ") {
            this.doc.getElementById(pFieldName).value = pValue;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * ERROR GENERATOR
     * @param {message} pMessage 
     */
    GenerateScreenErr(pMessage) {
        alert(pMessage);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * TO HIDE OR SHOW THE PASSWORD
     */
    Toggle() {
        var temp = document.getElementById("password");
        if (temp.type === "password") {
            temp.type = "text";
        } else {
            temp.type = "password";
        }
    }

}