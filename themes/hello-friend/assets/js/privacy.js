// 获取ip
function getIpInfo() {
    var path = 'https://myip.ipip.net/';
    if (path !== undefined) {
        var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
        httpRequest.open('GET', path + '?imageAve', true); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var info = httpRequest.responseText; //获取到json字符串，还需解析

                var ipresult = info.split("  ");

                const ip = ipresult[0].split("：")[1];
                document.getElementById("userAgentIp").innerHTML = ip;
                const c2 = ipresult[1].split("：")[1].split(" ");
                document.getElementById("userAgentCountry").innerHTML = c2[0];
                document.getElementById("userAgentRegion").innerHTML = c2[1];
                document.getElementById("userAgentCity").innerHTML = c2[2];
                const isp = ipresult[2];
                document.getElementById("userAgentIsp").innerHTML = isp;
            }
        };
    } else {
        console.log('获取信息失败');
    }

    var uaInfo = navigator.userAgent;
    document.getElementById("userAgentDevice").innerHTML = uaInfo;
}
