已知鸢尾花数据的性质，
可以尝试利用这些性质调整参数。

# system-a

`neurons/relu` -- vs `neurons/recu`
move `denseBlock` to `neurons/relu` -- maybe rename to `reluBlock`

[neurons] `leakyRelu`
[neurons] `recuBlock`

[neurons] `recu` -- rectifying correlational unit
[neurons] `correlate`

[models] `morse/`
[models] `tenserZip` -- `[d, n] -> [n, d]` -- like transposing a matrix

# the-book

[the-book] 15: …But It Is Correlated!
[the-book] Epilogue - We've Only Just Begun
[the-book] Appendix B: I Could Have Raced All Day

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
