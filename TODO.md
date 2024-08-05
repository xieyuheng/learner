# Interlude VI: How the Model Trains

[models] `accurateEnoughIrisTrainParameters`
[models] `gridSearch`

# Chapter 14 & 15

[perceptrons] `correlate`
[perceptrons] `recu`
[perceptrons] `recuBlock`

[models] `morse/`
[models] `tenserZip` -- `[d, n] -> [n, d]` -- like transposing a matrix

# the-book

[the-book] Appendix B: I Could Have Raced All Day

# later

[perceptrons] extended `linear` and `matrixVactorMul` to all `Tensor`.

- Is `matrixVactorMul` already extended to all `Tensor`?

# learn

重新读前面的章节，获得一个完整的脉络。
就像笛卡尔所说的，经常从头到尾把问题串联起来想明白，
就可以修炼自己的思考能力和自己对问题的理解。

现在学了两种 layer 了，
用图画笔记来总结一下不同神经网络的结构。

练习手算 back propagation。

- https://www.youtube.com/watch?v=SmZmBKc7Lrs

用 propagator 构造带有复杂单元的神经网络。

- neuron 本身就可以 back propagation，所以才能学习（神经的可塑性）。
  - propagator network 可以在运行时部分反向运行。
  - 为了模仿 neuron，还可以设计遗忘机制，因为每个 cell 的容量是有限的。
    - perceptron 并不是唯一的 neuron 模型。

学了 generic 之后，可以用来学 sussman 的力学书。

学了 propagator 之后，可以用来模拟电子电路。

- 学会电子电路，是理解人类神经网络的开端之一。
