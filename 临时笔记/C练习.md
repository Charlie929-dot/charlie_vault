
[[e2c1838245051502cc0ad8593a07d250_MD5.jpg|Open: Pasted image 20251217135753.png]]
```c++
#include <iostream>

using namespace std;

int main(){
    int n,a[100];
    while(cin>>n){
        int sum=0;//求和，标记，在循环的时候要初始化为0
        for(int i=0;i<n;i++) cin>>a[i];
        //求和
        for(int i=0;i<n;i++){
            sum+=a[i];
        }
        //比较并输出
        for(int i=0;i<n;i++){
            if(n*a[i]<sum) cout<<a[i]<<" ";
        }
        cout<<"\n";
    }
    return 0;
}

```
![[e2c1838245051502cc0ad8593a07d250_MD5.jpg]]

***
[[c6097ffaaa1981bcc172436302e11f33_MD5.jpg|Open: Pasted image 20251217135909.png]]
![[c6097ffaaa1981bcc172436302e11f33_MD5.jpg]]
```c++
#include <iostream>

using namespace std;

int main(){
    int n,m,max=0;
    cin>>n>>m;
    int a[n],b[m];
    for(int i=0;i<n;i++) cin>>a[i];
    for(int i=0;i<m;i++) cin>>b[i];
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(max<a[i]+b[j]) max=a[i]+b[j];
        }
    }
    cout<<max<<endl;
    return 0;
}
//只需要各自的最大值即可
//并不需要存储所有战斗力并排序，利用打擂台的方法一边输入一边找出最大值即可。
/*
#include<bits/stdc++.h>
using namespace std;
int n,m,max1,max2,tmp;
int main(){
    cin>>n>>m;
    while(n--){
        cin>>tmp;
        if(tmp>max1) max1=tmp;
    }
    while(m--){
        cin>>tmp;
        if(tmp>max2) max2=tmp;
    }
    cout<<max1+max2;
    return 0;
}
*/
```

***
##  输出次数出现最多的数
```c++
//法一：计数相等次数过半
#include <iostream>

using namespace std;

int main(){
    int n,c=0;
    long a[1000];
    cin>>n;
    for(int i=0;i<n;i++) cin>>a[i];
    for(int i=0;i<n-1;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            if(a[i]==a[j]) c++;
        }
        if(c>=2) {cout<<a[i]<<"\n";break;}
    }
    return 0;
}
//法二：排序后取中间的数
#include<iostream>
#include<iomanip>
#include<algorithm>
using namespace std;
#define N 1005
int main()
{
    int n;
    cin>>n;
    int a[N];
    for(int i=1;i<=n;i++)
    {
        cin>>a[i];
    }
    sort(a+1,a+n);
    if(n%2==0)cout<<a[n/2]<<endl;
    else
        cout<<a[n/2+1]<<endl;
}
```

[[98340f21e664b07eb0bdc213a2773793_MD5.jpg|Open: Pasted image 20251219135923.png]]
![[98340f21e664b07eb0bdc213a2773793_MD5.jpg]]
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