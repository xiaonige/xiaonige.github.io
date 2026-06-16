---
title: Hermes Agent 完全指南：从零搭建你的智能体助手
date: 2026-05-24 15:26:33
categories:
  - 学习
tags:
  - AI Agent
  - Hermes Agent
  - 智能体工具
  - 本地部署
  - 开源工具
cover: /medias/featureimages/5.jpg
---
## 前言

2026 年，AI Agent 已经从概念走向了全面落地。从 AutoGPT 到各种 Agent 框架，我们看到越来越多能自主执行任务的智能体。但真正能让你在本地自由部署、功能全面且开箱即用的 Agent 平台并不多见，**Hermes Agent** 就是其中的佼佼者。

Hermes Agent 由 Nous Research 开发并开源，是一个功能极其强大的个人 AI 智能体平台。它不仅支持命令行和 TUI 交互，还能接入 Telegram、Discord、飞书等即时通讯工具，具备 Shell 执行、浏览器自动化、文件操作、网页搜索、图片生成等丰富能力。更重要的是，它完全开源，数据隐私由你掌控。

本文将从零开始，手把手带你完成 Hermes Agent 的安装、配置与使用，让你真正拥有一个 7×24 小时为你工作的私人 AI 智能体。

---

## 一、Hermes Agent 是什么

### 1.1 核心定位

Hermes Agent 是一个开源的、可本地部署的 AI 智能体平台。它的核心定位是：**让你拥有一个能真正行动的 AI 助手，而不仅仅是一个聊天机器人**。

与传统 AI 工具不同，Hermes Agent 具备以下特质：

- **自主行动**：能执行 Shell 命令、操作浏览器、读写文件
- **多渠道接入**：CLI、TUI、Telegram、Discord、飞书、Slack 等
- **模型无关**：支持 OpenAI、Anthropic、Google、DeepSeek 等几乎所有主流 LLM
- **完全开源**：代码公开，可审计，数据完全由你掌控
- **可扩展**：通过 Skills 机制无限扩展能力边界

### 1.2 核心架构

Hermes Agent 采用模块化架构设计，主要由以下核心组件构成：

- **Agent Core**：核心引擎，负责任务规划、工具调用和对话管理
- **LLM Provider**：模型接入层，支持多种 LLM 后端切换
- **Tool System**：工具系统，包括 Shell、浏览器、文件系统、搜索等
- **Gateway**：消息网关，连接各种即时通讯平台
- **Skill System**：技能系统，用于扩展专业领域能力
- **Memory System**：记忆系统，实现长期记忆和上下文管理
- **Tirith**：安全扫描引擎，防护提示注入和凭证泄露

这种架构让 Hermes Agent 既强大又灵活 — 你可以只使用 CLI 做本地助手，也可以部署到 VPS 上通过 Telegram 全天候使用。

### 1.3 为什么选择 Hermes Agent

市面上 AI Agent 工具不少，但 Hermes Agent 有几个独特优势：

**开箱即用的完整体验**：一条命令安装，一个命令启动，不需要折腾各种依赖和配置就能获得完整的 Agent 体验。相比之下，很多框架只提供了 API 或 SDK，需要大量二次开发。

**生产级的工具链**：内置的 Tirith 安全扫描、审批模式、权限控制等功能，让它可以直接用于生产环境，而不是停留在玩具阶段。

**真正的多模态交互**：不仅能对话，还能看网页、操作浏览器、生成图片、执行代码。Agent 可以真正地 "做事" 而不是 "说话"。

**活跃的社区生态**：GitHub 上有丰富的 Skills 仓库、优化指南和社区支持，遇到问题很快能找到解决方案。

---

## 二、环境准备与安装

### 2.1 系统要求

Hermes Agent 对硬件要求不高，以下是官方推荐的最低配置：

- **操作系统**：Linux（推荐 Ubuntu 22.04+）、macOS 12+、WSL2（Windows）
- **CPU**：1 核以上即可
- **内存**：2GB 以上（推荐 4GB）
- **磁盘**：10GB 可用空间
- **网络**：需要访问 LLM API 的网络连接

如果你使用本地模型（通过 Ollama 或 vLLM），则需要根据模型大小准备相应的 GPU 资源。

前置依赖（安装脚本会自动处理）：

- Git
- Python 3.11+
- Node.js 18+
- ripgrep
- ffmpeg

### 2.2 一键安装（推荐）

Hermes Agent 提供了一键安装脚本，支持 Linux、macOS 和 WSL2 环境。打开终端执行：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

这个脚本会自动完成以下工作：

1. 检测操作系统和架构
2. 安装 uv（Python 包管理器）
3. 安装 Python 3.11+（如需要）
4. 安装 Node.js 18+（如需要）
5. 安装 ripgrep 和 ffmpeg
6. 克隆 Hermes Agent 仓库
7. 创建虚拟环境并安装 Python 依赖
8. 安装 hermes 命令行工具
9. 创建配置文件目录 `~/.hermes/`

安装完成后，重新加载 shell 配置：

```bash
source ~/.bashrc
```

或者如果你使用 zsh：

```bash
source ~/.zshrc
```

### 2.3 Windows 安装方案

Windows 用户需要先安装 WSL2（Windows Subsystem for Linux），然后在 WSL2 中执行上述安装命令。

WSL2 安装步骤：

1. 以管理员身份打开 PowerShell
2. 执行 `wsl --install` 安装 WSL2 和默认的 Ubuntu 发行版
3. 重启计算机
4. 启动 Ubuntu，设置用户名和密码
5. 在 Ubuntu 终端中执行一键安装命令

如果你希望直接在 Windows 上运行（不通过 WSL2），也可以使用 PowerShell 安装脚本：

```powershell
irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1 | iex
```

但需要注意，Windows 原生模式下部分工具（如 Shell 执行）的功能可能受限，推荐使用 WSL2 方式获得完整体验。

### 2.4 Docker 部署方案

如果你使用 VPS 或希望环境完全隔离，Docker 是最佳选择：

```bash
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup
```

这个命令会：

1. 拉取最新的 Hermes Agent Docker 镜像
2. 将宿主机 `~/.hermes` 目录挂载到容器中
3. 运行交互式设置向导

日常使用 Docker 模式启动：

```bash
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent
```

对于生产环境，建议使用 docker-compose 进行编排，配置日志轮转、自动重启等：

```yaml
version: '3.8'
services:
  hermes:
    image: nousresearch/hermes-agent:latest
    container_name: hermes
    restart: unless-stopped
    volumes:
      - ~/.hermes:/opt/data
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    logging:
      driver: json-file
      options:
        max-size: 10m
        max-file: 3
```

### 2.5 验证安装

安装完成后，验证是否成功：

```bash
hermes --version
hermes --help
```

如果看到版本号输出，说明安装成功。如果提示 `command not found`，尝试重新加载 shell 配置或重新打开终端。

---

## 三、初始配置与设置向导

### 3.1 运行设置向导

安装完成后，运行交互式配置向导：

```bash
hermes setup
```

向导会依次引导你完成以下配置：

1. **选择 LLM 提供商**：从列表中选择你使用的模型服务商
2. **输入 API Key**：填写你的 API 密钥
3. **选择模型**：选择具体使用的模型版本
4. **配置消息网关**：可选连接 Telegram、Discord 等平台
5. **配置工具权限**：设置每个工具的默认审批模式

整个向导过程只需几分钟，完成后你就可以立即开始使用 Hermes Agent。

### 3.2 模型提供商配置

Hermes Agent 支持几乎所有主流 LLM 提供商，这是它的一大优势。你可以随时切换模型提供商：

```bash
hermes model
```

支持的提供商列表：

| 提供商 | 配置方式 | 特点 |
| --- | --- | --- |
| Anthropic | ANTHROPIC_API_KEY 或 OAuth | Claude 系列，长上下文，安全性好 |
| OpenAI | OPENAI_API_KEY | GPT-4o 系列，生态最完善 |
| OpenRouter | OPENROUTER_API_KEY | 统一接口访问多种模型 |
| Google Gemini | GEMINI_API_KEY 或 OAuth | 性价比高，多模态强 |
| DeepSeek | DEEPSEEK_API_KEY | 国产模型，性价比极高 |
| Nous Portal | OAuth 登录 | Nous 自营服务 |
| Kimi / Moonshot | MOONSHOT_API_KEY | 长上下文中文优化 |
| Ollama（本地） | 自定义端点 | 完全本地运行，无需联网 |
| vLLM（本地） | 自定义端点 | 高性能本地推理 |
| 兼容 OpenAI 的任何服务 | 自定义 base_url + api_key | 几乎覆盖所有国产和第三方服务 |

配置自定义端点：

```bash
hermes config set model.provider custom
hermes config set model.base_url https://your-endpoint.com/v1
```

### 3.3 API Key 管理

API Key 属于敏感信息，Hermes Agent 将它们存储在单独的 `~/.hermes/.env` 文件中，而不是直接放在配置文件里。这样可以避免意外将密钥提交到版本控制系统。

`.env` 文件的内容示例：

```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxx
```

你也可以使用 `hermes config set` 命令来设置密钥，工具会自动写入 `.env` 文件：

```bash
hermes config set keys.anthropic sk-ant-xxxxxxxxxxxx
```

### 3.4 配置文件详解

Hermes Agent 的主要配置文件位于 `~/.hermes/config.yaml`，这是一个 YAML 格式的文件，包含所有非敏感配置项。

以下是一个典型的配置文件结构：

```yaml
model:
  provider: anthropic
  name: claude-sonnet-4-20250514
  max_tokens: 4096
  temperature: 0.7

tools:
  terminal:
    enabled: true
    approval: smart
    backend: native
  web_search:
    enabled: true
  filesystem:
    enabled: true
    allowed_paths:
      - /home/user/projects
      - /tmp

gateway:
  telegram:
    enabled: true
```

常用配置命令：

- `hermes config list` — 查看当前所有配置
- `hermes config set <key> <value>` — 修改配置项
- `hermes config get <key>` — 查看单个配置项
- `hermes config reset` — 重置配置到默认值

---

## 四、命令行与 TUI 使用

### 4.1 CLI 基础命令

配置完成后，在终端直接输入 `hermes` 即可进入 CLI 对话模式：

```bash
hermes
```

CLI 模式下你可以直接输入问题或指令与 Agent 对话，和 ChatGPT 类似，但 Agent 拥有执行命令和操作系统的能力。

常用命令参数：

| 参数 | 说明 |
| --- | --- |
| `hermes` | 启动 CLI 对话 |
| `hermes --tui` | 启动 TUI 界面（推荐） |
| `hermes --continue` | 恢复上次会话 |
| `hermes --model <name>` | 临时指定模型 |
| `hermes -m "<指令>"` | 单次指令模式 |
| `hermes session list` | 查看所有会话 |
| `hermes session delete <id>` | 删除指定会话 |

### 4.2 TUI 交互界面

TUI（Terminal User Interface）是推荐的使用方式，提供了更丰富的交互体验：

```bash
hermes --tui
```

TUI 界面包含：

- 左侧对话列表，方便切换不同会话
- 主区域显示对话内容，支持 Markdown 渲染
- 底部输入框支持多行输入
- 快捷键操作（Ctrl+N 新对话，Ctrl+D 删除等）
- 状态栏显示当前模型和工具状态

### 4.3 对话管理

Hermes Agent 会自动保存对话历史，你可以随时恢复之前的对话：

```bash
hermes --continue        # 恢复上次对话
hermes session list    # 列出所有会话
hermes session load <id>  # 加载指定会话
```

所有会话数据存储在 `~/.hermes/sessions/` 目录下，你可以手动备份或清理。

---

## 五、消息网关配置

消息网关是 Hermes Agent 的一大亮点——通过配置，你可以在 Telegram、Discord、飞书等平台与 Agent 对话，实现随时随地使用。

### 5.1 Telegram 集成

Telegram 是最推荐的网关方式，配置简单且稳定：

1. 在 Telegram 中搜索 `@BotFather`，创建新 Bot 并获取 Token
2. 运行配置命令：

```bash
hermes gateway setup
# 选择 Telegram，输入 Bot Token
```

1. 启动网关：

```bash
hermes gateway run
```

之后就可以在 Telegram 中直接给你的 Bot 发消息了。所有对话都会通过 Hermes Agent 处理，并且 Agent 可以执行 Shell 命令、搜索网页等操作。

### 5.2 Discord 集成

配置 Discord 网关：

1. 在 Discord Developer Portal 创建应用和 Bot
2. 获取 Bot Token 并邀请到你的服务器
3. 运行 `hermes gateway setup` 选择 Discord
4. 配置完成后启动网关 `hermes gateway run`

你还可以通过 `allowed_user_ids` 配置限制哪些用户可以使用 Bot，避免被滥用：

```yaml
gateway.discord.allowed_user_ids:
  - "123456789"
```

### 5.3 飞书集成

对于国内用户，飞书集成非常实用：

1. 在飞书开放平台创建应用
2. 开启机器人能力并获取 App ID 和 App Secret
3. 配置事件订阅（接收消息事件）
4. 运行 `hermes gateway setup` 选择 Feishu

飞书网关支持群聊 @ 机器人以及私聊两种模式，非常适合团队使用。

### 5.4 多网关同时运行

Hermes Agent 支持同时运行多个网关，你可以在配置文件中启用多个：

```yaml
gateway:
  telegram:
    enabled: true
    bot_token: "xxx"
  discord:
    enabled: true
```

然后运行 `hermes gateway run --all` 启动所有已启用的网关。这样你就可以在多个平台上同时使用同一个 Agent。

---

## 六、核心功能详解

### 6.1 Shell 命令执行

这是 Hermes Agent 最强大的能力之一——它可以直接在终端执行命令。你可以让它做任何命令行操作：

```plaintext
你：帮我看看服务器磁盘空间使用情况
Agent：好的，我来检查。
→ Agent 执行 df -h，分析结果并告诉你哪些分区快满了
```

Shell 执行的审批模式有三种：

- **manual**：每次执行命令前都询问你确认（最安全）
- **smart**：低风险命令自动执行，高风险命令询问（推荐）
- **off**：完全信任 Agent，自动执行所有命令

配置审批模式：

```bash
hermes config set tools.terminal.approval smart
```

### 6.2 文件系统操作

Agent 可以读写、修改文件系统中的文件。你可以限制其访问范围：

```bash
hermes config set tools.filesystem.allowed_paths \
  '["/home/user/projects","/home/user/documents"]'
```

示例：

```plaintext
你：帮我搜索项目里所有包含 "TODO" 的代码行，按文件归类整理
Agent：让我扫描项目目录...
→ Agent 递归搜索、归类并返回整理结果
```

### 6.3 浏览器自动化

Hermes Agent 内置了浏览器控制能力，可以执行网页操作：

- 打开网页并截取屏幕
- 填写表单、点击按钮
- 提取网页内容
- 模拟登录操作

这对于自动化办公、网页数据采集等场景非常有用：

```plaintext
你：打开公司内部运维后台，帮我看看 Jenkins 构建状态
Agent：好的，我打开浏览器登录后台检查...
```

### 6.4 网页搜索

Agent 可以联网搜索信息，并在回答中结合搜索结果。这对于查询最新文档、技术问题、新闻资讯等非常有用。

```bash
hermes config set tools.web_search.enabled true
```

搜索功能默认使用 DuckDuckGo，你也可以配置其他搜索引擎。

### 6.5 图片生成

如果你配置了支持图片生成的模型（通过 Anthropic、OpenAI 或本地模型），Agent 可以生成图片：

```plaintext
你：帮我画一张系统架构图，展示微服务各组件之间的关系
```

### 6.6 记忆系统

Hermes Agent 拥有长期记忆能力。它会记住你在对话中提到的重要信息，并在后续对话中使用。记忆分为：

- **会话记忆**：当前对话的上下文（临时）
- **长期记忆**：跨会话持久化存储的重要信息
- **技能记忆**：与特定技能相关的知识

你可以主动让 Agent 记住某些信息：

```plaintext
你：记住我习惯用 VS Code 作为编辑器，npm 源用的是淘宝镜像
Agent：好的，我记住了这些偏好设置。
```

下次新会话中，Agent 会自动应用这些记忆。记忆数据存储在 `~/.hermes/memory/` 目录下。

### 6.7 定时任务

Hermes Agent 内置了 Cron 调度器，可以设置定时任务让 Agent 自动执行：

```plaintext
你：每天早上9点帮我检查服务器磁盘，如果使用率超过80%就通知我
Agent：好的，我已经设置了定时任务。
```

你可以在 `~/.hermes/cron.yaml` 中管理和查看所有定时任务。

---

## 七、技能系统（Skills）

### 7.1 什么是 Skills

Skills 是 Hermes Agent 的扩展机制，类似于 VS Code 的扩展或 Chrome 的插件。每个 Skill 赋予 Agent 特定的专业能力——比如写特定类型的代码、操作特定平台、执行特定领域的工作流。

Skills 以 Python 脚本或 YAML 配置文件的形式存在，存储在 `~/.hermes/skills/` 目录下。

### 7.2 安装社区 Skills

Hermes 社区已经创建了大量实用的 Skills：

```bash
# 列出可用技能
hermes skills list-remote
```

```bash
# 安装技能
hermes skills install git-manager
```

```bash
# 查看已安装技能
hermes skills list
```

社区上有哪些实用 Skill：

- **git-manager**：自动管理 Git 仓库操作
- **docker-ops**：Docker 容器管理和监控
- **db-query**：自然语言查询数据库
- **weather**：天气查询
- **finance**：股票和财经信息查询
- **devops-deploy**：自动化部署工作流

### 7.3 自定义 Skill

你也可以自己编写 Skill，非常简单。一个基本的 Skill 就是一个 Python 函数，加上元数据声明：

```python
"""
name: ip-info
description: 查询 IP 地址的地理位置和信息
"""

def run(ip_address: str) -> dict:
    # 调用 IP 查询 API 并返回结果
```

将文件保存为 `~/.hermes/skills/ip-info.py`，然后在对话中 Agent 就会自动识别并使用这个 Skill。

---

## 八、子 Agent 与多 Agent 编排

这是 Hermes Agent 的企业级特性——支持 Agent 分层架构。主 Agent 可以派生子 Agent 来并行处理复杂任务。

例如，一个软件开发任务可以这样编排：

- **主 Agent**：负责项目管理，拆解任务，协调子 Agent
- **子 Agent A**：负责后端 API 开发
- **子 Agent B**：负责前端界面开发
- **子 Agent C**：负责编写测试

你只需要告诉主 Agent 需求，它会自动拆解、分配、协调并汇总结果。这种并行工作模式大大提升了复杂任务的完成效率。

子 Agent 的配置方式：

```yaml
agents:
  backend_dev:
    model:
      provider: anthropic
      name: claude-sonnet-4-20250514
    system_prompt: "你是一位资深后端开发工程师"
  frontend_dev:
    model:
      provider: anthropic
      name: claude-sonnet-4-20250514
    system_prompt: "你是一位资深前端开发工程师"
```

子 Agent 拥有独立的模型配置、系统提示词和工具集，彼此隔离但又能通过主 Agent 协调工作。

---

## 九、安全与权限管理

### 9.1 Tirith 安全扫描

Tirith 是 Hermes Agent 内置的安全扫描引擎，默认启用。它会在 Agent 执行 Shell 命令前扫描命令内容，检测是否存在：

- **提示注入攻击**：恶意指令试图诱导 Agent 执行危险操作
- **凭证泄露**：命令中是否包含 API Key、密码等敏感信息
- **文件破坏操作**：如 rm -rf / 等危险命令
- **网络探测**：异常的网络连接请求

如果你确定命令安全但被误拦，可以手动批准执行。

### 9.2 审批模式

每个工具都可以单独设置审批模式：

| 模式 | 说明 | 适用场景 |
| --- | --- | --- |
| `manual` | 每次操作都需确认 | 高危操作、生产环境 |
| `smart` | 自动判断风险等级 | 日常使用（推荐） |
| `off` | 完全信任 Agent | 可信环境、开发机 |

配置示例：

```bash
hermes config set tools.terminal.approval smart
hermes config set tools.filesystem.approval manual
```

### 9.3 权限控制

你可以精确控制 Agent 的权限范围：

- **文件系统白名单**：指定 Agent 可以读写的目录
- **命令黑名单**：禁止 Agent 执行的命令
- **网络访问控制**：限制 Agent 可以访问的网络资源
- **用户白名单**：在网关模式下限制允许与 Agent 对话的用户

---

## 十、生产环境部署

### 10.1 VPS 部署最佳实践

如果你想 7×24 小时运行 Hermes Agent，推荐在 VPS 上部署：

1. **系统选择**：Ubuntu 22.04 LTS 是最稳定的选择
2. **创建专用用户**：

```bash
sudo useradd -m -s /bin/bash hermes
sudo -u hermes -i
```

1. **安装 Hermes Agent**：以 hermes 用户运行安装脚本
2. **配置 systemd 服务**：

```ini
# /etc/systemd/system/hermes-gateway.service
[Unit]
Description=Hermes Agent Gateway
After=network.target

[Service]
Type=simple
User=hermes
ExecStart=/home/hermes/.local/bin/hermes gateway run --all
Restart=always

[Install]
WantedBy=multi-user.target
```

1. 启动服务并设置开机自启：

```bash
sudo systemctl enable --now hermes-gateway
sudo systemctl status hermes-gateway
```

### 10.2 端口安全

Hermes Agent 会监听几个端口：

- `8642`：API 服务端口
- `9119`：Dashboard 端口

如果你只通过聊天网关使用 Agent，建议在防火墙中关闭这些端口的外部访问：

```bash
sudo ufw deny 8642
sudo ufw deny 9119
```

### 10.3 Docker 沙箱终端

对于生产环境，建议使用 Docker 作为终端后端，将 Agent 执行的命令运行在隔离容器中：

```bash
hermes config set tools.terminal.backend docker
```

这样即使 Agent 被注入恶意指令，也只会影响临时容器，不会危及宿主机安全。

---

## 十一、常见问题与排错

### Q1：安装失败，提示 command not found

安装完成后找不到 `hermes` 命令。解决方案：重新加载 shell 配置或重新打开终端。如果仍然不行，检查安装脚本的输出，确认是否报错。

### Q2：API 连接错误

检查 API Key 是否正确配置：

```bash
hermes doctor
```

这个命令会诊断常见的配置问题，包括 API 连接测试。

### Q3：网关无法启动

检查 Token 是否正确，以及网络是否能访问到对应的平台 API。Telegram 在某些网络环境下可能需要配置代理。

### Q4：Agent 执行命令太慢

可以调整模型参数来平衡速度和效果：

```bash
hermes config set model.max_tokens 2048
hermes config set model.temperature 0.3
```

降低 max_tokens 和 temperature 可以显著加快响应速度。

### Q5：如何备份和迁移

只需要备份 `~/.hermes/` 目录即可，包含所有配置、密钥、会话历史和记忆数据。迁移时在新机器上安装后，用备份文件覆盖此目录即可。

---

## 结语

Hermes Agent 是我在 2026 年用过的最令人兴奋的 AI 工具之一。它将 LLM 的能力从"对话"延伸到"行动"，真正实现了让 AI 为你做事，而不仅仅是和你聊天。

本文从安装配置到高级功能，系统性地介绍了 Hermes Agent 的方方面面。无论你是想在本地有一个编程助手，还是想部署一个团队可用的 AI 网关，Hermes Agent 都能满足你的需求。

值得注意的是，Hermes Agent 仍在快速迭代中，本文所介绍的功能和配置方式可能随着版本更新而变化。建议在遇到问题时，查阅[官方文档](https://hermes-agent.nousresearch.com/docs/getting-started/installation)获取最新信息，也可以关注 GitHub 仓库的 Release Notes 了解版本更新内容。

希望这篇教程能帮助你顺利上手 Hermes Agent。如果你在安装和使用过程中遇到问题，欢迎在评论区交流讨论。
