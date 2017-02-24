(function () {
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("#main>ul>li");
    var winW = window.innerWidth;
    /*设备的宽*/
    var winH = window.innerHeight;
    /*设备的高*/
    var desW = 640;
    /*设计稿的宽*/
    var desH = 1008;
    /*设计稿的高*/

    if (winW / winH <= desW / desH) {
        main.style.webkitTransform = "scale(" + winH / desH + ")";
    } else {
        main.style.webkitTransform = "scale(" + winW / desW + ")";
    }

    //实现上下滑动的效果
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });
    function start(e) {
        this.startX= e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;//0是第一个触摸点的索引；
    }

    function move(e) {
        this.style.webkitTransform="";
        var moveX = e.changedTouches[0].pageX;
        var moveY = e.changedTouches[0].pageY;
        var movePos = moveY - this.startY;//移动的距离
        var index = this.index;
        [].forEach.call(oLis,function(){
            if(arguments[1]!=index){
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
        });
        if (movePos > 0) {/*下滑*/
            //获取上一张索引
            this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
            var duration = -desH+movePos;
        } else if (movePos < 0) {/*上滑*/
            //获取下一张索引
            this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
            var duration = desH+movePos

        }

        oLis[this.prevsIndex].className = "zIndex";
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
        this.style.webkitTransform="scale("+(1-Math.abs(movePos/winH))+") translate(0,"+movePos+"px)";
    }

    function end(e) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "1s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";//清除动画积累
        },false);
    }


})();
