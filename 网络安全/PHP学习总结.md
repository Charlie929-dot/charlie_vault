#2026-8-24
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