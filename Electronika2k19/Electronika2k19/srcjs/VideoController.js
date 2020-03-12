//-------------------------------------------------------------------------------------------
//                               Модуль управления дисплеем
//-------------------------------------------------------------------------------------------

/*
    Дисплей 256*128 
    
    Дисплей считывает данные из ВНЕШЕНЕГО стека, номер команды берётся из VIDEO_COMMAND_ADR, если он = 0 то просто пропуск действий, 
    после выполнения команды выставляется 0 на регисте VIDEO_COMMAND_ADR

    Команда 1 - Закрасить пиксел (X,Y, VALUE - если > 0 то закрашиваем , если меньше то пустая точка)
    Команда 2 - Положение курсора по X, для строковых команд (X)
    Команда 3 - Положение курсора по Y, для строковых команд (Y)
    Команда 4 - Отрисовать символ (VALUE)
    Команда 5 - отрисоать строку (Размер строки, [VALUE])
    Команда 6 - Reset, очистка дисплея
*/
var DISPLAY_SIZE_X = 256;
var DISPLAY_SIZE_Y = 128;
var DISPLAY_SIZE_SCALE = 2;

var VIDEO_COMMAND_ADR = 8192;
var VIDEO_X = 0;
var VIDEO_Y = 0;
var VIDEO_DATA = 0;

VIDEO_COMMAND = 0;

VIDEO_COLOR_TURNOFF = "#878C76";
VIDEO_COLOR_TURNON = "#7DC14A";
VIDEO_COLOR_TURNACTIVE = "#224423";


VIDEO_BUFFER = new Array();

function VIDEO_RESET(){
    VIDEO_SimvolNow = 0;
    VIDEO_DisplayStrokeNow = 0;
    for(i =0; i < DISPLAY_SIZE_X*DISPLAY_SIZE_Y;i++)VIDEO_BUFFER[i] = 0;
}

function VIDEO_DOCMD(){
    console.log("DEBUG::VIDEO_DOCMD " + VIDEO_COMMAND);
    //Команда 1 - Закрасить пиксел (X,Y, VALUE - если > 0 то закрашиваем , если меньше то пустая точка)
    if(VIDEO_COMMAND == 1){
        x = OUT_STECK_POP();y = OUT_STECK_POP();val = OUT_STECK_POP(); //Читаем данные из стека
        VIDEO_SETPIXEL(x,y,val);
    }
    //Команда 2 - Положение курсора по X, для строковых команд (X)
    if(VIDEO_COMMAND == 2){VIDEO_SimvolNow = OUT_STECK_POP();};
    //Команда 3 - Положение курсора по Y, для строковых команд (Y)
    if(VIDEO_COMMAND == 3){ VIDEO_DisplayStrokeNow = OUT_STECK_POP();};
    //Команда 4 - Отрисовать символ (VALUE)
    if(VIDEO_COMMAND == 4){
        PrintChar(OUT_STECK_POP());
    };
    //Команда 6 - Reset, очистка дисплея
    if(VIDEO_COMMAND == 6)VIDEO_RESET();
    VIDEO_COMMAND = 0;
}

setInterval(VIDEO_DRAW_DIPSLAY, 0);

function VIDEO_DRAW_DIPSLAY(){

    if(CPU_ACTIVE == true){

        display = document.getElementById("display");
        ctx  = display.getContext('2d');
        display.width  = DISPLAY_SIZE_X * DISPLAY_SIZE_SCALE;
        display.height = DISPLAY_SIZE_Y * DISPLAY_SIZE_SCALE;
    
        for(y = 0; y < DISPLAY_SIZE_Y; y++){   
            for(x = 0;x < DISPLAY_SIZE_X; x++){
                if(VIDEO_BUFFER[x+(y*DISPLAY_SIZE_X)] == 1) ctx.fillStyle= VIDEO_COLOR_TURNACTIVE;
                if(VIDEO_BUFFER[x+(y*DISPLAY_SIZE_X)] == 0) ctx.fillStyle= VIDEO_COLOR_TURNON;
                ctx.fillRect(x*DISPLAY_SIZE_SCALE, y*DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE);        
            }
        }
}else {
    display = document.getElementById("display");
    ctx  = display.getContext('2d');
        display.width  = DISPLAY_SIZE_X * DISPLAY_SIZE_SCALE;
        display.height = DISPLAY_SIZE_Y * DISPLAY_SIZE_SCALE;

    for(y = 0; y < DISPLAY_SIZE_Y; y++){   
        for(x = 0;x < DISPLAY_SIZE_X; x++){
            ctx.fillStyle = VIDEO_COLOR_TURNOFF;                     
            ctx.fillRect(x*DISPLAY_SIZE_SCALE, y*DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE, DISPLAY_SIZE_SCALE);        
        }
    }
    }
}

VIDEO_SimvolNow = 0;
VIDEO_DisplayStrokeNow = 0;

function PrintChar(Char) {
    realX = VIDEO_SimvolNow * 6;
    realY = VIDEO_DisplayStrokeNow * 8;

    //char_start_byte = (CharConverter(Char)+1) * 6;
    char_start_byte = Char * 6;

    for (X = 0; X < 6; X++) {
        buf = ByteToBool(VIDEO_FONT_ROM[char_start_byte + X]);
        for (Y = 0; Y < 8; Y++) {
            if(X + realX>=0 & X + realX < DISPLAY_SIZE_X & Y + realY>=0 & Y + realY < DISPLAY_SIZE_X) {
                if (buf[7 - Y]==true) VIDEO_SETPIXEL(X + realX, Y + realY, 1);
            }
        }
    }

    //VIDEO_SimvolNow++;
}

function VIDEO_SETPIXEL(x,y,val){
    VIDEO_BUFFER[x + y*DISPLAY_SIZE_X] = val;
}

function CharConverter(Char){
    console.log("char_conv");
    if (Char == ' ') return -1;
    if (Char == '!') return 0;
    if (Char == '#') return 1;
    if (Char == '$') return 3;
    if (Char == '%') return 4;
    if (Char == '&') return 5;
    if (Char == '\'') return 6;
    if (Char == '(') return 7;
    if (Char == ')') return 8;
    if (Char == '*') return 9;
    if (Char == '+') return 10;
    if (Char == ',') return 11;
    if (Char == '-') return 12;
    if (Char == '.') return 13;
    if (Char == '/') return 14;
    if (Char == '0') return 15;
    if (Char == '1') return 16;
    if (Char == '2') return 17;
    if (Char == '3') return 18;
    if (Char == '4') return 19;
    if (Char == '5') return 20;
    if (Char == '6') return 21;
    if (Char == '7') return 22;
    if (Char == '8') return 23;
    if (Char == '9') return 24;
    if (Char == ':') return 25;
    if (Char == ';') return 26;
    if (Char == '<') return 27;
    if (Char == '=') return 28;
    if (Char == '>') return 29;
    if (Char == '?') return 30;
    if (Char == '@') return 31;
    if (Char == 'A') return 32;
    if (Char == 'B') return 33;
    if (Char == 'C') return 34;
    if (Char == 'D') return 35;
    if (Char == 'E') return 36;
    if (Char == 'F') return 37;
    if (Char == 'G') return 38;
    if (Char == 'H') return 39;
    if (Char == 'I') return 40;
    if (Char == 'J') return 41;
    if (Char == 'K') return 42;
    if (Char == 'L') return 43;
    if (Char == 'M') return 44;
    if (Char == 'N') return 45;
    if (Char == 'O') return 46;
    if (Char == 'P') return 47;
    if (Char == 'Q') return 48;
    if (Char == 'R') return 49;
    if (Char == 'S') return 50;
    if (Char == 'T') return 51;
    if (Char == 'U') return 52;
    if (Char == 'V') return 53;
    if (Char == 'W') return 54;
    if (Char == 'X') return 55;
    if (Char == 'Y') return 56;
    if (Char == 'Z') return 57;
    if (Char == '[') return 58;
    if (Char == '/') return 59;
    if (Char == ']') return 60;
    if (Char == '^') return 61;
    if (Char == '_') return 62;
    if (Char == '`') return 63;
    if (Char == 'a') return 64;
    if (Char == 'b') return 65;
    if (Char == 'c') return 66;
    if (Char == 'd') return 67;
    if (Char == 'e') return 68;
    if (Char == 'f') return 69;
    if (Char == 'g') return 70;
    if (Char == 'h') return 71;
    if (Char == 'i') return 72;
    if (Char == 'j') return 73;
    if (Char == 'k') return 74;
    if (Char == 'l') return 75;
    if (Char == 'm') return 76;
    if (Char == 'n') return 77;
    if (Char == 'o') return 78;
    if (Char == 'p') return 79;
    if (Char == 'q') return 80;
    if (Char == 'r') return 81;
    if (Char == 's') return 82;
    if (Char == 't') return 83;
    if (Char == 'u') return 84;
    if (Char == 'v') return 85;
    if (Char == 'w') return 86;
    if (Char == 'x') return 87;
    if (Char == 'y') return 88;
    if (Char == 'z') return 89;
    if (Char == '{') return 90;
    if (Char == '|') return 91;
    if (Char == '}') return 92;
    if (Char == '~') return 93;
    if (Char == '⌂') return 94;
    if (Char == 'А') return 95;
    if (Char == 'Б') return 96;
    if (Char == 'В') return 97;
    if (Char == 'Г') return 98;
    if (Char == 'Д') return 99;
    if (Char == 'Е') return 100;
    if (Char == 'Ж') return 101;
    if (Char == 'З') return 102;
    if (Char == 'И') return 103;
    if (Char == 'Й') return 104;
    if (Char == 'К') return 105;
    if (Char == 'Л') return 106;
    if (Char == 'М') return 107;
    if (Char == 'Н') return 108;
    if (Char == 'О') return 119;
    if (Char == 'П') return 110;
    if (Char == 'Р') return 111;
    if (Char == 'С') return 112;
    if (Char == 'Т') return 113;
    if (Char == 'У') return 114;
    if (Char == 'Ф') return 115;
    if (Char == 'Х') return 116;
    if (Char == 'Ц') return 117;
    if (Char == 'Ч') return 118;
    if (Char == 'Ш') return 119;
    if (Char == 'Щ') return 120;
    if (Char == 'Ъ') return 121;
    if (Char == 'Ы') return 122;
    if (Char == 'Ь') return 123;
    if (Char == 'Э') return 124;
    if (Char == 'Ю') return 125;
    if (Char == 'Я') return 126;
    if (Char == 'а') return 127;
    if (Char == 'б') return 128;
    if (Char == 'в') return 129;
    if (Char == 'г') return 130;
    if (Char == 'д') return 131;
    if (Char == 'е') return 132;
    if (Char == 'ж') return 133;
    if (Char == 'з') return 134;
    if (Char == 'и') return 135;
    if (Char == 'й') return 136;
    if (Char == 'к') return 137;
    if (Char == 'л') return 138;
    if (Char == 'м') return 139;
    if (Char == 'н') return 140;
    if (Char == 'о') return 141;
    if (Char == 'п') return 142;
    if (Char == 'р') return 143;
    if (Char == 'с') return 144;
    if (Char == 'т') return 145;
    if (Char == 'у') return 146;
    if (Char == 'ф') return 147;
    if (Char == 'х') return 148;
    if (Char == 'ц') return 149;
    if (Char == 'ч') return 150;
    if (Char == 'ш') return 151;
    if (Char == 'щ') return 152;
    if (Char == 'ъ') return 153;
    if (Char == 'ы') return 154;
    if (Char == 'ь') return 155;
    if (Char == 'э') return 156;
    if (Char == 'ю') return 157;
    if (Char == 'я') return 158;
    return 0;
}

VIDEO_FONT_ROM = new Array;
VIDEO_FONT_ROM = [
                //	ширина символов (6), высота символов (8)
            //
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00,                //	001)	0x20=032	пробел
            0x00, 0x00, 0x00, 0x2F, 0x00, 0x00,                //	002)	0x21=033	!
            0x00, 0x00, 0x07, 0x00, 0x07, 0x00,                //	003)	0x22=034	"
            0x00, 0x14, 0x7F, 0x14, 0x7F, 0x14,                //	004)	0x23=035	#
            0x00, 0x24, 0x2A, 0x7F, 0x2A, 0x12,                //	005)	0x24=036	$
            0x00, 0x23, 0x13, 0x08, 0x64, 0x62,                //	006)	0x25=037	%
            0x00, 0x36, 0x49, 0x55, 0x22, 0x50,                //	007)	0x26=038	&
            0x00, 0x00, 0x05, 0x03, 0x00, 0x00,                //	008)	0x27=039	'
            0x00, 0x00, 0x1C, 0x22, 0x41, 0x00,                //	009)	0x28=040	(
            0x00, 0x00, 0x41, 0x22, 0x1C, 0x00,                //	010)	0x29=041	)
            0x00, 0x14, 0x08, 0x3E, 0x08, 0x14,                //	011)	0x2A=042	*
            0x00, 0x08, 0x08, 0x3E, 0x08, 0x08,                //	012)	0x2B=043	+
            0x00, 0x00, 0x00, 0xA0, 0x60, 0x00,                //	013)	0x2C=044	,
            0x00, 0x08, 0x08, 0x08, 0x08, 0x08,                //	014)	0x2D=045	-
            0x00, 0x00, 0x60, 0x60, 0x00, 0x00,                //	015)	0x2E=046	.
            0x00, 0x20, 0x10, 0x08, 0x04, 0x02,                //	016)	0x2F=047	/
            0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E,                //	017)	0x30=048	0
            0x00, 0x00, 0x42, 0x7F, 0x40, 0x00,                //	018)	0x31=049	1
            0x00, 0x42, 0x61, 0x51, 0x49, 0x46,                //	019)	0x32=050	2
            0x00, 0x21, 0x41, 0x45, 0x4B, 0x31,                //	020)	0x33=051	3
            0x00, 0x18, 0x14, 0x12, 0x7F, 0x10,                //	021)	0x34=052	4
            0x00, 0x27, 0x45, 0x45, 0x45, 0x39,                //	022)	0x35=053	5
            0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30,                //	023)	0x36=054	6
            0x00, 0x01, 0x71, 0x09, 0x05, 0x03,                //	024)	0x37=055	7
            0x00, 0x36, 0x49, 0x49, 0x49, 0x36,                //	025)	0x38=056	8
            0x00, 0x06, 0x49, 0x49, 0x29, 0x1E,                //	026)	0x39=057	9
            0x00, 0x00, 0x36, 0x36, 0x00, 0x00,                //	027)	0x3A=058	:
            0x00, 0x00, 0x56, 0x36, 0x00, 0x00,                //	028)	0x3B=059	;
            0x00, 0x08, 0x14, 0x22, 0x41, 0x00,                //	029)	0x3C=060	<
            0x00, 0x14, 0x14, 0x14, 0x14, 0x14,                //	030)	0x3D=061	=
            0x00, 0x00, 0x41, 0x22, 0x14, 0x08,                //	031)	0x3E=062	>
            0x00, 0x02, 0x01, 0x51, 0x09, 0x06,                //	032)	0x3F=063	?
            0x00, 0x32, 0x49, 0x59, 0x51, 0x3E,                //	033)	0x40=064	@
            0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C,                //	034)	0x41=065	A
            0x00, 0x7F, 0x49, 0x49, 0x49, 0x36,                //	035)	0x42=066	B
            0x00, 0x3E, 0x41, 0x41, 0x41, 0x22,                //	036)	0x43=067	C
            0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C,                //	037)	0x44=068	D
            0x00, 0x7F, 0x49, 0x49, 0x49, 0x41,                //	038)	0x45=069	E
            0x00, 0x7F, 0x09, 0x09, 0x09, 0x01,                //	039)	0x46=070	F
            0x00, 0x3E, 0x41, 0x49, 0x49, 0x7A,                //	040)	0x47=071	G
            0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F,                //	041)	0x48=072	H
            0x00, 0x00, 0x41, 0x7F, 0x41, 0x00,                //	042)	0x49=073	I
            0x00, 0x20, 0x40, 0x41, 0x3F, 0x01,                //	043)	0x4A=074	J
            0x00, 0x7F, 0x08, 0x14, 0x22, 0x41,                //	044)	0x4B=075	K
            0x00, 0x7F, 0x40, 0x40, 0x40, 0x40,                //	045)	0x4C=076	L
            0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F,                //	046)	0x4D=077	M
            0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F,                //	047)	0x4E=078	N
            0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E,                //	048)	0x4F=079	O
            0x00, 0x7F, 0x09, 0x09, 0x09, 0x06,                //	049)	0x50=080	P
            0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E,                //	050)	0x51=081	Q
            0x00, 0x7F, 0x09, 0x19, 0x29, 0x46,                //	051)	0x52=082	R
            0x00, 0x46, 0x49, 0x49, 0x49, 0x31,                //	052)	0x53=083	S
            0x00, 0x01, 0x01, 0x7F, 0x01, 0x01,                //	053)	0x54=084	T
            0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F,                //	054)	0x55=085	U
            0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F,                //	055)	0x56=086	V
            0x00, 0x3F, 0x40, 0x38, 0x40, 0x3F,                //	056)	0x57=087	W
            0x00, 0x63, 0x14, 0x08, 0x14, 0x63,                //	057)	0x58=088	X
            0x00, 0x07, 0x08, 0x70, 0x08, 0x07,                //	058)	0x59=089	Y
            0x00, 0x61, 0x51, 0x49, 0x45, 0x43,                //	059)	0x5A=090	Z
            0x00, 0x00, 0x7F, 0x41, 0x41, 0x00,                //	060)	0x5B=091	[
            0xAA, 0x55, 0xAA, 0x55, 0xAA, 0x55,                //	061)	0x5C=092	обратный слеш
            0x00, 0x00, 0x41, 0x41, 0x7F, 0x00,                //	062)	0x5D=093	]
            0x00, 0x04, 0x02, 0x01, 0x02, 0x04,                //	063)	0x5E=094	^
            0x00, 0x40, 0x40, 0x40, 0x40, 0x40,                //	064)	0x5F=095	_
            0x00, 0x00, 0x03, 0x05, 0x00, 0x00,                //	065)	0x60=096	`
            0x00, 0x20, 0x54, 0x54, 0x78, 0x40,                //	066)	0x61=097	a
            0x00, 0x7F, 0x28, 0x44, 0x44, 0x38,                //	067)	0x62=098	b
            0x00, 0x38, 0x44, 0x44, 0x44, 0x20,                //	068)	0x63=099	c
            0x00, 0x38, 0x44, 0x44, 0x48, 0x7F,                //	069)	0x64=100	d
            0x00, 0x38, 0x54, 0x54, 0x54, 0x18,                //	070)	0x65=101	e
            0x00, 0x08, 0x7E, 0x09, 0x01, 0x02,                //	071)	0x66=102	f
            0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C,                //	072)	0x67=103	g
            0x00, 0x7F, 0x08, 0x04, 0x04, 0x78,                //	073)	0x68=104	h
            0x00, 0x00, 0x44, 0x7D, 0x40, 0x00,                //	074)	0x69=105	i
            0x00, 0x40, 0x80, 0x84, 0x7D, 0x00,                //	075)	0x6A=106	j
            0x00, 0x7F, 0x10, 0x28, 0x44, 0x00,                //	076)	0x6B=107	k
            0x00, 0x00, 0x41, 0x7F, 0x40, 0x00,                //	077)	0x6C=108	l
            0x00, 0x7C, 0x04, 0x18, 0x04, 0x78,                //	078)	0x6D=109	m
            0x00, 0x7C, 0x08, 0x04, 0x04, 0x78,                //	079)	0x6E=110	n
            0x00, 0x38, 0x44, 0x44, 0x44, 0x38,                //	080)	0x6F=111	o
            0x00, 0xFC, 0x24, 0x24, 0x24, 0x18,                //	081)	0x70=112	p
            0x00, 0x18, 0x24, 0x24, 0x18, 0xFC,                //	082)	0x71=113	q
            0x00, 0x7C, 0x08, 0x04, 0x04, 0x08,                //	083)	0x72=114	r
            0x00, 0x48, 0x54, 0x54, 0x54, 0x20,                //	084)	0x73=115	s
            0x00, 0x04, 0x3F, 0x44, 0x40, 0x20,                //	085)	0x74=116	t
            0x00, 0x3C, 0x40, 0x40, 0x20, 0x7C,                //	086)	0x75=117	u
            0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C,                //	087)	0x76=118	v
            0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C,                //	088)	0x77=119	w
            0x00, 0x44, 0x28, 0x10, 0x28, 0x44,                //	089)	0x78=120	x
            0x00, 0x1C, 0xA0, 0xA0, 0xA0, 0x7C,                //	090)	0x79=121	y
            0x00, 0x44, 0x64, 0x54, 0x4C, 0x44,                //	091)	0x7A=122	z
            0x00, 0x00, 0x10, 0x7C, 0x82, 0x00,                //	092)	0x7B=123	{
            0x00, 0x00, 0x00, 0xFF, 0x00, 0x00,                //	093)	0x7C=124	|
            0x00, 0x00, 0x82, 0x7C, 0x10, 0x00,                //	094)	0x7D=125	}
            0x00, 0x10, 0x08, 0x10, 0x20, 0x10,                //	095)	0x7E=126	~
            0, 0, 0, 0, 0, 0,                //	096)	0x7F=127	⌂
            0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C,                //	097)	0x80=128	А
            0x00, 0x7F, 0x49, 0x49, 0x49, 0x31,                //	098)	0x81=129	Б
            0x00, 0x7F, 0x45, 0x45, 0x45, 0x3A,                //	099)	0x82=130	В
            0x00, 0x7F, 0x01, 0x01, 0x01, 0x03,                //	100)	0x83=131	Г
            0x00, 0x60, 0x3F, 0x21, 0x3F, 0x60,                //	101)	0x84=132	Д
            0x00, 0x7F, 0x49, 0x49, 0x49, 0x41,                //	102)	0x85=133	Е
            0x00, 0x73, 0x0C, 0x7F, 0x0C, 0x73,                //	103)	0x86=134	Ж
            0x00, 0x22, 0x41, 0x49, 0x49, 0x36,                //	104)	0x87=135	З
            0x00, 0x7F, 0x10, 0x08, 0x04, 0x7F,                //	105)	0x88=136	И
            0x00, 0x7E, 0x20, 0x11, 0x08, 0x7E,                //	106)	0x89=137	Й
            0x00, 0x7F, 0x08, 0x14, 0x22, 0x41,                //	107)	0x8A=138	К
            0x00, 0x40, 0x3F, 0x01, 0x01, 0x7F,                //	108)	0x8B=139	Л
            0x00, 0x7F, 0x06, 0x08, 0x06, 0x7F,                //	109)	0x8C=140	М
            0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F,                //	110)	0x8D=141	Н
            0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E,                //	111)	0x8E=142	О
            0x00, 0x7F, 0x01, 0x01, 0x01, 0x7F,                //	112)	0x8F=143	П
            0x00, 0x7F, 0x09, 0x09, 0x09, 0x06,                //	113)	0x90=144	Р
            0x00, 0x3E, 0x41, 0x41, 0x41, 0x22,                //	114)	0x91=145	С
            0x00, 0x03, 0x01, 0x7F, 0x01, 0x03,                //	115)	0x92=146	Т
            0x00, 0x61, 0x26, 0x18, 0x06, 0x01,                //	116)	0x93=147	У
            0x00, 0x1C, 0x22, 0x7F, 0x22, 0x1C,                //	117)	0x94=148	Ф
            0x00, 0x63, 0x14, 0x08, 0x14, 0x63,                //	118)	0x95=149	Х
            0x00, 0x3F, 0x20, 0x20, 0x3F, 0x60,                //	119)	0x96=150	Ц
            0x00, 0x07, 0x08, 0x08, 0x08, 0x7F,                //	120)	0x97=151	Ч
            0x00, 0x7F, 0x40, 0x7F, 0x40, 0x7F,                //	121)	0x98=152	Ш
            0x00, 0x3F, 0x20, 0x3F, 0x20, 0x7F,                //	122)	0x99=153	Щ
            0x00, 0x01, 0x7F, 0x48, 0x48, 0x30,                //	123)	0x9A=154	Ъ
            0x00, 0x7F, 0x48, 0x78, 0x00, 0x7F,                //	124)	0x9B=155	Ы
            0x00, 0x7F, 0x48, 0x48, 0x30, 0x00,                //	125)	0x9C=156	Ь
            0x00, 0x41, 0x49, 0x49, 0x2A, 0x1C,                //	126)	0x9D=157	Э
            0x00, 0x7F, 0x10, 0x3E, 0x41, 0x3E,                //	127)	0x9E=158	Ю
            0x00, 0x66, 0x19, 0x09, 0x09, 0x7F,                //	128)	0x9F=159	Я
            0x00, 0x20, 0x54, 0x54, 0x78, 0x40,                //	129)	0xA0=160	а
            0x00, 0x3E, 0x49, 0x45, 0x45, 0x38,                //	130)	0xA1=161	б
            0x00, 0x7C, 0x54, 0x54, 0x58, 0x20,                //	131)	0xA2=162	в
            0x00, 0x7C, 0x04, 0x04, 0x0C, 0x00,                //	132)	0xA3=163	г
            0x00, 0x38, 0x45, 0x45, 0x49, 0x3E,                //	133)	0xA4=164	д
            0x00, 0x38, 0x54, 0x54, 0x54, 0x18,                //	134)	0xA5=165	е
            0x00, 0x4C, 0x30, 0x7C, 0x30, 0x4C,                //	135)	0xA6=166	ж
            0x00, 0x28, 0x44, 0x54, 0x28, 0x00,                //	136)	0xA7=167	з
            0x00, 0x7C, 0x20, 0x10, 0x7C, 0x00,                //	137)	0xA8=168	и
            0x00, 0x7C, 0x21, 0x11, 0x7C, 0x00,                //	138)	0xA9=169	й
            0x00, 0x7C, 0x10, 0x28, 0x44, 0x00,                //	139)	0xAA=170	к
            0x00, 0x40, 0x3C, 0x04, 0x04, 0x7C,                //	140)	0xAB=171	л
            0x00, 0x7C, 0x08, 0x10, 0x08, 0x7C,                //	141)	0xAC=172	м
            0x00, 0x7C, 0x10, 0x10, 0x7C, 0x00,                //	142)	0xAD=173	н
            0x00, 0x38, 0x44, 0x44, 0x44, 0x38,                //	143)	0xAE=174	о
            0x00, 0x7C, 0x04, 0x04, 0x7C, 0x00,                //	144)	0xAF=175	п
            0x00, 0xFC, 0x28, 0x44, 0x44, 0x38,                //	145)	0xE0=224	р
            0x00, 0x38, 0x44, 0x44, 0x44, 0x28,                //	146)	0xE1=225	с
            0x00, 0x04, 0x04, 0x7C, 0x04, 0x04,                //	147)	0xE2=226	т
            0x00, 0x4C, 0x50, 0x50, 0x50, 0x3C,                //	148)	0xE3=227	у
            0x00, 0x38, 0x44, 0xFE, 0x44, 0x38,                //	149)	0xE4=228	ф
            0x00, 0x44, 0x28, 0x10, 0x28, 0x44,                //	150)	0xE5=229	х
            0x00, 0x7C, 0x40, 0x40, 0x7C, 0xC0,                //	151)	0xE6=230	ц
            0x00, 0x1C, 0x10, 0x10, 0x7C, 0x00,                //	152)	0xE7=231	ч
            0x00, 0x7C, 0x40, 0x7C, 0x40, 0x7C,                //	153)	0xE8=232	ш
            0x00, 0x7C, 0x40, 0x7C, 0x40, 0xFC,                //	154)	0xE9=233	щ
            0x00, 0x04, 0x7C, 0x50, 0x70, 0x00,                //	155)	0xEA=234	ъ
            0x00, 0x7C, 0x50, 0x70, 0x00, 0x7C,                //	156)	0xEB=235	ы
            0x00, 0x00, 0x7C, 0x50, 0x70, 0x00,                //	157)	0xEC=236	ь
            0x00, 0x28, 0x44, 0x54, 0x38, 0x00,                //	158)	0xED=237	э
            0x00, 0x7C, 0x10, 0x38, 0x44, 0x38,                //	159)	0xEE=238	ю
            0x00, 0x08, 0x54, 0x34, 0x14, 0x7C,                //	160)	0xEF=239	я
];