meta-config
====
  * 1、从文本文件的注释中读取JSON配置

期待的使用方法

    npm install meta-config
    

require('meta-config')('./index.html', {encoding: 'utf-8', 'meta': 'meta:'});

支持一下几种格式：

  *html
  
```html
<body>
  <!--meta:
  {
    "webpath": "hello",
    "t": true,
    "a": [
      "hello",
      "wor\"ld",
      true,
      false,
      10,
      0.1
    ],
    "f": false,
    "k": 10
  }
  -->
</body>
```
  * js
``` javascript
/**meta:
 * {
 * "webpath": "hello",
 * "t": true,
 * "a": [ "hello", "wor\"ld", true, false, 10, 0.1 ],
 * "f": false,
 * "k": 10
 * }
 */
 
and 

//meta:
// {
//  "webpath": "hello2",
//  "t": true,
//  "a": [ "hello", "wor\"ld", true, false, 10, 0.1 ],
//  "f": false,
//  "k": 10
// }
```
shell 
``` shell
#meta:
# {
#   "webpath": "OK",
#   "t": true,
#   "a": [ "hello", "wor\"ld", true, false, 10, 0.1 ],
#   "f": false,
#   "k": 10
# }
```



