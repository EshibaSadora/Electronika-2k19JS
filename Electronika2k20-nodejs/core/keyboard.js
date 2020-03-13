//-------------------------------------------------------------------------------------------
//                                  Контроллер клавиатуры
//-------------------------------------------------------------------------------------------

var KEYBOARD_BUFFER = 0;
var KEYBOARD_SYSTEM = 0;

KEYBOARD_BUFADR = 1027;
KEYBOARD_SYSADR = 1028;

var KEYBOARD_KEYPUSH = false;

function KEYBOARD_READ_CHAR(){
    key = KEYBOARD_BUFFER;
    KEYBOARD_BUFFER = 0;
    return key;
}

function KEYBOARD_UPDATE(){
    
    if(KEYBOARD_KEYPUSH == true){
        console.log(KEYBOARD_KEYPUSH);

        if(KEYBOARD_BUFFER == "TURNON") KEYBOARD_SYSTEM = 1;
        if(KEYBOARD_BUFFER == "RESET") KEYBOARD_SYSTEM = 2;
        if(KEYBOARD_BUFFER == "DOWN") KEYBOARD_SYSTEM = 3;
        if(KEYBOARD_BUFFER == "LEFT") KEYBOARD_SYSTEM = 4;
        if(KEYBOARD_BUFFER == "RIGHT") KEYBOARD_SYSTEM = 5;
        if(KEYBOARD_BUFFER == "ENTER") KEYBOARD_SYSTEM = 6;

        console.log("KEYBOARD_UPDATE::KEYBOARD_SYSTEM = " + KEYBOARD_SYSTEM);

        KEYBOARD_BUFFER = CharConverter(KEYBOARD_BUFFER)+1;

        console.log("KEYBOARD_UPDATE::KEYBOARD_BUFFER = " + KEYBOARD_BUFFER);
        

    }

    KEYBOARD_KEYPUSH = false;
    console.log(KEYBOARD_KEYPUSH);
}

function KEYBOARD_WRITE_CHAR(char){
    console.log("KEYBOARD::WRITE CHAR - " + char);
    KEYBOARD_KEYPUSH = true;
    KEYBOARD_BUFFER = char;

    console.log(KEYBOARD_KEYPUSH);
    //KEYBOARD_BUFFER = CharConverter(char)+1;  
}

function KEYBOARD_READ_SYS(){
    key = KEYBOARD_SYSTEM;
    KEYBOARD_SYSTEM = 0;
    return key;
}

/*
function KEYBOARD_WRITE_SYS(char){
    if(char == "TURNON") KEYBOARD_SYSTEM = 1;
    if(char == "RESET") KEYBOARD_SYSTEM = 2;
    if(char == "DOWN") KEYBOARD_SYSTEM = 3;
    if(char == "LEFT") KEYBOARD_SYSTEM = 4;
    if(char == "RIGHT") KEYBOARD_SYSTEM = 5;
    if(char == "ENTER") KEYBOARD_SYSTEM = 6;
}
*/
