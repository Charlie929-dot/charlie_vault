#2026-8-24
# PHP表单
> [!note] 
> - 步骤: 表单处理+安全验证+必填字段+格式检验(URL,E-mail)
> - 安全验证: 
> 	- htmlspecialchars()函数 
> 		- 将php返回结果转为html实体，避免HTML或script代码注入
> 		- 例如：`<form method="post" action="<?php echo $_SERVER["PHP_SELF"];?>"> `
