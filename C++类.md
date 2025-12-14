#cpp #类


## 结构体
- [[C语言结构体]]
  - 仅支持成员变量
  - 无函数/面向对象特性
  - 使用需加struct关键字
- C++结构体
  - 支持变量+成员函数
  - 兼容继承/多态等面向对象特性
  - 使用可省略struct关键字
  - 成员默认public
## 类
- 仅C++独有
- 支持变量+成员函数+面向对象特性
- 成员默认private
## 核心关联
- C无类，仅靠结构体封装数据
- C++中struct与class功能一致，仅默认权限不同

```



### Class Methods类方法

> [!info] 
Methods are 方法是***functions 函数***that belongs to the class.属于类的。
> 
> Functions can be defined inside of class or outside it. You can access methods exactly the same way you access classes by using (.)函数可以在类内部或外部定义。你可以像访问类一样，通过（.）来访问方法

  
 

##### Inside Class Definition在类定义内部

Example:示例：
```c++
#include <iostream>

using namespace std;

class My_Class
{ // The class
  public: // Access specifier
  void My_Method() { // Method(function)
    cout << "Namaste!";
  }
};

int main()
{
  My_Class myObj; // Create an object of MyClass
  myObj.My_Method(); // Call the method

  return 0;
}
```

##### Outside Class Definition类外定义

Example:示例：
```c++
#include <iostream>

using namespace std;

class My_Class            // The class
{
public:            // Access specifier
  void my_Method ();        // Method/function declaration
};

// Method/function definition outside the class
void My_Class::my_Method ()
{
  cout << "Namaste!";
}

int main ()
{
  My_Class myObj;        // Create an object of MyClass
  myObj.my_Method ();        // Call the method
  return 0;
}
```

**Note:** As in functions parameters can be here as well**注意：** 函数参数也可在此处使用

### Access Specifiers访问说明符

The public keyword that occurs in all our class examples is our access specifier. Access specifiers defines the accessibility of classes, methods, and other members.在我们所有类示例中出现的public关键字是我们的访问说明符。访问说明符定义了类、方法及其他成员的可访问性。

There are three kinds of access specifiers in C++C++中有三种类型的访问说明符-`默认private`
1) **Public** : members can be accessed (or viewed) from outside the class1) **公共**：成员可从类外部访问（或查看）

2) **Private** : members cannot be accessed (or viewed) from outside the class2) **私有**：成员不可从类外部访问（或查看）

3) **Protected** : members cannot be accessed from outside the class, however, they can be accessed in inherited classes. (We can define inherited classes as those which inherit attributes and methods from one class to another.)3) **受保护**：成员无法从类外部访问，但可在继承类中访问。（我们可将继承类定义为从一个类继承属性和方法的类。）

We have already looked at examples of public. We will look at the private access specifier with an example:我们已经看过 public 的示例。接下来，我们通过一个示例来了解 private 访问说明符：

Example:示例：

```c++
#include <iostream>

using namespace std;

class My_Class {
  public: // Public access specifier
    int a; // Public attribute
  private: // Private access specifier
    int b; // Private attribute
};

int main() {
  My_Class my_Obj;

  my_Obj.a = 16; // Able to view it(a is public)
  my_Obj.b = 2002; // Not allowed to view it (b is private)

  return 0;
}
```

Output:输出：
**Error错误**
```
main.cpp: In function ‘int main()’: 
main.cpp:19:10: error: ‘int My_Class::b’ is private within this context 
my_Obj.b = 2002; // Not allowed to view it (b is private) 
       ^ 
main.cpp:10:9: note: declared private here 
int b; // Private attribute
    ^
```

### Class Constructors类构造函数

This is a special method. Called once an object of a class is created. In order to create a constructor use the same name as the class, followed by brackets ().这是一种特殊方法。在创建类的对象时调用一次。要创建构造函数请使用与类相同的名称，后接括号 ()。

Example:示例：


```c++
#include <iostream>

using namespace std;

class My_Class // The class
{
  public: // Access specifier
    My_Class() // Constructor
    {
      cout << "Demo Code";
    }
};

int main()
{
  My_Class myObj; // this will automatically call the constructor
  return 0;
}
```


output:输出：

```
Demo Code
```


**Note:** Just like regular functions constructors can also take parameters which can be used for initialising values for attributes.**注意：**与普通函数一样，构造函数也可以接受参数，这些参数可用于初始化属性的值。

**Note:** Constructors can be defined outside the class however it has a different syntax.**注意：**构造函数可以在类外部定义，但其语法有所不同。

**Steps:步骤：**

1. Declare the constructor inside the class在类内部声明构造函数
    
2. Define it outside of the class by mentioning the name of the class在类外部定义，并注明类名
    
3. Use :: operator, followed by the name of the class使用::运算符，后接类名
    

Example:示例：


```c++
#include <iostream>

using namespace std;

class Phone
{ // The class
  public: // Access specifier
    string brand; // Attribute
    string model; // Attribute
    int year; // Attribute
    Phone(string a, string b, int c); // Constructor declaration
};

// Constructor definition outside the class
Phone::Phone(string a, string b, int c)
{
  brand = a;
  model = b;
  year = c;
}

int main() {
  // Create Phone objects and call the constructor with different values
  Phone PhoneObj1("Nokia", "008", 1899);
  Phone PhoneObj2("Samsung", "Galaxy", 1969);

  // Print values
  cout << PhoneObj1.brand << " " << PhoneObj1.model << " " << PhoneObj1.year << "\n";
  cout << PhoneObj2.brand << " " << PhoneObj2.model << " " << PhoneObj2.year << "\n";

return 0;

}
```


Output:输出：

```
Nokia 008 1899
Samsung Galaxy 1969
```

### Class Destructor类析构函数

Class Destructor as it's name suggests is a function which deletes an object.类析构函数顾名思义，是一个用于删除对象的函数。

A destructor function is called when析构函数在以下情况下被调用：  
(1) Function ends(1) 函数结束  
(2) Program ends(2) 程序结束  
(3) Block consisting of local variables ends(3) 包含局部变量的代码块结束  
(4) Delete operator is called(4) 调用 delete 运算符时

Destructors have same name as the class only with a tilde (~)析构函数与类同名，只是名称前加一个波浪号（~）

Destructors do not allow parameters and only one destructor in a class.析构函数不允许有参数，且一个类中只能有一个析构函数。

Example:示例：

```c++
#include <iostream>
#include <string.h>

class string
{
  private:
   char *s;
   int size;
  public:
   string(char *); //constructor
   ~string(); //destructor
};

string::string(char *c)
{
  size = strlen(c);
  s = new char[size+1];
  strcpy(s,c);
  std::cout<<"constructor called\n";
}

string::~string( )
{
  std::cout<<"desctructor called";
  delete [ ]s;
}

int main()
{
    string str("name");
}
```
