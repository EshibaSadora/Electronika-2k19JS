//-------------------------------------------------------------------------------------------
//                                  Выполнение команд
//-------------------------------------------------------------------------------------------

//MOV 1
//ADC 2
//MUL 3
//DIV 4
//INC 5
//CP 6
//DEC 7
//JMP 8
//CALL 9
//RET 10

//REF VAR 0  - прямая адресация
//REF AL  1
//REF AH  2
//REF BL  3
//REF BH  4
//REF CL  5
//REF CH  6
//REF DL  7
//REF DH  8
//REF AX  9 
//REF BX  10
//REF CX  11
//REF DX  12
//REF RL  13
//REF RH  14
//REF RX  15



function DoCmd(command){
    command = command.replace(",",""); //Выкидываем ","
    opperands = command.split(" "); //Делим команду на операнды
    command_name = opperands[0];  

    if(command_name=="MOV"){    
        var_to_write = Number(GetRef(opperands[2]));
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }

    if(command_name=="ADD"){
        var_to_write = Number(GetRef(opperands[1])) + Number(GetRef(opperands[2]));
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }

    if(command_name=="ADC"){ 
        var_to_write = Number(GetRef(opperands[1])) - Number(GetRef(opperands[2]));
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }

    if(command_name=="MUL"){
        var_to_write = Number(GetRef(opperands[1])) * Number(GetRef(opperands[2]));
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="INC"){
        var_to_write = Number(GetRef(opperands[1])) + Number(1);
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="DEC"){
        var_to_write = Number(GetRef(opperands[1])) - Number(1);
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="DIV"){
        raznost = Number(GetRef(opperands[1])) / Number(GetRef(opperands[2]));
        ostatok = Number(GetRef(opperands[1])) % Number(GetRef(opperands[2]));
        SET_REG_DL(raznost);
        SET_REG_DH(ostatok);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="PUSH"){
        var_to_write = Number(GetRef(opperands[1]));
        CPU_STECK_PUSH(var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="POP"){
        var_to_write = CPU_STECK_POP();
        SetRef(opperands[1],var_to_write);
        PROGRAM[CPU_REG_PC].SC++;
    }
    if(command_name=="CALL"){
        CPU_STECK_PUSH(CPU_REG_PC);
        call_f = opperands[1];
        for(i = 0; i < PROGRAM.length;i++){
            if(PROGRAM[i].name == call_f){
                CPU_REG_PC = i;
                PROGRAM[i].SC = 0;
            }
        }
    }
    if(command_name=="CALLF"){
        call_f = opperands[1];
        flag =  Number(GetRef(opperands[2]));
        if(GET_FLAG(flag)==true){
            CPU_STECK_PUSH(CPU_REG_PC);
            for(i = 0; i < PROGRAM.length;i++){
                if(PROGRAM[i].name == call_f){
                    CPU_REG_PC = i;
                    PROGRAM[i].SC = 0;
                }
            }
        }
        else{
            PROGRAM[CPU_REG_PC].SC++;
        }

    } 

    if(command_name=="RETF"){
        flag =  Number(GetRef(opperands[1]));
        if(GET_FLAG(flag)==true){
            CPU_REG_PC = CPU_STECK_POP();
            PROGRAM[CPU_REG_PC].SC++;
        }
        else{
            PROGRAM[CPU_REG_PC].SC++;
        }
    }

    
    if(command_name=="RET"){
        CPU_REG_PC = CPU_STECK_POP();
        PROGRAM[CPU_REG_PC].SC++;
    }

    if(command_name=="CP"){
        RESET_FLAG();
        value0 = Number(GetRef(opperands[1]));
        value1 = Number(GetRef(opperands[2]));
        if(value0==value1)SET_FLAG5();
        if(value0>value1)SET_FLAG3();
        if(value0<value1)SET_FLAG4();
        PROGRAM[CPU_REG_PC].SC++;
    }

    if(command_name=="RES"){
        CPU_RESET();
    }

    if(command_name=="RESF"){
        flag =  Number(GetRef(opperands[1]));
        if(GET_FLAG(flag)==true){
            CPU_RESET();
        }
        else{
            PROGRAM[CPU_REG_PC].SC++;
        }
    }
}

VIRTUAL_COMMANDS = new Array();
VIRTUAL_COMMANDS = ["PRINTLN","PRINT"];

function SetRef(opperand,value){

    finded =  new Boolean(false);

    if(opperand.includes("\'")){
        finded = true;
    }
       
    if(opperand.includes("[")){
        opperand = opperand.replace("[","");
        opperand = opperand.replace("]","");

        regsize = GetRegSize(opperand);

        if(regsize == 1){
            RESET_FLAG();
            if(value > 255){
                SET_FLAG1();
                value = value % 256;
            }
            if(value == 0)SET_FLAG0();
            if(value % 2 == 0)SET_FLAG2();
        }

        if(regsize == 2){
            RESET_FLAG();
            if(value > 0xFFFF){
                SET_FLAG1();
                value = value % 0xFFFF;
            }
            if(value == 0)SET_FLAG0();
            if(value % 2 == 0)SET_FLAG2();
        }

        if(opperand == "AL" & finded!= true){finded = true; MC_WRITE(GET_REG_AL(),value)};
        if(opperand == "AH" & finded!= true){finded = true; MC_WRITE(GET_REG_AH(),value)};
        if(opperand == "BL" & finded!= true){finded = true; MC_WRITE(GET_REG_BL(),value)};
        if(opperand == "BH" & finded!= true){finded = true; MC_WRITE(GET_REG_BH(),value)};
        if(opperand == "CL" & finded!= true){finded = true; MC_WRITE(GET_REG_CL(),value)};
        if(opperand == "CH" & finded!= true){finded = true; MC_WRITE(GET_REG_CH(),value)};
        if(opperand == "DL" & finded!= true){finded = true; MC_WRITE(GET_REG_DL(),value)};
        if(opperand == "DH" & finded!= true){finded = true; MC_WRITE(GET_REG_DH(),value)};
        if(opperand == "AX" & finded!= true){finded = true; MC_WRITE(GET_REG_AX(),value)};
        if(opperand == "BX" & finded!= true){finded = true; MC_WRITE(GET_REG_BX(),value)};
        if(opperand == "CX" & finded!= true){finded = true; MC_WRITE(GET_REG_CX(),value)};
        if(opperand == "DX" & finded!= true){finded = true; MC_WRITE(GET_REG_DX(),value)};
        if(opperand == "RX" & finded!= true){finded = true; MC_WRITE(GET_REG_RX(),value)};
        if(opperand == "RL" & finded!= true){finded = true; MC_WRITE(GET_REG_RL(),value)};
        if(opperand == "RH" & finded!= true){finded = true; MC_WRITE(GET_REG_RH(),value)};   


        opperand = opperand.replace("$","");

        for(i=0; i < DECLARE.length;i++){
            if(DECLARE[i].name == opperand){
                finded = true;
                opperand=DECLARE[i].value;
            }
        }

        console.log("DEBUG::SetRef "+"MC_WRITE " + opperand + " " + value);

        MC_WRITE(opperand,value);

    }
    

    regsize = GetRegSize(opperand);

    if(regsize > 0){

        if(regsize == 1){
            RESET_FLAG();
            if(value > 255){
                SET_FLAG1();
                value = value % 256;
            }
            if(value == 0)SET_FLAG0();
            if(value % 2 == 0)SET_FLAG2();
        }

        if(regsize == 2){
            RESET_FLAG();
            if(value > 0xFFFF){
                SET_FLAG1();
                value = value % 0xFFFF;
            }
            if(value == 0)SET_FLAG0();
            if(value % 2 == 0)SET_FLAG2();
        }


    if(opperand == "AL" & finded!= true){SET_REG_AL(value);finded = true;}  
    if(opperand == "AH" & finded!= true){SET_REG_AH(value);finded = true;}
    if(opperand == "BL" & finded!= true){SET_REG_BL(value);finded = true;}
    if(opperand == "BH" & finded!= true){SET_REG_BH(value);finded = true;}
    if(opperand == "CL" & finded!= true){SET_REG_CL(value);finded = true;}
    if(opperand == "CH" & finded!= true){SET_REG_CH(value);finded = true;}
    if(opperand == "DL" & finded!= true){SET_REG_DL(value);finded = true;}
    if(opperand == "DH" & finded!= true){SET_REG_DH(value);finded = true;}
    if(opperand == "AX" & finded!= true){SET_REG_AX(value);finded = true;}
    if(opperand == "BX" & finded!= true){SET_REG_BX(value);finded = true;}
    if(opperand == "CX" & finded!= true){SET_REG_CX(value);finded = true;}
    if(opperand == "DX" & finded!= true){SET_REG_DX(value);finded = true;}
    if(opperand == "RX" & finded!= true){SET_REG_RX(value);finded = true;}
    if(opperand == "RL" & finded!= true){SET_REG_RL(value);finded = true;}
    if(opperand == "RH" & finded!= true){SET_REG_RH(value);finded = true;}
    
    }
    
    //TODO Ошибка чтения ссылки
}

function GetRef(opperand){
    finded =  new Boolean(false);

    //$A - Value
    //$A.VALUE - Value
    //$A.SIZE - Value
    //$A.[n] - Value of array [n]
    if(opperand.includes("$")){
        opperand = opperand.replace("$","");
        if(opperand.includes(".")){
            operands = opperand.split(".");
            if(operands.length > 1){

                if(operands[1]=="value"){
                    for(i=0; i < DECLARE.length;i++){
                        if(DECLARE[i].name == operands[0]){
                            if(!DECLARE[i].value.includes("\""))return DECLARE[i].value;
                        }
                    }
                    finded = true;
                }
                
                if(operands[1]=="SIZE"){          
                    for(i=0; i < DECLARE.length;i++){
                        if(DECLARE[i].name == operands[0]){
                            word = DECLARE[i].value;
                            word = word.replace("\"","").replace("\"",""); 
                            return word.length;
                        }
                    }
                    finded = true;
                }

                if(operands[1].includes("[")){
                    operands[1] = operands[1].replace("[","");
                    operands[1] = operands[1].replace("]","");

                    for(i=0; i < DECLARE.length;i++){

                        if(DECLARE[i].name == operands[0]){                 

                            if(!DECLARE[i].value.includes("\"") ){                        
                            return DECLARE[i].value[operands[1]];
                            }
                            else{
                                
                                word = DECLARE[i].value;
                                word = word.replace("\"","").replace("\"","");     

                                val = operands[1];

                                if(val == "AL")val = GET_REG_AL();
                                if(val == "AH")val = GET_REG_AH();
                                if(val == "BL")val = GET_REG_BL();
                                if(val == "BH")val = GET_REG_BH();
                                if(val == "CL")val = GET_REG_CL();
                                if(val == "CH")val = GET_REG_CH();
                                if(val == "DL")val = GET_REG_DL();
                                if(val == "DH")val = GET_REG_DH();
                                if(val == "AX")val = GET_REG_AX();
                                if(val == "BX")val = GET_REG_BX();
                                if(val == "CX")val = GET_REG_CX();
                                if(val == "DX")val = GET_REG_DX();
                                if(val == "RX")val = GET_REG_RX();
                                if(val == "RL")val = GET_REG_RL();
                                if(val == "RH")val = GET_REG_RH();

                                return CharConverter(word[val])+1;
                            }
                        }
                    }



                    finded = true;
                }
            }

        }else{
            opperand = opperand.replace("$","");
            if(boolstring == false){
            for(i=0; i < DECLARE.length;i++){
                if(DECLARE[i].name == opperand){
                    return DECLARE[i].value;
                }
            }
            finded = true;
        }
        }
    }

    if(opperand.includes("\'")){
        opperand = opperand.replace("\'","").replace("\'","");
        val = CharConverter(opperand)+1;
        return val;
    }

    if(opperand.includes("[")){
        opperand = opperand.replace("[","");
        opperand = opperand.replace("]","");

        if(opperand == "AL" & finded!= true)return MC_READ(GET_REG_AL());
        if(opperand == "AH" & finded!= true)return MC_READ(GET_REG_AH());
        if(opperand == "BL" & finded!= true)return MC_READ(GET_REG_BL());
        if(opperand == "BH" & finded!= true)return MC_READ(GET_REG_BH());
        if(opperand == "CL" & finded!= true)return MC_READ(GET_REG_CL());
        if(opperand == "CH" & finded!= true)return MC_READ(GET_REG_CH());
        if(opperand == "DL" & finded!= true)return MC_READ(GET_REG_DL());
        if(opperand == "DH" & finded!= true)return MC_READ(GET_REG_DH());
        if(opperand == "AX" & finded!= true)return MC_READ(GET_REG_AX());
        if(opperand == "BX" & finded!= true)return MC_READ(GET_REG_BX());
        if(opperand == "CX" & finded!= true)return MC_READ(GET_REG_CX());
        if(opperand == "DX" & finded!= true)return MC_READ(GET_REG_DX());
        if(opperand == "RX" & finded!= true)return MC_READ(GET_REG_RX());
        if(opperand == "RL" & finded!= true)return MC_READ(GET_REG_RL());
        if(opperand == "RH" & finded!= true)return MC_READ(GET_REG_RH());

        return MC_READ(opperand);
    }

    if(opperand == "AL" & finded!= true)return GET_REG_AL();
    if(opperand == "AH" & finded!= true)return GET_REG_AH();
    if(opperand == "BL" & finded!= true)return GET_REG_BL();
    if(opperand == "BH" & finded!= true)return GET_REG_BH();
    if(opperand == "CL" & finded!= true)return GET_REG_CL();
    if(opperand == "CH" & finded!= true)return GET_REG_CH();
    if(opperand == "DL" & finded!= true)return GET_REG_DL();
    if(opperand == "DH" & finded!= true)return GET_REG_DH();
    if(opperand == "AX" & finded!= true)return GET_REG_AX();
    if(opperand == "BX" & finded!= true)return GET_REG_BX();
    if(opperand == "CX" & finded!= true)return GET_REG_CX();
    if(opperand == "DX" & finded!= true)return GET_REG_DX();
    if(opperand == "RX" & finded!= true)return GET_REG_RX();
    if(opperand == "RL" & finded!= true)return GET_REG_RL();
    if(opperand == "RH" & finded!= true)return GET_REG_RH();

    return opperand;
}

//Объект функции
class FUNC {
    constructor(){
        this.name = "";
        this.src = new Array;
        this.SC = 0;
    }
}

class DECL {
    constructor(){
        this.name = "";
        this.value = "";
    }
}

//Хранилище функций
PROGRAM = new Array();

//Хранилище констант
DECLARE = new Array();

//Сборка кода
function BuildProgram(){
    PROGRAM = new Array();
    src = document.getElementById("src_textbox");
    fsrc = src.value.split(":");

    src_declare = fsrc[0]; //DECALRE A = 50

    

    if(src_declare.length > 2){
        declare_list = src_declare.split(";"); 

        for(i = 0; i < declare_list.length-1;i++){
            d = new DECL();
            d.name = declare_list[i].split("=")[0];
            d.name = d.name.split(" ")[1];      
            d.value = declare_list[i].split("=")[1];
            
            if(!d.value.includes("\"")){
                d.value = d.value.replace(" ","");
            }        
           DECLARE.push(d);  
        }
    }

    for(i = 1;i < fsrc.length;i++){
        commands = fsrc[i].split("\n");
        f = new FUNC();
        f.name = commands[0];
        for(a = 1;a<commands.length;a++){
            commands[a] = commands[a].replace(", "," ");
            commands[a] = commands[a].replace(",",""); //Выкидываем ","
            commands[a] = commands[a].replace(";",""); //Выкидываем ";"
            f.src.push(commands[a]);
        }
        console.log(f);
        PROGRAM.push(f);  
    };
}