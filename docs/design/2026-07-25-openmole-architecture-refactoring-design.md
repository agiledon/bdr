# OpenMole 架构级重构扩展设计

**版本**: 0.2.0
**状态**: 定稿
**日期**: 2026-07-25

---

## 1. 动机

现有 OpenMole 仅支持 Fowler 代码级坏味道。目标系统在架构（模块化、层、边界）和设计（封装、继承、模块化）层面存在更严重的退化，需要扩展开放能力的识别与消除。

## 2. 三级坏味道层次

原有 CODE 级废弃，统一为三级：

| 级别 | ID前缀 | 范围 | 参考来源 |
|------|--------|------|---------|
| 架构级 | ARCH | 模块化、耦合、内聚、层次、边界、演进 | LargeSW, DDD, Clean Architecture, Evolutionary Architecture |
| 设计级 | DESIGN | 封装、继承、模块化、冗余 | Fowler 2nd (主参考), PHAME (补充) |
| 实现级 | IMPL | 函数、参数、命名、注释 | Fowler 2nd (主参考), 语言惯用法 |

### 2.1 命名规则

- 若 Fowler 覆盖的坏味道，优先使用 Fowler 名称
- 若 Fowler 未覆盖，使用 PHAME/其他权威来源名称
- 每条坏味道标注本质类别（按问题本质分类，非按来源）

### 2.2 ARCH 级坏味道分类

| 类别 | 缩写 | 条目数 | 说明 |
|------|------|--------|------|
| 耦合性 | CP | 7 | 紧耦合、循环依赖、枢纽耦合等 |
| 内聚性 | CH | 5 | 聚合不足、分散式逻辑、特征嫉妒等 |
| 层次性 | LY | 5 | 层级错配、跳过层级、贫瘠模型等 |
| 边界性 | BD | 6 | 边界泄漏、上下文混淆、共享内核膨胀等 |
| 演进性 | EV | 6 | 过度预测、僵化点、技术债务集中等 |

### 2.3 DESIGN 级坏味道分类

| 类别 | 参考来源 | 示例 |
|------|---------|------|
| Bloating | Fowler | Large Class, Primitive Obsession, Data Clump |
| Encapsulation | Fowler | Message Chains, Middle Man, Inappropriate Intimacy |
| Modularization | PHAME (Fowler 未覆盖) | Deficient Encapsulation, Leaky Encapsulation |
| Inheritance Hierarchy | Fowler | Refused Bequest, Lazy Class |
| Redundancy | PHAME | Duplicate Abstraction, Dead Code |
| Design Flaw | PHAME | Multifaceted Abstraction, Imperative Abstraction |

### 2.4 IMPL 级坏味道

| 类别 | 说明 |
|------|------|
| IMPL-COMMON | 语言无关：Mysterious Name, Long Function, Long Parameter List, Comments, Loops |
| IMPL-LANG | 语言特定：按语言自动激活（见 badsmells-catalog.md）|

## 3. 子 Change 模型

一个 change 内可包含多个子目录，每个子目录对应一个级别的完整文档链：

```
openmole/changes/<change-name>/
├── .openmole-change.yaml
├── arch/
│   ├── badsmells.md
│   ├── tasks.md
│   └── analysis.md
├── design/
│   ├── badsmells.md
│   ├── tasks.md
│   └── analysis.md
├── impl/
│   ├── badsmells.md
│   ├── tasks.md
│   └── analysis.md
└── impact-analysis/       # 影响分析文档（ARCH 级必需，其他级别可选）
    └── ...
```

子目录按需创建（mole:explore 时用户指定级别），非必须全有。

## 4. 级别特定重构步骤

### 4.1 IMPL（6 步）

| 步骤 | 内容 | 说明 |
|------|------|------|
| ① | 确认坏味道 | AI 匹配条目 + 定位精确行号 |
| ② | 编写/补测试 | AI 并行生成测试 |
| ③ | 测试全绿 | 自动运行 |
| ④ | 应用重构手法 | 语言感知：按检测到的语言选择重构策略 |
| ⑤ | 回归测试全绿 | 自动运行 |
| ⑥ | 用户确认 | 写操作确认门禁（见 §6）|

### 4.2 DESIGN（7 步）

| 步骤 | 内容 | 说明 |
|------|------|------|
| ① | 确认坏味道 | AI 分析依赖图，定位 |
| ② | 识别接缝与使能点 | AI 推荐接缝类型（Feathers）|
| ③ | 测试安全网 | AI 生成表征测试 |
| ④ | 应用解依赖技术 | AI 执行：子类化、提取接口等 |
| ⑤ | 应用重构 | AI 执行（感知语言）|
| ⑥ | 回归测试 | 自动运行 |
| ⑦ | 用户确认 | 写操作确认门禁（见 §6）|

### 4.3 ARCH（8 步）

| 步骤 | 内容 | 说明 |
|------|------|------|
| ① | 确认坏味道 | AI 分析调用链 + 依赖图 |
| ② | 影响分析 | AI 自动化 + 可视化 |
| ③ | 测试安全网 | AI 生成契约测试 |
| ④ | 选择架构模式 | AI 推荐（Strangler/ACL/CQRS/Event），用户决策 |
| ⑤ | 迁移/回滚计划 | 可豁免但需记录原因 |
| ⑥ | 增量执行 | AI 逐步 + 每步可回退 |
| ⑦ | 回归测试 | 自动 |
| ⑧ | 用户确认 | 写操作确认门禁（见 §6）|

## 5. 语言自动侦测

explore 步骤自动侦测目标语言（通过文件扩展名、配置文件、依赖分析），决策规则：

```
侦测 → 映射 IMPL-COMMON + 激活 IMPL-LANG → 选择重构策略
```

无需用户手动选择语言。

## 6. 写操作确认门禁（跨级约束）

**规则**：任一级别的任意一个重构步骤，若涉及文件写操作，AI 必须先展示：

1. 待变更文件列表
2. 变更内容摘要（diff 或结构性描述）
3. 风险提示（影响范围 / 是否涉及共享接口）

用户输入 `Y` 或 `确认` 后，AI 才执行写操作。

**该门禁不可豁免。**

## 7. Agent 设计模式适配

| 模式 | 用途 | 适用步骤 |
|------|------|---------|
| Commander | AI 执行 → 用户确认 | IMPL ④→⑥, DESIGN ④⑤→⑦ |
| Reflection | AI 自我评估后交用户 | DESIGN ⑦, ARCH ⑧ |
| Planning | AI 规划步骤再有序执行 | ARCH ⑥ |
| Multi-agent 评审 | 多个 Agent 交叉验证 | ARCH ⑧ |

## 8. 宪法原则 v2

### 8.1 八项第一性原则

清晰性、一致性、可读性、复用性、可扩展性、健壮性、安全性、简洁性。

### 8.2 安全原则扩展

> 所有写操作（文档/代码的新建、修改、删除）必须由 AI 生成操作范围与变更 diff，展示给用户并获得明确确认后方可执行。

### 8.3 标准重构步骤（不变）

识别 → 测覆 → 测绿 → 重构 → 回归 → 用户确认

### 8.4 执行粒度

每次 mole:apply 仅处理一个未完成任务。

## 9. 向档结构

宪法原则嵌入各 Skill 的 `## OpenMole 规约摘要` 段落（重复但自包含），不另设独立宪法文件。badsmells-catalog.md 为静态参考（坏味道全集），由 explore 技能按语言过滤后参考。
