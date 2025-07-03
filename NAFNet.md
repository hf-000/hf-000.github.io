## Simple Baselines for Image Restoration

#### 1、网络框架

![image-20250702104936345](https://qiniu.itachi0.icu/typora/images/image-20250702104936345.png)![image-20250702105057365](https://qiniu.itachi0.icu/typora/images/image-20250702105057365.png)

#### 2、特点和创新

移除非线性激活函数，利用线性变换和残差学习，减少不必要的非线性，使用复杂度小的模型达到sota

#### 3、缺点

是利用的线性变换，但是实际中的模糊是大量的非线性

#### 4、模型算法

使用残差块堆叠的U型网络结构，学习残差。提出baseline然后进行激活函数改进relu->gelu->simplegate，改进自注意力为SCA

![image-20250702143108656](https://qiniu.itachi0.icu/typora/images/image-20250702143108656.png)

#### 5、原理

* 门控线性单元：本身就含有非线性，所以下面的Gate完全可以去掉$\sigma$

  $Gate(X, f, g, \sigma) = f(X) \odot \sigma(g(X)) $其中的f、g表示变换（卷积层等），$\sigma$表示激活函数（sigmoid等），$\odot$表示元素乘法

  $GELU(X) = x\Phi(x)$，其中的$\Phi$表示标准正态分布的累积分布函数

  得到：$SimpleGate(X,Y) = X \odot Y$
  
* 通道注意力：

  $CA(X) = X * \sigma(W_2relu(W_1pool(X)))   $           $W_1、W_2$是全连接层

  简化为SCA：

  $SCA(X) = X * Wpool(X)$

#### 6、发展趋势

可以作为基本参考

#### 7、实验结果



#### 8、疑问

1. 为什么去除非线性激活函数后的计算效率变高，但是复杂度却减少了

2. 其中的每个块为什么采用两段式的架构，为什么不是一段

   第一段：空间信息建模，扩张感受野、空间混合

   第二段：通道非线性建模，典型的FFN模块，提升通道维度表达能力

3. 论文实验提到的使用TLC策略，代码里面没有？？

   TLC：解决在测试时用patch会带来边缘信息丢失、伪影、性能下降

   <img src="https://qiniu.itachi0.icu/typora/images/image-20250702160259155.png" alt="image-20250702160259155" style="zoom:80%;" />

3. 为什么块的数量是那样进行堆叠的，没有做实验验证其他的堆叠方式？？？

   
[论文pdf](https://qiniu.itachi0.icu/typora/pdfs/NAFNet.pdf)
   
