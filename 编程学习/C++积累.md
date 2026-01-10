#cpp #课堂 
# 1 递归函数
`递归深度过大引发堆栈溢出`
每次<mark style="background: #FF5582A6;">递归</mark>调用都会在内存栈中保存局部变量、返回地址等信息，如果递归层数过深（例如处理大规模数据），会<mark style="background: #FFF3A3A6;">超出栈的容量限制</mark>，导致“堆栈溢出”错误。<mark style="background: #FF5582A6;">循环</mark>则不会产生额外的函数调用开销，仅在<mark style="background: #FFF3A3A6;">同一栈帧内迭代</mark>，因此能处理更深层次的计算而不易崩溃。
> [!Note] 解决方法
> 1. 加快收敛
>    `更相减损-->辗转相除`
> 2. 利用循环结构平替

# 2 i--和--i
### 2.1.1 后置递减（i--）
先返回当前值再递减
### 2.1.2 前置递减（--i）
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

# 3 while(n--)
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

# 4 输入单行内容含空格
`getline(cin,a)`
> 输入多行内容`while(getline(cin,str))` `while(scanf("%c",&arr))` `while(cin.get(arr))`

# 5 优秀代码[[OJ刷题]]

# 6 a.bf
`1.5f`是一位整数，五位小数

# 7 aEb
`1E-10=1*10^-10`
`2E-10=2*10^-10`

# 8 [[#类型转换]]

# 9 使用习惯的数组索引
`for(int i=1;i<=n;i++) cin>>a[i];`


# 10 分割字符串
### 10.1.1 法一
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

### 10.1.2 法二
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

### 10.1.3 法三
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


# 11 switch-case语句
### 11.1.1 示例
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

# 12 最大公约数
### 12.1.1 法一/更相减损
```c++
int gcd(int a, int b){
    if(a==abs(a-b)) return a;
    else return gcd(b,abs(a-b));
}
```
### 12.1.2 法二/辗转相除（收敛更快）
```c++
int gcd(int a, int b){
		if(a==b) return a;
		return gcd(b,a%b);
}
```

# 13 16转10进制
```
or (char c : hexStr) {
        int digitValue = hexCharToValue(c);
        decimalValue = decimalValue * 16 + digitValue;
    }
```
> 1.遍历or (char c : hexStr)
> 2.嵌套decimalValue = decimalValue * 16 + digitValue

# 14 输入字符串
```
string a;
cin>>a;
```
> scan需要规定内存大小防止溢出
cin可自动分配内存

# 15 凯撒密码
> 凯撒加密
```
#include <iostream>

using namespace std;

int main()
{
    int n;
    string s;
    cin>>n>>s;
    or(int i=0;i<s.size();i++){
        cout<<char((s[i])-97+n)%26+97);
    }
    return 0;

}
```
> 凯撒解密
```
#include <iostream>

using namespace std;

int main()
{
    int n;
    string s;
    cin>>n>>s;
    or(int i=0;i<s.size();i++){
        cout<<char(-(((-s[i])-(-90)+n)%26+(-90)));
    }
    return 0;

}
```

# 16 计算单词个数
```c++
    char c;
    int count = 0;
    int in_word = 0; // 0=不在单词中，1=在单词中
    while ((c = getchar()) != '\n') {
        if (c != ' ') {
            if (!in_word) {
                count++;
                in_word = 1;
            }
        } else {
            in_word = 0;
        }
    }
    cout<<cout<<endl;
```
> `in_word` : 判断当前字符是否在单词里面,只有当前字符是空格,且下一个字符不是空格,计数器才加1

# 17 未知大小储存
```
    int a = 0x12F; // 即303
    int actors[100]; // 存储因子
    int count = 0;
    // 遍历找因子
    for (int i = 1; i <= a; i++) {
        i (a % i == 0) {
            actors[count] = i;
            sum += i;
            count++;
            }
    print("升序因子：");
    for (int i = 0; i < count; i++) {
        print("%d ", actors[i])
```
> 确定大小：int count = 0;

# 18 判断奇偶
```
a%2==0//取模
a&0==1//按位与
```

# 19 浮点除法
```
print("%", 5.0 / 2); // 输出2.500000

int a = 5, b = 2;
print("%", (double)a / b); // 输出2.500000

int res = (5 * 10) / 2;
print("%", res / 10.0); // 输出2.500000

#include <iomanip>
cout<<ixed[<<setprecision(19)]<<1.0;

cout<<(double)1.0;

```
> cout未接收按浮点数打印指令会直接简化为整型打印

# 20 取十进制整数n的第k位
```
(n / (int)pow(10, k-1)) % 10//pow返回浮点数

//无库函数实现（避免pow精度问题）
int getDigit(int n, int k) {
    int base = 1;
    or (int i = 1; i < k; i++) {
        base *= 10; // 循环k-1次，得到10^(k-1)
    }
    return (n / base) % 10;
}

```

# 21 向上向下取整
```
 //法一：无库代码
    double a;
    cin>>a;
    i(a==(int)a) cout<<a<<endl<<a;
    else cout<<(int)a<<endl<<(int)a+1<<endl;
 //法二：数学库
 #include <math.h>
    x1=(int)floor(x);
    x2=(int)ceil(x);
```
# 22 字符串/字符数组拷贝
> 只需把地址赋值给一个新的变量
```c++
int a[10],b[2][2];
int *p=a;//一维数组拷贝
int p[2][2]=b;//仅可以赋值的时候用b填充，不可p=b（数组变量不能被赋值）
int (*p)[2]=b;//二维数组拷贝
```
> 避坑
```c
int a[2][2] = {{1,2}, {3,4}};
int *p1 = a;    // 错误：a是int(*)[2]，不能直接赋值给int*
int **p2 = a;   // 错误：int**是“指向int指针的指针”，和int(*)[2]完全不兼容
int p3[2][2];p3=a; // 仅初始化合法，赋值时非法
```
# 23 指针数组的意义
> 1. 储存字符串首地址，不需要把字符串都复制一次
> 2. 方便修改
> 3. 不需要声明大小


