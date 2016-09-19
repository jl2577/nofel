CIRCLE_RADIUS = 9; //小圆半径
CIRCLE_GAP = 2; //小圆之间的间隔
CIRCLE_COLOR = 'rgba(0,0,255,0.7)'; //小圆的颜色
NUM_WIDTH = (CIRCLE_RADIUS + CIRCLE_GAP) * 2 * 7; //小圆之间的间隔为2
NUM_HEIGHT = (CIRCLE_RADIUS + CIRCLE_GAP) * 2 * 10; //(5+2)*2*10
COLON_WIDTH = (CIRCLE_RADIUS + CIRCLE_GAP) * 2 * 4; //(5+2)*2*4 小圆之间的间隔为2
NUM_LEFT = 80; //次一个数字的左边距
NUM_TOP = 80; //第一个数字的上边距
NUM_GAP = 10; //数字之间的间隔
CLIENT_WIDTH = window.innerWidth; //画布长
CLIENT_HEIGHT = window.innerHeight; //画布高
SPEED = 6;

var color_balls = []; //ball{x:1700,y:100,vx:-5,vy:-5,g:2,color:"red"} //彩色球集合
var color_list = ["#00FF00", "#4B0082", "#7CFC00", "#8A2BE2", "#9ACD32", "#C71585", "#DC143C", "#FF0000", "#FFD700", "#0000FF"]; //彩色球颜色集合
var currentTime = new Date();
window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = CLIENT_WIDTH;
    canvas.height = CLIENT_HEIGHT;
    var ctx = canvas.getContext('2d');
    setInterval(function() {
        Timer(ctx);
    }, 50);
}

function Timer(ctx) {
    ctx.clearRect(0, 0, CLIENT_WIDTH, CLIENT_HEIGHT); //清除画布，重新绘制
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var pHour = currentTime.getHours();
    var pMin = currentTime.getMinutes();
    var pSec = currentTime.getSeconds();
    currentTime = time;

    DrawNum(NUM_LEFT, NUM_TOP, Math.floor(hour / 10), ctx);
    DrawNum(NUM_LEFT + NUM_GAP + NUM_WIDTH, NUM_TOP, (hour % 10), ctx);

    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 2, NUM_TOP, 10, ctx); //绘制冒号

    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 2 + (COLON_WIDTH + NUM_GAP), NUM_TOP, Math.floor(min / 10), ctx);
    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 3 + (COLON_WIDTH + NUM_GAP), NUM_TOP, (min % 10), ctx);

    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 4 + (COLON_WIDTH + NUM_GAP), NUM_TOP, 10, ctx); //绘制冒号

    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 4 + (COLON_WIDTH + NUM_GAP) * 2, NUM_TOP, Math.floor(sec / 10), ctx);
    DrawNum(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 5 + (COLON_WIDTH + NUM_GAP) * 2, NUM_TOP, (sec % 10), ctx);

    //数字发生变化时加入到彩色球组中
    if (Math.floor(pHour / 10) != Math.floor(hour / 10)) {
        addBalls(NUM_LEFT, NUM_TOP, Math.floor(hour / 10));
    }
    if ((pHour % 10) != (hour % 10)) {
        addBalls(NUM_LEFT + NUM_GAP + NUM_WIDTH, NUM_TOP, (hour % 10));
    }
    if (Math.floor(pMin / 10) != Math.floor(min / 10)) {
        addBalls(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 2 + (COLON_WIDTH + NUM_GAP), NUM_TOP, Math.floor(min / 10));
    }
    if ((pMin % 10) != (min % 10)) {
        addBalls(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 3 + (COLON_WIDTH + NUM_GAP), NUM_TOP, (min % 10));
    }
    if (Math.floor(pSec / 10) != Math.floor(sec / 10)) {
        addBalls(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 4 + (COLON_WIDTH + NUM_GAP) * 2, NUM_TOP, Math.floor(sec / 10));
    }
    if ((pSec % 10) != (sec % 10)) {
        addBalls(NUM_LEFT + (NUM_GAP + NUM_WIDTH) * 5 + (COLON_WIDTH + NUM_GAP) * 2, NUM_TOP, (sec % 10));
    }

    updateBalls();
    DrawColorBalls(ctx);
}

function updateBalls() {
    for (var i = 0; i < color_balls.length; i++) {
        color_balls[i].x += color_balls[i].vx;
        color_balls[i].vy += color_balls[i].g;
        color_balls[i].y += color_balls[i].vy;
        if (color_balls[i].y + CIRCLE_RADIUS > CLIENT_HEIGHT) {
            color_balls[i].vy = -color_balls[i].vy * 0.75;
            color_balls[i].y = 2 * CLIENT_HEIGHT - color_balls[i].y + color_balls[i].vy;
            if (Math.abs(color_balls[i].vy) < 2) {
                color_balls[i].y = CLIENT_HEIGHT - CIRCLE_RADIUS;
                color_balls[i].vy = 0;
            }
            //color_balls[i].y=CLIENT_HEIGHT - CIRCLE_RADIUS;
        }
    }

    for (var i = 0; i < color_balls.length; i++) {
        if (color_balls[i].x < -CIRCLE_RADIUS || color_balls[i].x > CLIENT_WIDTH) {
            removeBall(color_balls, color_balls[i]);
        }
    }
}

//array 中删除一个元素
function removeBall(array, obj) {
    var index = array.indexOf(obj);
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var ball = {};
                ball.x = x + (CIRCLE_RADIUS + 2) * (j * 2 + 1);
                ball.y = y + (CIRCLE_RADIUS + 2) * (i * 2 + 1);
                ball.vx = Math.floor(Math.random() * 10) > 5 ? SPEED : -SPEED;
                ball.vy = -SPEED - 5;
                ball.g = 1.5 + Math.random();
                ball.color = color_list[Math.floor(Math.random() * 10)];
                color_balls.push(ball);
            }
        }
    }
    console.log(color_balls.length);
}

function DrawNum(x, y, num, ctx) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.fillStyle = CIRCLE_COLOR;
                ctx.arc(x + (CIRCLE_RADIUS + 2) * (j * 2 + 1), y + (CIRCLE_RADIUS + 2) * (i * 2 + 1), CIRCLE_RADIUS, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

function DrawColorBalls(ctx) {
    for (var i = 0; i < color_balls.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = color_balls[i].color;
        ctx.arc(color_balls[i].x, color_balls[i].y, CIRCLE_RADIUS, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}
