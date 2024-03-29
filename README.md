# wt-mission-queue

## use
### queue

`创建一个 mission 队列`

###### 提供方法

| 方法       | 作用                                                         | 备注                                                 |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| start      | 开始队列消费                                                 |                                                      |
| mission    | 注册一个 mission 到队列中                                    |                                                      |
| createMsg  | 创建一个队列消息，需要提供参数为：指定消费的 mission，消息体、是否为最高优先级 | 此方法只能进行消息创建，不支持自动发送消息到对队列中 |
| send       | 向队列中发送消息                                             |                                                      |
| destroyMsg | 在队列中销毁消息，提供消息标识：identifier                   |                                                      |

###### 提供事件

| 事件     | 作用                             | 备注 |
| -------- | -------------------------------- | ---- |
| consumed | 消息消费完成后触发（成功及失败） |      |



### mission

`创建一个 mission 消费者`

###### 提供方法

| 方法        | 作用                                      | 备注 |
| ----------- | ----------------------------------------- | ---- |
| constructor | 创建一个mission，需要提供名称以及组成单元 |      |
| before      | 钩子：消息正式消费前                      |      |
| after       | 钩子：消息消费后                          |      |

### unit

`消费者组成单元，由一个个 task 组成`

###### 提供方法

| 方法 | 作用             | 备注 |
| ---- | ---------------- | ---- |
| task | 细粒度拆分消费者 |      |



### message

`由所属 mission、消息体、消息标识组成`



###  store

`消息消费过程中数据传输载体`

###### 组成部分

| 属性    | 作用                     |
| ------- | ------------------------ |
| state   | 存放运行过程中产生的数据 |
| content | 存放结果                 |





## samples

`npm run samples`