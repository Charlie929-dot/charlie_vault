---
aliases:
  - C++ STL 中 vector 动态数组容器详解及约瑟夫环示例
---
`vector` 是 C++ STL（标准模板库）中最常用的动态数组容器，支持**动态扩容**、**随机访问**、**便捷的增删改查**，完全替代了C语言的普通数组（尤其解决了“变长数组不标准”的问题）。下面从**基础语法**、**核心操作**、**常见用法**三个维度，结合约瑟夫环的例子，手把手教你用 `vector`。

### 一、vector 基础：先搞定“初始化+头文件”

#### 1. 必备头文件

使用 `vector` 必须包含头文件：

```C++
#include <vector>  // 核心头文件
using namespace std;  // 否则要写 std::vector
```

#### 2. 初始化方式（最常用的5种）

|            |                                           |                        |
| ---------- | ----------------------------------------- | ---------------------- |
| 初始化方式      | 示例                                        | 说明                     |
| 空vector    | `vector<int> v;`                          | 创建空的int类型vector，长度为0   |
| 指定长度+初始值   | `vector<int> v(n, 0);`                    | 创建长度为n的vector，所有元素初始为0 |
| 直接初始化元素    | `vector<int> v{1,2,3,4};`                 | C++11+支持，初始化为[1,2,3,4] |
| 复制其他vector | `vector<int> v2(v1);`                     | 把v1的所有元素复制到v2          |
| 从数组初始化     | `int a[]={1,2,3}; vector<int> v(a, a+3);` | 从数组a的前3个元素初始化          |

### 二、vector 核心操作（增删改查）

#### 1. 访问元素（和普通数组完全一样）

- 随机访问：`v[index]`（无越界检查，速度快）
    
- 安全访问：`v.at(index)`（有越界检查，抛出异常）
    
- 获取第一个/最后一个元素：`v.front()` / `v.back()`
    

示例：

```C++
vector<int> v{10,20,30};
cout << v[0];    // 输出10（第1个元素）
cout << v.at(1); // 输出20（安全访问）
cout << v.back();// 输出30（最后一个元素）
```

#### 2. 添加元素

- 尾部添加：`v.push_back(值)`（最常用，自动扩容）
    
- 中间插入：`v.insert(迭代器, 值)`（比如在第2个位置插入5）
    

示例：

```C++
vector<int> v;
v.push_back(1);  // v: [1]
v.push_back(2);  // v: [1,2]
v.insert(v.begin()+1, 5); // 在索引1的位置插入5 → v: [1,5,2]
```

#### 3. 删除元素

- 删除尾部：`v.pop_back()`（删除最后一个元素）
    
- 删除指定位置：`v.erase(迭代器)`（比如删除索引1的元素）
    
- 清空所有：`v.clear()`（长度变为0，内存不释放）
    

示例：

```C++
vector<int> v{1,5,2};
v.pop_back();    // 删除最后一个元素 → v: [1,5]
v.erase(v.begin()+1); // 删除索引1的元素 → v: [1]
v.clear();       // 清空 → v: []
```

#### 4. 常用属性/方法

|   |   |   |
|---|---|---|
|方法|作用|示例|
|`v.size()`|获取当前元素个数（长度）|`cout << v.size();`|
|`v.empty()`|判断是否为空（长度为0返回true）|`if(v.empty()) {...}`|
|`v.resize(n)`|调整长度为n（不足补默认值）|`v.resize(5);`|

### 三、结合约瑟夫环的完整示例（新手友好版）

下面用 `vector` 的核心操作，实现一个“注释详细、步骤拆解”的约瑟夫环，帮你理解 `vector` 如何落地：

```C++
#include <iostream>
#include <vector>  // 必须包含
using namespace std;

int main() {
    // 步骤1：输入参数
    int n, k, m;
    cout << "请输入总人数n、起始位置k、报数m：" << endl;
    cin >> n >> k >> m;

    // 步骤2：初始化vector，存储1~n的编号（直接对应人的编号）
    vector<int> people; // 空vector
    for (int i = 1; i <= n; ++i) {
        people.push_back(i); // 尾部添加1,2,...,n
    }

    // 步骤3：调整起始索引（k是第k人，转换为0开始的索引）
    int current_idx = (k - 1) % people.size(); // 防止k超过n

    // 步骤4：循环淘汰，直到只剩1人
    cout << "淘汰顺序：";
    while (people.size() > 1) {
        // 计算要淘汰的人的索引：从current_idx数m步（包含当前）
        current_idx = (current_idx + m - 1) % people.size();
        
        // 输出被淘汰的人（可选，方便理解过程）
        cout << people[current_idx] << " ";
        
        // 删除被淘汰的元素（vector自动收缩）
        people.erase(people.begin() + current_idx);
        
        // 注：删除后，current_idx自动指向“下一个人”（因为后面元素前移）
    }
    cout << endl;

    // 步骤5：输出最后剩下的大王
    cout << "大王的编号是：" << people[0] << endl;

    return 0;
}
```

### 四、新手常见问题解答

#### 1. vector 和普通数组的区别？

|      |                       |                   |
| ---- | --------------------- | ----------------- |
| 特性   | vector                | 普通数组              |
| 长度   | 动态可变（push_back/erase） | 固定（定义后不能改）        |
| 扩容   | 自动扩容（无需手动管理）          | 需手动重新分配内存         |
| 越界检查 | at() 方法支持             | 无（越界直接崩溃）         |
| 兼容性  | 符合C++标准               | 变长数组（int a[n]）非标准 |
|      |                       |                   |

#### 2. 为什么 `erase` 后不需要调整索引？

比如 `vector` 是 `[1,2,3,4]`，删除索引2的元素（3）后，vector 变成 `[1,2,4]`，原来的索引3（4）自动前移到索引2，而 `current_idx` 刚好等于2，所以下一轮直接从4开始报数，无需额外调整。

#### 3. 如何遍历vector？

两种常用方式：

```C++
vector<int> v{1,2,3};

// 方式1：下标遍历（和数组一样）
for (int i = 0; i < v.size(); ++i) {
    cout << v[i] << " ";
}

// 方式2：范围for遍历（C++11+，更简洁）
for (int num : v) {
    cout << num << " ";
}
```

### 五、总结

`vector` 的核心用法可以总结为：

1. 头文件：`#include <vector>` + `using namespace std;`
    
2. 初始化：`vector<int> v(n, 0)`（指定长度+初始值）或 `push_back` 逐个添加；
    
3. 访问：`v[index]`（普通访问）/ `v.at(index)`（安全访问）；
    
4. 增删：`push_back`（加尾部）、`erase`（删指定位置）；
    
5. 常用属性：`size()`（长度）、`empty()`（判空）。
    

结合约瑟夫环的例子，你可以先跑通“直接删除法”，再尝试“标记法”，通过对比加深理解。如果有具体的报错或不懂的细节，随时可以问！