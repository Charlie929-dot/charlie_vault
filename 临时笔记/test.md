⽂章⽬录

🚀一、C++的输入和输出

⛳（一）C++的标准输入输出

🎈1.使用cout进行C++输出

（1）格式化输出

🎈2.使用cin进行C++输入

（1）cin处理单字符输入

（2）面向行的输入：getline()和get()

⛳（二）文件输入/输出

🎈1.文件输出

🎈2.文件输入

🎈3.二进制文件的读写

🎈4.按指定格式读写文件

🎈5.文件流的状态检查与定位

🚀⼀、C++的输⼊和输出

⛳（⼀）C++的标准输入输出

在C语言 中，我们通常会使用 scanf、printf 和其他所有标准C输入和输出函数，来对数据进行输入

输出操作。在C++语言中，C语言的这一套输入输出库我们仍然能使用，但是 C++ 又增加了一套新

的、更容易使用的输入输出库。即iostream库

iostream 库包含两个基础类型 istream 和 ostream，分别表示输入流和输出流。一个流就是一个

字符序列，是从IO设备读出或写入IO设备的。术语“流”(stream）想要表达的是，随着时间的推移，

字符是顺序生成或消耗的。

标准输⼊输出对象：

标准库定义了4个IO对象。为了处理输入，我们使用一个名为cin

(发音为see-in)的istream类型的对

象。这个对象也被称为标准输入( standard input)。对于输出，我们使用一个名为 cout(发音为 see

out）的 ostream 类型的对象。此对象也被称为标准输出( standard output)。标准库还定义了其他

两个ostream对象，名为cerr和clog(发音分别为see-err和 see-log)。我们通常用cerr来输出警告和错

误消息，因此它也被称为标准错误（standard error)。而clog用来输出程序运行时的一般性信息。

🎈1.使⽤cout进⾏C++输出

（1）基本⽤法：

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

1/15<<符号表示该语句把这个字符串发送给cout（只是发送该字符串的地址）；该符号指出了信息

流动的路径

可以用<<符号拼接输出：

cout是一个预定义的对象，对象是类的特点实例

从概念上看，输出是一个流，即从程序流出的一系列字符。cout对象表示这种流，其属性是在

iostream文件中定义的。cout的对象属性包括一个插入运算符(<<)，它可以将其右侧的信息插入

到流中。

与printf复杂的使用转换说明不同，C++插入运算符 (<<）会根据其后的数据类型应地调整其行

为，这是一个运算符重载的例子。cout的智能行为源自C++的面向对象特性

C++提供了两种发送消息的方式：一种方式是使用类方法（本质上就是函数调用）；另一种方式是重

新定义运算符，cin和cout采用的就是这种方式。因此，下面的语句使用重新定义的<<运算符将“显示

消息”发送给cout：

如果熟悉C后才开始学习C++，则可能注意到了，插入运算符(<<)看上去就像按位左移运算符(<<)，这是一个

运算符重载的例子，通过重载，同一个运算符将有不同的含义。编译器通过上下文来确定运算符的含义。C

本身也有一些运算符重载的情况。例如，&符号既表示地址运算符，又表示按位AND运算符;*既表示乘法，

又表示对指针解除引用。这里重要的不是这些运算符的具体功能，而是同一个符号可以有多种含义，而编译

器可以根据上下文来确定其含义。C++扩展了运算符重载的概念，允许为用户定义的类型(类)重新定义运算

符的含义。

（1）格式化输出

cout << "come up and C++ me some time. " ;

运

cpp

1

cout << "Now you have " << carrots << " carrots." << endl ;

运

cpp

1

//使用运算符重载

cout << "I am not a crook."

//使用类方法

cout.put('!');

cout.put(ch);

运

cpp

1

2

3

4

5

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

2/15ostream类包含一些可用于控制格式的成员函数，能够精确地控制输出的格式—字段宽度、小数位

数、采用小数格式还是E格式等，比如setf()

通常cout会删除结尾的零，例如，将3333333.250000显示为3333333.25。调用cout.setf( )将覆盖这

种行为

cout.setf（ios：：boolalpha）函数调用设置了一个标记，该标记命令cout显示true和false，而不是1

和0。老式C++实现可能要求使用ios：boolalpha，而不是ios_base：：boolalpha来作为cout.setf( )

的参数。

下面的语句导致cout在使用定点表示法时，显示三位小数：

操作符：

**①控制符endl：**表示换行，和cout一样也是在头文件iostream中定义的，且位于名称空间std中

打印字符串时，cout 不会自动移到下一行，第一条cout语句会将光标留在输出字符串的后面。每条

cout 语句的输出从前一个输出的末尾开始

②进制控制符：

在默认情况下，cout以十进制格式显示整数，而不管这些整数在程序中是如何书写的

cout.setf(ios_base::fixed, ios_base::floatfield); // fixed-point

cout << 3333.250000;

运

cpp

1

2

cout.setf(ios_base: :boolalpha); //a newer C++ feature

运

cpp

1

std::cout.precision(3) ;

运

cpp

1

cout << "come up and C++ me some time. " << endl;

运

cpp

1

int chest = 42; //decimal integer literal

int waist = 0x42; // hexadecimal integer literal

int inseam = 042; //octal integer literal

运

cpp

1

2

3

4

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://b

log.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796… 3/15控制符dec、hex和oct，分别用于指示cout以十进制、十六进制和八进制格式显示整数，默认格式为

十进制，在修改格式之前，原来的格式将一直有效：

标识符hex位于名称空间std中，而程序使用了该名称空间，因此不能将hex用作变量名。然而，如果省略编

译指令using，而使用std::cout、std::endl、std::hex和std::oct，则可以将hex用作变量名。

③换⾏符\n：

C++还提供了另一种在输出中指示换行的旧式方法:C语言的转义字符：\n，同样表示换行

endl确保程序继续运行前刷新输出（将其立即显示在屏幕上）；而使用“\n”不能提供这样的保证，这意味着

在有些系统中，有时可能在您输入信息后才会出现提示。

🎈2.使⽤cin进⾏C++输⼊

信息从cin流向carrots，就像C++将输出看作是流出程序的字符流一样，它也将输入看作是流入

程序的字符流。iostream文件将cin定义为一个表示这种流的对象。输出时，<<运算符将字符串

插入到输出流中;输入时,cin 使用>>运算符从输入流中抽取字符。通常，需要在运算符右侧提供

一个变量，以接收抽取的信息（符号<<和>>被选择用来指示信息流的方向)。

与cout一样，cin也是一个智能对象。它可以将通过键盘输入的一系列字符（即输入）转换为接

收信息的变量能够接受的类型。

cout << "chest = " << chest << "(42 in decimal ) \n" ;

cout <<" waist = " << waist e< "(0x42 in hex) \n " ;

cout c< "inseam = " c< inseam << "(042 in octal)\n" ;

//输出：

chest = 42(42 in decimal)

4

5

6

7

8

9

10

11

cout<<hex; //不会在屏幕上显示任何内容，而只是修改cout显示整数的方式。

运

cpp

1

cout << "what's next?\n";

运

cpp

1

int carrots;

cin >> carrots;

运

cpp

1

2

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

4/15如果cin位于测试条件中，则将被转换为bool类型。如果输入成功，则转换后的值为true，否则为

false。

cin与scanf()⽐较：

从键盘输入的都是文本，因为键盘只能生成文本字符：字母、数字和标点符号。转换说明指示了读

取哪种类型的字符

cin和scanf()一样使用空白（空格、制表符和换行符）来确定字符串的结束位置，同样会把非数

字字符放回输入，这意味着程序在下一次读取输入时，首先读到的是上一次读取丢弃的非数字

字符

scanf使用转换说明，而cin的插入运算符 (>>）会根据其后的数据类型应地调整其行为，如果我

们输入的数据类型不匹配，会结束输入，并且不匹配的输入会放回输入缓冲区中，会影响下一

次的输入（会自动读取缓冲区内容）需要使用 fflush(stdin) 清空缓冲区内容

C++输入类型不匹配：

会保留 value 不修改并设置 failbit为1 (C++11 前)。写入零到 value 并设置 failbit 。若输入数据对于

value 过大或过小，则写入 std::numeric_limits::max() 或 std::numeric_limits::min() 并设置 failbit 标

志。(C++11 起)，同时，对cin方法的调用将返回false（如果被转换为bool类型）。

如果需要继续输入，除了需要使用 fflush(stdin) 清空缓冲区内容外，还需要使用cin.clear( )方法清

除EOF标记，否则无法调用cin

（1）cin处理单字符输⼊

cin对象支持3种不同模式的单字符输入，其用户接口各不相同。

文件结尾等和C语言一样（实际上属于操作系统的范畴），当检测到EOF后或者输入错误时，cin将两位错误

标记（eofbit和failbit）都设置为1。

可以通过成员函数eof( )来查看eofbit是否被设置；如果检测到EOF，则cin.eof( )将返回bool值true，否

则返回false。

同样，如果eofbit或failbit被设置为1，则fail( )成员函数返回true，否则返回false。

注意，eof( )和fail( )方法报告最近读取的结果；也就是说，它们在事后报告，而不是预先报告。因此应

将cin.eof( )或cin.fail( )测试放在读取后

设置这个标记后，cin将不读取输入，再次调用cin也不管用。对于文件输入，这是有道理的，因为程序不应

读取超出文件尾的内容。然而，对于键盘输入，有可能使用模拟EOF来结束循环，但稍后要读取其他输入。

cin.clear( )方法可能清除EOF标记，使输入继续进行不过要记住的是，在有些系统中，按Ctrl+Z实际上将结

束输入和输出，而cin.clear( )将无法恢复输入和输出。

由于EOF表示的不是有效字符编码，因此可能不与char类型兼容

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

5/15①使⽤原始的cin输⼊

这种情况单字符输入的话，cin忽略空格和换行符

②使⽤cin.get(ch)

成员函数cin.get

(ch)读取输入中的下一个字符（即使它是空格），并将其赋给变量ch

头文件iostream将cin.get(ch)的参数声明为引用类型，因此该函数可以修改其参数的值

每次读取一个字符，直到遇到EOF的输入循环的基本设计如下：

方法cin.get(char)的返回值是一个cin对象。然而，istream类提供了一个可以将istream对象（如

cin）转换为bool值的函数；当cin出现在需要bool值的地方（如在while循环的测试条件中）时，

该转换函数将被调用。另外，如果最后一次读取成功了，则转换得到的bool值为true；否则为

false。这意味着可以将上述while测试改写为这样：

这比!cin.fail( )或!cin.eof( )更通用，因为它可以检测到其他失败原因，如磁盘故障。

最后，由于cin.get(char)的返回值为cin，因此可以将循环精简成这种格式：

③C语⾔getchar()和putchar()的替代

cin.get (ch) ; // attempt to read a char

while (cin.fail() == false) // test for EOF

{

...// do stuff

cin.get(ch) ; //attempt to read another char

}

//可改写为：

while (!cin.fail())

运

cpp

1

2

3

4

5

6

7

8

9

while (cin)

运

cpp

1

while (cin.get(ch))

运

cpp

1

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

6/15cin.get(arr,20)、cin.get()、cin.get(ch)一共三个版本，函数重载允许对多个相关的函数使用相同的名称

“怀旧”的C语言用户可能喜欢C语言中的字符I/O函数—getchar( )和putchar( )，它们仍然适用，只要像在C语

言中那样包含头文件stdio.h（或新的cstdio）即可。也可以使用istream和ostream类中类似功能的成员函

数，cin.get()和cout.put()

不接受任何参数的cin.get( )成员函数返回输入中的下一个字符。该函数的工作方式与C语言中的

getchar( )相似，将字符编码作为int值返回；而cin.get(ch)返回一个对象，而不是读取的字符。同

样，可以使用cout.put( )函数来显示字符：

cout的put(ch)成员函数的工作方式类似C语言中的putchar( )，只不过其参数类型为char，而不

是int：最初，put( )成员只有一个原型—put(char)。可以传递一个int参数给它，该参数将被强制

转换为char。C++标准还要求只有一个原型。然而，有些C++实现都提供了3个原型：

put(char)、put(signed char)和put(unsigned char)。在这些实现中，给put( )传递一个int参数将

导致错误消息，因为转换int的方式不止一种。使用显式强制类型转换的原型（如

cin.put(char(ch))）可使用int参数。

当该函数到达EOF时，将没有可返回的字符。相反，cin.get( )将返回一个用符号常量EOF表示

的特殊值。该常量是在头文件iostream中定义的。EOF值必须不同于任何有效的字符值，以便程

序不会将EOF与常规字符混淆。通常，EOF被定义为值−1，因为没有ASCII码为−1的字符，但

并不需要知道实际的值，而只需在程序中使用EOF即可。

使用cin.get(ch)（有一个参数）进行输入时，将不会导致任何类型方面的问题。前面讲过，

cin.get(char)函数在到达EOF时，不会将一个特殊值赋给ch。事实上，在这种情况下，它不会将

任何值赋给ch。

cin.get（char）成员函数调用通过返回转换为false的bool值来指出已到达EOF，而cin.get( )成员函数调用则

通过返回EOF值来指出已到达EOF，EOF是在文件iostream中定义的。

//可以使用int ch，并用cin.get( )代替cin.get(char)，用cout.put( )代替cout，用EOF测试代

int ch;

ch = cin.get(); // attempt to read a char

while (ch != EOF) // test for EOF

{

cout.put(ch); //cout.put (char (ch)) for some implementations

++count ;

ch = cin.get();

}

运

cpp

1

2

3

4

5

6

7

8

9

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

7/15（2）⾯向⾏的输⼊：getline()和get()

由于cin使用空白（空格、制表符和换行符）来确定字符串的结束位置，所以每次只会读取一个单

词，get和getline所属iostream类，作用是读取一整行，通过换行符确定读取结束，他们都可以读取

空格。

区别：getline会在读取结束后舍弃换行符（读取换行符但是不存进数组中，直接丢弃），而get会将

换行符保留到输入序列中。

get与getline有两个参数，第一个参数是用来存储的数组名称，第二个参数代表着读取的字节

数。

get：只读取asdfg不读取回车，会导致下一个读取输入时第一个读取“回车”。

getline：getline读取asdfg回车，并将回车转换为“\0”读取，所以最终读取的是“asdfg\0”输入序列

中无回车，下一个读取将会正常读取。

1.如何解决get不舍弃换行符而产生的影响：

在cin.get(arr,20)使用完后插入“cin.get()”，cin.get()不接受任何参数，为get()的一个变体，意义为读取下一个

字符（即使是换行符），用此代码来处理被舍弃的换行符。或者可以将两段代码合为一段：

2.将一行输入读取到string对象：

使用getline(cin, inputLine)：

其中 cin 是正在读取的输入流，而 inputLine 是接收输入字符串的 string 变量的名称。需要注意的是，它不

是类方法。

3.getline()和get()读取空行：

当get( )（不是getline( )）读取空行后将设置失效位（failbit）。这意味着接下来的输入将被阻断，但可以用

char arr[100];

cout<<"输入一段文字:"<<endl;

cin.getline(arr,20); //使用getline

cin.get(arr,20); //使用get

//输入：asdfg 回车

运

cpp

1

2

3

4

5

6

cin.get(arr,20).get();

运

c

1

string name;

getline(cin, name);

cout << "Hello, " << name << endl;

运

c

1

2

3

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

8/15下面的命令来恢复输入：

4.输入行包含的字符数比指定的多：

getline()和get()将把余下的字符留在输入队列中，而getline( )还会设置失效位，并关闭后面的输入。

⛳（⼆）⽂件输⼊/输出

文件流: 对文件进行读写操作

头文件: <fstream>

类库:

ifstream 对文件输入（读文件）

ofstream 对文件输出（写文件）

fstream 对文件输入或输出

cin.clear();

运

C

1

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d6796…

9/15🎈1.⽂件输出

文件输出：让程序输出至文件而不是屏幕、写入到文本文件中

必须包含头文件fstream。

头文件fstream定义了一个用于处理输出的ofstream类。需要声明一个或多个ofstream变量（对

象），并以自己喜欢的方式对其进行命名，条件是遵守常用的命名规则。

必须指明名称空间std；例如，为引用元素ofstream，必须使用编译指令using或前缀std::。

需要将ofstream对象与文件关联起来。为此，方法之一是使用open( )方法。

使用完文件后，应使用方法close( )将其关闭。

#include <fstream>

#include <iostream>

#include <string>

using namespace std;

int main()

{

string name;

int age;

f t

tfil

//也可以使用f t

但是f t

的默认打开方式不截断文件长度

运

cpp

1

2

3

4

5

6

7

8

9

10

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

10/15可结合使用ofstream对象和运算符<<来输出各种类型的数据。

🎈2.⽂件输⼊

对文件输入：让程序使用文件而不是键盘来输入、读取文本文件

必须包含头文件fstream。

头文件fstream定义了一个用于处理输入的ifstream类。需要声明一个或多个ifstream变量（对

象），并以自己喜欢的方式对其进行命名，条件是遵守常用的命名规则。

必须指明名称空间std；例如，为引用元素ifstream，必须使用编译指令using或前缀std::。

需要将ifstream对象与文件关联起来。为此，方法之一是使用open( )方法。

使用完文件后，应使用close( )方法将其关闭。

可结合使用ifstream对象和运算符>>来读取各种类型的数据。

可以使用ifstream对象和get( )方法来读取一个字符，使用ifstream对象和getline( )来读取一行字

符。

可以结合使用ifstream和eof( )、fail( )等方法来判断输入是否成功。

ifstream对象本身被用作测试条件时，如果最后一个读取操作成功，它将被转换为布尔值true，

否则被转换为false。

如果试图打开一个不存在的文件用于输入，情况将如何呢？这种错误将导致后面使用ifstream对象进

行输入时失败。检查文件是否被成功打开的首先方法是使用方法is_open( )，为此，可以使用类似于

下面的代码：

#include <fstream>

#include <iostream>

#include <string>

using namespace std;

int main()

{

string name;

int age;

ifstream infile;

运

cpp

1

2

3

4

5

6

7

8

9

10

11

inFile.open ( "bowling.txt ");

if( !inFile.is_open ())

{

运

cpp

1

2

3

4

5

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

11/15如果文件被成功地打开，方法is_open( )将返回true；因此如果文件没有被打开，表达

式!inFile.isopen( )将为true。函数exit( )的原型是在头文件cstdlib中定义的，在该头文件中，还定义了

一个用于同操作系统通信的参数值EXIT_FAILURE。函数exit( )终止程序。

🎈3.⼆进制⽂件的读写

写二进制文件

使用文件流对象的 write 方法写入二进制数据

读⼆进制⽂件

使用文件流对象的 read 方法

🎈4.按指定格式读写⽂件

exit(EXIT_FAILURE);

}

#include <fstream>

#include <iostream>

#include <string>

using namespace std;

int main()

{

string name;

int age;

f t

tfil

运

cpp

1

2

3

4

5

6

7

8

9

10

#include <fstream>

#include <iostream>

#include <string>

using namespace std;

int main()

{

string name;

int age;

if t

i fil

运

cpp

1

2

3

4

5

6

7

8

9

10

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

12/15🎈5.⽂件流的状态检查与定位

s.is_open( )：文件流是否打开成功,

s.eof( ) ：流 s 是否结束

s.fail( )：流 s 的 failbit 或者 badbit 被置位时, 返回 true

failbit: 出现非致命错误，可挽回, 一般是软件错误，badbit 置位, 出现致命错误, 一般是硬件错误

或系统底层错误, 不可挽回

s.bad( )”流 s 的 badbit 置位时, 返回 true

s.good( )：流 s 处于有效状态时, 返回 true

s.clear( )：流 s 的所有状态都被复位

seekg

作用：设置输入流的位置

参数 1： 偏移量，参数 2： 相对位置

beg 相对于开始位置

cur 相对于当前位置

end 相对于结束位置

#include <fstream>

#include <iostream>

#include <string>

#include <sstream>

using namespace std;

//按指定格式读文件（使用 stringstream）

int main()

{

string name;

运

cpp

1

2

3

4

5

6

7

8

9

10

seekg( off_type offset, ios::seekdir origin );

// 偏移量 起始位置

运

cpp

1

2

//读取当前程序的最后 50 个字符

#include <iostream>

运

cpp

1

2

3

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

13/15tellg

返回该输入流的当前位置(距离文件的起始位置的偏移量)

seekp

设置该输出流的位置

#include <fstream>

#include <string>

using namespace std;

int main(void) {

ifstream infile;

infile.open("定位.cpp");

4

5

6

7

8

9

10

11

//获取当前文件的长度

#include <iostream>

#include <fstream>

#include <string>

using namespace std;

int main(void) {

ifstream infile;

infile.open("定位.cpp");

运

cpp

1

2

3

4

5

6

7

8

9

10

11

//先向新文件写入：“123456789”，然后再在第 4 个字符位置写入“ABC”

#include <iostream>

#include <fstream>

#include <string>

using namespace std;

int main(void) {

ofstream outfile;

outfile.open("test.txt");

if (!outfile.is_open()) {

return 1;

}

outfile << "123456789";

运

cpp

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

14/15行文至此，落笔为终。文末搁笔，思绪驳杂。只道谢不道别。早晚复相逢，且祝诸君平安喜乐，万

事顺意。

outfile.seekp(4, outfile.beg);

outfile << "ABC";

outfile.close();

system("pause");

return 0;

}

18

19

20

21

22

23

24

2025/12/17 18:50

【C++篇】C++的输入和输出_c++输入输出-CSDN博客

https://blog.csdn.net/qq_45491628/article/details/131335564?ops_request_misc=elastic_search_misc&request_id=416e9858b4d679…

15/15