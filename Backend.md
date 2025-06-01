##### 将go后端代码编译为可执行的文件

```go
go build -o 文件名称 main.go
```

##### ！！重要，记得配置.env

#### 错误记录：

```go
//！！！！！！必须相互对应
api.GET("/log/doctor/:doctorID", controller.GetLogsByDoctorID)
doctorID := ctx.Param("doctorID")
//对应的请求路径就是"/log/doctor/{doctorID}"

api.GET("/log/doctor", controller.GetLogsByDoctorID)  //请求的参数也是doctorID
imageName := ctx.DefaultQuery("imageName", "")
//请求的路径应该是"/log/doctor?doctorID=${doctorID}"     ${doctorID}是上文中的实体参数
```
