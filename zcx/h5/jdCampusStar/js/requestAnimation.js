var fps = 30;
var pause = false;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function tick() {
     if(pause)
          return;
 　　if(window.requestAnimationFrame)
     {
　　　　requestAnimationFrame(tick);
　　    now = Date.now();
　　    delta = now - then;
　　    if (delta > interval) {
        // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
　　　　    then = now - (delta % interval);
　　　　    draw(); // ... Code for Drawing the Frame ...
　　    }
     }
     else
     {
        setTimeout(tick, interval);
　　　　draw();
     }
}
tick();

