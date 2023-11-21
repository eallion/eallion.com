---
title: "Linux 架设 CS1.6 服务器教程"
images: ["/assets/images/og/linux-counter-strike-server.png"]
authors: ["eallion"]
categories: ["分享"]
tags: ["CS","Ubuntu","server","服务器","linux","red hat"]
draft: false
slug: "linux-counter-strike-server"
date: "2012-03-21 13:07:07"
lastmod: "2012-03-21 13:07:07"
---

> 前言：由于 linux 系统的高性能和稳定性，非常适合作为 cs1.6 这种对服务器硬件要求较高的服务端，（服务器端可达到 1000fps），因此国外绝大多数的 cs1.6 服务器均采用 linux 做为服务器的操作系统。本文也只针对 linux 系统下架设 cs1.6 服务器及其扩展功能展开讨论，本文借鉴了网络上前人的经验，在此对他们无私的奉献表示感谢！这是本人第一次写 cs.16 服务器教程，难免存在疏漏或错误，希望各位同仁批评指正！
（本文最初发表在点通论坛，如需转载，请注明出处！作者：[disremember](http://www.dt-club.net/forum.php?mod=viewthread&tid=46567)）

### 第一部分

  将涉及到网络的一些基础知识，以及 linux 的系统一些必要的基本命令、远程登陆工具的下载和使用方法，有了这些基础知识，将会使我们能较为顺利地完成 cs.16 服务器在 linux 系统下的成功架设和调试。
1、本文假设你已经具备有一台运行着的 linux 操作系统的服务器，并且掌握着 root 密码（我写教程的测试系统是 red hat linux 5.4）；
2、这台服务器至少有一块网卡，网卡配置一个固定的局域网 ip 地址，例如：192.168.11.77
3、这台服务器必须物理连接在你单位的局域网网络，其他机器能访问的到；
4、（不是必须）为了让互联网上的玩家刷出你的服务器并能进入，你的路由器必须映射一个物理 ip 地址（即互联网 ip）到这台服务器，例如：219.148.149.87
路由器做物理 ip 映射的方法是配置 nat 参数，以（思科 cisco3700）为例：

```
 ip nat inside source static 192.168.11.77 219.148.149.87
```

5、为了不使接下来的工作出现困惑，我们建议暂时关闭 linux 防火墙，
请在 linux 服务器上执行下面命令来暂时关闭防火墙：

```
service iptables stop
```

（注意：关闭 linux 防火墙是十分危险的，我们将在第四部分详细讨论 linux 防火墙设置）

以上的前期准备完成之后，我们将从一台 winXP 系统的 pc 电脑来远程操作那台 linux 服务器，即远程安装 cs.16 服务端。

提示：
> 我们将使用 `PieTTY.exe` 这个小软件来远程登录 linux 服务器，PieTTY 遵循一种较新的叫做 ssh 的协议，ssh 这是比 telnet 更好的协议，安全且快捷，使用端口 22。在 PieTTY 的 linux 仿真终端窗口中远程操作就好像在那台服务器上操作一样。

首先，我们先来下载 PieTTY，下载后请把它放在你的 windows 桌面，然后双击执行，在打开的小窗中输入远程 linux 服务器的 ip 地址，单击 [Open] 进入 linux 仿真终端窗口，输入用户名 root 和口令。
如果登录失败，可能的原因有 3 个：
第一个原因，是你在 PieTTY 里填入的 ip 或密码不正确，请核对你的参数是否正确，
第二个原因，是 linux 服务器的 ssh 服务未启动，如果是这种情况，那就需要我们到那台 linux 服务器上，来手动启动 ssh 服务，启动 ssh 的命令是：

```
/etc/init.d/sshd start
```

如果 ssh 正常启动，系统会提示....ok

你可以使用下面命令来查看 ssh 服务是否已经工作了

```
netstat -anp | grep sshd
```

第三个原因，是 linux 防火墙阻拦，请确认服务器防火墙已关闭（参照第一部分 5）

然后返回到 WinXp 的电脑上

至此，我们以后工作将在 PieTTY 的 linux 终端窗口中完成，即所有 linux 命令在这个窗口里输入和执行，
下面我们正式开始：
1、在 linux 系统中建立一个目录，我们先进入系统的 /home 分区，然后建立一个新目录 hlds_l_4617（因为我下载的是 4617 版本的 cs1.6，所以用版本号以示区别），之后进入新建的目录，命令如下：

```
cd /home
mkdir hlds_l_4617
cd hlds_l_4617
```
  
2、输入下面命令下载 cs1.6 服务器专用下载工具

```
wget http://storefront.steampowered.com/download/hldsupdatetool.bin
```

看到上面的画面提示，说明专用工具 hldsupdatetool.bin 已经下载完成了。

3、给刚下载回来的 hldsupdatetool.bin 授予可执行权限，命令如下：

```
chmod 0755 hldsupdatetool.bin
```

（注：如果你未用 chmod 命令给一个文件授权可执行，linux 系统会提示 "Permission denied（无执行权限）" 错误。 可见，linux 的安全机制确实是 windows2003 无法比拟的，所以即便一个病毒程序已经进入到 linxu 中，如果服务器的操作员不用 chmod 命令授予它可执行权限，那病毒程序也是无法发作的）

4、现在执行 hldsupdatetool.bin 程序，来释放出 steam 程序（steam 才是真正下载 cs1.6 服务器全部文件的关键程序），命令如下：

```
./hldsupdatetool.bin
```

这个命令执行过程中你会遇到是否真正的下载的提示，请回答 yes，然后【回车】。
  
命令执行的结果是，我们得到 steam 和 readme.txt 两个文件，其中 readme.txt 文件是说明文件，steam 是我们要得到的可执行文件。

注意：在更高版本的 linux 系统中执行./hldsupdatetool.bin 时，可能会提示如下错误：

```
sh: uncompress: command not found 
```

此时请先执行下面命令，之后重新执行./hldsupdatetool.bin

```
ln -s /usr/bin/gunzip/usr/bin/uncompress
```

5。下面我们执行 steam 程序开始下载 cs1.6 服务端的全部文件（因为 valve 公司服务器在国外，所以在国内下载过程时间比较长，我的光纤网络也整整用了一个晚上，这个命令如下：

```
./steam -command update -game cstrike -dir . -retry
```

参数说明：

- -game cstrike ：这个参数告诉 steam 你要下载的是反恐精英 cs1.6（如果你需要下载的是【反恐精英－起源】那么把这个参数改为 - game "Counter-Strike Source"）
- -dir ：意思是将全部文件下载到当前目录，我们当前的目录是 /home/hlds_l_4617
- -retry ：网络断线自动重新尝试下载，即断点续传

现在你可以睡一觉或干点别的了，耐心等待它下载完成。

### 第二部分

  讲述使用 hldsudatetool.bin 专用工具下载 hlds（cs1.6 服务端程序）最新版本，以及当前最新版本 4617（48 协议）的 hlds 服务端的安装与调试。（注：.bin 扩展名文件是 red hat linux 系统下的可执行程序，就像 win 系统下的.exe 程序一样）

经过艰难而又漫长的下载过程，我们终于得到了 linux 下架设 cs.16 服务器全部服务端文件和 l 程序，令人激动的时刻即将来临，现在到了把它运行起来的时候了，我们将真正拥有属于我们自己的 cs.16 服务器了。

执行启动命令：

```
./hlds_run -binary ./hlds_i686 -console -game cstrike -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv
```

参数说明：

- hlds_i686 适用于 Inter 公司的 cpu，如果你服务器 cpu 是 AMD，请把参数改为：hlds_amd 或 hlds_amd64
- -console  控制台模式
- -insecure 屏蔽官方 AVC 反作弊（使 D 版客户端能登录）
- -pingboost 3 服务器加速（此为 linux 下专用参数，而 win32 下使用插件方式加速）
- -port 27015  玩家客户端登录端口
- +maxplayers 32 允许的最大玩家数
- +map de_dust2 启动时加载的地图
- +sv_lan 0   为 0 时，允许互联网 / 局域网都可登录，为 1 时，只允许局域网登录
- -noipx 不使用 ipx 网络协议
- -nojoy 不支持摇杆
- -nohltv   关闭视频广播

上面命令打在一行上，不要分行。
  
当你看到上面的信息，那么祝贺你，说明你的 cs1.6 服务器已经正常运行起来了！

注意 1：有可能在第一次启动 hlds 时报如下错误

scandir failed:/home/hlds_l_4617/valve/SAVE
scandir failed:/home/hlds_l_4617/platform/SAVE

说明缺少这 2 个目录未建立，请建立所需的目录

```
mkdir /home/hlds_l_4617/valve/SAVE
mkdir /home/hlds_l_4617/platform/SAVE
```

注意 2: 也可能报下面的错误

couldn't exec listip.cfg
couldn't exec banned.cfg

说明缺少这 2 个文件未建立，请建立它们:（空文件即可）

```
sudo vi /home/hlds_l_4617/cstrike/listip.cfg
sudo vi /home/hlds_l_4617/cstrike/banned.cfg
```

说明
--------------------------------------------------------

`listip.cfg` 存放的是踢出的玩家 ip
`banned.cfg` 存放的是被管理员封禁的玩家 ip
---------------------------------------------------------

这个 cs1.6 服务器搭建起来了，但现在我们拥有的是个干净的且纯正版的服务器，只有新版本（48 协议）且正版 cs1.6 客户端（如 4554）的玩家才可以进入，但 D 版和低版本（47 协议）的客户端玩家还不能进。我们将在接下来的部分讨论如何利用 dproto 插件来解决这个问题。

另外这台 cs1.6 服务器的 server.cfg（cs1.6 服务器配置文件）还是初始缺省值，以后还需要对其进行详细配置（请参考有关文献），以使这台 cs1.6 服务器性能达到最优化。

现在按键盘上的 CTRL+C 来终止 cs.16 服务器运行， 接着做下面的工作。

### 第三部分

  这部分内容是关于 dproto 模块插件的，这个插件将解决老版本（47 协议）和新版本（48 协议）客户端的登录问题，经过安装配置和后，你的这台 cs1.6 服务器将允许 47/48 两种协议的 non-steam（D 版）客户端进入游戏。
Crock 是个伟大的程序员，他用 c 语言以及他的聪明才智开发了 dproto 模块插件程序，打破了 valve 公司对 D 版 cs1.6 客户端的封锁，2008 年 12 月 Crock 最初把 dproto 插件发布在 cs.rin.ru 论坛上，经过不断的升级，目前版本是 0.3.7，他发表的论坛网址如下：
[http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728](http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728)

dproto 模块插件的伟大之处在于它并不修改原版 cs.16 服务端半个字节，却能让低版本（47 协议）和高版本（48 协议）以及这两种协议的 D 版客户端都能进入升级后的 cs1.6 服务器，dproto 运行在 MetaMod 平台上，因而 dproto 不是破解程序而仅仅是合法的插件，Metamod 是 cs.16 服务端标准扩展平台，著名的反作弊插件 sxe、amxmodx 以及 valve 本公司的反作弊插件 VAC 也运行在这个平台上，

现在我们开始讨论安装 dproto v0.3.7

上面我们说过，dproto 是个插件，因此它需要 Matamod（hlds 扩展平台）的支持，那么我们要安装 dproto 的话就需要先安装 Matamod 平台，下面我们分两步来做：
1、安装和测试 Matamod 平台
2、安装测试 dproto 插件
（一）、安装和测试 matamod 平台
输入下面的命令，下载 Matemod 的 linux 版本：
提示：我们当前所在的目录是 /home/hlds_l_4617 ，文件将下载到当前目录

```
wget http://prdownloads.sourceforge.net/metamod-p/metamod-p-1.19p32-linux_i586.tar.gz?download
```

输入下面命令查看下载的文件名：

```
ls
```

`metamod-p-1.19p32-linux_i586.tar.gz` 这就是我们刚下载到的文件
输入下面命令将该文件解压缩

```
tar -zxvf metamod-p-1.19p32-linux_i586.tar.gz
```

tar -zxvf 参数解释

- -z 是配合解压.GZ 的
- -x 解开一个包文件
- -v 显示详细信息
- `-f 必须，表示使用归档文件

metamod 官方网站地址（备用）：
[http://metamod-p.sourceforge.net/](http://metamod-p.sourceforge.net/)

然后查看一下解压结果：

```
ls
```

metamod_i386.so 就是我们解压缩释放出来的 linux 可执行文件，
现在我们终于得到了 metamod_i386.so，接着我们开始用它布置 metamod 平台

布置 metamod 平台需要 2 个步骤：
1。在 cstrike 目录里建立 metamod 存放目录，然后将 metamod_i386.so 复制到建好的目录里
输入下列命令完成目录创建：

```
mkdir cstrike/addons
mkdir cstrike/addons/metamod
mkdir cstrike/addons/metamod/dlls
```

创建好所需的目录后，将 metamod_i386.so 复制到 cstrike/addons/metamod/dlls 目录中
输入复制命令：

```
cp metamod_i386.so cstrike/addons/metamod/dlls
```

命令执行后，metamod_i386.so 的绝对位置应该在：

```
/home/hlds_l_4617/cstrike/addons/metamod/dlls/metamod_i386.so
```

2。为了让 metamod 平台随 hlds 启动起来，我们需要修改 liblist.gam 配置文件
它的位置在：
../cstrike/liblist.gam

输入 vi 命令来编辑 liblist.gam 配置文件

```
sudo vi cstrike/liblist.gam
```

进入 vi 的文本编辑环境以后，按键盘上的 "I" 进入文本编辑模式：
将 liblist.gam 中下面这一行：

```
gamedll_linux "dlls/cs_i386.so"
```

修改为：

```
gamedll_chain "dlls/cs_i386.so"
```

然后在下面添加一行：

```
gamedll_linux "addons/metamod/dlls/metamod_i386.so"
```

修改后看起来应该是这样子的：

```
gamedll_chain "dlls/cs_i386.so"
gamedll_linux "addons/metamod/dlls/metamod_i386.so"
```

修改后，按键盘上的 'ESC' 键回退到 vi 控制模式，然后输入命令 :wq ，然后【回车】，保存和退出。
  
（注：linux 下的文本编辑工具是 vi ，vi 有两种模式，编辑模式和控制模式，按 'I' 进入编辑模式，按 'ESC' 回退到 vi 控制模式，vi 编辑器的命令很强大也很灵活，这里不做论述，其详细使用方法请查看其他有关文献）

接下来我们启动 hlds 服务端程序，看 metamod 是不是跟随 cs1.6 服务器一起启动了
我们再次执行 hlds 启动命令：

```
./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv
```
  
截图上的信息表示，metamod 已经运行起来了，版本为 1.19p32

我们先终止 hlds 服务（按键盘上的 CTRL+C ）

接下来我们进行重要的一步工作，下载和安装 dproto 插件，让我们的 cs1.6 服务器允许（47/48 协议）和 D 版客户端进入。

（二）、安装和测试 dproto 插件
由于 Crock 发布 dproto 插件的打包方式是.rar，所以我们需要先在 winXp 电脑上下载并解开压缩包，然后再将释放出的插件程序上传到 linux 服务器上，
请在你的 winXp 电脑上下载 dproto 的最新版本：
[http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728](http://cs.rin.ru/forum/viewtopic.php?f=29&t=52728)
当前最新版本是 0.3.7，包文件名为 dproto_0_3_7.rar（包中含有 linux 和 windows 两种程序分别应用于这两种操作系统）

解开压缩包以后，在文件夹中可以找到 dproto_i386.so 和一个 dproto.cfg 两个文件（不要修改 dproto.cfg 的内容），这两个文件是本教程需要的，

另外，你还会看到有扩展名为.dll 的文件，这是为 windows 操作系统使用的文件，不是我们需要的，我们可以不去理它们。

再有就是开发 dproto 的 c 语言源程序，有兴趣的读者可以分析一下它 c 代码，以及未编译的 amxx 应用源程序。

下面我们继续做我们该做的工作，
1。在 linux 服务器上创建 dproto 工作目录

```
mkdir cstrike/addons/dproto
```

2。使用工具软件 SSHSecureShellClient v3.29 把 dproto_i386.so 和 dproto.cfg 上传到远程 linux 服务器的相应目录中
SSHSecureShellClient v3.29 下载：
[http://www.v.bdjy.cn/out/download_oracle.jsp?db=nav_c_blobdata&id=1202](http://www.v.bdjy.cn/out/download_oracle.jsp?db=nav_c_blobdata&id=1202)

上传后，dproto 相关的文件绝对位置应该是这样子的：

```
/home/hlds_l_4617/cstrike/addons/dproto/dproto_i386.so
/home/hlds_l_4617/cstrike/dproto.cfg
```

2。用 vi 为 metamod 平台创建 plugins.ini 配置文件，在 plugins.ini 中告诉 metamod 平台 dproto 的存在和位置。
执行下面命令：

```
sudo vi cstrike/addons/metamod/plugins.ini
```

按键盘上的 'I' 键进入编辑模式，
添加下面一行

```
linux addons/dproto/dproto_i386.so
```

然后按键盘上的 'Esc' 键回退到 vi 控制模式，输入:wq ，然后【回车】，保存退出

你刚才创建的 plugins.ini 文件的绝对位置应该在：

```
/home/hlds_l_4617/cstrike/addons/metamod/plugins.ini
```

现在，你终于可以松下心来了，我们终于做好了所有的工作，一台实用的 cs1.6 服务器终于做好了，我们现在第三次启动 hlds 服务
输入启动命令：

```
./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv
```
  
上面的信息显示，dproto 已随 hlds 启动并且正常运行，现在，是真正向你表示祝贺的时候了！

到此，你的这台实用的 cs1.6 服务器已架设完成了，这台服务器已经能够接受（47/48 协议）和 D 版客户端在互联网上刷出你的服务器并进入，也允许局域网中的朋友们进入！

接下来你可能会遇到小问题，即当你关闭 PieTTY 终端窗口或关闭电脑，你服务器上的 cs.16 服务端程序也随之终止运行了，不用担心，你只需创建一个 linux 下的一个包含 hlds 启动命令的批处理文件，然后执行一下就解决问题了，
方法如下：
输入下列命令创建批命令文件（我们将这个批处理命令命名为 hlds4617.sh）

```
sudo vi hlds4617.sh
```

按键盘上的 'I' 键进入 vi 编辑模式，然后将 hlds 的启动命令写进去：

```
./hlds_run -console -game cstrike -condebug -insecure -pingboost 3 -port 27015 +maxplayers 32 +map de_dust2 +sv_lan 0 -noipx -nojoy -nohltv
```

然后按键盘上的 'Esc' 键，回退到 vi 控制模式，输入:wq  ，然后【回车】，保存退出。

执行刚刚建立的这个批命令文件：

```
nohup ./hlds4617.sh &
```

（注意：不要少了命令最后面的 '&'）

或者：

```
./hlds.sh &
```

命令执行后，你可以退出 PieTTY 或关闭个人电脑了，而 cs.16 服务端程序将在那台 linux 服务器继续运行。

### 第四部分

配置 linux 的防火墙，让你的 cs1.6 服务器注册到 valve 列表服务器，以便让玩家客户端刷出你的服务器。
关于 cs.16 服务器所使用的端口及网络通讯协议，以及 linux 防火墙 iptables 的设置

先说点儿题外话：
能读本教程到这一部分的人，是十分令人敬佩的，之所以这么说，是基于两点，
第一点：linux 操作系统，不是一个像 windows2003 那样容易掌握好的系统。
第二点：本人第一次写 linux 环境下的教程，虽然竭尽全力地想尽量解释清楚每一步在做什么，但由于文字水平有限，不可避免的有词不达意的地方，所以本文当中不可避免的出现（虽然我极力的去避免）我意想不到的一些知识陷阱，
   能坚持到现在的读者，我知道，你是个很有毅力的人，我也知道本教程一定无数次地把你引入歧途，但庆幸的是你还是靠自己的力量挣脱出并回归到正确轨道上，在此本人对你表示深深的敬意！
待续。。。。

前段时间比较忙碌，接着就是过年，现在有点时间了，我们继续完成本教程：
在下面的部分中，我们开始讨论 cs1.6 服务器所使用的一些端口，以及它的数据传输协议，并通过配置 linux 防火墙 iptables，让我们的 cs1.6 服务器安全、稳定、高效的运行。

cs1.6 服务器端运行以后，会开通一些端口，我们得使用一些手段来查明到底 cs1.6 服务器端使用了哪些端口，首先，我们在启动 cs1.6 服务器端的时候，可以看到它开启的所用到的端口，然后，我们再用一个命令来查明它运行后使用了哪些端口。
  
截图中的信息表示，hlds 启动使用了 27010 和 27013 两个端口（注意：你服务器的启动端口不一定与此相同），它们分别将你的 cs1.6 服务器注册到 valve 的两个列表服务器上（玩家客户端依赖这两个服务器刷出你的服），
然后我们使用一个 linux 命令查看你的 cs1.6 服务器端还使用了哪些端口，输入下面命令：

```
netstat -anp | grep hlds
```

截图信息显示，我们的 cs1.6 服务器端运行还使用两个端口，27015 和 26900
通过上面做过的工作，我们知道一个 cs1.6 服务器端启动和运行时，需使用的端口一共有 4 个，使用 udp（不是 tcp）网络协议，即：
27010
27013
27015
26900

下面我们通过修改 iptables 配置文件，来进行 linux 防火墙新规则配置
执行命令：

```
sudo vi /etc/sysconfig/iptables
```

在文件末尾添加下列代码

```
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27010 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27013 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 27015 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m udp -p udp --dport 26900 -j ACCEPT
-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited COMMIT
```

然后保存退出

重启防火墙，使新规则生效

```
sudo service iptables restart
```

系统会提示...ok

到此，这台 cs1.6 服务器的防火墙配置完成了，以后可以放心的让它在互联网上运行了。

### 第五部分

关于 Linux 下的 hlds4617 的性能（fps）的调整。让我们来实现传说中的 1000fps 的 cs1.6 服务器。
关于 linux 下的 hlds4617 服务器性能（fps）的调整，使 hlds 服务器端达到 1000fps。

若想使服务器端的 fps 达到 1000，这在 linux 系统下是十分容易做到的，其关键之处在于两个地方：
1、是在启动命令中必须有 - pingboost 3 参数（参照第一部分的启动参数）；
2、是需要在游戏中用管理员身份（不是 amxx 中的 op）执行 sys_ticrate 命令；
3、如果跳 ping，控制方法是提高 hlds_run 的优先级。

注意：此处讨论的是 hlds 服务器端的 fps 调整，服务器端的 fps 越高，玩家客户端（参数与服务器匹配）就越流畅。
服务器 fps 并不是越高越好（根据服务器性能），而是 “高且稳定为最好”。

影响服务器端 fps 的参数是 sys_ticrate（默认值 60）的值，我们需要结合 rcon stats 命令，来设置一个最佳的 sys_ticrate 的值，具体方法是：
1、运行 cs 客户端，进入我们的服务器
2、按键盘左上角的 “`” 键调出客户端控制台（rcon），rcon_password（服务器管理口令）使自己变为管理员身份（如图）
  
(注：管理口令在服务器端的 server.cfg 设置，如果没有设置，需在 server.cfg 中添加下面一行：
rcon_password "12345678"// 管理口令就是 12345678，你可以更改这个口令。

3、使用 rcon stats 命令，查看当前服务器的 fps 值。

4。例如想把 hlds 服务器端 fps 调证到 1000（前提是你的服务器性能要达到这个要求），可以使用命令：rcon sys_ticrate 3000（注：参数要增加到预设值的 2 倍以上）。

实际运行中你可能会遇到服务器端 fps 不稳的情况，间或有跌到 800fps 甚至 500fps，对于这种情况，网友 weyoung 给出一个思路，你可以参照他提供的办法：

如果出现跳 PING 现象，改变程序 HLDS 的优先级就可以了！
// 显示当前活动的进程，命令：

```
top
```

截图显示，hlds_run 的进程号 PID=3305，优先级为 10 ，cpu 使用率：3.0%，内存占用率：8.3%。
你也可以使用 ps -e 命令查看所有进程（包括不活动的）

若要将它优先级提高，执行下面命令：

```
renice -10 3305
```

然后再进程查看命令：

```
top
```

截图显示，hlds_run 进程优先级由 +10 改为 - 10，以此方法来提高 hlds 的优先级，使我们的 cs1.6 服务器 fps 高且稳定（注：linux 的进程优先级范围是－20，+19，数字越小，优先级越高）。

注意：图片显示的进程修改后的优先级是错的，应以教程文字为准。
