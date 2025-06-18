##### docker 里面的/etc/docker/daemon.json
```bash
{
    "registry-mirrors": [
      "https://docker.registry.cyou",
      "https://docker-cf.registry.cyou",
      "https://dockercf.jsdelivr.fyi",
      "https://docker.jsdelivr.fyi",
      "https://dockertest.jsdelivr.fyi",
      "https://mirror.aliyuncs.com",
      "https://dockerproxy.com",
      "https://mirror.baidubce.com",
      "https://docker.m.daocloud.io",
      "https://docker.nju.edu.cn",
      "https://docker.mirrors.sjtug.sjtu.edu.cn",
      "https://docker.mirrors.ustc.edu.cn",
      "https://mirror.iscas.ac.cn"]
  }
```
#### 使用链路追踪jarger，使用docker一键启动
```
o@itachi:~$ docker run --rm --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 5778:5778 \
  -p 9411:9411 \
  jaegertracing/jaeger:2.7.0
```