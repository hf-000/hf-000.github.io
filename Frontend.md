#### 将react+vite前端部署到服务器上

##### 构建前端

```
npm run build
```

这将生成一个 dist 文件夹，包含了优化后的静态文件。

这将把本地 `dist` 文件夹中的所有文件复制到 Nginx 容器的 `/usr/share/nginx/html/` 目录中，Nginx 默认从这个目录提供静态文件。

```
docker cp ./dist/. nginx-container-id:/usr/share/nginx/html/
```

#### 配置服务器上docker里面的nginx.conf，注意一定要把service写在http里面！！！

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    tcp_nopush     on;
    tcp_nodelay    on;
    keepalive_timeout  65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        server_name  14.103.176.66;  # 替换为你的公网 IP 或域名

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location /api/ {
            proxy_pass http://14.103.176.66:10000/api/;  # 替换为你的后端服务地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

配置好后启动nginx容器

```
docker run -d -p 8080:80 --name nginx  -v   /root/nginx.conf:/etc/nginx/nginx.conf:ro   -v  /root/dist:/usr/share/nginx/html:ro     nginx
```

运行成功后访问IP/域名+:8080就ok了
