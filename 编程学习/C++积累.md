#cpp #课堂 ^c56u62
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

# 优秀代码
## 1
```c++
#include <iostream>
#include <cmath>

#define N 1000001

bool is_prime(int n);//工程思维:先搭框架,再填内容.先声明函数,最后再补全,保持思维连贯性

using namespace std;

int main()
{
    int T, n;
    int a[N];

    a[0] = 0;
    for(int i = 1; i < N; i++)
    {
        a[i] = a[i - 1];
        if(is_prime(i))
        {
            a[i]++;
        }
    }//前缀和

    cin >> T;
    while(T > 0)
    {
        cin >> n;
        cout << a[n] << endl;
        T--;
    }

    return 0;
}

bool is_prime(int n)
{
    bool res = true;
    if(n < 2)
    {
        return false;
    }
    for(int i = 2; i <= sqrt(n); i++)
    {
        if(n % i == 0)
        {
            res = false;
            break;
        }
    }
    return res;
}
```

> mine优化版
```c++
#include<iostream>

using namespace std;

#define N 10000001

bool is_prime(int a);

int main()

{

    int a[N]={0};

    for(int i=1;i<N;i++)

    {
        a[i]=a[i-1];
        if(is_prime(i)) a[i]++;
    }

    int T,n;
    cin>>T;
    while(T--)
    {
        cin>>n;
        cout<<a[n]<<endl;
    }
    return 0;
}

bool is_prime(int a)

{

    if(a<2) return false;

    else{

        for(int i=2;i*i<=a;i++){

            if(a%i==0) return false;

        }

        return true;

    }

}
 ```
### 工程思维
### 前缀和
```c++
for(int i = 1; i < N; i++)
    {
        a[i] = a[i - 1];
        if(is_prime(i))
        {
            a[i]++;
        }
    }
```
### 优化
```c++
bool is_prime(int n)
{
    bool res = true;
    if(n < 2)
    {
        return false;
    }
    for(int i = 2; i <= sqrt(n); i++)
    {
        if(n % i == 0)
        {
            res = false;
            break;
        }
    }
    return res;
}
```


---

## 2
```c++
#include <iostream>

#define N 1000001
#define NSQRT 1000

using namespace std;

int main()
{
    int T, n;
    int a[N]={0};                             /*注意初始化，不然结果每次运行都会不同*/

    for(int i = 2; i <= NSQRT; i++)
    {
        if(a[i] == 0)
        {
            for(int j = i*i; j <= N; j += i)
            {
                a[j] = 1;
            }
        }
    }

    for(int i = 2; i < N; i++)
    {
        if(a[i] == 0)
        {
            a[i] = a[i - 1] + 1;
        }
        else
        {
            a[i] = a[i - 1];
        }
    }

    cin >> T;
    while(T > 0)
    {
        cin >> n;
        cout << a[n] << endl;
        T--;
    }

    return 0;
}
```
### 数组初始化`a[N]={0}`