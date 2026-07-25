# OpenMole 坏味道全集（Bad Smell Catalog）

**版本**: 0.1.0
**状态**: 草案

## 级别速查

| 级别 | ID前缀 | 说明 |
|------|--------|------|
| 架构级 | ARCH | 模块化、耦合、内聚、层次、边界、演进 |
| 设计级 | DESIGN | 封装、继承、模块化、冗余 |
| 实现级（通用）| IMPL | 函数、命名、参数、注释 |
| 实现级（语言特定）| IMPL-LANG | 按语言激活 |

---

## ARCH — 架构级坏味道

### 耦合性 (CP)

| ID | 名称 | 来源 | 说明 |
|----|------|------|------|
| CP-01 | 紧耦合 Tight Coupling | LargeSW | 模块间过度依赖，难以独立变更 |
| CP-02 | 循环依赖 Circular Dependency | LargeSW | 模块 A 依赖 B，B 直接/间接依赖 A |
| CP-03 | 枢纽耦合 Hub-like Coupling | LargeSW | 中心模块被过多模块依赖，成为单点故障 |
| CP-04 | 分散式耦合 Scattered Coupling | LargeSW | 同一逻辑分散在多处，形成隐含耦合 |
| CP-05 | 条件耦合 Conditional Coupling | DDD | 运行时条件决定调用路径，难以静态分析 |
| CP-06 | 内容耦合 Content Coupling | DDD | 模块直接访问另一模块的内部数据 |
| CP-07 | 隐式耦合 Implicit Coupling | DDD | 依赖未在接口中声明（如全局状态）|

### 内聚性 (CH)

| ID | 名称 | 来源 | 说明 |
|----|------|------|------|
| CH-01 | 聚合不足 Low Cohesion | LargeSW | 模块包含不相关的职责 |
| CH-02 | 分散式逻辑 Scattered Logic | LargeSW | 同一概念的逻辑散落在多个模块中 |
| CH-03 | 特征嫉妒 Feature Envy（架构级）| DDD | 一个模块频繁访问另一模块的内部特征 |
| CH-04 | 并行继承层次 Parallel Inheritance Hierarchies | LargeSW | 一个层次变化导致另一层次必须同步变化 |
| CH-05 | 不安数据 Anemic Data（架构级）| DDD | 模块仅为数据容器，无行为 |

### 层次性 (LY)

| ID | 名称 | 来源 | 说明 |
|----|------|------|------|
| LY-01 | 层级错配 Layer Misplacement | Clean Arch | 逻辑放在了错误的层级 |
| LY-02 | 跳过层级 Layer Skipping | Clean Arch | 上层跳过中间层直接访问底层 |
| LY-03 | 贫瘠模型 Anemic Domain Model | DDD | 领域层仅含数据，业务逻辑在 Service 层 |
| LY-04 | 层级泄漏 Layer Leakage | Clean Arch | 高层概念泄漏到低层 |
| LY-05 | 混沌层 Rat's Nest | LargeSW | 层间依赖混乱，无清晰分层 |

### 边界性 (BD)

| ID | 名称 | 来源 | 说明 |
|----|------|------|------|
| BD-01 | 边界泄漏 Boundary Leakage | DDD | 限界上下文(bounded context)之间的概念混用 |
| BD-02 | 上下文混淆 Context Confusion | DDD | 同一术语在不同上下文中语义不同但未区分 |
| BD-03 | 共享内核膨胀 Shared Kernel Bloat | DDD | 共享内核越来越大，成为耦合点 |
| BD-04 | 防腐层缺失 Missing ACL | DDD | 未对第三方系统做防腐层隔离 |
| BD-05 | 领域事件缺失 Missing Domain Event | DDD | 用过程调用代替事件驱动 |
| BD-06 | 聚合根过多/过少 Aggregate Misdesign | DDD | 聚合根粒度不合理 |

### 演进性 (EV)

| ID | 名称 | 来源 | 说明 |
|----|------|------|------|
| EV-01 | 过度预测 Over-Engineering | Evo Arch | 为不确定的未来过度设计 |
| EV-02 | 僵化点 Rigidity Point | LargeSW | 单点变化引发级联修改 |
| EV-03 | 技术债务集中 Tech Debt Cluster | LargeSW | 大量技术债集中在同一模块 |
| EV-04 | 测试覆盖盲区 Testing Blind Spot | Evo Arch | 关键路径缺少契约/集成测试 |
| EV-05 | 发布耦合 Release Coupling | LargeSW | 模块发布节奏互相绑定 |
| EV-06 | 进化死角 Evolutionary Dead End | Evo Arch | 当前架构无法平滑演进到目标架构 |

---

## DESIGN — 设计级坏味道

### Bloating

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| BS-01 | Large Class | ✓ | Multifaceted Abstraction |
| BS-02 | Long Parameter List | ✓ | — |
| BS-03 | Primitive Obsession | ✓ | — |
| BS-04 | Data Clump | ✓ | — |

### Encapsulation

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| EN-01 | Message Chains | ✓ | Leaky Encapsulation |
| EN-02 | Middle Man | ✓ | — |
| EN-03 | Inappropriate Intimacy | ✓ | — |
| EN-04 | Deficient Encapsulation | — | ✓ |
| EN-05 | Missing Encapsulation | — | ✓ |

### Modularization

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| MO-01 | Insufficient Modularization | — | ✓ |
| MO-02 | Cyclic Dependency | ✓ | — |
| MO-03 | Hub-like Modularization | — | ✓ |

### Inheritance Hierarchy

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| IH-01 | Refused Bequest | ✓ | — |
| IH-02 | Lazy Class | ✓ | — |
| IH-03 | Speculative Generality | ✓ | — |
| IH-04 | Deep Hierarchy | — | ✓ |
| IH-05 | Unfactored Hierarchy | — | ✓ |

### Redundancy

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| RD-01 | Duplicate Code | ✓ | Duplicate Abstraction |
| RD-02 | Dead Code | ✓ | — |
| RD-03 | Unnecessary Interface | — | ✓ |

### Design Flaw

| ID | 名称 | Fowler 2nd | PHAME |
|----|------|-----------|-------|
| DF-01 | Divergent Change | ✓ | — |
| DF-02 | Shotgun Surgery | ✓ | — |
| DF-03 | Incomplete Abstraction | — | ✓ |
| DF-04 | Imperative Abstraction | — | ✓ |
| DF-05 | Unexploited Abstraction | — | ✓ |

---

## IMPL — 实现级坏味道（通用）

| ID | 名称 | Fowler 2nd | 说明 |
|----|------|-----------|------|
| IMPL-01 | Mysterious Name | ✓ | 函数/变量名不能清晰表达意图 |
| IMPL-02 | Long Function | ✓ | 函数过长，难以理解 |
| IMPL-03 | Long Parameter List | ✓ | 参数列表过长 |
| IMPL-04 | Comments | ✓ | 用注释解释难以阅读的代码 |
| IMPL-05 | Loops | ✓ | 可用管道/函数式操作替代的循环 |

---

## IMPL-LANG — 实现级坏味道（语言特定）

### 函数式公共（适用于 Scala/Python/TS/Haskell/Rust）

| ID | 名称 | 适用语言 | 说明 |
|----|------|---------|------|
| FP-01 | 副作用未分离 | Scala, TS, Python, Haskell | 纯函数与不纯函数混用 |
| FP-02 | Monad Transformer 暴露公有 API | Scala, Haskell | 将实现细节泄漏到函数签名 |
| FP-03 | unsafeRunSync 破坏引用透明 | Scala | 在非边界处强行求值 |
| FP-04 | 阻塞操作未挂起 | Scala, Rust | 在异步上下文中同步阻塞 |
| FP-05 | 可变数据未隔离 | 通用 FP | 可变状态逃逸到不可变区域 |
| FP-06 | 组合子/高阶函数误用 | 通用 FP | 错误地选择组合子导致性能/可读性下降 |

### TypeScript

| ID | 名称 | 说明 |
|----|------|------|
| TS-01 | any 类型逃避 | 使用 any 绕过类型检查 |
| TS-02 | 非空断言代替守卫 | 用 ! 代替类型守卫 |
| TS-03 | 巨型接口 Interface Bloat | 接口包含过多字段 |
| TS-04 | 枚举滥用 | 应使用 union type 代替 enum |
| TS-05 | 单一 types.ts 转储文件 | 所有类型集中在单一文件中 |

### Python

| ID | 名称 | 说明 |
|----|------|------|
| PY-01 | 可变默认参数 | 使用可变对象作为函数默认参数 |
| PY-02 | 非 Pythonic 代码 | 可转为列表推导式/生成器表达式的循环 |
| PY-03 | 裸 except: pass | 静默吞掉所有异常 |
| PY-04 | Boolean Trap | 布尔参数含义不明确 |

### Rust

| ID | 名称 | 说明 |
|----|------|------|
| RS-01 | clone() 过度使用 | 过度克隆导致性能问题 |
| RS-02 | unsafe 扩散 | unsafe 进入业务逻辑层 |
| RS-03 | 异步中阻塞 | 在 async 函数中调用 blocking API |
| RS-04 | panic! 处理可恢复错误 | 用 panic 代替 Result |
| RS-05 | Arc\<Mutex\> 作为默认架构 | 使用 Arc\<Mutex\> 代替合理设计 |

### Scala

| ID | 名称 | 说明 |
|----|------|------|
| SC-01 | case class 可变状态 | case class 中包含 var 字段 |
| SC-02 | 模式匹配未穷尽 | match 表达式未覆盖所有 case |
| SC-03 | Trait 代替简单参数 | 可用参数代替的 trait |
| SC-04 | 分类法狂热症 | 不必要的类型层次结构 |

### Ruby

| ID | 名称 | 说明 |
|----|------|------|
| RB-01 | 元编程过度 | method_missing, define_method 滥用 |
| RB-02 | 方法链过长 | 过长的方法链难以调试 |
| RB-03 | Predicate 方法不规范 | 布尔方法命名不一致 |

### C++

| ID | 名称 | 说明 |
|----|------|------|
| CPP-01 | 裸指针代替智能指针 | 手动管理内存的裸指针 |
| CPP-02 | 模板元编程过度 | 编译期计算过度复杂 |
| CPP-03 | 宏代替 constexpr/模板 | 可用现代 C++ 特性替代的宏 |
