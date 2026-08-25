#2026-8-24
# PHP语法
> [!note] 
> - `''` 中为纯字符串, 不转译 `\n` `$var`等；`""` 中为转译后字符-> `echo "\n";` 才是换行,`echo "hi $var"` 换成单引号是 `echo 'hi'.$var;` 
> -  `$_FILES[][]` 保存上传的文件信息
> 	1. **`name`**：客户端（用户电脑）上文件的原始名称。
> 	2. **`type`**：文件的 MIME 类型（例如 `image/jpeg`），但这由浏览器提供，不可完全信任。
> 	3. **`size`**：已上传文件的大小，单位是字节（bytes）。
> 	4. **`tmp_name`**：文件上传后，在服务器上保存的**临时文件名和路径**。这是最重要的属性！
> 	5. **`error`**：文件上传相关的错误代码（`0` 表示成功，其他数字代表不同类型的错误）。

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