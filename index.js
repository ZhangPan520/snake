config = {
    container: document.getElementsByClassName("container")[0],
    size:10,
    xMax:49,
    yMax:49,
    score:document.getElementsByClassName("score")[0]
}
function snakeItem(x,y){
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
    this.direction="right";
    this.dom = document.createElement('div');
    config.container.append(this.dom);
    this.show();
}
snakeItem.prototype.show = function(){
    this.dom.style.left = this.x*config.size + "px";
    this.dom.style.top = this.y*config.size + "px";
}
snakeItem.prototype.setPosition = function(x,y){
    this.x = x;
    this.y = y;
    this.show();
}
snakeItem.prototype.setPrevItem = function(setPrevItem){
    this.prev = setPrevItem;
    setPrevItem.next =this;
}
snakeItem.prototype.setNextItem = function(nextItem){
    this.next = nextItem;
    nextItem.prev = this;
}
snakeItem.prototype.moveForward = function(){
    if(this.next != null){
        this.next.moveForward();
    }
    if(this.prev != null){
        this.x = this.prev.x;
        this.y = this.prev.y;
    }
    this.setPosition(this.x,this.y);
}
function snake(length){
    this.length = length;
    var item = null;
    this.timer=null;
    for(var i = 0;i < length;i++){
        var newItem = new snakeItem(i,0);
        if(item === null){
            item = newItem;
        }else{
            item.setPrevItem(newItem);
            item = newItem;
        }
        if(i == length - 1){
            this.head = newItem;
            this.head.dom.className = "active";
        }
    }
}
var x = new snake(1);
snake.prototype.moveNext = function(){
    this.head.moveForward();
    this.getNextPosition();
    this.isCanmove();
    this.head.setPosition(this.head.x,this.head.y)
}
snake.prototype.getNextPosition = function(){
    if(this.head.direction == "right"){
        this.head.x++
    }
    if(this.head.direction =="left"){
        this.head.x--;
    }
    if(this.head.direction =="up"){
        this.head.y--;
    }
    if(this.head.direction == "down"){
        this.head.y++;
    }
}
snake.prototype.change = function(newDirection){
    if(this.head.direction == "right" || this.head.direction=="left"){
        arrows = ["up","down"];
    }else{
        arrows = ["right","left"];
    }
    if(arrows.includes(newDirection)){
        this.head.direction = newDirection;
    }
}
snake.prototype.isCanmove = function(){
    if(this.head.x<0||this.head.x>config.xMax){
        alert("游戏结束");
        clearInterval(x.timer);
        return true;
    }   
    if(this.head.y<0||this.head.y>config.yMax){
        alert("游戏结束");
        clearInterval(x.timer);
        return true;
    }
    var item = this.head;
    while(item = item.next){
        if(this.head.x === item.x&&this.head.y===item.y){
            alert("游戏结束");
            clearInterval(x.timer);
            return true;
        }
    }
}
window.onkeydown = function(e){
    if(e.key =="ArrowUp"){
        this.x.change("up");
        this.x.moveNext()
    }else if(e.key =="ArrowDown"){
        this.x.change("down");
        this.x.moveNext()
    }else if(e.key =="ArrowRight"){
        this.x.change("right");
        this.x.moveNext()
    }else{
        this.x.change("left");
        this.x.moveNext()
    }
}
snake.prototype.moveAuto = function (){
    clearInterval(this.timer);
    var item = new snakeItem(Math.floor(Math.random()*50),Math.floor(Math.random()*50));
    item.dom.style.backgroundColor = "yellow";
    var a = this;
    this.timer = setInterval(function (){
        a.moveNext();
        var x = a.add(item);
        if(x){
           item = new snakeItem(Math.floor(Math.random()*50),Math.floor(Math.random()*50));
           item.dom.style.backgroundColor = "rgb(Math.random()*250,Math.random()*250,Math.random()*250)"
        }
        scores = a.length*10;
        config.score.innerText = scores + "分";
    }, 250);
}
x.moveAuto()
snake.prototype.add = function(item){
    var tail = this.head;
    while(tail.next){
        tail = tail.next;
    }
    if(this.head.x ==item.x&&this.head.y==item.y){
        tail.setNextItem(item);
        this.length++;
        return true;
    }
}
