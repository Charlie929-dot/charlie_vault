#cpp

Using fstream library we can work with files. That library function can be included by using <fstream>使用fstream库，我们可以处理文件。该库函数可通过包含<fstream>来引入

There are 3 objects included in this library.此库中包含3个对象。

ofstream: Creates and writes in filesofstream：创建并写入文件

ifstream: Reads from fileifstream：从文件读取

fstream: Capable of creating, reading and writing in files.fstream：能够创建、读取和写入文件。

# **Create and write in file创建并写入文件**

Can be done using ofstream or fstream.可使用ofstream或fstream实现。

Example:示例：

```c++
#include <iostream>
#include <fstream>
using namespace std;

int main ()
{
  //create and open a text file
  ofstream MyFile ("filename.txt");

  //Write to the file
  MyFile << "Hello File";
  
  //close the file
  MyFile.close();

  return 0;
}
```

 # **To read a file读取文件**

To read from a file, use either the ifstream or fstreamobject要从文件中读取，可使用ifstream或fstream对象

```c++
#include <iostream>
#include <fstream>

using namespace std;

int main ()
{
// Create a text file
  ofstream MyFileWrite ("filename.txt");

// Write to the file
  MyFileWrite << "Hello File!";

// Close the file
  MyFileWrite.close ();

// Create a text string, which is used to output the text file
  string RandomText;

// Read from the text file
  ifstream MyFileRead ("filename.txt");

// Use a while loop together with the getline() function to read the file line by line
  while (getline (MyFileRead, RandomText))
    {
// Output the text from the file
      cout << RandomText;
    }

// Close the file
  MyFileRead.close ();

  return 0;
}
```