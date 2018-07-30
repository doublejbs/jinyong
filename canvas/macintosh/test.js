
window.onload = function(){
    var canvas = document.getElementById('mycanvas');
    var context = canvas.getContext('2d');
      
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var balls = [];
    

    
    
    canvas.addEventListener('mousemove', function(event){
        
        
        console.log('mousemove');
        console.log(context);
        if(event.clientX%100 < 10){
            
        
        newBall = {
          x:event.clientX+10,
          y:0,
          r:50,
          c:getRandomColor(),
          vx:0,
          vy:0,
          ay:1,
          end:false
        };
        balls.push(newBall);
        }
        
        
        
    });
    
    
    function animate(){
        
        context.clearRect(0,0,canvas.width,canvas.height);
        if(balls.length > 50){
            balls.splice(0,1);
            console.log('delete');
        }
        
        
        
        for(var i=0; i<balls.length; i++){
            
            var grd=context.createRadialGradient((balls[i].x-20),(balls[i].y-20),5,balls[i].x,balls[i].y,50);
                grd.addColorStop(0,"white");
                grd.addColorStop(1,balls[i].c);
            
            if(!balls[i].end){
                
                context.fillStyle = grd;
                context.beginPath();
                context.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI,true);
                context.fill();
                context.closePath();
                balls[i].vy += balls[i].ay;

                if(balls[i].y + balls[i].vy < canvas.height-50){
                    balls[i].y += balls[i].vy;
                }
            }
            
            if(balls[i].end){
               context.beginPath();
                context.fillStyle = grd;
                context.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI,true);
                context.fill();
            }
            
            
        }
        detectCollision(balls);
        
        
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    

}


function getRandomColor() {
  // creating a random number between 0 and 255
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
 
  // going from decimal to hex
  var hexR = r.toString(16);
  var hexG = g.toString(16);
  var hexB = b.toString(16);
 
  // making sure single character values are prepended with a "0"
  if (hexR.length == 1) {
    hexR = "0" + hexR;
  }
 
  if (hexG.length == 1) {
    hexG = "0" + hexG;
  }
 
  if (hexB.length == 1) {
    hexB = "0" + hexB;
  }
 
  // creating the hex value by concatenatening the string values
  var hexColor = "#" + hexR + hexG + hexB;
   
  return hexColor.toUpperCase();
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function detectCollision(balls){
    var n = balls.length;
    while(n--){
        var ball1 = balls[n];
        var c = balls.length-1;
        
        while(c--){
            if(n==c) continue;
            var ball2 = balls[c];
            var distX = ball1.x - ball2.x;
            var distY = ball1.y - ball2.y;
            
            var dist = Math.sqrt(distX * distX + distY * distY) - (ball1.r + ball2.r);
            
            if (dist < 0){
                ball1.end = true;
                ball2.end = true;
            }
        }
    }  
}










