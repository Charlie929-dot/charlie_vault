# 语法
> [!note] 
> - `select a,b;` 显示a,b; `select a,b from c` 从c表中提取列a,b数据
> - `ascii(character)` 返回character首字符ascii码
> - `substr(str, begin, num)` 从str的第begin个字符开始，取num个字符
> - `--+`url中注释掉后面的代码，+在url中是空格，--后面加空格语法才对


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


### 🗂️ 字典里到底有啥？（三大核心表）

在 `information_schema` 这个字典库里，有三个最重要的表，它们就是你脱库的“导航图”：

#### 1. `SCHEMATA` 表（全馆大楼分布图）

- **里面存了什么：** 当前 MySQL 服务器里**所有的数据库名**。
- **核心字段：** `SCHEMA_NAME`（数据库名）。
- **作用：** 黑客用它来查出服务器上有哪些库（比如 `security`, `dvwa` 等）。

#### 2. `TABLES` 表（全馆书架分布图）

- **里面存了什么：** 所有数据库里的**表名**，以及这个表属于哪个库。
- **核心字段：** `TABLE_SCHEMA`（所属数据库名）、`TABLE_NAME`（表名）。
- **作用：** 黑客用它来查出 `security` 库里有哪些表（比如 `users`, `emails`）。

#### 3. `COLUMNS` 表（全馆文件夹明细表）

- **里面存了什么：** 所有表里的**字段名（列名）**，以及这个字段属于哪个库、哪张表。
- **核心字段：** `TABLE_SCHEMA`（所属库）、`TABLE_NAME`（所属表）、`COLUMN_NAME`（字段名）。
- **作用：** 黑客用它来查出 `users` 表里到底有哪些字段（比如 `username`, `password`）。
> [!note] 
>`?id=-1'union select 1,2,group_concat(column_name) from information_schema.columns where table_name='users' and table_schema=datacase()--+`  
> 如果有多个数据库，可通过限定数据库名和表名来精准查询列名

