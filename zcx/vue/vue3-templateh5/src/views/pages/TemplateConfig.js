import micon1 from '@/assets/images/micon1.png'
import micon2 from '@/assets/images/micon2.png'
import micon3 from '@/assets/images/micon3.png'
import micon4 from '@/assets/images/micon4.png'
import micon5 from '@/assets/images/micon5.png'
import micon6 from '@/assets/images/micon6.png'
import micon7 from '@/assets/images/micon7.png'
import micon8 from '@/assets/images/micon8.png'
import micon1_selected from '@/assets/images/micon1_selected.png'
import micon2_selected from '@/assets/images/micon2_selected.png'
import micon3_selected from '@/assets/images/micon3_selected.png'
import micon4_selected from '@/assets/images/micon4_selected.png'
import micon5_selected from '@/assets/images/micon5_selected.png'
import micon6_selected from '@/assets/images/micon6_selected.png'
import micon7_selected from '@/assets/images/micon7_selected.png'
import micon8_selected from '@/assets/images/micon8_selected.png'

const Images = {
  "name": "图片类型",
  "template": {
    "title": null,
    "subtitle": null,
    "imageUrl": null,
    "url": null
  },
  "list": [],
  "style": {
    "style1": {
      "id": 1,
      "cssType": "style1",
      "name": "一行一个",
      "icon": micon1,
      "icon_selected": micon1_selected,
      "describe": "添加图片",
      "imgSize": "662*320",
    },
    "style2": {
      "id": 2,
      "cssType": "style2",
      "name": "一行两个",
      "icon": micon2,
      "icon_selected": micon2_selected,
      "describe": "添加图片",
      "imgSize": "330*160",
    },
    "style3": {
      "id": 3,
      "cssType": "style3",
      "name": "大图横向滚动",
      "icon": micon3,
      "icon_selected": micon3_selected,
      "describe": "添加图片",
      "imgSize": "662*320",
    },
    "style4": {
      "id": 4,
      "cssType": "style4",
      "name": "小图横向滚动",
      "icon": micon4,
      "icon_selected": micon4_selected,
      "describe": "添加图片",
      "imgSize": "175*160",
    },
    "style5": {
      "id": 5,
      "cssType": "style5",
      "name": "走马灯",
      "icon": micon5,
      "icon_selected": micon5_selected,
      "describe": "添加图片",
      "imgSize": "662*320",
    },
    "style6": {
      "id": 6,
      "cssType": "style6",
      "name": "卡片走马灯",
      "icon": micon6,
      "icon_selected": micon6_selected,
      "describe": "添加图片",
      "imgSize": "230*309",
    },
    "style7": {
      "id": 7,
      "cssType": "style7",
      "name": "左一右二",
      "icon": micon7,
      "icon_selected": micon7_selected,
      "describe": "添加图片",
      "imgSize": "大图：320*430 小图：320*204",
    },
    "style8": {
      "id": 8,
      "cssType": "style8",
      "name": "上一下三",
      "icon": micon8,
      "icon_selected": micon8_selected,
      "describe": "添加图片",
      "imgSize": "大图：662*320 小图：206*158",
    }
  },
  "cssType": "style1",
  "beginTime": null,
  "endTime": null
}

const Title = {
  "name": "标题类型",
  "list": [],
  "style": {},
  "template": {
    "title": "标题",
    "url": ""
  }
}

const Text = {
  "name": "纯文本类型",
  "list": [],
  "style": {},
  "template": {
    "content": "文本",
    "url": ""
  }
}

const ImagesText = {
  "name": "图文类型",
  "template": {
    "title": "标题",
    "subtitle": "副标题",
    "imageUrl": "",
    "url": ""
  },
  "list": [],
  "style": {
    "name": "图文",
    "describe": "添加图文",
    "imgSize": "662*320",
    "cssType": 1,
    "cssClass": 1,
    "checkTitle": ['title', 'subtitle']
  }
}

const Notice = {
  "name": "公告",
  "list": [],
  "style": {
    "name": "公告",
    "describe": "添加公告",
    "cssType": 0
  },
  "template": {
    "title": "公告内容",
    "url": "",
    "type": 0
  }
}

const Navigation = {
  "name": "图文导航",
  "list": [],
  "style": {
    "name": "图文导航",
    "describe": "添加图标",
    "imgSize": "94*94 或 78*78",
    "cssType": 1,
    "cssClass": 4,
  },
  "template": {
    "title": "标题",
    "url": "",
    "type": 0
  }
}

const Template = {
  Navigation: Navigation,
  Images: Images,
  Title: Title,
  Text: Text,
  ImagesText: ImagesText,
  Notice: Notice
}
export default Template;