(function () {
    var oUl = document.getElementsByClassName('wrapper')[0];
    var oLiArr = document.getElementsByTagName('li');
    var oPrompt = document.getElementsByClassName('prompt')[0];
    var oSpan = document.getElementById('pageSpan');
    var oTop = document.getElementById('topIcon');
    var page = 1;

    function sendRequest (pageNum) {
        //服务器代理中转
        ajax('GET', 'http://localhost/waterfall/sever/getPics.php', true, 'cpage='+pageNum, dealResponse);  
    }

    sendRequest(page);

    function dealResponse (data) {
        var dataArr = JSON.parse(data);
        if (dataArr.length) {
            render(dataArr);
            page++;
            oPrompt.access = true;
        }else {
            oPrompt.innerHTML = '没有更多的图片了';
        }
    }

    function render (arr) {
        oPrompt.style.display = 'none';
        oSpan.innerText = page;    //记录已加载的页数
        arr.forEach(function (ele) {
            var oDiv = document.createElement('div');
            var img = new Image;
            oDiv.style.height = (ele.height / ele.width) * 230 + 'px';
            findPos().appendChild(oDiv);
            img.onload = function () {
                oDiv.style.backgroundImage = 'none';
                oDiv.appendChild(img);
            }
            img.src = ele.image;
            img.alt = ele.title;
        });
    }

    //找到最短的一列，即下一张图片的位置
    function findPos () {
        var len = oLiArr.length;
        var target = oLiArr[0];
        for (var i = 1; i < len; i++) {
            if (target.offsetHeight == 0) {
                break;
            }
            oLiArr[i].offsetHeight < target.offsetHeight ? target = oLiArr[i] : ''; 
        }
        return target;
    }

    //图片懒加载
    window.onscroll = function () {
        var dis = window.pageYOffset + document.documentElement.clientHeight;
        if (oPrompt.access && Math.abs(dis - findPos().offsetHeight) < 20) {
            oPrompt.access = false;
            oPrompt.style.display = 'block';
            sendRequest(page);
        }
    }

    //实现点击按钮回到顶部的功能
    oTop.onclick = function () {
        var iSpeed;
        var iCur;
        var timer = setInterval(function () {
            iCur = window.pageYOffset;
            iSpeed = iCur * 0.8;
            iSpeed = Math.ceil(iSpeed) < 6 ? --iSpeed : Math.ceil(iSpeed);
            window.scrollTo(0, iSpeed);
            iCur == 0 ? clearInterval(timer) : '';
        }, 20);
    }
})()