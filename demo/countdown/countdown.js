jQuery.fn.countdown = (function(){
    //计算出两个时间之间的间隔
    function timeFromNow(s2){
        var s1 = Date.now();
        var total = parseInt((s2 - s1)/100);
        
        if(total <= 0){
            return {
                h: '00',
                m: '00',
                s: '00',
                ss: '00',
                stop: true
            }
        }
        var ss = total % 10,
            s = parseInt(total % 600 / 10)+'',
            m = parseInt(total % 36000 / 600)+'',
            h = parseInt(total % 864000 / 36000)+'';
            d = parseInt(total / 864000)+'';
        (s.length === 1) && (s =  '0' + s);
        (m.length === 1) && (m =  '0' + m);
        (h.length === 1) && (h =  '0' + h);
        return {d, h, m, s, ss}
    }
    return function(options){
        var target = this.data('target');
        if(!target) {
            return;
        }
        var target_ms = new Date(target).getTime();
        var that = this;
        function setTime(){
            var time = timeFromNow(target_ms);
            that.html(time.h+':'+time.m+':'+time.s+":"+time.ss);
            if(!time.stop){
                requestAnimationFrame(setTime);
            }
        }
        requestAnimationFrame(setTime);
    }
})();