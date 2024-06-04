`gradientDescent` -- inline `revise` for log

修复鸢尾花模型的问题。

- https://github.com/xieyuheng/learner/issues/2

重新读前面的章节，获得一个完整的脉络。
就像笛卡尔所说的，经常从头到尾把问题串联起来想明白，
就可以修炼自己的思考能力和自己对问题的理解。

现在学了两种 layer 了，
用图画笔记来总结一下不同神经网络的结构。

# system-a

[models] `morse/`

[models] `tenserZip` -- `[d, n] -> [n, d]` -- like transposing a matrix

# the-book

[the-book] 15: …But It Is Correlated!
[the-book] Epilogue - We've Only Just Begun
[the-book] Appendix B: I Could Have Raced All Day
[the-book] References

# later

[models] `accurateEnoughIrisTrainParameters`
[models] `gridSearch`

# later

[neurons] extended `linear` and `matrixVactorMul` to all `Tensor`.

- Is `matrixVactorMul` already extended to all `Tensor`?

# problem

[models] `irisModel` 经常会有，以很快的速度训练出来一个错误的模型的情况，
速度很快应该是因为计算退化到了和 0 相关的惩罚。
我们需要对 model 有更好的 debug 手段，才能解决这个问题。
