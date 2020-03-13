//-------------------------------------------------------------------------------------------
//                               7 сегментный индикатор, сборка дисплея из него
//-------------------------------------------------------------------------------------------

SEGIND_COLOR_TURNOFF = "#000000";
SEGIND_COLOR_TURNON = "#18c100";
SEGIND_COLOR_BORDER = "#000ae3";


SEGIND_COUNT = 12;
SEGIND_STARTADR = 4100;

SEGIND_WIDTH = 10;
SEGIND_HEIGHT_SEG = 5;

SEGIND_BORDER_WITDRH = 3;


var SEGIND_BUFF = new Array();
for(var i = 0; i < SEGIND_COUNT;i++) {
    SEGIND_BUFF[i]=0b10010111;
}

//SEGIND_BUFF[i]=0b11101111; A
//SEGIND_BUFF[i]=0b11101111; B
//SEGIND_BUFF[i]=0b11101111; C
//SEGIND_BUFF[i]=0b11101111; D

function SEGIND_UPDATE(){

    display = document.getElementById("display");

    x = 0;
    y = 0;

    startx = SEGIND_BORDER_WITDRH+x;
    starty = SEGIND_BORDER_WITDRH+y;

    disp_lenth = SEGIND_WIDTH * 1 + SEGIND_BORDER_WITDRH * 2 + SEGIND_HEIGHT_SEG * 2;

    display.width  = disp_lenth * SEGIND_COUNT;
    display.height =  SEGIND_WIDTH * 2 + SEGIND_HEIGHT_SEG * 3;

    ctx  = display.getContext('2d');

    for(var i = 0; i < SEGIND_COUNT;i++) {

        var data = ByteToBool(SEGIND_BUFF[i]);

        ctx.fillStyle = SEGIND_COLOR_BORDER;
        ctx.fillRect(x + (disp_lenth*i), y - SEGIND_HEIGHT_SEG, SEGIND_WIDTH * 1 + SEGIND_BORDER_WITDRH * 2 + SEGIND_HEIGHT_SEG * 2, SEGIND_WIDTH * 2 + SEGIND_HEIGHT_SEG * 3 + SEGIND_BORDER_WITDRH * 2);
        ctx.fillRect(startx+ (disp_lenth*i), starty - SEGIND_HEIGHT_SEG, SEGIND_WIDTH * 1 + SEGIND_HEIGHT_SEG * 2, SEGIND_WIDTH * 2 + SEGIND_HEIGHT_SEG * 3);

        if(data[5]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i), starty, SEGIND_HEIGHT_SEG, SEGIND_WIDTH); //5
        if(data[4]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i), starty + SEGIND_WIDTH + SEGIND_HEIGHT_SEG, SEGIND_HEIGHT_SEG, SEGIND_WIDTH);//4

        if(data[0]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i) + SEGIND_HEIGHT_SEG, starty - SEGIND_HEIGHT_SEG, SEGIND_WIDTH, SEGIND_HEIGHT_SEG);//0
        if(data[6]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i) + SEGIND_HEIGHT_SEG, starty + SEGIND_WIDTH, SEGIND_WIDTH, SEGIND_HEIGHT_SEG);//6
        if(data[3]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i) + SEGIND_HEIGHT_SEG, starty + SEGIND_WIDTH * 2 + SEGIND_HEIGHT_SEG, SEGIND_WIDTH, SEGIND_HEIGHT_SEG);//3

        if(data[1]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i) + SEGIND_WIDTH + SEGIND_HEIGHT_SEG, starty, SEGIND_HEIGHT_SEG, SEGIND_WIDTH);//1
        if(data[2]==true){ctx.fillStyle = SEGIND_COLOR_TURNON;}else{ctx.fillStyle = SEGIND_COLOR_TURNOFF;}
        ctx.fillRect(startx+ (disp_lenth*i) + SEGIND_WIDTH + SEGIND_HEIGHT_SEG, starty + SEGIND_WIDTH + SEGIND_HEIGHT_SEG, SEGIND_HEIGHT_SEG, SEGIND_WIDTH);//2
    }

}
