//-------------------------------------------------------------------------------------------
//                                  Эмуляция процессора
//-------------------------------------------------------------------------------------------

//    Процессор 8 битный, имеет 16Bit адресную шину и 8 бит шину данных
//    Весь програмный код хранится в псевдо области, размером 4Кб 0-4095
//    К которой нет оступа из кода пользователя
//    Озу находится в 4096-5120‬
//    Кнопка клавиатуры в 5200
//    Дисплей имеет свой подпроцессор, для обработки изображения его адреса ввода-вывода 
//    в 5300-5304
//    5300 - Позиция курсора по X
//    5301 - Позиция курсора по Y
//    5302 - Значение (значение сбрасывается в 0, при отображении)
//    5303 - Команда

// Регистры 
// AL,AH,BL,BH,CL,CH,DL,DH - 8bit Общего назначения
// AX,BX,CX,DX - 16 bit Общего назначения
// PC - Програмный счётчик, указывае где сейчас строка в коде
// SP - Счётчик стека (ПОКА НЕ ЮЗАЮ)


//F0 - Флаг 0
//F1 - флаг переполнения
//F2 - флаг чётности
//F3 - флаг >
//F4 - Флаг <
//F5 - флаг =
//F6
//F7

CPU_REG_PC = 0;
CPU_REG_SP = 0;
CPU_REG_SC = 0;

CPU_REG_AL = 0;
CPU_REG_AH = 0;
CPU_REG_BL = 0;
CPU_REG_BH = 0;
CPU_REG_CL = 0;
CPU_REG_CH = 0;
CPU_REG_DL = 0;
CPU_REG_DH = 0;

CPU_REG_RL = 0;
CPU_REG_RH = 0;
CPU_REG_RX = 0;

CPU_REG_F = 0b00000000;

CPU_STECK_COUNT = 255;
CPU_STECK = new Array();

function CPU_STECK_PUSH(value){
    if(CPU_STECK_COUNT>0){
        CPU_STECK.push(value);
        CPU_STECK_COUNT = CPU_STECK_COUNT - 1;
    }else{
        alert("Error переполнение стека!");
    }
}

function CPU_STECK_POP(){
    if(CPU_STECK_COUNT<=255){
        return CPU_STECK.pop();
    }else{
        alert("Стек пуст!");
    }
}


function GET_REG_AL(){return CPU_REG_AL}
function GET_REG_AH(){return CPU_REG_AH}
function GET_REG_BL(){return CPU_REG_BL}
function GET_REG_BH(){return CPU_REG_BH}
function GET_REG_CL(){return CPU_REG_CL}
function GET_REG_CH(){return CPU_REG_CH}
function GET_REG_DL(){return CPU_REG_DL}
function GET_REG_DH(){return CPU_REG_DH}

function GET_REG_AX(){return Byte2ToShort(CPU_REG_AH,CPU_REG_AL)}
function GET_REG_BX(){return Byte2ToShort(CPU_REG_BH,CPU_REG_BL)}
function GET_REG_CX(){return Byte2ToShort(CPU_REG_CH,CPU_REG_CL)}
function GET_REG_DX(){return Byte2ToShort(CPU_REG_DH,CPU_REG_DL)}

function GET_REG_PC(){return CPU_REG_PC}
function GET_REG_SP(){return CPU_REG_SP}
function GET_REG_SC(){return CPU_REG_SC}

function GET_REG_RL(){return CPU_REG_RL}
function GET_REG_RH(){return CPU_REG_RH}
function GET_REG_RX(){return Byte2ToShort(CPU_REG_RH,CPU_REG_RL)}

function GET_FLAG0(){if(CPU_REG_F & 0b00000001){return true}else return false}
function GET_FLAG1(){if(CPU_REG_F & 0b00000010){return true}else return false}
function GET_FLAG2(){if(CPU_REG_F & 0b00000100){return true}else return false}
function GET_FLAG3(){if(CPU_REG_F & 0b00001000){return true}else return false}
function GET_FLAG4(){if(CPU_REG_F & 0b00010000){return true}else return false}
function GET_FLAG5(){if(CPU_REG_F & 0b00100000){return true}else return false}
function GET_FLAG6(){if(CPU_REG_F & 0b01000000){return true}else return false}
function GET_FLAG7(){if(CPU_REG_F & 0b10000000){return true}else return false}

function GET_FLAG(value){
    if(value==0)return GET_FLAG0();
    if(value==1)return GET_FLAG1();
    if(value==2)return GET_FLAG2();
    if(value==3)return GET_FLAG3();
    if(value==4)return GET_FLAG4();
    if(value==5)return GET_FLAG5();
    if(value==6)return GET_FLAG6();
    if(value==7)return GET_FLAG7();
}


function SET_REG_AL(value){CPU_REG_AL = value}
function SET_REG_AH(value){CPU_REG_AH = value}
function SET_REG_BL(value){CPU_REG_BL = value}
function SET_REG_BH(value){CPU_REG_BH = value}
function SET_REG_CL(value){CPU_REG_CL = value}
function SET_REG_CH(value){CPU_REG_CH = value}
function SET_REG_DL(value){CPU_REG_DL = value}
function SET_REG_DH(value){CPU_REG_DH = value}

function SET_REG_AX(value){v = ShortTo2Byte(value); CPU_REG_AH = v[0]; CPU_REG_AL[1]}
function SET_REG_BX(value){v = ShortTo2Byte(value); CPU_REG_BH = v[0]; CPU_REG_BL[1]}
function SET_REG_CX(value){v = ShortTo2Byte(value); CPU_REG_CH = v[0]; CPU_REG_CL[1]}
function SET_REG_DX(value){v = ShortTo2Byte(value); CPU_REG_DH = v[0]; CPU_REG_DL[1]}

function SET_REG_RL(value){CPU_REG_RL = value}
function SET_REG_RH(value){CPU_REG_RH = value}

function RESET_FLAG(){CPU_REG_F = 0b00000000;}
function SET_FLAG0(){CPU_REG_F = CPU_REG_F | 0b00000001};
function SET_FLAG1(){CPU_REG_F = CPU_REG_F | 0b00000010};
function SET_FLAG2(){CPU_REG_F = CPU_REG_F | 0b00000100};
function SET_FLAG3(){CPU_REG_F = CPU_REG_F | 0b00001000};
function SET_FLAG4(){CPU_REG_F = CPU_REG_F | 0b00010000};
function SET_FLAG5(){CPU_REG_F = CPU_REG_F | 0b00100000};
function SET_FLAG6(){CPU_REG_F = CPU_REG_F | 0b01000000};
function SET_FLAG7(){CPU_REG_F = CPU_REG_F | 0b10000000};

function CPU_RESET(){

    CPU_STECK = new Array();
    OUT_STECK = new Array();
    CPU_STECK_COUNT = 255;
    OUT_STECK_COUNT = 2048;

    RESET_FLAG();

    CPU_REG_PC = 0;
    CPU_REG_SP = 0;
    CPU_REG_AL = 0;
    CPU_REG_AH = 0;
    CPU_REG_BL = 0;
    PU_REG_BH = 0;
    CPU_REG_CL = 0;
    CPU_REG_CH = 0;
    CPU_REG_DL = 0;
    CPU_REG_DH = 0;

    CPU_REG_RL = 0;
    CPU_REG_RH = 0;
    CPU_REG_RX = 0;

    CPU_ACTIVE=1;

    VIDEO_RESET();
    RAM_RESET();
}

function REGS_RESET(){
    RESET_FLAG();



    CPU_REG_PC = 0;
    CPU_REG_SP = 0;
    CPU_REG_AL = 0;
    CPU_REG_AH = 0;
    CPU_REG_BL = 0;
    PU_REG_BH = 0;
    CPU_REG_CL = 0;
    CPU_REG_CH = 0;
    CPU_REG_DL = 0;
    CPU_REG_DH = 0;

    CPU_REG_RL = 0;
    CPU_REG_RH = 0;
    CPU_REG_RX = 0;
}

function CheckIfReg(value){
    if(value = "AL")return GET_REG_AL;
    if(value = "AH")return GET_REG_AH;
    if(value = "BL")return GET_REG_BL;
    if(value = "BH")return GET_REG_BH;
    if(value = "CL")return GET_REG_CL;
    if(value = "CH")return GET_REG_CH;
    if(value = "DL")return GET_REG_DL;
    if(value = "DH")return GET_REG_DH;
    if(value = "AX")return GET_REG_AX;
    if(value = "BX")return GET_REG_BX;
    if(value = "CX")return GET_REG_CX;
    if(value = "DX")return GET_REG_DX;
    if(value = "RL")return GET_REG_RL;
    if(value = "RH")return GET_REG_RH;
    if(value = "RX")return GET_REG_RX;
}

function GetRegSize(value){
    out = 0;
    if(value = "AL")out = 1;
    if(value = "AH")out = 1;
    if(value = "BL")out = 1;
    if(value = "BH")out = 1;
    if(value = "CL")out = 1;
    if(value = "CH")out = 1;
    if(value = "DL")out = 1;
    if(value = "DH")out = 1;
    if(value = "AX")out = 2;
    if(value = "BX")out = 2;
    if(value = "CX")out = 2;
    if(value = "DX")out = 2;
    if(value = "RL")out = 1;
    if(value = "RH")out = 1;
    if(value = "RX")out = 2;
    return out;
}

//Выполнить следующую команду CPU
//Осноной менджемент в коде
function CPU_WORK_TICK(){

    SET_REG_RL(Math.random() * (255 - 0) + 0);
    SET_REG_RH(Math.random() * (255 - 0) + 0);

    f = PROGRAM[CPU_REG_PC]; //Получаю текущую функцию
    command = f.src[f.SC]; //Получаю строку команды
    //Если указатель на строку функции улетает за колличество функций
    if(f.SC == f.src.length){
        if(CPU_REG_PC > 0){
            CPU_REG_PC = CPU_STECK_POP();}
        else{
            CPU_RESET();
            CPU_ACTIVE = 0;
        }    
    }
     DoCmd(command);
     VIDEO_DOCMD();
}

function CPU_WORK(){
    setInterval(CPU_WORK_TICK, 100);
}