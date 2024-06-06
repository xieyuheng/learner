# system-a

[system-a] `neurons/relu` -- because there will also be `neurons/recu`
[system-a] move `denseBlock` to `neurons/relu` -- maybe rename to `reluBlock`
[system-a] move `gradient` to `gradient/`

[neurons] `leakyRelu`
[neurons] `recuBlock`

[neurons] `recu` -- rectifying correlational unit
[neurons] `correlate`

[models] `morse/`
[models] `tenserZip` -- `[d, n] -> [n, d]` -- like transposing a matrix

# the-book

[the-book] 15: …But It Is Correlated!
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
