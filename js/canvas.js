(function() { //来自网络
    var canvas = document.querySelector('canvas'),
        header = document.querySelector('.page-header');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;

    var mousePosition = {
        x: 50 * canvas.width / 100,
        y: 50 * canvas.height / 100
    };

    var dots = { //dots集合
        nb: null, //数量
        distance: null,
        d_radius: null,
        array: []
    };

    function setWidthHeight() { //dot的数量随窗口变化而变化
        canvas.width = parseFloat(window.getComputedStyle(header, null).width);
        canvas.height = parseFloat(window.getComputedStyle(header, null).height);
        dots.nb = Math.min(300, Math.max(50, parseInt(200 * canvas.width / 1000)));
        // 重点在于改变要显示的dots数量之后，如果
        // createDots没有创建那么多，就会有空引用，所以，初始化时就创建300个dots,在
        // 绘制时根据resize取出50——300个进行绘制，这样不会出现dot.y没有定义的错误
        dots.distance = Math.max(30, parseInt(50 * canvas.width / 1000));
        dots.d_radius = Math.max(10, parseInt(30 * canvas.width / 1000));
        //console.log(dots);

    }


    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }

    function createColorStyle(r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    function averageColorStyles(dot1, dot2) { //生成两点的中间色值
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    function Color(min) { //color构造函数
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    function Dot() { //dot 构造函数
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random(); //dot的x速度
        this.vy = -.5 + Math.random(); //dot的y速度

        this.radius = Math.random() * 2;

        this.color = new Color();
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
        for (i = 0; i < 300; i++) {
            dots.array.push(new Dot());
        }
    }

    function moveDots() {
        for (i = 0; i < dots.nb; i++) {

            var dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }

    function connectDots() { //连结dots
        for (i = 0; i < dots.nb; i++) {
            for (j = 0; j < dots.nb; j++) {
                i_dot = dots.array[i];
                j_dot = dots.array[j];

                if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                    if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
    }

    function drawDots() {
        for (i = 0; i < dots.nb; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(51,51,51)';
        ctx.rect(0, 0, canvas.width, canvas.height); //画点
        ctx.fill();
        moveDots();
        connectDots();
        drawDots();

        requestAnimationFrame(animateDots);
    }
    createDots();

    header.addEventListener('mousemove', function(e) {
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    });

    header.addEventListener('mouseleave', function(e) {
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    });
    window.addEventListener('resize', setWidthHeight);
    requestAnimationFrame(animateDots);
})();