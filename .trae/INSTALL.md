# Trae 安装

## 推荐

```bash
npm install -g openmole   # 或 npm link（在 openmole 仓库根目录）
cd /path/to/your-project
openmole init --ides trae
```

`openmole init` 会在项目内创建：

- `.trae/skills/openmole-*/SKILL.md`

Trae 使用项目级 `.trae/skills/` 目录，并依据 SKILL.md 的 `description` 自动发现 skill（详见 [Trae Skills 文档](https://docs.trae.ai/ide/skills)）。OpenMole 的 `SKILL.md` 已含 `name` 与 `description` frontmatter，无需转换。

> 注：Trae 没有独立的 slash command 机制，OpenMole 的 `mole-*` 命令不写入 Trae；请通过自然语言、`#` 快速匹配或 `@skills/.../SKILL.md` 引用触发对应 skill（如「用 openmole-explore 开始一个 change」）。

## 验证

1. 重启 Trae
2. 打开 Settings → Rules & Skills，确认 `openmole-explore` 等 skill 已加载
3. 用自然语言描述需求（例如「使用 openmole-explore 创建 change」）触发 skill

## 故障排除

```bash
openmole init --ides trae --force
```

## Git

`.trae/skills/` 为项目配置，建议提交到版本库。
