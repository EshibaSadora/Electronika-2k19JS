//-------------------------------------------------------------------------------------------
//                                  Контроллер памяти
//-------------------------------------------------------------------------------------------




function MC_READ(ADDRES){
    //Если адрес ram
    if(ADDRES >=RAM_STARTADR & ADDRES < RAM_ENDADR){
        return K565PY7[RAM_LIST].read(ADDRES);
    }
    //Внеешний стек
    if(ADDRES == OUT_STECK_ADDR){ return OUT_STECK_POP();}
    //Видео
    if(ADDRES == VIDEO_COMMAND_ADR){ return 0; }
    //Символьная клавиатура
    if(ADDRES == KEYBOARD_BUFADR){return KEYBOARD_READ_CHAR();}
    //Доп клавиатура
    if(ADDRES == KEYBOARD_SYSADR){return KEYBOARD_READ_SYS();}

    return 'ERR';
}

function MC_WRITE(ADDRES,VALAUE){

    //Если адрес ram
    if(ADDRES >=RAM_STARTADR & ADDRES < RAM_ENDADR){
        K565PY7[RAM_LIST].write(ADDRES, VALAUE);
    }
    //Внеешний стек
    if(ADDRES == OUT_STECK_ADDR){OUT_STECK_PUSH(VALAUE);}
    //Видео
    if(ADDRES == VIDEO_COMMAND_ADR){VIDEO_COMMAND = VALAUE;}
}


OUT_STECK = new Array();

OUT_STECK_ADDR = 12300;

function OUT_STECK_PUSH(value){
    if(OUT_STECK_COUNT>0){
        console.log("DEBUG::OUT_STECK PUSH " + value);
        OUT_STECK.push(value);
        OUT_STECK_COUNT = OUT_STECK_COUNT - 1;
    }else{
        alert("Error переполнение внешнего  стека!");
    }
}

function OUT_STECK_POP(){
    if(OUT_STECK_COUNT<=2048){
        return OUT_STECK.pop();
    }else{
        return 0;
    }
}
