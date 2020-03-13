//-------------------------------------------------------------------------------------------
//                               Преобразование типов данных
//-------------------------------------------------------------------------------------------


function ShortTo2Byte(short) {
    var out = new Array();
    out[0] = parseInt(short / 0xFF);
    out[1] = parseInt(short - (out[0]*0xFF));
    console.log(out);

    return out;
}

function Byte2ToShort(input) {
    var out = Number(input[0]*0xFF) + Number(input[1]);
    return out;
}

function Byte2ToShort(H,L) {
    var out = Number(H*0xFF) + Number(L);
    return out;
}

function ByteToBool(value) {
    size = 8;
    output = new Array();
    for (i = 0; i < size; i++) {
        output[i] = ((value & (1 << size - 1 - i)) != 0);
    }
    return output;
}