//-------------------------------------------------------------------------------------------
//                                  Контроллер клавиатуры
//-------------------------------------------------------------------------------------------

KEYBOARD_BUFFER = 0;
KEYBOARD_SYSTEM = 0;

KEYBOARD_BUFADR = 1027;
KEYBOARD_SYSADR = 1028;

function KEYBOARD_READ_CHAR(){
    key = KEYBOARD_BUFFER;
    KEYBOARD_BUFFER = 0;
    return key;
}

function KEYBOARD_WRITE_CHAR(char){
    if(char == "TURNON") KEYBOARD_SYSTEM = 1;
    if(char == "RESET") KEYBOARD_SYSTEM = 2;
    if(char == "DOWN") KEYBOARD_SYSTEM = 3;
    if(char == "LEFT") KEYBOARD_SYSTEM = 4;
    if(char == "RIGHT") KEYBOARD_SYSTEM = 5;
    if(char == "ENTER") KEYBOARD_SYSTEM = 6;

    KEYBOARD_BUFFER = CharConverter = CharConverter(char)+1;  
}

function KEYBOARD_READ_SYS(){
    key = KEYBOARD_BUFFER;
    KEYBOARD_BUFFER = 0;
    return key;
}

function KEYBOARD_WRITE_SYS(char){
    if(char == "TURNON") KEYBOARD_SYSTEM = 1;
    if(char == "RESET") KEYBOARD_SYSTEM = 2;
    if(char == "DOWN") KEYBOARD_SYSTEM = 3;
    if(char == "LEFT") KEYBOARD_SYSTEM = 4;
    if(char == "RIGHT") KEYBOARD_SYSTEM = 5;
    if(char == "ENTER") KEYBOARD_SYSTEM = 6;
}
