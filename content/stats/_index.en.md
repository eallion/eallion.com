---
title: "Stats"
images: ["/assets/images/og/eallion.png"]
layout: "stats"
type: 'page'
comment: false
toc: false
aliases:
    - /en/stat
    - /en/status
    - /en/tongji
---

### Blogs by Year

{{< echarts >}}
{
  "title": {
    "text": "Blogs by Year",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["All", "Daily", "Code", "Share", "SZ", "English"],
    "top": "10%"
  },
  "grid": {
    "left": "5%",
    "right": "5%",
    "bottom": "5%",
    "top": "20%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "Save as Image"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "All",
      "type": "line",
      "stack": "总量",
      "data": ["3", "0", "68", "7", "90", "140", "34", "26", "4", "28", "33", "28", "4", "25", "16", "7", "12", "19", "9"]
    },
    {
      "name": "Daily",
      "type": "line",
      "stack": "总量",
      "data": ["3", "0", "69", "7", "62", "122", "33", "23", "3", "19", "13", "16", "2", "7", "5", "4", "6", "5", "2"]
    },
    {
      "name": "Code",
      "type": "line",
      "stack": "总量",
      "data": ["0", "0", "0", "0", "0", "0", "0", "1", "0", "6", "15", "4", "0", "14", "10", "3", "5", "11", "2"]
    },
    {
      "name": "Share",
      "type": "line",
      "stack": "总量",
      "data": ["0", "0", "1", "0", "33", "10", "2", "1", "1", "4", "5", "8", "2", "3", "1", "0", "1", "2", "0"]
    },
    {
      "name": "SZ",
      "type": "line",
      "stack": "总量",
      "data": ["0", "0", "0", "0", "1", "8", "0", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
    },
    {
      "name": "English",
      "type": "line",
      "stack": "总量",
      "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "5"]
    }
  ]
}
{{< /echarts >}}

### Blogs by Category

{{< mermaid >}}pie
    "Daily(398)" : 398
    "Code(74)" : 74
    "Share(71)" : 71
    "SZ(10)" : 10
    "English（6）" : 6
{{< /mermaid >}}

Ref<sup>1</sup>: The same article may contain multiple categories.
Ref<sup>2</sup>: `SZ` is a good friend.
