```bash

%% %% 创建环境 %% %%
conda create -n my_env python=3.11
conda create -p my_env_abs_path python=3.11
conda create --prefix my_env_abs_path python=3.11

conda activate my_env
conda config --add channels conda-forge
conda config --set channel_priority strict
```
