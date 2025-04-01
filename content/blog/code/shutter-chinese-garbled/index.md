---
authors:
- eallion
categories:
- 代码
date: '2016-09-25 20:05:00'
draft: false
lastmod: '2016-09-25 20:05:00'
slug: shutter-chinese-garbled
summary: 在 Ubuntu 16.04.1 LTS 64bit 系统中，针对 Shutter 0.93.1 的菜单和提示文字乱码问题，通过修改 /usr/bin/shutter
  和 /usr/share/perl5/Shutter/Screenshot/Window.pm 文件，将窗口名称进行 UTF-8 解码处理，解决了界面显示异常问题！
tags:
- 中文
- shutter
- 乱码
title: Shutter 中文乱码问题
---
> Ubuntu 16.04.1 LTS 64bit
> Shutter 0.93.1

### 1、菜单乱码

将 `$win->get_name` 进行 UTF-8 解码
修改脚本文件：

```bash
sudo vim /usr/bin/shutter
```

第 8627 行

```bash
my $window_item = Gtk2::ImageMenuItem->new_with_label ( $win->get_name );
```

修改为

```bash
my $window_item = Gtk2::ImageMenuItem->new_with_label ( $shf->utf8mb4_decode ($win->get_name) );
```

### 2、提示文字乱码

修改文件：

```bash
sudo vim /usr/share/perl5/Shutter/Screenshot/Window.pm
```

第 108~111 行

```bash
print $self->{_c}{'cw'}{'window'}->get_name, "\n" if $self->{_sc}->get_debug;

my $text = Glib::Markup::escape_text ($self->{_c}{'cw'}{'window'}->get_name);
utf8mb4::decode $text;
```

修改为：

```bash
my $text = $self->{_c}{'cw'}{'window'}->get_name;
utf8mb4::decode $text;

print $text, "\n" if $self->{_sc}->get_debug;
$text = Glib::Markup::escape_text ($text);
```