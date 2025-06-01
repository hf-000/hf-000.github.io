+ 在github上创建仓库hf-000.github.io，必须为公开！！

+ 克隆仓库到本地文件夹

  ```bash
  # 1. 进入你的项目文件夹
  cd /你本地项目路径/
  
  # 2. 初始化 git 仓库（如果还没有）
  git init
  
  # 3. 添加所有文件
  git add .
  
  # 4. 提交
  git commit -m "首次提交"
  
  # 5. 关联 GitHub 仓库（替换成你的仓库地址）
  git remote add origin https://github.com/你的用户名/你的仓库名.git
  
  # 6. 推送到 GitHub（首次推送需要设置分支）
  git push -u origin main
  ```

+ 后续更新项目

  ```bash
  git add .
  git commit -m "更新内容描述"
  git push
  ```

+ 会提示输入用户名和密码，用户名为github用户名，密码**注意**不能使用账号密码，**要使用在github上生成的密钥！！！注意保存**

+ 连接自己的域名，在仓库中创建一个CNAME文件，里面填写域名地址，然后**在域名网站添加主机记录为仓库名的解析**

+ 然后打开仓库setting，查看pages，等待验证域名成功

  

  