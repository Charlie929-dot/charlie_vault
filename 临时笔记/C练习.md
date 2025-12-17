
[[e2c1838245051502cc0ad8593a07d250_MD5.jpg|Open: Pasted image 20251217135753.png]]
```c
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
```c
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