# WorkBuddy 安装

## 推荐

```bash
npm install -g openmole   # 或 npm link（在 openmole 仓库根目录）
cd /path/to/your-project
openmole init --ides workbuddy
```

`openmole init` 会在项目内创建：

- `.workbuddy/skills/openmole-*/SKILL.md`
- `.workbuddy/commands/mole-*.md`

WorkBuddy 项目级 skills 与 commands 目录为 `.workbuddy/`，由 WorkBuddy 自动发现（详见 [WorkBuddy 文档](https://www.workbuddy.ai/docs/cli/skills)）。skill 的 YAML frontmatter（`name`、`description`）与 OpenMole 现有格式兼容，无需转换。

## 验证

1. 重启 WorkBuddy
2. 运行 `/skills` 应可发现 `openmole-explore` 等 skill
3. 使用 `/mole-explore` … `/mole-archive` 开始 OpenMole 工作流

## 故障排除

```bash
openmole init --ides workbuddy --force
```

## Git

`.workbuddy/skills/` 与 `.workbuddy/commands/` 为项目配置，建议提交到版本库。
