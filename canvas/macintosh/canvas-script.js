window.onload = function() {
    var canvas = document.getElementById('mycanvas');
    var context = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = window.innerHeight-30;
    
    
    
    var img = new Image();
    img.src = './test.png';
    
    
    
    
    img.addEventListener('load', function(){
        var posX = 0;
        var posY = 0;
        var halfX = img.width/2;
        var halfY = img.height/2;
        context.drawImage(img, 0, 0);
        draw(posX,posY,halfX,halfY);
        console.log(halfX);
        
    }, false);
    
    
    
    function draw(posX,posY,halfX,halfY){
        
        var grd = context.createLinearGradient(halfX,posY,halfX,halfY);
        grd.addColorStop(1,'gray');
        grd.addColorStop(0,'white');
        context.beginPath();
        context.fillStyle = grd;
        context.arc(halfX,halfY,halfX-7.8,0,1*Math.PI,true);
        context.fill();
        context.closePath();
        
        context.beginPath();
        context.fillStyle = 'white';
        context.rect(posX,halfY,img.width,img.height);
        context.fill();
        
        
    }
}

