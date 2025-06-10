##### 使用docker登录opengauss

```bash
$ su omm
$ gsql -d postgres -p 5432

CREATE DATABASE mysql; //创建数据库
\c mysql;  //切换数据库
CREATE USER data_analyst WITH PASSWORD 'AnaLyz3r2025' //创建用户
GRANT CONNECT ON DATABASE test TO myuser;//赋予用户连接数据库的权限
```

##### 执行完之后可以使用客户端连接到数据库

##### 在终端运行，授予用户权利

```shell
GRANT CREATE ON SCHEMA public TO myuser;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;
```

##### 忘记用户密码

```bash
su omm
gsql -d postgres -p 5432
ALTER USER myuser WITH PASSWORD 'new_password';

\q
gsql -d postgres -U myuser -p 5432
```

##### 数据库中查看表，在终端创建表的时候只能复制一行粘贴，不能复制换行的

```
\dt
```

##### redis的docker-compose.yaml

```bash
services:
  redis:
    image: redis
    restart: always
    container_name: redis
    ports:
      - 6379:6379
    volumes:
      - "./conf/redis.conf:/usr/local/etc/redis/redis.conf"
      - "./data:/data"
    command:
      # 执行的命令
      redis-server /usr/local/etc/redis/redis.conf --appendonly yes 
```



