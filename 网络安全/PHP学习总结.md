#2026-8-24
# PHP语法
> [!note] 
> - `''` 中为纯字符串, 不转译 `\n` `$var`等；`""` 中为转译后字符-> `echo "\n";` 才是换行,`echo "hi $var"` 换成单引号是 `echo 'hi'.$var;` 
> 	- 在双引号内部，**只能直接放“简单变量”**（比如 `$name`）。如果你要放**数组**（比如 `$_FILES['fileToUpload']['name']`）或者**函数**（比如 `basename()`），就**必须**用**花括号 `{}`** 把它们包起来
> -  `$_FILES[][]` 保存上传的文件信息
> 	1. **`name`**：客户端（用户电脑）上文件的原始名称。
> 	2. **`type`**：文件的 MIME 类型（例如 `image/jpeg`），但这由浏览器提供，不可完全信任。
> 	3. **`size`**：已上传文件的大小，单位是字节（bytes）。
> 	4. **`tmp_name`**：文件上传后，在服务器上保存的**临时文件名和路径**。这是最重要的属性！
> 	5. **`error`**：文件上传相关的错误代码（`0` 表示成功，其他数字代表不同类型的错误）。
> 
> - `basename() `->将文件名从路径剥离，只保留基本的文件名
> - =\=和=\=\= <-> !=和!==
> 	1. 普通不等于 (!=) 2var_dump(0 != false); // 输出: bool(false) （PHP认为 0 和 false 在普通比较下是相等的）
> 	2. 严格不等于 (!\==) 5var_dump(0 !== false); // 输出: bool(true) （0是整数，false是布尔值，类型不同，所以严格不相等）
> 	3. \== 相等(只比较值) ;\=== 全等(比较值和类型)
> - 创建删除文件或目录
> 	- 文件
> 		- `touch('example.txt');` // 在当前目录下创建一个名为 example.txt 的空文件
> 		- `unlink('example.txt');` // 删除 example.txt 文件
> 	- 目录
> 		- `php  mkdir('my_folder', 0777, true);` // 在当前目录下创建名为 my_folder 的文件夹 // 0777 表示赋予最高读写权限，true 表示允许递归创建多级目录
> 		- `rmdir('my_folder');` // 删除 my_folder 文件夹
> - `<form>`属性: 文件编码类型 `enctype="multipart/form-data` 
> 	- 作用: 分割提交表单信息, 便于储存dao `$_FILES` 数组中, 若无该属性,数组则为空
> - `<input type="file" name="fileToUpload" id="fileToUpload">`
> 	- `name` 是给后端定位的, `id` 是给前端定位的
```php
Array
(
    [name] => my_cat.jpg            // 1. 原始文件名：用户电脑上的文件叫啥，这里就是啥
    [type] => image/jpeg            // 2. MIME类型：浏览器告诉PHP这是一个JPEG图片
    [size] => 102400                // 3. 文件大小：这张图片占用了 102400 字节（约 100 KB）
    [tmp_name] => C:\Windows\phpF1AD.tmp // 4. 临时文件路径：PHP自动生成的临时存放位置
    [error] => 0                    // 5. 错误代码：0 表示一切顺利，没有出错
)
```
# PHP表单
> [!note] 
> - 步骤: 表单处理+安全验证+必填字段+格式检验(URL,E-mail)
> - 安全验证: 
> 	- htmlspecialchars()函数 
> 		- 将php返回结果转为html实体，避免HTML或script代码注入
> 			- 例如：`<form method="post" action="<?php echo $_SERVER["PHP_SELF"];?>"> ` 用户在地址栏输入`http://www.example.com/test_form.php/%22%3E%3Cscript%3Ealert('hacked')%3C/script%3E` 就可以注入script代码 `<form method="post" action="test_form.php/"><script>alert('hacked')</script>`

# PHP文件
> [!note] 
> - 包含文件 -> 相当于导入模板
> 	- `include`, `require` 
> 	- 模板范例：菜单内容，变量，页眉页脚
> - 打开/读取文件 
> 	- 打开文件
> 		- fopen()
> 	- 读文件->readfile()单纯读文件
> 		- fread()读取整个文件
> 		- fgets()获取行
> 		- fgetc()获取单个字符
> 		- feof()指针是否到达行尾
> 	- 关闭文件
> 		- fclose()
> - 创建/写入文件
> 	- 创建文件
> 		- fopen() 'w', 'a'模式下且未创建文件
> 	- 写文件
> 		- fwrite()
> 	- 关闭文件
> 		- fclose()
> - 上传文件 
> 	- 上传代码
> 	- 安全代码
> 		- <mark style="background: #FF5582A6;">检查上传的是否为图片->防止恶意PHP脚本伪装成图片上传</mark>
> 		- 检查文件是否存在
> 		- 限制文件大小
> 		- 限制文件类型
> 		- 上传 `move_uploaded_file()`

# PHP过滤器
> [!note] 
> - 列出过滤器清单: `filter_list()` -> `$index => $filter`
> - 获取过滤器id: `filter_id($filter)`
> - filter_var()函数
> 	- 字符串
> 		- 清理字符串 `$newstr = filter_var($str, FILTER_SANITIZE_STRING);`
> 		- 移除ASCII值大于127的字符 `filter_var($str, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH)`
> 	- 整数
> 		- 验证整数 `filter_var($int, FILTER_VALIDATE_INT) === 0 || !filter_var($int, FILTER_VALIDATE_INT) === false` 
> 			- `filter_var($int, FILTER_VALIDATE_INT)` 整数返回值是它本身 , 其他返回值是false
> 		- 验证范围内的整数 `filter_var($int, FILTER_VALIDATE_INT, array("options" => array("min_range"=>$min, "max_range"=>$max))) === false`
> 	- IP
> 		- 验证IP `!filter_var($ip, FILTER_VALIDATE_IP) === false`
> 		- 验证IPv6 `!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) === false`
> 	- 邮箱
> 		- 清理 `$email = filter_var($email, FILTER_SANITIZE_EMAIL)`
> 		- 验证 `!filter_var($email, FILTER_VALIDATE_EMAIL) === false`
> 	- URL
> 		- 清理 `$url = filter_var($url, FILTER_SANITIZE_URL)`
> 		- 验证 `!filter_var($url, FILTER_VALIDATE_URL) === false`
> 		- 验证-必须包含查询字符串 `!filter_var($url, FILTER_VALIDATE_URL, FILTER_FLAG_QUERY_REQUIRED) === false`


# OOP
> [!note] 
> - 访问修饰符
> 	- `public` - 属性或方法可以在任何地方被访问。这是默认值
> 	- `protected` - 属性或方法可以在类内部以及从该类派生的类中被访问
> 	- `private` - 属性或方法只能在类内部被访问
