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
     * Esta función lleva el control de verificación de nombre de usuario. 
     */
    LoginUser() {

        var tusername = this.GetScreenValue('user_name');

        if (tusername.length > 0) {
            if (tusername.length > 4) {
                if (this.GetScreenValue('enter_OTP') > 0) {
                    if (this.Validate_REF_CODE() == true) {
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
     * La función LoginPassword verifica la contraseña.
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
     * cambio de ventanas dentro de la aplicación 
     * @param {pantalla} pScreen 
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
     * Validación de código de referencia 
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
     * función para crear numeros aleatorios. 
     */
    ramdom() {

        for (var i = 1; i < 6; i++) {
            var ran = Math.floor(Math.random() * 8);
            this.SetScreenValue(i, ran);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * writes the clicked button's value in input
     * @param {button number} pi 
     */
    writeCodeNumber(pi) {

        if (this.GetScreenValue("enter_OTP") != " ") {
            var tmp = this.GetScreenValue("enter_OTP");
            tmp = tmp + this.GetScreenValue(pi);
            this.SetScreenValue("enter_OTP", tmp);
        } else {
            console.log(pi);
            this.SetScreenValue("enter_OTP", this.GetScreenValue(pi));
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * recoje el valor ded elemento.
     * @param {nombre de elemento} pFieldName 
     */
    GetScreenValue(pFieldName) {
        var tS = this.doc.getElementById(pFieldName).value;
        return tS;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Asigna un nuevo valor al dicho elemento.
     * @param {nombre de elemento} pFieldName 
     * @param {valor} pValue 
     */
    SetScreenValue(pFieldName, pValue) {

        if (pValue != " ") {
            this.doc.getElementById(pFieldName).value = pValue;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Genera mensages de error.
     * @param {mensage} pMessage 
     */
    GenerateScreenErr(pMessage) {
        console.log('Error message ' + pMessage);
        alert(pMessage);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    Toggle() {
        var temp = document.getElementById("password");
        if (temp.type === "password") {
            temp.type = "text";
        } else {
            temp.type = "password";
        }
    }

}