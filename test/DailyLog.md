刷B站20min
# 2025-12-13 行为日志

- 08:00 起床
<\!-- 这里插入 -->
- [t::13:20] [d::aaa]
- [t::13:20] [d::bbb]
- [t::13:29] [d::配置行为日志]
- [t::13:30] [d::配置行为日志]

```dataview
TABLE t as "时间", d as "做了什么"
WHERE file.name = "11111"
FLATTEN rows
WHERE t >= dateformat(file.day, "HH:mm")
SORT t ASC
```
