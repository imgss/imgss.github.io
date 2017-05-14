let needTime = 1000//上升一层所需时间
function Elevtor() {
    this.tasks = [];
    this.floors = null;
    var self = this;
    var fn = (
        function(n){
        console.log('欢迎乘坐本次电梯');
        self.next();
    });
    this.tasks.push(fn);
    setTimeout(function(){
        self.next();
    },0);//第一次将所有的事件加入任务栈,在下一次循环中启动tasks
}
Elevtor.prototype.next = function(){
    var fn = this.tasks.shift();
    fn && fn();
}
Elevtor.prototype.to = function(n){
    var self = this;
    console.log(this.floor)
    if(!this.floor){
        var fn = function() {
            setTimeout(function(){
                console.log(`已到达${n}楼`);
                self.next();
            },n*needTime);
        }
        this.floor = n;
    }
    else{
        var cha = n-this.floor
        var fn = function() {
            setTimeout(function(){
                console.log(`已到达${n}楼`);
                self.next();
            },Math.abs(cha)*needTime);//这里写成Math.abs(n - this.floor)会有问题，应该是this的问题
        }
        this.floor = n; 
    }
    this.tasks.push(fn);
    return this;
}
Elevtor.prototype.wait = function(n){
    var self = this;
    var fn = function() {
        setTimeout(function(){
            console.log(`等待${n}秒`);
            self.next();
        },n*needTime);
    }
    this.tasks.push(fn);
    return this;
}
var elevtor = new Elevtor();
(function(){
    var i=1;
    setInterval(function(){
        console.log(i++)
    },needTime)
})();
elevtor.to(5).to(6).wait(3).to(1).to(5);