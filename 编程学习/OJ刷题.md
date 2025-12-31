# 1 命令行选项
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
### 可考虑先排序,再筛选重复输出
### flag
### 筛选重复

