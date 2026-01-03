#cpp #课堂 
# 递归函数
`递归深度过大引发堆栈溢出`
每次<mark style="background: #FF5582A6;">递归</mark>调用都会在内存栈中保存局部变量、返回地址等信息，如果递归层数过深（例如处理大规模数据），会<mark style="background: #FFF3A3A6;">超出栈的容量限制</mark>，导致“堆栈溢出”错误。<mark style="background: #FF5582A6;">循环</mark>则不会产生额外的函数调用开销，仅在<mark style="background: #FFF3A3A6;">同一栈帧内迭代</mark>，因此能处理更深层次的计算而不易崩溃。
> [!Note] 解决方法
> 1. 加快收敛
>    `更相减损-->辗转相除`
> 2. 利用循环结构平替

# i--和--i
### 后置递减（i--）
先返回当前值再递减
### 前置递减（--i）
先递减再返回当前值
> [!Warning]
> for(int i=n;i>=0；i--)
> 是按规定的顺序执行，一次循环结束才开始执行`i--`
> for(初始化; 条件; 迭代) {
>    // 循环体
> }
> `执行步骤`：
> 1. 初始化表达式（只执行一次）
> 2. 检查条件 → 如果为真 → 执行循环体 → 执行迭代表达式
> 3. 重复步骤2

# while(n--)
```c++
#include<stdio.h>
int main()
{
    int n;
    scanf("%d\n",&n);
    while(n--)//给多少用多少
    {
        int i,j,h;
        int str[100];
        scanf("%d\n",&h);
        for(i=0;i<h;i++)
        scanf("%d",&str[i]);
        while(h--)
        {
            printf("%d ",str[h]);
        }
       printf("\n");
    }
    return 0;
}

/***********************mine*********************/
#include <iostream>

using namespace std;

int main(){
    int T,a[100],n,c=0;
    cin>>T;
    while(cin>>n){
        if(c==T) break;
        for(int i=0;i<n;i++){
            cin>>a[i];
        }
        for(int i=n-1;i>=0;i--){
            cout<<a[i]<<" ";
        }
        cout<<endl;
        c++;//先做着，直到达到要求
    }
    return 0;
}
/*相比方法一多绕了一大圈*/
```
> [!Note]
> 1. 直接利用要求的次数T递减
> 2. while(h--)先返回h本身给while判断，然后再递减,而不是在循环之后递减，事实上在这个语句之后就立马递减，需要区分的是for循环它的固定执行顺序，让他在循环之后再递减

# 输入单行内容含空格
`getline(cin,a)`
> 输入多行内容`while(getline(cin,str))` `while(scanf("%c",&arr))` `while(cin.get(arr))`

# 优秀代码[[OJ刷题]]

# a.bf
`1.5f`是一位整数，五位小数

# aEb
`1E-10=1*10^-10`
`2E-10=2*10^-10`

# [[#类型转换]]

# 使用习惯的数组索引
`for(int i=1;i<=n;i++) cin>>a[i];`


# 分割字符串
### 法一
> 二维数组储存,每行一个单词,词尾加上0 
```c++
// 遍历原始字符串
    for (int i = 0; str[i] != '\0'; i++) {
        if (str[i] != ' ') { // 非空格字符，存入当前单词
            words[wordIdx][charIdx++] = str[i];
        } else if (charIdx > 0) { // 遇到空格且当前已有字符（避免连续空格）
            words[wordIdx][charIdx] = '\0'; // 词尾加0（字符串结束符）
            wordIdx++; // 切换到下一个单词
            charIdx = 0; // 重置字符索引
        }
    }
```

### 法二
> 记下空格后面字符的索引,并把空格替换为0
```c++
// 遍历字符串，记录空格后字符的索引，并将空格替换为0
    for (int i = 0; i < len; i++) {
        if (str[i] == ' ') {
            str[i] = 0; // 空格替换为0（字符串结束符）
            // 避免连续空格，确保下一个字符有效
            if (i + 1 < len && str[i+1] != ' ') {
                word[idx++] = i + 1;
            }
        }
```

### 法三
> 利用strtok函数分割
```c++
	token = strtok(str, delim);
    int wordNum = 1;
    // 循环分割，直到token为NULL
    while (token != NULL) {
        cout << "单词" << wordNum++ << "：" << token << endl;
        // 后续调用：传入NULL，继续分割剩余字符串
        token = strtok(NULL, delim);
```


# switch-case语句
### 示例
> **某学校毕业设计成绩评定等级的规则如下：**
> 
> **成绩 >= 90分，为优秀**
> 
> **80分 <= 成绩 <90分，为良好**
> 
> **70分 <= 成绩 <80分，为中等**
> 
> **60分 <= 成绩 70<分，为及格**
> 
> **成绩<60分，为不及格**
> 
> **请编写程序，根据输入成绩，计算并输出成绩评定等级。**

**代码示例：**
```c++
#include <stdio.h>
 
int main()
{
    //定义一个grade变量用来存放成绩
	int grade;
    
	printf("请输入您毕业设计的成绩：");
	scanf("%d",&grade);
	   
    //判断输入的成绩是否超过100
	if(grade<=100){
    
    //如果没有超过一百，据题意那就保留十位数部分去掉个位数部分
	grade=grade/10;
    
	switch(grade)
    {
        /* 因为不管是100还是90以上都是：优秀。所以根据switch case 语句的语法
        如果没有遇到 break 那就接着执行下面的语句 */
		case 10:
		case 9:
			printf("恭喜您！您的成绩为：优秀");
			break;
		case 8:
			printf("您的成绩为：良好");
			break;
		case 7:
			printf("您的成绩为：中等");
			break;
		case 6:
			printf("您的成绩为：及格");
			break;
		default :
			printf("很遗憾您的成绩为：不及格\n要加油啊！不要挂科。"); 
	}
	
    }else            //如果输入的数超过100，则输出：输入错误 
    {
		printf("输入错误！"); 
	}
	return 0;
}
```

> [!note] 执行逻辑
> 1. 寻找并执行匹配的case,直到遇到break(无break会把==之后==的所有case都执行)
> 2. 若无匹配的case,则执行default(无default则跳过switch-case)

# 最大公约数
### 法一/更相减损
```c++
int gcd(int a, int b){
    if(a==abs(a-b)) return a;
    else return gcd(b,abs(a-b));
}
```
### 法二/辗转相除（收敛更快）
```c++
int gcd(int a, int b){
		if(a==b) return a;
		return gcd(b,a%b);
}
```