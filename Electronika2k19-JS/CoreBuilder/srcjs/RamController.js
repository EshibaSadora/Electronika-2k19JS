//-------------------------------------------------------------------------------------------
//                              Контроллер оперативной памяти  
//-------------------------------------------------------------------------------------------
/*
 Память простроенна К565РУ7
 Адреса ячеек с 4100 до 4355
 Адрес Выбора страницы памяти в 4096 адресе 
 Всего 256 страниц по 256 байт (65КБ)
*/

var  RAM_LISTADR = 4096;
var  RAM_LIST = 0;
var  RAM_MAXLIST = 255;

var RAM_STARTADR = 4100;
var RAM_ENDADR = 4355;

class RamListObj{
    constructor(){
        this.RAM_BUFFER = new Array(256);
        for(var i = 0; i<256;i++)this.RAM_BUFFER[i] = 0;
    }
    read(ADDR){
        console.log("DEBUG::READFROM_RAM " + ADDR +","+ this.RAM_BUFFER[ADDR]);
        return this.RAM_BUFFER[ADDR];
    }
    write(ADDR,VALUE){
        console.log("DEBUG::WRITE_TO_RAM " + ADDR + "," + VALUE);
        this.RAM_BUFFER[ADDR] = VALUE;
    }
}

K565PY7 = new Array();

function RAM_RESET(){
    RAM_LIST = 0;
    K565PY7 = new Array();
    
    for(var i = 0; i<256;i++){
        K565PY7.push(new RamListObj()); 
    }
}