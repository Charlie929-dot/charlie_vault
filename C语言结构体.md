目录

一、前言

二、结构体详解 

🍐什么是结构体

🍎结构体的定义与基础结构

🍑结构体的使用

💦结构体的初始化

💦结构体的成员访问

 💦结构体数组

💦结构体指针--------------指向结构体变量的指针（重点！！！！）

💦结构体指针--------------指向结构体数组的指针（重点！！！！） 

💦 结构体指针--------------结构体成员是指针类型变量（重点！！！！）

🍓typedef关键字与结构体、结构体指针 （超重点！！！）

💦使用typedef定义结构体

💦使用typedef定义结构体指针 

🍉 结构体题目练习

三、共勉

一、前言
    原本以为C语言的结构体很简单，浅浅的看了一下就过了，结果到了数据结构那里，全是结构体的理解，结果当场懵逼，很多代码都是因为结构体理解的不够好，而导致代码看不懂，没办法又回过头来深入的理解一下，并将其总结了一下，希望对大家有用哦！！！！

二、结构体详解 
🍐什么是结构体
知识点1：

🔑首先我们为什么要用到结构体，我们都已经学了很多int char …等类型还学到了同类型元素构成的数组，以及取上述类型的指针，在一些小应用可以灵活使用，然而，在我们实际应用中，每一种变量进行一次声明，再结合起来显然是不太实际的，类如一位学生的信息管理，他可能有，姓名（char），学号（int）成绩（float）等多种数据。如果把这些数据分别单独定义，就会特别松散、复杂，难以规划，因此我们需要把一些相关的变量组合起来，以一个整体形式对对象进行描述，这就是结构体的好处。

🔑 官方来说结构体就是一些值的集合，这些值称为成员变量。结构体的每个成员可以是不同类型的变量。说到集合，数组也是集合，但是不同的是数组只能是相同类型元素的集合。

 知识点2：

结构体类型的声明：
------------------------结构体声明样式------------------------
struct tag
{
  member1;
  member2;
} variable-list;
------------------------解释------------------------
▶ struct是结构体关键字
▶ tag是结构体的标签名，是自定义的
▶ struct tag就是结构体类型
▶ {}里面放的是成员列表
▶ variable-list是变量

▶ member1 , member2 是结构体成员
▶结构体成员的定义方式与变量和数组的定义方式相同
▶结构体成员，只是不能初始化。

🍎结构体的定义与基础结构
知识点1：

结构体的定义：
🔑结构体也是一种数据类型，它由程序员自己定义，可以包含多个其他类型的数据。
🔑像 int、float、char 等是由C语言本身提供的数据类型，不能再进行分拆，我们称之为基本数据类型。

🔑而结构体可以包含多个基本类型的数据，也可以包含其他的结构体，我们将它称为复杂数据类型或构造数据类型。

知识点2：

结构体的基础结构：
🔑先定义结构体类型，再定义结构体变量

 struct   student //结构体类型 或 结构体名
{       
 int num;
 char  name[20];     //结构体成员
 char sex;
 int age; 
 float score;
 char addr[30];
 };
 struct student stu1,stu2;       //结构体变量
运行项目并下载源码
cpp
运行

🔑定义结构体类型的同时定义结构体变量

 struct   data   // 结构体类型 或结构体名
 {      
  int day int month;   //结构体成员
  int year
 }time1,time2;   //结构体变量
运行项目并下载源码
cpp
运行
🔑直接定义结构体变量

 struct     // 结构体类型
{
 char name[20];
 char sex; 
 int num;        //结构体成员
 float score[3] 
 }person1,person2;  //结构体变量 
运行项目并下载源码
cpp
运行
注意：

▶只有结构体变量才分配地址，而结构体的定义是不分配空间的

▶结构体中各成员的定义和之前的变量定义一样，但在定义时也不分配空间

▶结构体变量的声明需要在主函数之上或者主函数中声明，如果在主函数之下则会报错

🍑结构体的使用
💦结构体的初始化
知识点1：

和其它类型变量一样，对结构体变量可以在定义时指定初始值。

#include <stdio.h>
#include <stdlib.h>
struct books    // 结构体类型
{
	char title[50];
	char author[50];    //结构体成员
	char subject[100];
	int book_id;
}book={"C 语言","xingaosheng","编程语言",12345};  //结构体变量的初始化
int main()
{
	printf("title : %s\nauthor: %s\nsubject: %s\nbook_id: %d\n", book.title, book.author, book.subject, book.book_id);
	return 0;
}
运行项目并下载源码
cpp
运行



💦结构体的成员访问
知识点1：

🔑为了访问结构的成员，我们使用成员访问运算符（.）。

🔑引用形式：<结构体类型变量名> . <成员名>

注意：结构体变量不能整体引用，只能引用变量成员

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
struct           // 无标签名，匿名结构体
{
	char name[20];  //姓名
	int num;     //学号
	int age;     //年龄
	char group;   // 所在小组
	float score;  // 成绩
}stu1;            // 结构体变量
 
int main()
{
	// 给结构体成员赋值
	stu1 = { "Tom",12,18,'A',123.3f };
	printf("%s的学号是%d,年龄是%d,在%c组,今年的成绩是%.1f\n", stu1.name, stu1.num, stu1.age, stu1.group, stu1.score);
	return 0;
}
运行项目并下载源码
cpp
运行

运行结果：



 注意：

需要注意的是，结构体是一种自定义的数据类型，是创建变量的模板，不占用内存空间；结构体变量才包含了实实在在的数据，需要内存空间来存储。

 💦结构体数组
知识点1：
🔑 结构体数组：是指数组中的每一个元素都式结构体。
🔑 结构体数组常被用来表示一个拥有相同数据结构的群体。

struct stu
{
    char name[20];  //姓名
    int num;  //学号
    int age;  //年龄
    char group;  //所在小组 
    float score;  //成绩
}class[5];
//表示一个班有5个人
运行项目并下载源码
cpp
运行
🔑结构体数组在定义的同时也可以初始化

struct stu
{
    char name[20];  //姓名
    int num;  //学号
    int age;  //年龄
    char group;  //所在小组 
    float score;  //成绩
}class[5] = {
    {"Li ping", 5, 18, 'C', 145.0},
    {"Zhang ping", 4, 19, 'A', 130.5},
    {"He fang", 1, 18, 'A', 148.5},
    {"Cheng ling", 2, 17, 'F', 139.0},
    {"Wang ming", 3, 17, 'B', 144.5}
};
运行项目并下载源码
cpp
运行

🔑当对数组中全部元素赋值时，也可以不给出数组长度

struct stu
{
    char name[20];  //姓名
    int num;  //学号
    int age;  //年龄
    char group;  //所在小组 
    float score;  //成绩
}class[] = {
    {"Li ping", 5, 18, 'C', 145.0},
    {"Zhang ping", 4, 19, 'A', 130.5},
    {"He fang", 1, 18, 'A', 148.5},
    {"Cheng ling", 2, 17, 'F', 139.0},
    {"Wang ming", 3, 17, 'B', 144.5}
};
运行项目并下载源码
cpp
运行

知识点2： 

结构体数组的使用：计算全班学生的总成绩、平均成绩和140分一下的人数

#include <stdio.h>
#include <stdlib.h>
struct stu
{
	char name[20];
	int num;
	int age;
	char group;
	float score;
} ban[5] = {
	{"xing",5,18,'c',145.0},{"ao",4,19,'a',130.5},
	{"sheng",1,18,'a',148.5},{"pei",2,17,'f',139.0},
	{"yuan",3,17,'b',144.5}
};      // 表示一个班有5个人
int main()
{
	int i, num_140 = 0;
	float sum = 0;
	for (i = 0; i < 5; i++) {
		sum += ban[i].score;
		if (ban[i].score < 140) num_140++;
	}
	printf("sum=%.2f\naverage=%.2f\nnum_140=%d\n", sum, sum / 5, num_140);
	return 0;
}
运行项目并下载源码
cpp
运行

运行结果：



💦结构体指针--------------指向结构体变量的指针（重点！！！！）
知识点1：
🔑可以定义指向结构的指针，方式与定义指向奇特类型变量的指针类似。

🔑定义类型：struct 结构体名 * 结构体指针名

🔑列子：

struct books*struct_pointer 
运行项目并下载源码
cpp
运行
其中 books 为结构体名   struct_pointer为结构体指针名

知识点2：
🔑定义之后可以在上述定义的指针变量中存储结构变量的地址

struct_pointer = &Book1;
运行项目并下载源码
cpp
运行
🔑为了使用指向该结构的指针访问结构的成员，必须使用->运算符

struct_pointer->title;
运行项目并下载源码
cpp
运行
🔑定义结构体指针举例：

struct stu   // 结构体类型 或 结构体名
{
    char *name;  //姓名
    int num;  //学号
    int age;  //年龄
    char group;  //所在小组
    float score;  //成绩
} stu1 = { "Tom", 12, 18, 'A', 136.5 };
//结构体指针
struct stu *pstu = &stu1;
运行项目并下载源码
cpp
运行

🔑也可以在定义结构体的同时定义结构体指针：

struct stu{
    char *name;  //姓名
    int num;  //学号
    int age;  //年龄
    char group;  //所在小组
    float score;  //成绩
} stu1 = { "Tom", 12, 18, 'A', 136.5 }, *pstu = &stu1;
运行项目并下载源码
cpp
运行
注意：
▶ 结构体变量名和数组名不同，数组名在表达式中会被转换为数组指针，而结构体变量名不会，无论在任何表达式中它表示的都是整个集合本身，要想取得结构体变量的地址，必须在前面加&符号，所以给p赋值只能写成。

▶ 结构体和结构体变量是两个不同的概念：结构体是一种数据类型，是一种创建变量的模板，编译器不会为它分配内存空间，就像 int、float、char 这些关键字本身不占用内存一样；结构体变量才包含实实在在的数据，才需要内存来存储。下面的写法是错误的，不可能去取一个结构体名的地址，也不能将它赋值给其他变量。

知识点3：

🔑通过结构体指针可以获取结构体成员，一般形式为：

（*pointer).memberMane                  //pointer为结构体指针名
  pointer->memberName             // 或者 
运行项目并下载源码
cpp
运行
🔑第一种写法中， .  的优先级高于  * ，（*pointer）两边的括号不能少

     如果去掉括号写成*pointer.memberName,
     那么就等效于*(pointer.memberName),这样意义就不对了。

🔑第二种写法中，-> 是一个新的运算符，习惯称它为“箭头”

     有了它，可以通过结构体指针直接取得结构体成员，
     这也是 -> 在C语言中的唯一用途。

知识点4：
 结构体指针的使用：前面两种写法是等效的，我们通常采用第二种写法，这样更加直观。

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
struct stu
{
	char name[20];
	int num;
	int age;
	char group;
	float score;
}stu1 = { "Tom",12,18,'A',136.5 }, * pstu = &stu1;
int main()
{
	// 读取结构体成员的值
	printf("%s的学号是%d,年龄是%d,在%c组,今年的成绩是%.1f!\n", (*pstu).name, (*pstu).num, (*pstu).age, (*pstu).group, (*pstu).score);
	printf("%s的学号是%d,年龄是%d,在%c组,今年的成绩是%.1f!\n", pstu->name, pstu->num, pstu->age, pstu->group, pstu->score);
	return 0;
}
运行项目并下载源码
cpp
运行

运行结果：


💦结构体指针--------------指向结构体数组的指针（重点！！！！） 
知识点1：

在我们想要用指针访问结构体数组的第n个数据时可以用：

struct Student
{	
	char cName[20];
 	int number;
 	char csex;  
}student1;     //结构体变量
struct Student stu1[5];   //结构体数组
struct Student*p;        // 结构体指针
p=stu[n];
(++p).number//是指向了结构体数组下一个元素的地址
 
运行项目并下载源码
cpp
运行

知识点2：
结构体指针与结构体数组的联合使用：

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
struct stu    //结构体类型 或结构体名
{
	char name[20];
	int num;
	int age;   //结构体成员
	char group;
	float score;
}stus[]{           //结构体数组
	{"Zhou ping", 5, 18, 'C', 145.0},
	{"Zhang ping", 4, 19, 'A', 130.5},
	{"Liu fang", 1, 18, 'A', 148.5},
	{"Cheng ling", 2, 17, 'F', 139.0},
	{"Wang ming", 3, 17, 'B', 144.5}
}, * ps;   //结构体指针
int main()
{
	//求数组长度 : sieof(结构体变量)/sizeof(结构体类型名)
	int len = sizeof(stus) / sizeof(struct stu);
	printf("Name\t\tNum\tAge\tGroup\tScore\t\n");
	for (ps = stus; ps < stus + len; ps++)
	{
		printf("%s\t%d\t%d\t%c\t%.1f\n", ps->name, ps->num, ps->age, ps->group, ps->score);
	}
	return 0;
}
运行项目并下载源码
cpp
运行

运行结果：



💦 结构体指针--------------结构体成员是指针类型变量（重点！！！！）
知识点1：
举例代码：

struct Student
{
 	char* Name;//这样防止名字长短不一造成空间的浪费
 	int number;
 	char csex;  
}student1;
 
运行项目并下载源码
cpp
运行
注意：在使用时可以很好地防止内存被浪费，但是注意在引用时一定要给指针变量分配地址，如果你不分配地址，结果可能是对的，但是Name会被分配到任意的一的地址，结构体不为字符串分配任何内存存储空间具有不确定性，这样就存在潜在的危险。


进行代码改进：

struct Student
{
 	char* Name;
 	int number;
 	char csex;  
}stu，*stu；
 
stu.name=(char*)malloc(sizeof(char));//内存初始化
运行项目并下载源码
cpp
运行
如果我们定义了结构体指针变量，他没有指向一个结构体，那么这个结构体指针也是要分配内存初始化的，他所对应的指针类型结构体成员也要相应初始化分配内存

struct Student
{
 	char* Name;
 	int number;
	char csex;  
}stu,*stu;
stu = (struct student*)malloc(sizeof(struct student));./*结构体指针初始化*/
  stu->name = (char*)malloc(sizeof(char));/*结构体指针的成员指针同样需要初始化*/  
 
运行项目并下载源码
cpp
运行
🍓typedef关键字与结构体、结构体指针 （超重点！！！）
💦使用typedef定义结构体
知识点1：
🔑typedef用来定义新的数据类型，通常typedef与结构体的定义配合使用。使用typedef的目的使结构体的表达更加简练（所以说typedef语句并不是必须使用的。)

🔑用大白话来说：

▶ struct 是用来定义新的数据类型——结构体

▶ typedef是给数据类型取别名。

定义一个名字为TreeNode的结构体类型（现在并没有定义结构体变量，并不占用内存空间）：

struct TreeNode   // 结构体类型
{
        int Element;
        struct TreeNode* LeftChild;   //结构体成员
        struct TreeNode* RightChild;
};
运行项目并下载源码
cpp
运行
为结构体起一个别名Node，这时Node就等价于struct TreeNode

typedef struct TreeNode Node;
运行项目并下载源码
cpp
运行
将结构体的定义和typedef语句可以连在一起写：

typedef struct TreeNode   //结构体类型
{
        int Element;              //结构体成员
        struct TreeNode* LeftChild;
        struct TreeNode* RightChild;   
}Node;     // Node 是 struct TreeNode 的别名
运行项目并下载源码
cpp
运行
注意：Node 是 struct TreeNode 的别名（重点！！！！！！！！！）

注意 ：不要与“定义结构体类型的同时定义结构体类型变量”混淆：
使用typedef关键字定义结构体类型 定义结构体类型的同时定义结构体类型变量 

typedef struct student
{
        int age;
        int height;
}std;
//std相当于struct student	
 
struct student
{
        int age;
        int height;
}std1,std2;
 
//定义了student数据类型的结构体和std1、std2结构体变量
运行项目并下载源码
cpp
运行

💦使用typedef定义结构体指针 
知识点1：
使用typedef关键字用一个单词Node代替struct TreeNode，并定义指向该结构体类型的指针PtrToTreeNode：

struct TreeNode
{
        int Element;
        struct TreeNode* LeftChild;
        struct TreeNode* RightChild;
};
typedef struct TreeNode Node;   //用Node代替struct TreeNode
 
Node *PtrToTreeNode;            //定义指针
运行项目并下载源码
cpp
运行
将结构体的定义和typedef连在一起写，再次缩短代码：

typedef struct TreeNode
{
        int Element;
        struct TreeNode* LeftChild;
        struct TreeNode* RightChild;
}Node;                          //定义结构体并用Node代替struct TreeNode
Node *PtrToTreeNode;            //定义指针
运行项目并下载源码
cpp
运行
🍉 结构体题目练习
练习题目一：

 题目连接：牛牛的书_牛客题霸_牛客网

 题目描述：牛牛正在买书，每本书都有名字和价格，牛牛想把书按照价格升序排序。

 样例：

 输入：

3
TheNowcoder 100
Abook 20
BBook 300

输出：
Abook
TheNowcoder
BBook
 AC代码：

include <stdio.h>
#include <stdlib.h>
 typedef struct Book 
{
    char name[100];
    int price;
}BOOK;
int cmp_by_price(const void* e1, const void* e2)  // psort()排序
{
    BOOK* s1 = (BOOK*)e1;          // 指针强制转换
    BOOK* s2 = (BOOK*)e2;
    return s1->price - s2->price;
}
int main()
{
    int n = 0;
    scanf("%d", &n);
    BOOK arr[50];
    for (int i = 0; i < n; i++)
    {
        scanf("%s %d", &arr[i].name, &arr[i].price);
    }
    int sz = sizeof(arr) / sizeof(arr[0]);
    qsort(arr, n, sizeof(arr[0]), cmp_by_price);//快排
    for (int i = 0; i < n; i++)
    {
        printf("%s\n", arr[i].name);
    }
    return 0;
}
运行项目并下载源码
cpp
运行

题目练习二： 

题目连接：竞码编程_少儿编程培训_NOIP培训_CSP培训_蓝桥杯培训|编程教育机构 (hzjingma.com)
题目描述：

给出 nn 个人的语文、数学、英语的成绩。你需要把他们的成绩降序输出。

排序的规则：先按总分排序，如果总分相等，就按语文成绩降序排序。如果语文成绩还相等。就按数学成绩降序排序，如果数学成绩还相等，就按姓名字典序升序排序。

输入

第一行是一个整数 n(1<=n<=1000)n(1<=n<=1000)。

接下来 nn 行，每行包括一个字符串 ss (由小写字母构成，长度不超过1010),以及x,y,z(0<=x,y,z<=100)x,y,z(0<=x,y,z<=100)。ss代表每个学生的姓名，x,y,zx,y,z分别代表语文，数学，英语的成绩。

输出

输出排序后每个人的信息，每个人的信息占一行。姓名，语文、数学、英语之间用一个空格隔开。

样例：

输入

6
jing 2 3 5
ma 3 2 5
a 2 3 5
b 2 3 6
d 5 1 5
c 2 4 5
输出

d 5 1 5
c 2 4 5
b 2 3 6
ma 3 2 5
a 2 3 5
jing 2 3 5
AC代码：

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct x
{
	char name[11]; //姓名
	int x;      //语文
	int y;      //数学
	int z;      //英语
	int score;   //总分
}book;
int cmp_char(const void* e1, const void* e2)
{
	book* s1 = (book*)e1;
	book* s2 = (book*)e2;
	if (s1->score != s2->score)  //按总成绩排序
	{
		return s2->score - s1->score;
	}
	else
	{
		if (s1->x != s2->x)  //按语文成绩排序
		{
			return s2->x - s1->x;
		}
		else
		{
			if (s1->y != s2->y) //按数学成绩排序
			{
				return s2->y - s1->y;
			}
			else
			{
				return strcmp(s1->name, s2->name);  // 按姓名的字典顺序排序
			}
		}
	}
}
int main()
{
	int n;
	scanf("%d", &n);
	book arr[1001];
	for (int i = 0; i < n; i++)
	{
		scanf("%s %d %d %d", &arr[i].name, &arr[i].x, &arr[i].y, &arr[i].z);
		arr[i].score = arr[i].x + arr[i].y + arr[i].z;
	}
	qsort(arr, n, sizeof(arr[0]), cmp_char);
	for (int i = 0; i < n; i++)
	{
		printf("%s %d %d %d\n", arr[i].name, arr[i].x, arr[i].y, arr[i].z);
	}
	return 0;
}
运行项目并下载源码
cpp
运行

三、共勉
以下就是我对C语言结构体的理解，如果有不懂和发现问题的小伙伴，请在评论区说出来哦，同时我还会继续更新对动态内存的理解，请持续关注我哦！！！！！ 


————————————————
版权声明：本文为CSDN博主「sunny-ll」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45031801/article/details/127621419