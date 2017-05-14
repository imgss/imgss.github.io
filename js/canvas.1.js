var dooot=(function() {
    var tScale = window.devicePixelRatio,
        canvas = document.querySelector('canvas'),
        header = document.querySelector('.page-header'),
        dotMaxRad = 5 * tScale,
        maxCount = 25,
        background = '#24292e';
    ctx = canvas.getContext('2d');
    ctx.lineWidth = .2;
    ctx.strokeStyle = (new Color(150)).style;
    var mousePosition = {
        x: 50 * canvas.width / 100,
        y: 50 * canvas.height / 100
    };

    var dots = { //dots集合
        num: null, //数量
        distance: 10,
        d_radius: null,
        array: []
    };

    function setWidthHeight() { //dot的数量随窗口变化而变化

        var parentWidth = parseFloat(window.getComputedStyle(header, null).width);
        var parentHeight = parseFloat(window.getComputedStyle(header, null).height);

        canvas.style.width = parentWidth + "px";
        canvas.style.height = parentHeight + "px";
        canvas.width = parentWidth * tScale;
        canvas.height = parentHeight * tScale;
        dots.num = Math.min(maxCount, parseInt(100 * parentWidth / 1000));
        // 重点在于改变要显示的dots数量之后，如果
        // createDots没有创建那么多，就会有空引用，所以，初始化时就创建300个dots,在
        // 绘制时根据resize取出50——300个进行绘制，这样不会出现dot.y没有定义的错误
        dots.d_radius = Math.max(10, parseInt(30 * canvas.width / 1000));
        //console.log(dots);

    }


    function colorValue(min) {
        //return parseInt(255*Math.random());颜色随机
        return 240;
    }

    function createColorStyle(r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function mixComponents(comp1, weight1, comp2, weight2) {
        return(comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    function averageColorStyles(dot1, dot2) { //生成两点的中间色值
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    function Color(min = 0) { //color构造函数
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    function Dot(x,y,color) { //dot 构造函数
        console.log(x,y)
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;

        this.vx = (-.3 + 0.6 * Math.random()) * tScale; //dot的x速度,手机端要乘以tScale
        this.vy = -.3 + 0.6 * Math.random() * tScale; //dot的y速度

        this.radius = Math.max(2, Math.random() * dotMaxRad);

        this.color = color || new Color(200);
        this.connectNum = 0; //记录有几个点与之相连
    }

    Dot.prototype = { //每一个实例继承的方法
        draw: function() {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //画点
            ctx.fill();
        }
    };

    function createDots() { //dots数组
        setWidthHeight();
        for(i = 0; i < maxCount; i++) {
            dots.array.push(new Dot());
        }
    }

    function moveDots() {
        for(i = 0; i < dots.array.length; i++) {

            var dot = dots.array[i];

            if(dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if(dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    function merryDots(){
        for(i = 0; i < dots.array.length; i++) {
            let i_dot = dots.array[i];
            if(i_dot.merry) continue;
            for(j = 0; j < dots.array.length; j++) {
                let j_dot = dots.array[j];
                if (i==j  || j_dot.merry || i_dot.color.style == j_dot.color.style) continue;

                if((i_dot.x - j_dot.x) < dots.distance &&
                    (i_dot.y - j_dot.y) < dots.distance &&
                    (i_dot.x - j_dot.x) > -dots.distance && 
                    (i_dot.y - j_dot.y) > -dots.distance) {
                        j_dot.vx = i_dot.vx;
                        j_dot.vy = i_dot.vy;
                        i_dot.merry=true;
                        j_dot.merry=true;
                        break;
                    }
            }}
    }

    function distance(d1, d2) {
        return Math.sqrt((d2.x - d1.x) * (d2.x - d1.x) + (d2.y - d1.y) * (d2.y - d1.y));

    }

    function drawDots() {
        for(i = 0; i < dots.array.length; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    function animateDots() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = background;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        moveDots();
        merryDots();
        drawDots();
        msg();
        requestAnimationFrame(animateDots);
    }
    function cp(){
        let count=0;
        for (let dot of dots.array){
            if(dot.merry){
                count++;
            }
        }
        return{dots:dots.array.length,cp:count/2};
    }
    function msg(){
        let msg = cp();
        ctx.font = "10px Courier New";
        //设置字体填充颜色
        ctx.fillStyle = "yellow";
        //从坐标点(50,50)开始绘制文字
        ctx.fillText(`dots:${msg.dots},cp:${msg.cp}`, 20, 20);
        ctx.fillText(`click to add dot`, 20, 33);
    }
    setInterval(cp,1000);

    window.addEventListener('resize', setWidthHeight);
    createDots();
    requestAnimationFrame(animateDots,5);

    return {dot:Dot,dots}
})();