# yd-word-book
有道单词本命令行版，支持翻译查词并将单词添加到云端单词本

## 安装
```
npm i yd-word-book -g
```

## 使用

### 登陆
现支持两种登陆方式
```
// 网易邮箱密码登陆
$ yd login

请输入网易邮箱：xxx@163.com
请输入密码：xxx
// 失败输出
error login fail, pleace check your email or pwaaword current and try again
// 成功无输出
```
```
// cookie 登陆
// 网页打开 http://dict.youdao.com/wordbook/wordlist?keyfrom=login_from_dict2.index
// 登陆成功之后在 F12 唤出控制台
// 输入 document.cookie，复制输出
$ yd cookie add '复制的字符串'
```

### 搜索功能
```
$ yd node

🔍  Search word...
success Get 'node' translate.
info Visit 'http://www.youdao.com/w/eng/node' to see more.
英[nəʊd]美[noʊd]
n.节点；瘤；[数]叉点
n.(Node)人名；(法)诺德
[ 复数 nodes ]

// 搜索并添加到单词本
$ yd node -s

🔍  Search word...
success Get 'node' translate.
success Add 'node' to word book.
info Visit 'http://www.youdao.com/w/eng/node' to see more.
英[nəʊd]美[noʊd]
n.节点；瘤；[数]叉点
n.(Node)人名；(法)诺德
[ 复数 nodes ]
```

## 帮助
```
Usage: yd [options] [command]

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:
  search         search words's translate
  login          login netease email accout
  cookie         manage local cookie
  help [cmd]     display help for [cmd]
```

## 功能点
- 英译中
- 中译英
- 多词查询
- 网易邮箱登陆
- 单词添加到单词本