---
title: "Linux架设CS1.6服务器教程"
categories: ["分享"]
tags: ["CS","Ubuntu","server","服务器","linux","red hat"]
draft: false
slug: "linux-counter-strike-server"
date: "2012-03-21 13:07:07"
---

<blockquote>　　<strong>前言</strong>：由于linux系统的高性能和稳定性，非常适合作为cs1.6这种对服务器硬件要求较高的服务端，（服务器端可达到1000fps），因此国外绝大多数的cs1.6服务器均采用linux做为服务器的操作系统。本文也只针对linux系统下架设cs1.6服务器及其扩展功能展开讨论，本文借鉴了网络上前人的经验，在此对他们无私的奉献表示感谢！这是本人第一次写cs.16服务器教程，难免存在疏漏或错误，希望各位同仁批评指正！
（本文最初发表在点通论坛，如需转载，请注明出处！作者：<a href="http://www.dt-club.net/forum.php?mod=viewthread&tid=46567" target="_blank">disremember</a>）</blockquote>
<strong>第一部分：</strong>
　　将涉及到网络的一些基础知识，以及linux的系统一些必要的基本命令、远程登陆工具的下载和使用方法，有了这些基础知识，将会使我们能较为顺利地完成cs.16服务器在linux系统下的成功架设和调试。
１、本文假设你已经具备有一台运行着的linux操作系统的服务器，并且掌握着root密码（我写教程的测试系统是red hat linux 5.4）；
２、这台服务器至少有一块网卡，网卡配置一个固定的局域网ip地址，例如：192.168.11.77
３、这台服务器必须物理连接在你单位的局域网网络，其他机器能访问的到；
４、（不是必须）为了让互联网上的玩家刷出你的服务器并能进入，你的路由器必须映射一个物理ip地址（即互联网ip）到这台服务器，例如：219.148.149.87
路由器做物理ip映射的方法是配置nat参数，以（思科cisco3700）为例：
<blockquote># ip nat inside source static 192.168.11.77 219.148.149.87</blockquote>
５、为了不使接下来的工作出现困惑，我们建议暂时关闭linux防火墙，
请在linux服务器上执行下面命令来暂时关闭防火墙：
<blockquote>＃service iptables stop</blockquote>
（注意：关闭linux防火墙是十分危险的，我们将在第四部分详细讨论linux防火墙设置）

以上的前期准备完成之后，我们将从一台winXP系统的pc电脑来远程操作那台linux服务器，即远程安装cs.16服务端。

提示：
我们将使用PieTTY.exe这个小软件来远程登录linux服务器，PieTTY遵循一种较新的叫做ssh的协议，ssh这是比telnet更好的协议，安全且快捷，使用端口22。在PieTTY的linux仿真终端窗口中远程操作就好像在那台服务器上操作一样。

首先，我们先来下载PieTTY，下载后请把它放在你的windows桌面，然后双击执行，在打开的小窗中输入远程linux服务器的ip地址，单击[Open]进入linux仿真终端窗口，输入用户名root和口令。
如果登录失败，可能的原因有３个：
第一个原因，是你在PieTTY里填入的ip或密码不正确，请核对你的参数是否正确，
第二个原因，是linux服务器的ssh服务未启动，如果是这种情况，那就需要我们到那台linux服务器上，来手动启动ssh服务，启动ssh的命令是：
<blockquote># /etc/init.d/sshd start</blockquote>
如果ssh正常启动，系统会提示....ok

你可以使用下面命令来查看ssh服务是否已经工作了
<blockquote>＃netstat -anp | grep sshd</blockquote>
第三个原因，是linux防火墙阻拦，请确认服务器防火墙已关闭（参照第一部分５）

然后返回到WinXp的电脑上

至此，我们以后工作将在PieTTY的linux终端窗口中完成，即所有linux命令在这个窗口里输入和执行，
下面我们正式开始：
１、在linux系统中建立一个目录，我们先进入系统的/home分区，然后建立一个新目录hlds_l_4617（因为我下载的是4617版本的cs1.6，所以用版本号以示区别），之后进入新建的目录，命令如下：
<blockquote># cd /home
# mkdir hlds_l_4617
# cd hlds_l_4617</blockquote>
  
２、输入下面命令下载cs1.6 服务器专用下载工具
<blockquote># wget http://storefront.steampowered.com/download/hldsupdatetool.bin</blockquote>
看到上面的画面提示，说明专用工具hldsupdatetool.bin已经下载完成了。

３、给刚下载回来的hldsupdatetool.bin授予可执行权限，命令如下：
<blockquote># chmod 0755 hldsupdatetool.bin</blockquote>（注：如果你未用chmod命令给一个文件授权可执行，linux系统会提示"Permission denied（无执行权限）"错误。 可见，linux的安全机制确实是windows2003无法比拟的，所以即便一个病毒程序已经进入到linxu中，如果服务器的操作员不用chmod命令授予它可执行权限，那病毒程序也是无法发作的）

４、现在执行hldsupdatetool.bin程序，来释放出steam程序（steam才是真正下载cs1.6服务器全部文件的关键程序），命令如下：
<blockquote># ./hldsupdatetool.bin</blockquote>
这个命令执行过程中你会遇到是否真正的下载的提示，请回答yes，然后【回车】。
  
命令执行的结果是，我们得到steam和readme.txt两个文件，其中readme.txt文件是说明文件，steam是我们要得到的可执行文件。
--------------------------------------------------------------------------
注意：在更高版本的linux系统中执行./hldsupdatetool.bin时，可能会提示如下错误：
sh: uncompress: command not found 
此时请先执行下面命令，之后重新执行./hldsupdatetool.bin
<blockquote># ln -s /usr/bin/gunzip /usr/bin/uncompress</blockquote>--------------------------------------------------------------------------

５。下面我们执行steam程序开始下载cs1.6服务端的全部文件（因为valve公司服务器在国外，所以在国内下载过程时间比较长，我的光纤网络也整整用了一个晚上，这个命令如下：
<blockquote># ./steam -command update -game cstrike -dir . -retry</blockquote>
参数说明：
-game cstrike　：这个参数告诉steam你要下载的是反恐精英cs1.6（如果你需要下载的是【反恐精英－起源】那么把这个参数改为-game "Counter-Strike Source"）
-dir　：意思是将全部文件下载到当前目录，我们当前的目录是/home/hlds_l_4617
-retry　：网络断线自动重新尝试下载，即断点续传

现在你可以睡一觉或干点别的了，耐心等待它下载完成。
<strong>第二部分：</strong>
　　讲述使用hldsudatetool.bin专用工具下载hlds（cs1.6服务端程序）最新版本，以及当前最新版本4617（４８协议）的hlds服务端的安装与调试。（注：.bin扩展名文件是red hat linux系统下的可执行程序，就像win系统下的.exe程序一样）

经过艰难而又漫长的下载过程，我们终于得到了linux下架设cs.16服务器全部服务端文件和l程序，令人激动的时刻即将来临，现在到了把它运行起来的时候了，我们将真正拥有属于我们自己的cs.16服务器了。

执行启动命令：
<blockquote># ./hlds_run -binary ./hlds_i686 -console -game cstrike -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv</blockquote>
参数说明：
hlds_i686     适用于Inter公司的cpu，如果你服务器cpu是AMD，请把参数改为：hlds_amd或hlds_amd64
-console      控制台模式
-insecure     屏蔽官方AVC反作弊（使D版客户端能登录）
-pingboost 3     服务器加速（此为linux下专用参数，而win32下使用插件方式加速）
-port 27015      玩家客户端登录端口
+maxplayers 32     允许的最大玩家数
+map de_dust2     启动时加载的地图
+sv_lan 0       为0时，允许互联网/局域网都可登录，为1时，只允许局域网登录
-noipx    不使用ipx网络协议
-nojoy    不支持摇杆
-nohltv   关闭视频广播

上面命令打在一行上，不要分行。
  
当你看到上面的信息，那么祝贺你，说明你的cs1.6服务器已经正常运行起来了！

*注意1：有可能在第一次启动hlds时报如下错误
-------------------------------------------------------------------
scandir failed:/home/hlds_l_4617/valve/SAVE
scandir failed:/home/hlds_l_4617/platform/SAVE
-------------------------------------------------------------------
说明缺少这2个目录未建立，请建立所需的目录
<blockquote># mkdir /home/hlds_l_4617/valve/SAVE
# mkdir /home/hlds_l_4617/platform/SAVE</blockquote>
*注意2: 也可能报下面的错误
-----------------------------------
couldn't exec listip.cfg
couldn't exec banned.cfg
------------------------------------
说明缺少这2个文件未建立，请建立它们:（空文件即可）
<blockquote># sudo vi /home/hlds_l_4617/cstrike/listip.cfg
#sudo vi /home/hlds_l_4617/cstrike/banned.cfg</blockquote>
说明:
--------------------------------------------------------
listip.cfg              存放的是踢出的玩家ip
banned.cfg         存放的是被管理员封禁的玩家ip
---------------------------------------------------------

这个cs1.6服务器搭建起来了，但现在我们拥有的是个干净的且纯正版的服务器，只有新版本（４８协议）且正版cs1.6客户端（如4554）的玩家才可以进入，但D版和低版本（４７协议）的客户端玩家还不能进。我们将在接下来的部分讨论如何利用dproto插件来解决这个问题。

另外这台cs1.6服务器的server.cfg（cs1.6服务器配置文件）还是初始缺省值，以后还需要对其进行详细配置（请参考有关文献），以使这台cs1.6服务器性能达到最优化。

现在按键盘上的 CTRL+C 来终止cs.16服务器运行，　接着做下面的工作。
<strong>第三部分</strong>：
　　这部分内容是关于dproto模块插件的，这个插件将解决老版本（47协议）和新版本（48协议）客户端的登录问题，经过安装配置和后，你的这台cs1.6服务器将允许47/48两种协议的non-steam（D版）客户端进入游戏。
Crock是个伟大的程序员，他用c语言以及他的聪明才智开发了dproto模块插件程序，打破了valve公司对D版cs1.6客户端的封锁，2008年12月Crock最初把dproto插件发布在cs.rin.ru论坛上，经过不断的升级，目前版本是0.3.7，他发表的论坛网址如下：
<a href="http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728" target="_blank">http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728</a>

dproto模块插件的伟大之处在于它并不修改原版cs.16服务端半个字节，却能让低版本（４７协议）和高版本（４８协议）以及这两种协议的D版客户端都能进入升级后的cs1.6服务器，dproto运行在MetaMod平台上，因而dproto不是破解程序而仅仅是合法的插件，Metamod是cs.16服务端标准扩展平台，著名的反作弊插件sxe、amxmodx以及valve本公司的反作弊插件VAC也运行在这个平台上，

现在我们开始讨论安装dproto v0.3.7

上面我们说过，dproto是个插件，因此它需要Matamod（hlds扩展平台）的支持，那么我们要安装dproto的话就需要先安装Matamod平台，下面我们分两步来做：
１、安装和测试Matamod平台
２、安装测试dproto插件
（一）、安装和测试matamod平台
输入下面的命令，下载Matemod的linux版本：
提示：我们当前所在的目录是/home/hlds_l_4617 ，文件将下载到当前目录
<blockquote># wget http://prdownloads.sourceforge.net/metamod-p/metamod-p-1.19p32-linux_i586.tar.gz?download</blockquote>
输入下面命令查看下载的文件名：
<blockquote># ls</blockquote>
metamod-p-1.19p32-linux_i586.tar.gz　这就是我们刚下载到的文件
输入下面命令将该文件解压缩
<blockquote># tar -zxvf metamod-p-1.19p32-linux_i586.tar.gz</blockquote>
tar -zxvf参数解释 
-z 是配合解压.GZ的 
-x 解开一个包文件 
-v 显示详细信息 
-f 必须，表示使用归档文件

metamod官方网站地址（备用）：
http://metamod-p.sourceforge.net/

然后查看一下解压结果：
<blockquote># ls</blockquote>
  
metamod_i386.so就是我们解压缩释放出来的linux可执行文件，
现在我们终于得到了metamod_i386.so，接着我们开始用它布置metamod平台

布置metamod平台需要２个步骤：
１。在cstrike目录里建立metamod存放目录，然后将metamod_i386.so复制到建好的目录里
输入下列命令完成目录创建：
<blockquote># mkdir cstrike/addons
# mkdir cstrike/addons/metamod
# mkdir cstrike/addons/metamod/dlls</blockquote>
创建好所需的目录后，将metamod_i386.so复制到cstrike/addons/metamod/dlls目录中
输入复制命令：
<blockquote># cp metamod_i386.so cstrike/addons/metamod/dlls</blockquote>
命令执行后，metamod_i386.so的绝对位置应该在：
/home/hlds_l_4617/cstrike/addons/metamod/dlls/metamod_i386.so

２。为了让metamod平台随hlds启动起来，我们需要修改liblist.gam配置文件
它的位置在：
../cstrike/liblist.gam

输入vi命令来编辑liblist.gam配置文件
<blockquote># sudo vi cstrike/liblist.gam</blockquote>
进入vi的文本编辑环境以后，按键盘上的"I"进入文本编辑模式：
将liblist.gam中下面这一行：
gamedll_linux "dlls/cs_i386.so"
修改为：
gamedll_chain "dlls/cs_i386.so"

然后在下面添加一行：
gamedll_linux "addons/metamod/dlls/metamod_i386.so"

修改后看起来应该是这样子的：

gamedll_chain "dlls/cs_i386.so"
gamedll_linux "addons/metamod/dlls/metamod_i386.so"

修改后，按键盘上的'ESC'键回退到vi控制模式，然后输入命令 :wq ，然后【回车】，保存和退出。
  
（注：linux下的文本编辑工具是vi ，vi有两种模式，编辑模式和控制模式，按'I'进入编辑模式，按'ESC'回退到vi控制模式，vi编辑器的命令很强大也很灵活，这里不做论述，其详细使用方法请查看其他有关文献）

接下来我们启动hlds服务端程序，看metamod是不是跟随cs1.6服务器一起启动了
我们再次执行hlds启动命令：
<blockquote># ./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv</blockquote>
  
截图上的信息表示，metamod已经运行起来了，版本为1.19p32

我们先终止hlds服务（按键盘上的 CTRL+C　）

接下来我们进行重要的一步工作，下载和安装dproto插件，让我们的cs1.6服务器允许（47/48协议）和D版客户端进入。

（二）、安装和测试dproto插件
由于Crock发布dproto插件的打包方式是.rar，所以我们需要先在winXp电脑上下载并解开压缩包，然后再将释放出的插件程序上传到linux服务器上，
请在你的winXp电脑上下载dproto的最新版本：
http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728
当前最新版本是0.3.7，包文件名为dproto_0_3_7.rar（包中含有linux和windows两种程序分别应用于这两种操作系统）

解开压缩包以后，在文件夹中可以找到dproto_i386.so和一个dproto.cfg两个文件（不要修改dproto.cfg的内容），这两个文件是本教程需要的，

另外，你还会看到有扩展名为.dll的文件，这是为windows操作系统使用的文件，不是我们需要的，我们可以不去理它们。

再有就是开发dproto的c语言源程序，有兴趣的读者可以分析一下它c代码，以及未编译的amxx应用源程序。

下面我们继续做我们该做的工作，
１。在linux服务器上创建dproto工作目录
<blockquote># mkdir cstrike/addons/dproto</blockquote>
２。使用工具软件SSHSecureShellClient v3.29把dproto_i386.so和dproto.cfg上传到远程linux服务器的相应目录中
SSHSecureShellClient v3.29下载：
http://www.v.bdjy.cn/out/download_oracle.jsp?db=nav_c_blobdata&id=1202

上传后，dproto相关的文件绝对位置应该是这样子的：
/home/hlds_l_4617/cstrike/addons/dproto/dproto_i386.so
/home/hlds_l_4617/cstrike/dproto.cfg

２。用vi为metamod平台创建plugins.ini配置文件，在plugins.ini中告诉metamod平台dproto的存在和位置。
执行下面命令：
<blockquote># sudo vi cstrike/addons/metamod/plugins.ini</blockquote>
按键盘上的'I'键进入编辑模式，
添加下面一行
linux addons/dproto/dproto_i386.so

然后按键盘上的'Esc'键回退到vi控制模式，输入:wq　，然后【回车】，保存退出

你刚才创建的plugins.ini文件的绝对位置应该在：
/home/hlds_l_4617/cstrike/addons/metamod/plugins.ini

现在，你终于可以松下心来了，我们终于做好了所有的工作，一台实用的cs1.6服务器终于做好了，我们现在第三次启动hlds服务
输入启动命令：
<blockquote># ./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv</blockquote>
  
上面的信息显示，dproto已随hlds启动并且正常运行，现在，是真正向你表示祝贺的时候了！

到此，你的这台实用的cs1.6服务器已架设完成了，这台服务器已经能够接受（４７/４８协议）和D版客户端在互联网上刷出你的服务器并进入，也允许局域网中的朋友们进入！

接下来你可能会遇到小问题，即当你关闭PieTTY终端窗口或关闭电脑，你服务器上的cs.16服务端程序也随之终止运行了，不用担心，你只需创建一个linux下的一个包含hlds启动命令的批处理文件，然后执行一下就解决问题了，
方法如下：
输入下列命令创建批命令文件（我们将这个批处理命令命名为hlds4617.sh）
<blockquote># sudo vi hlds4617.sh</blockquote>
按键盘上的'I'键进入vi编辑模式，然后将hlds的启动命令写进去：
<blockquote># ./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv</blockquote>

然后按键盘上的'Esc'键，回退到vi控制模式，输入:wq  ，然后【回车】，保存退出。

执行刚刚建立的这个批命令文件：
<blockquote># nohup ./hlds4617.sh &</blockquote>
（注意：不要少了命令最后面的 '&'）

或者:
<blockquote># ./hlds.sh &</blockquote>
命令执行后，你可以退出PieTTY或关闭个人电脑了，而cs.16服务端程序将在那台linux服务器继续运行。
<strong>第四部分</strong>：
　　配置linux的防火墙，让你的cs1.6服务器注册到valve列表服务器，以便让玩家客户端刷出你的服务器。
关于cs.16服务器所使用的端口及网络通讯协议，以及linux防火墙iptables的设置

先说点儿题外话：
　　　能读本教程到这一部分的人，是十分令人敬佩的，之所以这么说，是基于两点，
第一点：linux操作系统，不是一个像windows2003那样容易掌握好的系统。
第二点：本人第一次写linux环境下的教程，虽然竭尽全力地想尽量解释清楚每一步在做什么，但由于文字水平有限，不可避免的有词不达意的地方，所以本文当中不可避免的出现（虽然我极力的去避免）我意想不到的一些知识陷阱，
       能坚持到现在的读者，我知道，你是个很有毅力的人，我也知道本教程一定无数次地把你引入歧途，但庆幸的是你还是靠自己的力量挣脱出并回归到正确轨道上，在此本人对你表示深深的敬意！
待续。。。。

前段时间比较忙碌，接着就是过年，现在有点时间了，我们继续完成本教程：
　　在下面的部分中，我们开始讨论cs1.6服务器所使用的一些端口，以及它的数据传输协议，并通过配置linux防火墙iptables，让我们的cs1.6服务器安全、稳定、高效的运行。

    cs1.6服务器端运行以后，会开通一些端口，我们得使用一些手段来查明到底cs1.6服务器端使用了哪些端口，首先，我们在启动cs1.6服务器端的时候，可以看到它开启的所用到的端口，然后，我们再用一个命令来查明它运行后使用了哪些端口。
  
截图中的信息表示，hlds启动使用了27010和27013两个端口（注意：你服务器的启动端口不一定与此相同），它们分别将你的cs1.6服务器注册到valve的两个列表服务器上（玩家客户端依赖这两个服务器刷出你的服），
然后我们使用一个linux命令查看你的cs1.6服务器端还使用了哪些端口，输入下面命令：
<blockquote># netstat -anp | grep hlds</blockquote>

截图信息显示，我们的cs1.6服务器端运行还使用两个端口，27015和26900
通过上面做过的工作，我们知道一个cs1.6服务器端启动和运行时，需使用的端口一共有４个，使用udp（不是tcp）网络协议，即：
27010
27013
27015
26900

下面我们通过修改iptables配置文件，来进行linux防火墙新规则配置
执行命令：
<blockquote># sudo vi /etc/sysconfig/iptables</blockquote>
在文件末尾添加下列代码
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27010 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27013 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27015 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 26900 -j ACCEPT
-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited COMMIT
然后保存退出

重启防火墙，使新规则生效
<blockquote># sudo service iptables restart</blockquote>
系统会提示...ok 

到此，这台cs1.6服务器的防火墙配置完成了，以后可以放心的让它在互联网上运行了。
<strong>第五部分</strong>：
　　关于Linux下的hlds4617的性能（fps）的调整。让我们来实现传说中的1000fps的cs1.6服务器。
关于linux下的hlds4617服务器性能（fps）的调整，使hlds服务器端达到1000fps。

若想使服务器端的fps达到1000，这在linux系统下是十分容易做到的，其关键之处在于两个地方：
1、是在启动命令中必须有-pingboost 3参数（参照第一部分的启动参数）；
2、是需要在游戏中用管理员身份（不是amxx中的op）执行sys_ticrate命令；
3、如果跳ping，控制方法是提高hlds_run的优先级。

    注意：此处讨论的是hlds服务器端的fps调整，服务器端的fps越高，玩家客户端（参数与服务器匹配）就越流畅。
    服务器fps并不是越高越好（根据服务器性能），而是“高且稳定为最好”。

    影响服务器端fps的参数是sys_ticrate（默认值60）的值，我们需要结合rcon stats命令，来设置一个最佳的sys_ticrate的值，具体方法是：
1、运行cs客户端，进入我们的服务器
2、按键盘左上角的“`”键调出客户端控制台（rcon），rcon_password（服务器管理口令）使自己变为管理员身份（如图）
  
(注：管理口令在服务器端的server.cfg设置，如果没有设置，需在server.cfg中添加下面一行：
rcon_password "12345678"    //管理口令就是12345678，你可以更改这个口令。

3、使用rcon stats 命令，查看当前服务器的fps值。

4。例如想把hlds服务器端fps调证到1000（前提是你的服务器性能要达到这个要求），可以使用命令：rcon sys_ticrate 3000 （注：参数要增加到预设值的2倍以上） 。

实际运行中你可能会遇到服务器端fps不稳的情况，间或有跌到800fps甚至500fps，对于这种情况，网友weyoung给出一个思路，你可以参照他提供的办法：
------------------------------------------------------------------------------
如果出现跳PING现象,改变程序HLDS的优先级就可以了!
//显示当前活动的进程，命令:
<blockquote># top</blockquote>
截图显示，hlds_run的进程号PID=3305，优先级为10 ，cpu使用率：3.0%，内存占用率：8.3%。
你也可以使用ps -e命令查看所有进程（包括不活动的）

若要将它优先级提高，执行下面命令：
<blockquote># renice -10 3305</blockquote>
然后再进程查看命令：
<blockquote># top</blockquote>
截图显示，hlds_run进程优先级由+10改为-10，以此方法来提高hlds的优先级，使我们的cs1.6服务器fps高且稳定（注：linux的进程优先级范围是－20，+19，数字越小，优先级越高）。

注意：图片显示的进程修改后的优先级是错的，应以教程文字为准。
