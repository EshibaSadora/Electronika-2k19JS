function DoCmd(command){  command = command.replace(",",""); opperands = command.split(" "); command_name = opperands[0]; if(command_name=="MOV"){  var_to_write = Number(GetRef(opperands[2]));  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="ADD"){  var_to_write = Number(GetRef(opperands[1])) + Number(GetRef(opperands[2]));  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="ADC"){   var_to_write = Number(GetRef(opperands[1])) - Number(GetRef(opperands[2]));  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="MUL"){  var_to_write = Number(GetRef(opperands[1])) * Number(GetRef(opperands[2]));  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="INC"){  var_to_write = Number(GetRef(opperands[1])) + Number(1);  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="DEC"){  var_to_write = Number(GetRef(opperands[1])) - Number(1);  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="DIV"){  raznost = Number(GetRef(opperands[1])) / Number(GetRef(opperands[2]));  ostatok = Number(GetRef(opperands[1])) % Number(GetRef(opperands[2]));  SET_REG_DL(raznost);  SET_REG_DH(ostatok);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="PUSH"){  var_to_write = Number(GetRef(opperands[1]));  CPU_STECK_PUSH(var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="POP"){  var_to_write = CPU_STECK_POP();  SetRef(opperands[1],var_to_write);  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="CALL"){  CPU_STECK_PUSH(CPU_REG_PC);  call_f = opperands[1];  for(i = 0; i < PROGRAM.length;i++){  if(PROGRAM[i].name == call_f){ CPU_REG_PC = i; PROGRAM[i].SC = 0;  }  }  }  if(command_name=="CALLF"){  call_f = opperands[1];  flag = Number(GetRef(opperands[2]));  if(GET_FLAG(flag)==true){  CPU_STECK_PUSH(CPU_REG_PC);  for(i = 0; i < PROGRAM.length;i++){ if(PROGRAM[i].name == call_f){ CPU_REG_PC = i; PROGRAM[i].SC = 0; }  }  }  else{  PROGRAM[CPU_REG_PC].SC++;  }  } if(command_name=="RETF"){  flag = Number(GetRef(opperands[1]));  if(GET_FLAG(flag)==true){  CPU_REG_PC = CPU_STECK_POP();  PROGRAM[CPU_REG_PC].SC++;  }  else{  PROGRAM[CPU_REG_PC].SC++;  }  }  if(command_name=="RET"){  CPU_REG_PC = CPU_STECK_POP();  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="CP"){  RESET_FLAG();  value0 = Number(GetRef(opperands[1]));  value1 = Number(GetRef(opperands[2]));  if(value0==value1)SET_FLAG5();  if(value0>value1)SET_FLAG3();  if(value0<value1)SET_FLAG4();  PROGRAM[CPU_REG_PC].SC++;  }  if(command_name=="RES"){  CPU_RESET();  }  if(command_name=="RESF"){  flag = Number(GetRef(opperands[1]));  if(GET_FLAG(flag)==true){  CPU_RESET();  }  else{  PROGRAM[CPU_REG_PC].SC++;  }  }}VIRTUAL_COMMANDS = new Array();VIRTUAL_COMMANDS = ["PRINTLN","PRINT"];function SetRef(opperand,value){  finded = new Boolean(false);  if(opperand.includes("\'")){  finded = true;  }  if(opperand.includes("[")){  opperand = opperand.replace("[","");  opperand = opperand.replace("]","");  regsize = GetRegSize(opperand);  if(regsize == 1){  RESET_FLAG();  if(value > 255){ SET_FLAG1(); value = value % 256;  }  if(value == 0)SET_FLAG0();  if(value % 2 == 0)SET_FLAG2();  }  if(regsize == 2){  RESET_FLAG();  if(value > 0xFFFF){ SET_FLAG1(); value = value % 0xFFFF;  }  if(value == 0)SET_FLAG0();  if(value % 2 == 0)SET_FLAG2();  }  if(opperand == "AL" & finded!= true){finded = true; MC_WRITE(GET_REG_AL(),value)};  if(opperand == "AH" & finded!= true){finded = true; MC_WRITE(GET_REG_AH(),value)};  if(opperand == "BL" & finded!= true){finded = true; MC_WRITE(GET_REG_BL(),value)};  if(opperand == "BH" & finded!= true){finded = true; MC_WRITE(GET_REG_BH(),value)};  if(opperand == "CL" & finded!= true){finded = true; MC_WRITE(GET_REG_CL(),value)};  if(opperand == "CH" & finded!= true){finded = true; MC_WRITE(GET_REG_CH(),value)};  if(opperand == "DL" & finded!= true){finded = true; MC_WRITE(GET_REG_DL(),value)};  if(opperand == "DH" & finded!= true){finded = true; MC_WRITE(GET_REG_DH(),value)};  if(opperand == "AX" & finded!= true){finded = true; MC_WRITE(GET_REG_AX(),value)};  if(opperand == "BX" & finded!= true){finded = true; MC_WRITE(GET_REG_BX(),value)};  if(opperand == "CX" & finded!= true){finded = true; MC_WRITE(GET_REG_CX(),value)};  if(opperand == "DX" & finded!= true){finded = true; MC_WRITE(GET_REG_DX(),value)};  if(opperand == "RX" & finded!= true){finded = true; MC_WRITE(GET_REG_RX(),value)};  if(opperand == "RL" & finded!= true){finded = true; MC_WRITE(GET_REG_RL(),value)};  if(opperand == "RH" & finded!= true){finded = true; MC_WRITE(GET_REG_RH(),value)};  opperand = opperand.replace("$","");  for(i=0; i < DECLARE.length;i++){  if(DECLARE[i].name == opperand){ finded = true; opperand=DECLARE[i].value;  }  }  console.log("DEBUG::SetRef "+"MC_WRITE " + opperand + " " + value);  MC_WRITE(opperand,value);  }  regsize = GetRegSize(opperand);  if(regsize > 0){  if(regsize == 1){  RESET_FLAG();  if(value > 255){ SET_FLAG1(); value = value % 256;  }  if(value == 0)SET_FLAG0();  if(value % 2 == 0)SET_FLAG2();  }  if(regsize == 2){  RESET_FLAG();  if(value > 0xFFFF){ SET_FLAG1(); value = value % 0xFFFF;  }  if(value == 0)SET_FLAG0();  if(value % 2 == 0)SET_FLAG2();  }  if(opperand == "AL" & finded!= true){SET_REG_AL(value);finded = true;} if(opperand == "AH" & finded!= true){SET_REG_AH(value);finded = true;}  if(opperand == "BL" & finded!= true){SET_REG_BL(value);finded = true;}  if(opperand == "BH" & finded!= true){SET_REG_BH(value);finded = true;}  if(opperand == "CL" & finded!= true){SET_REG_CL(value);finded = true;}  if(opperand == "CH" & finded!= true){SET_REG_CH(value);finded = true;}  if(opperand == "DL" & finded!= true){SET_REG_DL(value);finded = true;}  if(opperand == "DH" & finded!= true){SET_REG_DH(value);finded = true;}  if(opperand == "AX" & finded!= true){SET_REG_AX(value);finded = true;}  if(opperand == "BX" & finded!= true){SET_REG_BX(value);finded = true;}  if(opperand == "CX" & finded!= true){SET_REG_CX(value);finded = true;}  if(opperand == "DX" & finded!= true){SET_REG_DX(value);finded = true;}  if(opperand == "RX" & finded!= true){SET_REG_RX(value);finded = true;}  if(opperand == "RL" & finded!= true){SET_REG_RL(value);finded = true;}  if(opperand == "RH" & finded!= true){SET_REG_RH(value);finded = true;}  }  }function GetRef(opperand){  finded = new Boolean(false); if(opperand.includes("$")){  opperand = opperand.replace("$","");  if(opperand.includes(".")){  operands = opperand.split(".");  if(operands.length > 1){ if(operands[1]=="value"){ for(i=0; i < DECLARE.length;i++){ if(DECLARE[i].name == operands[0]){   if(!DECLARE[i].value.includes("\""))return DECLARE[i].value; } } finded = true; }   if(operands[1]=="SIZE"){  for(i=0; i < DECLARE.length;i++){ if(DECLARE[i].name == operands[0]){   word = DECLARE[i].value;   word = word.replace("\"","").replace("\"","");  return word.length; } } finded = true; } if(operands[1].includes("[")){ operands[1] = operands[1].replace("[",""); operands[1] = operands[1].replace("]",""); for(i=0; i < DECLARE.length;i++){ if(DECLARE[i].name == operands[0]){   if(!DECLARE[i].value.includes("\"") ){    return DECLARE[i].value[operands[1]];   }   else{   word = DECLARE[i].value;   word = word.replace("\"","").replace("\"","");    val = operands[1];   if(val == "AL")val = GET_REG_AL();   if(val == "AH")val = GET_REG_AH();   if(val == "BL")val = GET_REG_BL();   if(val == "BH")val = GET_REG_BH();   if(val == "CL")val = GET_REG_CL();   if(val == "CH")val = GET_REG_CH();   if(val == "DL")val = GET_REG_DL();   if(val == "DH")val = GET_REG_DH();   if(val == "AX")val = GET_REG_AX();   if(val == "BX")val = GET_REG_BX();   if(val == "CX")val = GET_REG_CX();   if(val == "DX")val = GET_REG_DX();   if(val == "RX")val = GET_REG_RX();   if(val == "RL")val = GET_REG_RL();   if(val == "RH")val = GET_REG_RH();   console.log("CharConverter call 1 " + word[val]);   CharConverter('a');   return CharConverter(word[val])+1;   } } } finded = true; }  }  }else{  opperand = opperand.replace("$","");  if(boolstring == false){  for(i=0; i < DECLARE.length;i++){ if(DECLARE[i].name == opperand){ return DECLARE[i].value; }  }  finded = true;  }  }  }  if(opperand.includes("\'")){  opperand = opperand.replace("\'","").replace("\'","");  console.log("CharConverter call 2" + opperand);  val = CharConverter(opperand)+1;  return val;  }  if(opperand.includes("[")){  opperand = opperand.replace("[","");  opperand = opperand.replace("]","");  if(opperand == "AL" & finded!= true)return MC_READ(GET_REG_AL());  if(opperand == "AH" & finded!= true)return MC_READ(GET_REG_AH());  if(opperand == "BL" & finded!= true)return MC_READ(GET_REG_BL());  if(opperand == "BH" & finded!= true)return MC_READ(GET_REG_BH());  if(opperand == "CL" & finded!= true)return MC_READ(GET_REG_CL());  if(opperand == "CH" & finded!= true)return MC_READ(GET_REG_CH());  if(opperand == "DL" & finded!= true)return MC_READ(GET_REG_DL());  if(opperand == "DH" & finded!= true)return MC_READ(GET_REG_DH());  if(opperand == "AX" & finded!= true)return MC_READ(GET_REG_AX());  if(opperand == "BX" & finded!= true)return MC_READ(GET_REG_BX());  if(opperand == "CX" & finded!= true)return MC_READ(GET_REG_CX());  if(opperand == "DX" & finded!= true)return MC_READ(GET_REG_DX());  if(opperand == "RX" & finded!= true)return MC_READ(GET_REG_RX());  if(opperand == "RL" & finded!= true)return MC_READ(GET_REG_RL());  if(opperand == "RH" & finded!= true)return MC_READ(GET_REG_RH());  return MC_READ(opperand);  }  if(opperand == "AL" & finded!= true)return GET_REG_AL();  if(opperand == "AH" & finded!= true)return GET_REG_AH();  if(opperand == "BL" & finded!= true)return GET_REG_BL();  if(opperand == "BH" & finded!= true)return GET_REG_BH();  if(opperand == "CL" & finded!= true)return GET_REG_CL();  if(opperand == "CH" & finded!= true)return GET_REG_CH();  if(opperand == "DL" & finded!= true)return GET_REG_DL();  if(opperand == "DH" & finded!= true)return GET_REG_DH();  if(opperand == "AX" & finded!= true)return GET_REG_AX();  if(opperand == "BX" & finded!= true)return GET_REG_BX();  if(opperand == "CX" & finded!= true)return GET_REG_CX();  if(opperand == "DX" & finded!= true)return GET_REG_DX();  if(opperand == "RX" & finded!= true)return GET_REG_RX();  if(opperand == "RL" & finded!= true)return GET_REG_RL();  if(opperand == "RH" & finded!= true)return GET_REG_RH();  return opperand;}class FUNC {  constructor(){  this.name = "";  this.src = new Array;  this.SC = 0;  }}class DECL {  constructor(){  this.name = "";  this.value = "";  }}PROGRAM = new Array();DECLARE = new Array();function BuildProgram(){  PROGRAM = new Array();  src = document.getElementById("src_textbox");  fsrc = src.value.split(":");  src_declare = fsrc[0];   if(src_declare.length > 2){  declare_list = src_declare.split(";");   for(i = 0; i < declare_list.length-1;i++){  d = new DECL();  d.name = declare_list[i].split("=")[0];  d.name = d.name.split(" ")[1];   d.value = declare_list[i].split("=")[1]; if(!d.value.includes("\"")){ d.value = d.value.replace(" ","");  } DECLARE.push(d);   }  }  for(i = 1;i < fsrc.length;i++){  commands = fsrc[i].split("\n");  f = new FUNC();  f.name = commands[0];  for(a = 1;a<commands.length;a++){  commands[a] = commands[a].replace(", "," ");  commands[a] = commands[a].replace(",","");   commands[a] = commands[a].replace(";","");   f.src.push(commands[a]);  }  console.log(f);  PROGRAM.push(f); };}CPU_REG_PC = 0;CPU_REG_SP = 0;CPU_REG_SC = 0;CPU_REG_AL = 0;CPU_REG_AH = 0;CPU_REG_BL = 0;CPU_REG_BH = 0;CPU_REG_CL = 0;CPU_REG_CH = 0;CPU_REG_DL = 0;CPU_REG_DH = 0;CPU_REG_RL = 0;CPU_REG_RH = 0;CPU_REG_RX = 0;CPU_REG_F = 0b00000000;CPU_STECK_COUNT = 255;CPU_STECK = new Array();function CPU_STECK_PUSH(value){  if(CPU_STECK_COUNT>0){  CPU_STECK.push(value);  CPU_STECK_COUNT = CPU_STECK_COUNT - 1;  }else{  alert("Error переполнение стека!");  }}function CPU_STECK_POP(){  if(CPU_STECK_COUNT<=255){  return CPU_STECK.pop();  }else{  alert("Стек пуст!");  }}function GET_REG_AL(){return CPU_REG_AL}function GET_REG_AH(){return CPU_REG_AH}function GET_REG_BL(){return CPU_REG_BL}function GET_REG_BH(){return CPU_REG_BH}function GET_REG_CL(){return CPU_REG_CL}function GET_REG_CH(){return CPU_REG_CH}function GET_REG_DL(){return CPU_REG_DL}function GET_REG_DH(){return CPU_REG_DH}function GET_REG_AX(){return Byte2ToShort(CPU_REG_AH,CPU_REG_AL)}function GET_REG_BX(){return Byte2ToShort(CPU_REG_BH,CPU_REG_BL)}function GET_REG_CX(){return Byte2ToShort(CPU_REG_CH,CPU_REG_CL)}function GET_REG_DX(){return Byte2ToShort(CPU_REG_DH,CPU_REG_DL)}function GET_REG_PC(){return CPU_REG_PC}function GET_REG_SP(){return CPU_REG_SP}function GET_REG_SC(){return CPU_REG_SC}function GET_REG_RL(){return CPU_REG_RL}function GET_REG_RH(){return CPU_REG_RH}function GET_REG_RX(){return Byte2ToShort(CPU_REG_RH,CPU_REG_RL)}function GET_FLAG0(){if(CPU_REG_F & 0b00000001){return true}else return false}function GET_FLAG1(){if(CPU_REG_F & 0b00000010){return true}else return false}function GET_FLAG2(){if(CPU_REG_F & 0b00000100){return true}else return false}function GET_FLAG3(){if(CPU_REG_F & 0b00001000){return true}else return false}function GET_FLAG4(){if(CPU_REG_F & 0b00010000){return true}else return false}function GET_FLAG5(){if(CPU_REG_F & 0b00100000){return true}else return false}function GET_FLAG6(){if(CPU_REG_F & 0b01000000){return true}else return false}function GET_FLAG7(){if(CPU_REG_F & 0b10000000){return true}else return false}function GET_FLAG(value){  if(value==0)return GET_FLAG0();  if(value==1)return GET_FLAG1();  if(value==2)return GET_FLAG2();  if(value==3)return GET_FLAG3();  if(value==4)return GET_FLAG4();  if(value==5)return GET_FLAG5();  if(value==6)return GET_FLAG6();  if(value==7)return GET_FLAG7();}function SET_REG_AL(value){CPU_REG_AL = value}function SET_REG_AH(value){CPU_REG_AH = value}function SET_REG_BL(value){CPU_REG_BL = value}function SET_REG_BH(value){CPU_REG_BH = value}function SET_REG_CL(value){CPU_REG_CL = value}function SET_REG_CH(value){CPU_REG_CH = value}function SET_REG_DL(value){CPU_REG_DL = value}function SET_REG_DH(value){CPU_REG_DH = value}function SET_REG_AX(value){v = ShortTo2Byte(value); CPU_REG_AH = v[0]; CPU_REG_AL[1]}function SET_REG_BX(value){v = ShortTo2Byte(value); CPU_REG_BH = v[0]; CPU_REG_BL[1]}function SET_REG_CX(value){v = ShortTo2Byte(value); CPU_REG_CH = v[0]; CPU_REG_CL[1]}function SET_REG_DX(value){v = ShortTo2Byte(value); CPU_REG_DH = v[0]; CPU_REG_DL[1]}function SET_REG_RL(value){CPU_REG_RL = value}function SET_REG_RH(value){CPU_REG_RH = value}function RESET_FLAG(){CPU_REG_F = 0b00000000;}function SET_FLAG0(){CPU_REG_F = CPU_REG_F | 0b00000001};function SET_FLAG1(){CPU_REG_F = CPU_REG_F | 0b00000010};function SET_FLAG2(){CPU_REG_F = CPU_REG_F | 0b00000100};function SET_FLAG3(){CPU_REG_F = CPU_REG_F | 0b00001000};function SET_FLAG4(){CPU_REG_F = CPU_REG_F | 0b00010000};function SET_FLAG5(){CPU_REG_F = CPU_REG_F | 0b00100000};function SET_FLAG6(){CPU_REG_F = CPU_REG_F | 0b01000000};function SET_FLAG7(){CPU_REG_F = CPU_REG_F | 0b10000000};function CPU_RESET(){  CPU_STECK = new Array();  OUT_STECK = new Array();  CPU_STECK_COUNT = 255;  OUT_STECK_COUNT = 2048;  RESET_FLAG();  CPU_REG_PC = 0;  CPU_REG_SP = 0;  CPU_REG_AL = 0;  CPU_REG_AH = 0;  CPU_REG_BL = 0;  PU_REG_BH = 0;  CPU_REG_CL = 0;  CPU_REG_CH = 0;  CPU_REG_DL = 0;  CPU_REG_DH = 0;  CPU_REG_RL = 0;  CPU_REG_RH = 0;  CPU_REG_RX = 0;  CPU_ACTIVE=1;  VIDEO_RESET();  RAM_RESET();}function REGS_RESET(){  RESET_FLAG();  CPU_REG_PC = 0;  CPU_REG_SP = 0;  CPU_REG_AL = 0;  CPU_REG_AH = 0;  CPU_REG_BL = 0;  PU_REG_BH = 0;  CPU_REG_CL = 0;  CPU_REG_CH = 0;  CPU_REG_DL = 0;  CPU_REG_DH = 0;  CPU_REG_RL = 0;  CPU_REG_RH = 0;  CPU_REG_RX = 0;}function CheckIfReg(value){  if(value = "AL")return GET_REG_AL;  if(value = "AH")return GET_REG_AH;  if(value = "BL")return GET_REG_BL;  if(value = "BH")return GET_REG_BH;  if(value = "CL")return GET_REG_CL;  if(value = "CH")return GET_REG_CH;  if(value = "DL")return GET_REG_DL;  if(value = "DH")return GET_REG_DH;  if(value = "AX")return GET_REG_AX;  if(value = "BX")return GET_REG_BX;  if(value = "CX")return GET_REG_CX;  if(value = "DX")return GET_REG_DX;  if(value = "RL")return GET_REG_RL;  if(value = "RH")return GET_REG_RH;  if(value = "RX")return GET_REG_RX;}function GetRegSize(value){  out = 0;  if(value = "AL")out = 1;  if(value = "AH")out = 1;  if(value = "BL")out = 1;  if(value = "BH")out = 1;  if(value = "CL")out = 1;  if(value = "CH")out = 1;  if(value = "DL")out = 1;  if(value = "DH")out = 1;  if(value = "AX")out = 2;  if(value = "BX")out = 2;  if(value = "CX")out = 2;  if(value = "DX")out = 2;  if(value = "RL")out = 1;  if(value = "RH")out = 1;  if(value = "RX")out = 2;  return out;}function CPU_WORK_TICK(){  SET_REG_RL(Math.random() * (255 - 0) + 0);  SET_REG_RH(Math.random() * (255 - 0) + 0);  f = PROGRAM[CPU_REG_PC]; command = f.src[f.SC];   if(f.SC == f.src.length){  if(CPU_REG_PC > 0){  CPU_REG_PC = CPU_STECK_POP();}  else{  CPU_RESET();  CPU_ACTIVE = 0;  }  } DoCmd(command); VIDEO_DOCMD();}function CPU_WORK(){  setInterval(CPU_WORK_TICK, 100);}function ShortTo2Byte(short) {  var out = new Array();  out[0] = parseInt(short / 0xFF);  out[1] = parseInt(short - (out[0]*0xFF));  return out;}function Byte2ToShort(input) {  var out = Number(input[0]*0xFF) + Number(input[1]);  return out;}function Byte2ToShort(H,L) {  var out = Number(H*0xFF) + Number(L);  return out;}function ByteToBool(value) {  size = 8;  output = new Array();  for (i = 0; i < size; i++) {  output[i] = ((value & (1 << size - 1 - i)) != 0);  }  return output;}KEYBOARD_BUFFER = 0;KEYBOARD_SYSTEM = 0;KEYBOARD_BUFADR = 1027;KEYBOARD_SYSADR = 1028;function KEYBOARD_READ_CHAR(){  key = KEYBOARD_BUFFER;  KEYBOARD_BUFFER = 0;  return key;}function KEYBOARD_WRITE_CHAR(char){  if(char == "TURNON") KEYBOARD_SYSTEM = 1;  if(char == "RESET") KEYBOARD_SYSTEM = 2;  if(char == "DOWN") KEYBOARD_SYSTEM = 3;  if(char == "LEFT") KEYBOARD_SYSTEM = 4;  if(char == "RIGHT") KEYBOARD_SYSTEM = 5;  if(char == "ENTER") KEYBOARD_SYSTEM = 6;  KEYBOARD_BUFFER = CharConverter = CharConverter(char)+1; }function KEYBOARD_READ_SYS(){  key = KEYBOARD_BUFFER;  KEYBOARD_BUFFER = 0;  return key;}function KEYBOARD_WRITE_SYS(char){  if(char == "TURNON") KEYBOARD_SYSTEM = 1;  if(char == "RESET") KEYBOARD_SYSTEM = 2;  if(char == "DOWN") KEYBOARD_SYSTEM = 3;  if(char == "LEFT") KEYBOARD_SYSTEM = 4;  if(char == "RIGHT") KEYBOARD_SYSTEM = 5;  if(char == "ENTER") KEYBOARD_SYSTEM = 6;}function Main(){  PrintChar('A');}CPU_ACTIVE = 0;setInterval(UI_UPDATER, 0);function UI_UPDATER(){  if(CPU_ACTIVE == 1){  F0_CH = document.getElementById("F0").checked = GET_FLAG0();  F1_CH = document.getElementById("F1").checked = GET_FLAG1();  F2_CH = document.getElementById("F2").checked = GET_FLAG2();  F3_CH = document.getElementById("F3").checked = GET_FLAG3();  F4_CH = document.getElementById("F4").checked = GET_FLAG4();  F5_CH = document.getElementById("F5").checked = GET_FLAG5(); LBL_PC = document.getElementById("LBL_PC").value = PROGRAM[CPU_REG_PC].name;  LBL_SC = document.getElementById("LBL_SC").value = PROGRAM[CPU_REG_PC].SC;  LBL_AL = document.getElementById("LBL_AL").value = GET_REG_AL();  LBL_AH = document.getElementById("LBL_AH").value = GET_REG_AH();  LBL_BL = document.getElementById("LBL_BL").value = GET_REG_BL();  LBL_BH = document.getElementById("LBL_BH").value = GET_REG_BH();  LBL_CL = document.getElementById("LBL_CL").value = GET_REG_CL();  LBL_CH = document.getElementById("LBL_CH").value = GET_REG_CH();  LBL_DL = document.getElementById("LBL_DL").value = GET_REG_DL();  LBL_DH = document.getElementById("LBL_DH").value = GET_REG_DH();  LBL_AX = document.getElementById("LBL_AX").value = GET_REG_AX();  LBL_BX = document.getElementById("LBL_BX").value = GET_REG_BX();  LBL_CX = document.getElementById("LBL_CX").value = GET_REG_CX();  LBL_DX = document.getElementById("LBL_DX").value = GET_REG_DX();   }}function processFiles(files) {  file = files[0];  reader = new FileReader();  reader.readAsText(file);  comment = document.getElementById("src_textbox");   reader.onload = function() {  comment.value = reader.result; };  }function debug(a){  return CharConverter(a);}function MC_READ(ADDRES){  if(ADDRES >=RAM_STARTADR & ADDRES < RAM_ENDADR){  return K565PY7[RAM_LIST].read(ADDRES);  }  if(ADDRES == OUT_STECK_ADDR){ return OUT_STECK_POP();}  if(ADDRES == VIDEO_COMMAND_ADR){ return 0; }  if(ADDRES == KEYBOARD_BUFADR){return KEYBOARD_READ_CHAR();}  if(ADDRES == KEYBOARD_SYSADR){return KEYBOARD_READ_SYS();}}function MC_WRITE(ADDRES,VALAUE){  if(ADDRES >=RAM_STARTADR & ADDRES < RAM_ENDADR){  K565PY7[RAM_LIST].write(ADDRES, VALAUE);  }  if(ADDRES == OUT_STECK_ADDR){OUT_STECK_PUSH(VALAUE);}  if(ADDRES == VIDEO_COMMAND_ADR){VIDEO_COMMAND = VALAUE;}}OUT_STECK = new Array();OUT_STECK_ADDR = 12300;function OUT_STECK_PUSH(value){  if(OUT_STECK_COUNT>0){  console.log("DEBUG::OUT_STECK PUSH " + value);  OUT_STECK.push(value);  OUT_STECK_COUNT = OUT_STECK_COUNT - 1;  }else{  alert("Error переполнение внешнего стека!");  }}function OUT_STECK_POP(){  if(OUT_STECK_COUNT<=2048){  return OUT_STECK.pop();  }else{  return 0;  }}/* Память простроенна К565РУ7 Адреса ячеек с 4100 до 4355 Адрес Выбора страницы памяти в 4096 адресе Всего 256 страниц по 256 байт (65КБ)*/var RAM_LISTADR = 4096;var RAM_LIST = 0;var RAM_MAXLIST = 255;var RAM_STARTADR = 4100;var RAM_ENDADR = 4355;class RamListObj{  constructor(){  this.RAM_BUFFER = new Array(256);  for(var i = 0; i<256;i++)this.RAM_BUFFER[i] = 0;  }  read(ADDR){  return this.RAM_BUFFER[ADDR];  }  write(ADDR,VALUE){  this.RAM_BUFFER[ADDR] = VALUE;  }}K565PY7 = new Array();function RAM_RESET(){  RAM_LIST = 0;  K565PY7 = new Array();  for(var i = 0; i<256;i++){  K565PY7.push(new RamListObj()); }}/*  Дисплей 256*128   Дисплей считывает данные из ВНЕШЕНЕГО стека, номер команды берётся из VIDEO_COMMAND_ADR, если он = 0 то просто пропуск действий, после выполнения команды выставляется 0 на регисте VIDEO_COMMAND_ADR  Команда 1 - Закрасить пиксел (X,Y, VALUE - если > 0 то закрашиваем , если меньше то пустая точка)  Команда 2 - Положение курсора по X, для строковых команд (X)  Команда 3 - Положение курсора по Y, для строковых команд (Y)  Команда 4 - Отрисовать символ (VALUE)  Команда 5 - отрисоать строку (Размер строки, [VALUE])  Команда 6 - Reset, очистка дисплея*/var DISPLAY_SIZE_X = 256;var DISPLAY_SIZE_Y = 128;var DISPLAY_SIZE_SCALE = 2;var VIDEO_COMMAND_ADR = 8192;var VIDEO_X = 0;var VIDEO_Y = 0;var VIDEO_DATA = 0;VIDEO_COMMAND = 0;VIDEO_COLOR_TURNOFF = "#878C76";VIDEO_COLOR_TURNON = "#7DC14A";VIDEO_COLOR_TURNACTIVE = "#224423";VIDEO_BUFFER = new Array();function VIDEO_RESET(){  VIDEO_SimvolNow = 0;  VIDEO_DisplayStrokeNow = 0;  for(i =0; i < DISPLAY_SIZE_X*DISPLAY_SIZE_Y;i++)VIDEO_BUFFER[i] = 0;}function VIDEO_DOCMD(){  console.log("DEBUG::VIDEO_DOCMD " + VIDEO_COMMAND);  if(VIDEO_COMMAND == 1){  x = OUT_STECK_POP();y = OUT_STECK_POP();val = OUT_STECK_POP();   VIDEO_SETPIXEL(x,y,val);  }  if(VIDEO_COMMAND == 2){VIDEO_SimvolNow = OUT_STECK_POP();};  if(VIDEO_COMMAND == 3){ VIDEO_DisplayStrokeNow = OUT_STECK_POP();};  if(VIDEO_COMMAND == 4){  PrintChar(OUT_STECK_POP());  };  if(VIDEO_COMMAND == 6)VIDEO_RESET();  VIDEO_COMMAND = 0;}setInterval(VIDEO_DRAW_DIPSLAY, 0);function VIDEO_DRAW_DIPSLAY(){  if(CPU_ACTIVE == true){  display = document.getElementById("display");  ctx = display.getContext('2d');  display.width = DISPLAY_SIZE_X * DISPLAY_SIZE_SCALE;  display.height = DISPLAY_SIZE_Y * DISPLAY_SIZE_SCALE;  for(y = 0; y < DISPLAY_SIZE_Y; y++){ for(x = 0;x < DISPLAY_SIZE_X; x++){ if(VIDEO_BUFFER[x+(y*DISPLAY_SIZE_X)] == 1) ctx.fillStyle= VIDEO_COLOR_TURNACTIVE; if(VIDEO_BUFFER[x+(y*DISPLAY_SIZE_X)] == 0) ctx.fillStyle= VIDEO_COLOR_TURNON; ctx.fillRect(x*DISPLAY_SIZE_SCALE, y*DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE); }  }}else {  display = document.getElementById("display");  ctx = display.getContext('2d');  display.width = DISPLAY_SIZE_X * DISPLAY_SIZE_SCALE;  display.height = DISPLAY_SIZE_Y * DISPLAY_SIZE_SCALE;  for(y = 0; y < DISPLAY_SIZE_Y; y++){  for(x = 0;x < DISPLAY_SIZE_X; x++){  ctx.fillStyle = VIDEO_COLOR_TURNOFF;    ctx.fillRect(x*DISPLAY_SIZE_SCALE, y*DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE); }  }  }}VIDEO_SimvolNow = 0;VIDEO_DisplayStrokeNow = 0;function PrintChar(Char) {  realX = VIDEO_SimvolNow * 6;  realY = VIDEO_DisplayStrokeNow * 8;  char_start_byte = Char * 6;  for (X = 0; X < 6; X++) {  buf = ByteToBool(VIDEO_FONT_ROM[char_start_byte + X]);  for (Y = 0; Y < 8; Y++) {  if(X + realX>=0 & X + realX < DISPLAY_SIZE_X & Y + realY>=0 & Y + realY < DISPLAY_SIZE_X) { if (buf[7 - Y]==true) VIDEO_SETPIXEL(X + realX, Y + realY, 1);  }  }  }  }function VIDEO_SETPIXEL(x,y,val){  VIDEO_BUFFER[x + y*DISPLAY_SIZE_X] = val;}function CharConverter(Char){  console.log("char_conv");  if (Char == ' ') return -1;  if (Char == '!') return 0;  if (Char == '#') return 1;  if (Char == '$') return 3;  if (Char == '%') return 4;  if (Char == '&') return 5;  if (Char == '\'') return 6;  if (Char == '(') return 7;  if (Char == ')') return 8;  if (Char == '*') return 9;  if (Char == '+') return 10;  if (Char == ',') return 11;  if (Char == '-') return 12;  if (Char == '.') return 13;  if (Char == '/') return 14;  if (Char == '0') return 15;  if (Char == '1') return 16;  if (Char == '2') return 17;  if (Char == '3') return 18;  if (Char == '4') return 19;  if (Char == '5') return 20;  if (Char == '6') return 21;  if (Char == '7') return 22;  if (Char == '8') return 23;  if (Char == '9') return 24;  if (Char == ':') return 25;  if (Char == ';') return 26;  if (Char == '<') return 27;  if (Char == '=') return 28;  if (Char == '>') return 29;  if (Char == '?') return 30;  if (Char == '@') return 31;  if (Char == 'A') return 32;  if (Char == 'B') return 33;  if (Char == 'C') return 34;  if (Char == 'D') return 35;  if (Char == 'E') return 36;  if (Char == 'F') return 37;  if (Char == 'G') return 38;  if (Char == 'H') return 39;  if (Char == 'I') return 40;  if (Char == 'J') return 41;  if (Char == 'K') return 42;  if (Char == 'L') return 43;  if (Char == 'M') return 44;  if (Char == 'N') return 45;  if (Char == 'O') return 46;  if (Char == 'P') return 47;  if (Char == 'Q') return 48;  if (Char == 'R') return 49;  if (Char == 'S') return 50;  if (Char == 'T') return 51;  if (Char == 'U') return 52;  if (Char == 'V') return 53;  if (Char == 'W') return 54;  if (Char == 'X') return 55;  if (Char == 'Y') return 56;  if (Char == 'Z') return 57;  if (Char == '[') return 58;  if (Char == '/') return 59;  if (Char == ']') return 60;  if (Char == '^') return 61;  if (Char == '_') return 62;  if (Char == '`') return 63;  if (Char == 'a') return 64;  if (Char == 'b') return 65;  if (Char == 'c') return 66;  if (Char == 'd') return 67;  if (Char == 'e') return 68;  if (Char == 'f') return 69;  if (Char == 'g') return 70;  if (Char == 'h') return 71;  if (Char == 'i') return 72;  if (Char == 'j') return 73;  if (Char == 'k') return 74;  if (Char == 'l') return 75;  if (Char == 'm') return 76;  if (Char == 'n') return 77;  if (Char == 'o') return 78;  if (Char == 'p') return 79;  if (Char == 'q') return 80;  if (Char == 'r') return 81;  if (Char == 's') return 82;  if (Char == 't') return 83;  if (Char == 'u') return 84;  if (Char == 'v') return 85;  if (Char == 'w') return 86;  if (Char == 'x') return 87;  if (Char == 'y') return 88;  if (Char == 'z') return 89;  if (Char == '{') return 90;  if (Char == '|') return 91;  if (Char == '}') return 92;  if (Char == '~') return 93;  if (Char == '⌂') return 94;  if (Char == 'А') return 95;  if (Char == 'Б') return 96;  if (Char == 'В') return 97;  if (Char == 'Г') return 98;  if (Char == 'Д') return 99;  if (Char == 'Е') return 100;  if (Char == 'Ж') return 101;  if (Char == 'З') return 102;  if (Char == 'И') return 103;  if (Char == 'Й') return 104;  if (Char == 'К') return 105;  if (Char == 'Л') return 106;  if (Char == 'М') return 107;  if (Char == 'Н') return 108;  if (Char == 'О') return 119;  if (Char == 'П') return 110;  if (Char == 'Р') return 111;  if (Char == 'С') return 112;  if (Char == 'Т') return 113;  if (Char == 'У') return 114;  if (Char == 'Ф') return 115;  if (Char == 'Х') return 116;  if (Char == 'Ц') return 117;  if (Char == 'Ч') return 118;  if (Char == 'Ш') return 119;  if (Char == 'Щ') return 120;  if (Char == 'Ъ') return 121;  if (Char == 'Ы') return 122;  if (Char == 'Ь') return 123;  if (Char == 'Э') return 124;  if (Char == 'Ю') return 125;  if (Char == 'Я') return 126;  if (Char == 'а') return 127;  if (Char == 'б') return 128;  if (Char == 'в') return 129;  if (Char == 'г') return 130;  if (Char == 'д') return 131;  if (Char == 'е') return 132;  if (Char == 'ж') return 133;  if (Char == 'з') return 134;  if (Char == 'и') return 135;  if (Char == 'й') return 136;  if (Char == 'к') return 137;  if (Char == 'л') return 138;  if (Char == 'м') return 139;  if (Char == 'н') return 140;  if (Char == 'о') return 141;  if (Char == 'п') return 142;  if (Char == 'р') return 143;  if (Char == 'с') return 144;  if (Char == 'т') return 145;  if (Char == 'у') return 146;  if (Char == 'ф') return 147;  if (Char == 'х') return 148;  if (Char == 'ц') return 149;  if (Char == 'ч') return 150;  if (Char == 'ш') return 151;  if (Char == 'щ') return 152;  if (Char == 'ъ') return 153;  if (Char == 'ы') return 154;  if (Char == 'ь') return 155;  if (Char == 'э') return 156;  if (Char == 'ю') return 157;  if (Char == 'я') return 158;  return 0;}VIDEO_FONT_ROM = new Array;VIDEO_FONT_ROM = [  0x00, 0x00, 0x00, 0x00, 0x00, 0x00,   0x00, 0x00, 0x00, 0x2F, 0x00, 0x00,   0x00, 0x00, 0x07, 0x00, 0x07, 0x00,   0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14,   0x00, 0x24, 0x2A, 0x7F, 0x2A, 0x12,   0x00, 0x23, 0x13, 0x08, 0x64, 0x62,   0x00, 0x36, 0x49, 0x55, 0x22, 0x50,   0x00, 0x00, 0x05, 0x03, 0x00, 0x00,   0x00, 0x00, 0x1C, 0x22, 0x41, 0x00,   0x00, 0x00, 0x41, 0x22, 0x1C, 0x00,   0x00, 0x14, 0x08, 0x3E, 0x08, 0x14,   0x00, 0x08, 0x08, 0x3E, 0x08, 0x08,   0x00, 0x00, 0x00, 0xA0, 0x60, 0x00,   0x00, 0x08, 0x08, 0x08, 0x08, 0x08,   0x00, 0x00, 0x60, 0x60, 0x00, 0x00,   0x00, 0x20, 0x10, 0x08, 0x04, 0x02,   0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E,   0x00, 0x00, 0x42, 0x7F, 0x40, 0x00,   0x00, 0x42, 0x61, 0x51, 0x49, 0x46,   0x00, 0x21, 0x41, 0x45, 0x4B, 0x31,   0x00, 0x18, 0x14, 0x12, 0x7F, 0x10,   0x00, 0x27, 0x45, 0x45, 0x45, 0x39,   0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30,   0x00, 0x01, 0x71, 0x09, 0x05, 0x03,   0x00, 0x36, 0x49, 0x49, 0x49, 0x36,   0x00, 0x06, 0x49, 0x49, 0x29, 0x1E,   0x00, 0x00, 0x36, 0x36, 0x00, 0x00,   0x00, 0x00, 0x56, 0x36, 0x00, 0x00,   0x00, 0x08, 0x14, 0x22, 0x41, 0x00,   0x00, 0x14, 0x14, 0x14, 0x14, 0x14,   0x00, 0x00, 0x41, 0x22, 0x14, 0x08,   0x00, 0x02, 0x01, 0x51, 0x09, 0x06,   0x00, 0x32, 0x49, 0x59, 0x51, 0x3E,   0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C,   0x00, 0x7F, 0x49, 0x49, 0x49, 0x36,   0x00, 0x3E, 0x41, 0x41, 0x41, 0x22,   0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C,   0x00, 0x7F, 0x49, 0x49, 0x49, 0x41,   0x00, 0x7F, 0x09, 0x09, 0x09, 0x01,   0x00, 0x3E, 0x41, 0x49, 0x49, 0x7A,   0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F,   0x00, 0x00, 0x41, 0x7F, 0x41, 0x00,   0x00, 0x20, 0x40, 0x41, 0x3F, 0x01,   0x00, 0x7F, 0x08, 0x14, 0x22, 0x41,   0x00, 0x7F, 0x40, 0x40, 0x40, 0x40,   0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F,   0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F,   0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E,   0x00, 0x7F, 0x09, 0x09, 0x09, 0x06,   0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E,   0x00, 0x7F, 0x09, 0x19, 0x29, 0x46,   0x00, 0x46, 0x49, 0x49, 0x49, 0x31,   0x00, 0x01, 0x01, 0x7F, 0x01, 0x01,   0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F,   0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F,   0x00, 0x3F, 0x40, 0x38, 0x40, 0x3F,   0x00, 0x63, 0x14, 0x08, 0x14, 0x63,   0x00, 0x07, 0x08, 0x70, 0x08, 0x07,   0x00, 0x61, 0x51, 0x49, 0x45, 0x43,   0x00, 0x00, 0x7F, 0x41, 0x41, 0x00,   0xAA, 0x55, 0xAA, 0x55, 0xAA, 0x55,   0x00, 0x00, 0x41, 0x41, 0x7F, 0x00,   0x00, 0x04, 0x02, 0x01, 0x02, 0x04,   0x00, 0x40, 0x40, 0x40, 0x40, 0x40,   0x00, 0x00, 0x03, 0x05, 0x00, 0x00,   0x00, 0x20, 0x54, 0x54, 0x78, 0x40,   0x00, 0x7F, 0x28, 0x44, 0x44, 0x38,   0x00, 0x38, 0x44, 0x44, 0x44, 0x20,   0x00, 0x38, 0x44, 0x44, 0x48, 0x7F,   0x00, 0x38, 0x54, 0x54, 0x54, 0x18,   0x00, 0x08, 0x7E, 0x09, 0x01, 0x02,   0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C,   0x00, 0x7F, 0x08, 0x04, 0x04, 0x78,   0x00, 0x00, 0x44, 0x7D, 0x40, 0x00,   0x00, 0x40, 0x80, 0x84, 0x7D, 0x00,   0x00, 0x7F, 0x10, 0x28, 0x44, 0x00,   0x00, 0x00, 0x41, 0x7F, 0x40, 0x00,   0x00, 0x7C, 0x04, 0x18, 0x04, 0x78,   0x00, 0x7C, 0x08, 0x04, 0x04, 0x78,   0x00, 0x38, 0x44, 0x44, 0x44, 0x38,   0x00, 0xFC, 0x24, 0x24, 0x24, 0x18,   0x00, 0x18, 0x24, 0x24, 0x18, 0xFC,   0x00, 0x7C, 0x08, 0x04, 0x04, 0x08,   0x00, 0x48, 0x54, 0x54, 0x54, 0x20,   0x00, 0x04, 0x3F, 0x44, 0x40, 0x20,   0x00, 0x3C, 0x40, 0x40, 0x20, 0x7C,   0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C,   0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C,   0x00, 0x44, 0x28, 0x10, 0x28, 0x44,   0x00, 0x1C, 0xA0, 0xA0, 0xA0, 0x7C,   0x00, 0x44, 0x64, 0x54, 0x4C, 0x44,   0x00, 0x00, 0x10, 0x7C, 0x82, 0x00,   0x00, 0x00, 0x00, 0xFF, 0x00, 0x00,   0x00, 0x00, 0x82, 0x7C, 0x10, 0x00,   0x00, 0x10, 0x08, 0x10, 0x20, 0x10,   0, 0, 0, 0, 0, 0,   0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C,   0x00, 0x7F, 0x49, 0x49, 0x49, 0x31,   0x00, 0x7F, 0x45, 0x45, 0x45, 0x3A,   0x00, 0x7F, 0x01, 0x01, 0x01, 0x03,   0x00, 0x60, 0x3F, 0x21, 0x3F, 0x60,   0x00, 0x7F, 0x49, 0x49, 0x49, 0x41,   0x00, 0x73, 0x0C, 0x7F, 0x0C, 0x73,   0x00, 0x22, 0x41, 0x49, 0x49, 0x36,   0x00, 0x7F, 0x10, 0x08, 0x04, 0x7F,   0x00, 0x7E, 0x20, 0x11, 0x08, 0x7E,   0x00, 0x7F, 0x08, 0x14, 0x22, 0x41,   0x00, 0x40, 0x3F, 0x01, 0x01, 0x7F,   0x00, 0x7F, 0x06, 0x08, 0x06, 0x7F,   0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F,   0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E,   0x00, 0x7F, 0x01, 0x01, 0x01, 0x7F,   0x00, 0x7F, 0x09, 0x09, 0x09, 0x06,   0x00, 0x3E, 0x41, 0x41, 0x41, 0x22,   0x00, 0x03, 0x01, 0x7F, 0x01, 0x03,   0x00, 0x61, 0x26, 0x18, 0x06, 0x01,   0x00, 0x1C, 0x22, 0x7F, 0x22, 0x1C,   0x00, 0x63, 0x14, 0x08, 0x14, 0x63,   0x00, 0x3F, 0x20, 0x20, 0x3F, 0x60,   0x00, 0x07, 0x08, 0x08, 0x08, 0x7F,   0x00, 0x7F, 0x40, 0x7F, 0x40, 0x7F,   0x00, 0x3F, 0x20, 0x3F, 0x20, 0x7F,   0x00, 0x01, 0x7F, 0x48, 0x48, 0x30,   0x00, 0x7F, 0x48, 0x78, 0x00, 0x7F,   0x00, 0x7F, 0x48, 0x48, 0x30, 0x00,   0x00, 0x41, 0x49, 0x49, 0x2A, 0x1C,   0x00, 0x7F, 0x10, 0x3E, 0x41, 0x3E,   0x00, 0x66, 0x19, 0x09, 0x09, 0x7F,   0x00, 0x20, 0x54, 0x54, 0x78, 0x40,   0x00, 0x3E, 0x49, 0x45, 0x45, 0x38,   0x00, 0x7C, 0x54, 0x54, 0x58, 0x20,   0x00, 0x7C, 0x04, 0x04, 0x0C, 0x00,   0x00, 0x38, 0x45, 0x45, 0x49, 0x3E,   0x00, 0x38, 0x54, 0x54, 0x54, 0x18,   0x00, 0x4C, 0x30, 0x7C, 0x30, 0x4C,   0x00, 0x28, 0x44, 0x54, 0x28, 0x00,   0x00, 0x7C, 0x20, 0x10, 0x7C, 0x00,   0x00, 0x7C, 0x21, 0x11, 0x7C, 0x00,   0x00, 0x7C, 0x10, 0x28, 0x44, 0x00,   0x00, 0x40, 0x3C, 0x04, 0x04, 0x7C,   0x00, 0x7C, 0x08, 0x10, 0x08, 0x7C,   0x00, 0x7C, 0x10, 0x10, 0x7C, 0x00,   0x00, 0x38, 0x44, 0x44, 0x44, 0x38,   0x00, 0x7C, 0x04, 0x04, 0x7C, 0x00,   0x00, 0xFC, 0x28, 0x44, 0x44, 0x38,   0x00, 0x38, 0x44, 0x44, 0x44, 0x28,   0x00, 0x04, 0x04, 0x7C, 0x04, 0x04,   0x00, 0x4C, 0x50, 0x50, 0x50, 0x3C,   0x00, 0x38, 0x44, 0xFE, 0x44, 0x38,   0x00, 0x44, 0x28, 0x10, 0x28, 0x44,   0x00, 0x7C, 0x40, 0x40, 0x7C, 0xC0,   0x00, 0x1C, 0x10, 0x10, 0x7C, 0x00,   0x00, 0x7C, 0x40, 0x7C, 0x40, 0x7C,   0x00, 0x7C, 0x40, 0x7C, 0x40, 0xFC,   0x00, 0x04, 0x7C, 0x50, 0x70, 0x00,   0x00, 0x7C, 0x50, 0x70, 0x00, 0x7C,   0x00, 0x00, 0x7C, 0x50, 0x70, 0x00,   0x00, 0x28, 0x44, 0x54, 0x38, 0x00,   0x00, 0x7C, 0x10, 0x38, 0x44, 0x38,   0x00, 0x08, 0x54, 0x34, 0x14, 0x7C, ];