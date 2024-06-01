# system-a

[models] `accurateEnoughIrisTrainParameters`
[models] `gridSearch`

# the-book

[the-book] Interlude VI: How the Model Trains
[the-book] Interlude VII: Are Your Signals Crossed?
[the-book] 14: It's Really Not That Convoluted
[the-book] 15: …But It Is Correlated!
[the-book] Epilogue - We've Only Just Begun
[the-book] Appendix B: I Could Have Raced All Day
[the-book] References

# later

[neurons] extended `linear` and `matrixVactorMul` to all `Tensor`.

- Is `matrixVactorMul` already extended to all `Tensor`?

# problem

[models] `irisModel` 经常会有，以很快的速度训练出来一个错误的模型的情况，
速度很快应该是因为计算退化到了和 0 相关的惩罚。
我们需要对 model 有更好的 debug 手段，才能解决这个问题。
