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
> ```c++
> 
> ```

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
> ```c++
> 
> ```
