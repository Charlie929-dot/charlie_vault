
# 创建环境
# 1
`conda create -n my_env python=3.11`
# 2
`conda create -p my_env_abs_path python=3.11`
# 3
`conda create --prefix my_env_abs_path python=3.11`
# 激活环境
`conda activate my_env`
# 启用对应编译器

# 设置库的安装渠道
`conda config --add channels conda-forge`
conda config --set channel_priority strict
