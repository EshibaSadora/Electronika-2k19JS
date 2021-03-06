//-------------------------------------------------------------------------------------------
//                               Модуль управления дисплеем
//-------------------------------------------------------------------------------------------

function Main(){
    let display = new DISPLAY();
    display.draw();
}


class DISPLAY {
    constructor(){
        var BUFFER = new Array; //Хранилище изображения
        var DISPLAYX = 256; //Размер дисплея по X
        var DISPLAYY = 256; //Размер дисплея по Y
        var a = 0;
    }

    draw(){
        var color = false;
        var example = document.getElementById("example"),
        ctx  = example.getContext('2d');
        example.width  = 1000;
        example.height = 1000;
    
        var image = document.getElementById('source');
    
        for(var y = 0; y < 256; y++){   
            for(var x = 0;x < 256; x++){
                ctx.fillStyle = "black";
                if(x == a)ctx.fillStyle = "red";                      
                ctx.fillRect(x*3, y*3, 3, 3);        
            }
        }
        if(a>256)a=0;
        a++;
    }
}