## 0.1 质数个数
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
![[98340f21e664b07eb0bdc213a2773793_MD5.jpg|Open: Pasted image 20251219135923.png]]

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
### 0.1.1 工程思维
### 0.1.2 前缀和
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
### 0.1.3 优化
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

> 范例
```c++
#include <iostream>

#define N 1000001 //需要定义常量作为定长数组
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
### 0.1.4 数组初始化`a[N]={0}`
> 法一:定长数组
> `const int N;a[N]={0}`
> 法二:使用[[vector用法]]
> `vector<int> v(n,0)`

### 0.1.5 筛选
```c++
//a[i]=0为素数,=1为合数
//i为素数则检索其倍数(int j=i*i;j<=NSQRT;j+=i),进行合数标记||i为合数则直接标记
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
```

---

## 0.2 约瑟夫环
```c++
#include <iostream>

#include <vector>

using namespace std;

int main(){
    //输入参数
    int n,k,m;
    cin>>n>>k>>m;
    //初始化vector,储存编号
    vector<int> people;
    for(int i=0;i<n;i++) {
        people.push_back(i);
    }
    int current_idx = k;
    //循环淘汰
    while (people.size() > 1) {
        //计算要淘汰的索引
        current_idx = (current_idx + m) % people.size();
        //删去被淘汰的人
        people.erase(people.begin() + current_idx);
        //*删除之后自动指向下一个人因为后面元素前移）
    }
    cout<< people[0] << endl;
    return 0;
}
```
[[db41960f7829bd852a479e8560fcd2cb_MD5.jpg|Open: Pasted image 20251221144042.png]]
![[db41960f7829bd852a479e8560fcd2cb_MD5.jpg]]

### 0.2.1 [[vector用法|动态数组]]
```c++
vector<int> people;
    for(int i=0;i<n;i++) {
        people.push_back(i);
    }//初始化
```
### 0.2.2 循环标记
```c++
current_idx = (current_idx + m) % people.size();
```

## 0.3 回型数组
```c++
#include <stdio.h>
int main() {
    int arr[20][20], n;
    scanf("%d", &n);
    int up = 0, left = 0, right = n - 1, down = n - 1;
    int x = 1;
    while (x <= n * n)
    {
        for (int i = left; i <= right; i++)
        {
            arr[up][i] = x++;
        }
        up++;
        for (int i = up; i <= down; i++) 
        {
            arr[i][right] = x++;
        }
        right--;
        for(int i = right;i>=left;i--)
        {
           arr[down][i] = x++; 
        }
        down--;
        for(int i = down;i>=up;i--)
        {
            arr[i][left] = x++;
        }
        left++;
    }
    for(int i = 0;i < n;i++)
    {
        for(int j = 0;j<n;j++)
        {
            printf("%d ",arr[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```
[[a589fe538c54d85cb294f7f8751819b7_MD5.jpg|Open: Pasted image 20251225131734.png]]
![[a589fe538c54d85cb294f7f8751819b7_MD5.jpg]]
### 0.3.1 
## 0.4 括号匹配
```c++
#include<iostream>
#include<string>
#include<stack> // 引入栈容器头文件

using namespace std;

// 判断括号是否匹配的核心函数
bool isBracketMatched(string s) {
    stack<char> st; // 定义栈，用于存储左括号

    for (char ch : s) { // 范围for循环遍历表达式中的每个字符
        // 第一步：遇到左括号，直接入栈
        if (ch == '(' || ch == '[' || ch == '{') {
			st.push(ch);
        }
        // 第二步：遇到右括号，进行匹配校验
        else if (ch == ')' || ch == ']' || ch == '}') {
            // 情况1：栈为空（当前右括号无对应左括号，直接不匹配）
            if (st.empty()) {
                return false;
            }

            // 情况2：取出栈顶左括号，判断是否与当前右括号类型匹配
            char topLeft = st.top();
            st.pop(); // 取出栈顶元素后，弹出栈顶

            // 类型不匹配则返回false
            if ((ch == ')' && topLeft != '(') ||
                (ch == ']' && topLeft != '[') ||
                (ch == '}' && topLeft != '{')) {
                return false;
            }
        }
        // 第三步：非括号字符（如字母、数字、运算符），直接跳过
        else {
            continue;
        }
    }

    // 第四步：遍历结束后，栈为空则所有括号匹配成功；否则存在未匹配的左括号
    return st.empty();
}

int main() {
    string expression;
    cin >> expression; // 输入表达式字符串（长度不超过50）

    // 根据函数返回结果输出对应信息
    if (isBracketMatched(expression)) {
        cout << "yes" << endl;
    } else {
        cout << "no" << endl;
    }

    return 0;
}
```
### 0.4.1 栈容器
```c++
stack<char> st;//定义字符型栈容器
st.top();//取栈顶
st.pop();//弹出栈顶
st.push(a);//向栈顶添加元素a
st.empty();//判断容器是否为空
```
### 0.4.2 匹配思路
```c++
// 引入栈容器头文件

// 判断括号是否匹配的核心函数
	
	// 定义栈，用于存储左括号
	
	// 范围for循环遍历表达式中的每个字符
        // 第一步：遇到左括号，直接入栈

        // 第二步：遇到右括号，进行匹配校验

            // 情况1：栈为空（当前右括号无对应左括号，直接不匹配）

            // 情况2：取出栈顶左括号，判断是否与当前右括号类型匹配
		        // 取出栈顶元素后，弹出栈顶

	            // 类型不匹配则返回false

        // 第三步：非括号字符（如字母、数字、运算符），直接跳过

	    // 第四步：遍历结束后，栈为空则所有括号匹配成功；否则存在未匹配的左括号
// 输入表达式字符串（长度不超过50）

// 根据函数返回结果输出对应信息
```
> 1. 分类全面讨论,else不要省


## 0.5 扫雷

```c++
#include <iostream>

using namespace std;

int main(){
    //输入
    int n,m;
    cin>>n>>m;
    char ch[100][100];
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cin>>ch[i][j];
        }
    }
    //地雷检测，上下左右，边界通过索引限制实现    
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            int c=0;
            if(ch[i][j]=='*') continue;
            if((j+1)<m&&ch[i][j+1]=='*'){//短路求值
                c++;
            }
            if((j-1)>=0&&ch[i][j-1]=='*'){
                c++;
            }
            if((i+1)<n&&ch[i+1][j]=='*'){
                c++;
            }
            if((i-1)>=0&&ch[i-1][j]=='*'){
                c++;
            }
            if((i-1)>=0&&ch[i-1][j]=='*'){
                c++;
            }
            if(((i-1)>=0&&(j+1)<m)&&ch[i-1][j+1]=='*'){
                c++;
            }
            if(((i-1)>=0&&(j-1)>=0)&&ch[i-1][j-1]=='*'){
                c++;
            }
            if(((i+1)<n&&(j+1)<m)&&ch[i+1][j+1]=='*'){
                c++;
            }
            if(((i+1)<n&&(j-1)>=0)&&ch[i+1][j-1]=='*'){
                c++;
            }
            ch[i][j]='0'+c;//类型转换
        }
    }

    //输出
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cout<<ch[i][j];
        }
        cout<<endl;
    }
    return 0;
}
```

### 0.5.1 类型转换
##### 0.5.1.1.1 整型转字符
`'0'+1` 
##### 0.5.1.1.2 整型转浮点
`0.1*1` 
### 0.5.2 短路求值
`A&&B`
> A用于限制B在合法条件下运算，如`防止数组越界访问a[-1][0]` `防止无意义运算:1/0`

> 优化版本
```c++
#include<stdio.h>
int main(){
    int m,n;scanf("%d%d",&n,&m);
    char a[1000][1000];
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            scanf("%c",&a[i][j]);
            if(a[i][j]=='\n'){scanf("%c",&a[i][j]);}
        }
    }
    int x[8]={-1,-1,-1,0,0,1,1,1};int y[8]={1,0,-1,1,-1,1,0,-1};//把成对的变换储存到两个数组里面
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            int c=0;int f=0;
            if(a[i][j]=='*'){printf("*");}
            else{
                for(int k=0;k<8;k++){
                if(i+x[k]>=0&&i+x[k]<n&&j+y[k]>=0&&j+y[k]<m){if(a[i+x[k]][j+y[k]]=='*') c++;;}
            }printf("%d",c);
            }
        }printf("\n");
    }
}
```
### 0.5.3 储存变换
```c++
if((j+1)<m&&ch[i][j+1]=='*'){//短路求值
                c++;
            }
            if((j-1)>=0&&ch[i][j-1]=='*'){
                c++;
            }
            if((i+1)<n&&ch[i+1][j]=='*'){
                c++;
            }
            if((i-1)>=0&&ch[i-1][j]=='*'){
                c++;
            }
            if((i-1)>=0&&ch[i-1][j]=='*'){
                c++;
            }
            if(((i-1)>=0&&(j+1)<m)&&ch[i-1][j+1]=='*'){
                c++;
            }
            if(((i-1)>=0&&(j-1)>=0)&&ch[i-1][j-1]=='*'){
                c++;
            }
            if(((i+1)<n&&(j+1)<m)&&ch[i+1][j+1]=='*'){
                c++;
            }
            if(((i+1)<n&&(j-1)>=0)&&ch[i+1][j-1]=='*'){
                c++;
            }
***********************************优化
int x[8]={-1,-1,-1,0,0,1,1,1};int y[8]={1,0,-1,1,-1,1,0,-1};
for(int k=0;k<8;k++){
	if(i+x[k]>=0&&i+x[k]<n&&j+y[k]>=0&&j+y[k]<m){//集中限制索引范围
		if(ch[i+x[k]][j+y[k]]=='*') c++;
	}
```
### 0.5.4 边判断边输出
> 省去了替换数组元素的步骤，一步到位
## 0.6 命令行选项
[[66bd1e7339f3dd6805eb9a868409adc8_MD5.jpg|Open: c47eaf55-adeb-41c8-ae76-0050263d00d0.jpg]]
![[66bd1e7339f3dd6805eb9a868409adc8_MD5.jpg]]
```c++
#include<stdio.h>  
#include<string.h>  
int main(){  
 char a[25][10]={0},b[15][10]={0},s[255]={0};  
 int c=0,f=0,h=0,flag=0,flagg=0,kkk=0;  
 gets(s);  
 int len=strlen(s);  
 for(int i=0;i<len;i++){  
  if(s[i]==32){  
   kkk=kkk+1;  
   h=0;  
  }  
  else{  
   a[kkk][h]=s[i];  
      h=h+1;  
  }  
 }  
   
 for(int i=0;i<=kkk;i++){  
    
   if(a[i][0]!='-'){  
    continue;  
   }  
     
   else{  
    flagg=1;  
    for(int j=0;j<=f;j++){  
     if(strcmp(a[i],b[j])==0){  
      flag=1;  
      break;  
     }  
    }  
      
    if(flag==0){  
     strncpy(b[f],a[i],10);  
      f=f+1;  
    }  
    flag=0;  
    }  
      
   }  
 char t;  
 if(flagg==0){  
  printf("no");  
 }  
 else{  
  for(int i=0;i<f-1;i++){  
  for(int j=i+1;j<f;j++){  
   if(b[i][1]>b[j][1]){  
    t=b[i][1];  
    b[i][1]=b[j][1];  
    b[j][1]=t;  
   }  
  }  
 }  
 for(int i=0;i<=f;i++){  
  for(int j=0;b[i][j]!=0;j++){  
   printf("%c",b[i][j]);  
  }  
  printf(" ");  
 }  
 }  
   
 return 0;  
}
```
#### 0.6.1.1 可考虑先排序,再筛选重复输出
#### 0.6.1.2 flag
#### 0.6.1.3 筛选重复

## 0.7 消除类游戏
[[5ddb9978f7da44871127d0f2367b5dda_MD5.jpg|Open: 5af5146c-3b45-4705-8281-59d5c30cd0bd.jpg]]
![[5ddb9978f7da44871127d0f2367b5dda_MD5.jpg]]
```c++
#include<stdio.h>  
int main(){  
 int m,n;  
 scanf("%d %d",&m,&n);  
 int a[100][30],b[100][30];  
 for(int i=0;i<m;i++){  
  for(int j=0;j<n;j++){  
   scanf("%d",&a[i][j]);  
   b[i][j]=a[i][j];  
  }  
 }  
 for(int i=0;i<m;i++){  
  for(int c=0;c<n-2;c++){  
   int j=c+1,k=c+2;  
  if(a[i][c]==a[i][j] and a[i][j]==a[i][k]){  
   b[i][c]=0;  
   b[i][j]=0;  
   b[i][k]=0;  
  }  
  }  
    
 }  
 for(int i=0;i<n;i++){  
  for(int c=0;c<m-2;c++){  
   int j=c+1,k=c+2;  
  if(a[c][i]==a[j][i] and a[j][i]==a[k][i]){  
   b[c][i]=0;  
   b[j][i]=0;  
   b[k][i]=0;  
  }  
  }  
    
 }  
   
 for(int i=0;i<m;i++){  
  for(int j=0;j<n;j++){  
   printf("%d ",b[i][j]);  
  }  
  printf("\n");  
 }  
 return 0;  
   
   
}
```
### 拷贝数组
> 一个用来检测,一个进行操作
### 重复代替一步到位
> 3\*3的检测框,检测原数组每一个数的时候,就可以不遗漏

### mine
> 1. 跳过0
> 2. 只检测右边和下边,检测后记录,用于跳过重复
> 3. 用x[],y[]记录重复坐标,如果竖直或水平检测重复>=3,替换

## 蛇形矩阵
[[3697b51524bb9352b0371043158e738c_MD5.jpg
![[3697b51524bb9352b0371043158e738c_MD5.jpg]]

```c++
#include<stdio.h>

int main() {
    int n, c = 1;
    scanf("%d", &n);
    int b[n][n];

    for (int k = 0; k <= 2 * n - 2; k++) {
        if (k % 2 == 1) {
            for (int i = 0; i < n; i++) {
                int j = k - i;
                if (j >= 0 && j < n) {
                    b[i][j] = c++;
                }
            }
        } else {
            for (int i = n - 1; i >= 0; i--) {
                int j = k - i;
                if (j >= 0 && j < n) {
                    b[i][j] = c++;
                }
            }
        }
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j == 0) {
                printf("%d", b[i][j]);
            } else {
                printf(" %d", b[i][j]);
            }
        }
        printf("\n");
    }

    return 0;
}

```
### 利用数学函数关系
> 与对角线上平行的点的坐标值之和是定值
> `举一反三` : x+2y,3x+y分别是斜率为-1/2,-3的线上的点


## 哥德巴赫猜想
[[34749636cc1eb0e9c912dfbf3a1e7f0e_MD5.jpg|Open: 39572161-76b9-47a4-bfad-c21eb13e65f2.jpg]]
![[34749636cc1eb0e9c912dfbf3a1e7f0e_MD5.jpg]]
```c++
#include <iostream>

#include <math.h>

  

using namespace std;

  

bool isPrime(int n){

    int f=1;

    for(int i=2;i*i<=n;i++){

        if(n%i==0) f=0;

    }

    if(f) return true;

    else return false;

}

  

int main(){

    long long int a[(long long int)1e8]={0},n;

    cin>>n;

    int k=0;

    for(int i=3;i<n;i+=2){

        if(isPrime(i)){

            a[k]=i;

            k++;

        }

    }

    for(int i=0;i*2<=k;i++){

        for(int j=k-1;j*2>k;j--){

            if(a[i]+a[j]==n){

                cout<<a[i]<<" "<<a[j]<<endl;

                return 0;

            }

        }

    }

    return 1;

}
```
## 汉诺塔
```c++
void hanoi (int n,char from,char to, char by) {
	if (n==1){
		printf ("%c->%c\n", from, to);
		return;
	}
	hanoi (n - 1, from,by,to);
	printf ("%c->%c\n", from, to);
	hanoi (n - 1,by,to,from);
}

int main (){
	int n;
	scanf ("%d", &n);
	hanoi (n, 'a', 'b', 'c');
	return 0;
}
```
[[bbecba06502736f025c7ce436229ac8c_MD5.jpg|Open: Pasted image 20260110174417.png]]
![[bbecba06502736f025c7ce436229ac8c_MD5.jpg]]