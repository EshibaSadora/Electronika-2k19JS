
var a = 0;

setInterval(draw, 0);


function draw(){
    var color = false;
    var example = document.getElementById("example"),
    ctx  = example.getContext('2d');
    example.width  = 200;
    example.height = 200;

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


