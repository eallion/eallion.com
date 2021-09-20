# 五杀页面说明

### 图片上传

图片上传至腾讯云 COS `static-*********/penta/`。

### 页面生成

在 `theme` ->`hello-friend` -> `layouts` -> `_default` -> `penta.html` 按格式添加图片。
图片链接，如：https://images.eallion.com/penta/20210919-Yasuo.png
格式：

```
    <figure>
        <img loading="lazy" src="https://images.eallion.com/penta/20210919-Yasuo.png" alt="20210919-Yasuo.png">
        <figcaption>20201203-Lucian</figcaption>
    </figure>
```

