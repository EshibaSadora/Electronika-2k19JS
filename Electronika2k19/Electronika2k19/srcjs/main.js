function Main(){
    PrintChar('A');
}

CPU_ACTIVE = 0;

setInterval(UI_UPDATER, 0);



function UI_UPDATER(){

    if(CPU_ACTIVE == 1){

        F0_CH = document.getElementById("F0").checked = GET_FLAG0();
        F1_CH = document.getElementById("F1").checked = GET_FLAG1();
        F2_CH = document.getElementById("F2").checked = GET_FLAG2();
        F3_CH = document.getElementById("F3").checked = GET_FLAG3();
        F4_CH = document.getElementById("F4").checked = GET_FLAG4();
        F5_CH = document.getElementById("F5").checked = GET_FLAG5();
        //F6_CH = document.getElementById("F6").checked = GET_FLAG6();
        //F7_CH = document.getElementById("F7").checked = GET_FLAG7();

        LBL_PC = document.getElementById("LBL_PC").value = PROGRAM[CPU_REG_PC].name;
        LBL_SC = document.getElementById("LBL_SC").value = PROGRAM[CPU_REG_PC].SC;

        LBL_AL = document.getElementById("LBL_AL").value = GET_REG_AL();
        LBL_AH = document.getElementById("LBL_AH").value = GET_REG_AH();
        LBL_BL = document.getElementById("LBL_BL").value = GET_REG_BL();
        LBL_BH = document.getElementById("LBL_BH").value = GET_REG_BH();
        LBL_CL = document.getElementById("LBL_CL").value = GET_REG_CL();
        LBL_CH = document.getElementById("LBL_CH").value = GET_REG_CH();
        LBL_DL = document.getElementById("LBL_DL").value = GET_REG_DL();
        LBL_DH = document.getElementById("LBL_DH").value = GET_REG_DH();
        LBL_AX = document.getElementById("LBL_AX").value = GET_REG_AX();
        LBL_BX = document.getElementById("LBL_BX").value = GET_REG_BX();
        LBL_CX = document.getElementById("LBL_CX").value = GET_REG_CX();
        LBL_DX = document.getElementById("LBL_DX").value = GET_REG_DX();

        //LBL_RL = document.getElementById("LBL_RL").value = GET_REG_RL();
        //LBL_CX = document.getElementById("LBL_RH").value = GET_REG_RH();
       // LBL_DX = document.getElementById("LBL_RX").value = GET_REG_RX();
    
    }
}


function processFiles(files) {
    
    file = files[0];    
    reader = new FileReader();
    reader.readAsText(file);    
    comment = document.getElementById("src_textbox");   
  

    reader.onload = function() {
        comment.value = reader.result;
      };
        
    
}

function debug(a){
    return CharConverter(a);
}