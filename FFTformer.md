## Efficient Frequency Domain-based Transformers for High-Quality Image Deblurring

#### 1、网络框架

![image-20250703154836456](https://qiniu.itachi0.icu/typora/images/image-20250703154836456.png)

#### 2、特点和创新

探索transformer在频域中的特性减小transformer的复杂度

<font size="2">将注意力计算从空间域转化为频域中的点乘，通过快速傅里叶变换利用乘积替代矩阵乘法，显著降低计算复杂读</font>

受jpeg压缩算法启发改进transformer中的FFN为DFFN，基于频率选择性保留特征信息，与JPEG的静态压缩不同，DFFN是学习式的压缩，引入可以学习的量化矩阵来判断频率成分的保留

<font size = 2> JPEG会将图像转换到频域通常是（DCT），然后之保留低频，高频部分被丢弃，本文不会盲目丢弃，而是选择性保留高/低频</font>

#### 3、缺点

卷积操作是基本的构建单元，是一种空间不变的局部运算，无法建模图像内容中的空间变化。：“空间不变”指的是卷积核在整张图上共享参数，忽略图像在不同区域特征变化的能力，这个是CNN本质上的一个限制



#### 4、模型算法

将空域矩阵的乘法  改进为  频域逐元素乘法降低复杂度

#### 5、原理

* 卷积定理：两个信号在空域中的卷积等价与它们在批语中的逐元素乘积

  $ f * g = F^{-1}(F(f) ⋅ F(g))$

* 注意力（scaled dot-product attention）：$V_{att} = softmax(\frac{QK^T}{\sqrt{CH_pW_p}})V$

  $(QK^T)_{ij} = <q_i,k_j>$其中的$q_i$和分别是中第i和第j个块的向量化表示

  

#### 6、发展趋势

转换到频域的点乘的运算可以利用，判别式学习量化矩阵的方法可以借鉴

#### 7、实验结果

#### 8、疑问

1. 为什么调整token的排列顺序的时候，这个过程就能通过卷积操作实现？？？？

[论文pdf](https://qiniu.itachi0.icu/typora/pdfs/FFTformer.pdf)