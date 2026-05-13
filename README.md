# 低代码表单制作

<p align="center">
  <i>基于 JSON Schema 驱动的可视化表单搭建平台 — 拖拽组件，即时预览，一键导出</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Zustand-5-433E38" alt="Zustand" />
  <img src="https://img.shields.io/badge/dnd--kit-latest-FF6C37" alt="dnd-kit" />
  <img src="https://img.shields.io/badge/React_Hook_Form-7-EC5990" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
</p>

<p align="center">
  <a href="#在线演示">在线演示</a> ·
  <a href="#核心亮点">核心亮点</a> ·
  <a href="#快速开始">快速开始</a> ·
  <a href="#项目结构">项目结构</a> ·
  <a href="#json-schema-规范">JSON Schema 规范</a>
</p>

---

## 项目演示

<!-- 替换为你的 GIF 动图 -->
<p align="center">
  <img src="https://via.placeholder.com/800x450/1e293b/94a3b8?text=%E4%BD%8E%E4%BB%A3%E7%A0%81%E8%A1%A8%E5%8D%95%E6%90%AD%E5%BB%BA+Demo+GIF" 
       width="800" 
       alt="项目演示" 
       style="border-radius: 12px" />
</p>

> 💡 **操作演示**：从左侧组件库拖入表单控件 → 在画布中调整排序 → 右侧面板配置属性 → 点击"预览"即时切换 → 提交表单在控制台输出 JSON 数据

## 在线演示

🔗 **[在线 Demo 地址](https://your-demo.vercel.app)** ← 部署后替换此链接

---

## 核心亮点

### 🧩 JSON Schema 驱动的动态渲染引擎

整个表单不依赖硬编码的模板。你通过拖拽在画布上每添加一个组件，底层就生成一条 JSON 记录。该 JSON 在**编辑模式**下驱动可视化画布渲染，在**预览模式**下由 [react-hook-form](https://react-hook-form.com/) 即时解析为真实的、可校验的表单控件 —— 同一份数据，两种形态的渲染。

```
拖拽操作  →  Store (JSON)  →  Canvas 渲染（编辑态）
                            →  PreviewForm 渲染（可填写表单）
```

### 💾 完整的持久化存储

每次增删改组件，Zustand 通过 `subscribe` 选择器自动将 `components` 数组写入 `localStorage`。刷新页面后，结构**毫秒级恢复**，绝不会丢失你的搭建进度。

### 👁️ 预览模式一键切换

顶部栏提供编辑 / 预览无缝切换。预览模式下侧边编辑面板完全隐藏，展示一个用户视角的真实表单，支持表单校验、必填提示、提交后控制台 JSON 输出 —— 所见即所得。

### 🎨 深色极简 UI

`bg-gray-950` 底色搭配 `bg-gray-900` 面板、`border-gray-800` 分隔线，构建出干净克制的暗色界面。dnd-kit 的拖拽反馈（半透明源卡片 + DragOverlay 跟随 + 蓝色脉冲占位框）让交互精准且自然。

---

## 技术栈

| 类别 | 技术 | 用途 |
|------|------|------|
| 框架 | React 18 | 组件化 UI |
| 构建 | Vite 6 | 极速开发与生产打包 |
| 样式 | Tailwind CSS 3 | 原子化 CSS，暗色主题 |
| 状态管理 | Zustand 5 | 轻量级全局状态 |
| 拖拽 | @dnd-kit/core + sortable | 组件拖入、排序、移动 |
| 表单 | react-hook-form 7 | 预览模式下的表单渲染与校验 |
| 图标 | lucide-react | 一致的图标体系 |
| 部署 | Vercel | 零配置静态托管 |

---

## 快速开始

### 前置要求

- Node.js ≥ 18
- npm ≥ 9

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/Aju225/modern-form-builder.git
cd modern-form-builder

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可开始搭建表单。

### 构建与预览

```bash
# 生产构建
npm run build

# 本地预览生产产物
npm run preview
```

构建产物输出至 `dist/` 目录，可直接部署到 Vercel / Netlify / GitHub Pages 等任意静态托管平台。

---

## 项目结构

```
modern-form-builder/  (低代码表单制作)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  # Vercel 部署配置
├── dist/                        # 生产构建产物
└── src/
    ├── main.jsx                 # React 入口
    ├── index.css                # Tailwind 指令 + 全局样式
    ├── App.jsx                  # DndContext 顶层 + 三栏布局 + 工具栏
    ├── store/
    │   └── useFormStore.js      # Zustand 状态：components, selectedId, previewMode
    └── components/
        ├── Sidebar.jsx          # 左侧组件面板（250px）
        ├── Canvas.jsx           # 中间画布（flex-1）+ DragOverlay + Placeholder
        ├── SettingsPanel.jsx    # 右侧属性编辑器（300px）
        ├── PreviewForm.jsx      # 预览模式：react-hook-form 渲染真实表单
        └── JsonExportModal.jsx  # JSON Schema 弹窗 + 一键复制
```

### 数据流

```
┌─────────────┐   拖拽    ┌──────────────┐   点击    ┌────────────────┐
│   Sidebar   │ ───────→ │    Canvas    │ ───────→ │ SettingsPanel  │
│  组件面板    │          │  画布 + 排序  │          │  属性配置       │
└─────────────┘          └──────┬───────┘          └────────────────┘
                                │
                        ┌───────▼────────┐
                        │  useFormStore  │  ←  Zustand 全局状态
                        │  · components  │
                        │  · selectedId  │
                        │  · prevewMode  │
                        └───┬────────┬───┘
                            │        │
                   ┌────────▼─┐  ┌──▼──────────┐
                   │localStorage│  │ PreviewForm │
                   │  持久化    │  │  预览渲染    │
                   └──────────┘  └─────────────┘
```

---

## JSON Schema 规范

每个表单组件对应一个 JSON 对象，完整 Schema 示例：

```json
{
  "version": "1.0.0",
  "type": "form",
  "components": [
    {
      "id": "comp_1",
      "type": "input",
      "label": "用户名",
      "placeholder": "请输入用户名",
      "required": true,
      "options": []
    },
    {
      "id": "comp_2",
      "type": "select",
      "label": "城市",
      "placeholder": "",
      "required": false,
      "options": ["北京", "上海", "广州"]
    },
    {
      "id": "comp_3",
      "type": "radio",
      "label": "性别",
      "placeholder": "",
      "required": true,
      "options": ["男", "女"]
    },
    {
      "id": "comp_4",
      "type": "checkbox",
      "label": "同意用户协议",
      "placeholder": "",
      "required": true,
      "options": []
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 组件唯一标识（`comp_` 前缀 + 自增序号） |
| `type` | string | 组件类型：`input` \| `textarea` \| `select` \| `radio` \| `checkbox` \| `switch` \| `button` |
| `label` | string | 表单标签文本 |
| `placeholder` | string | 输入框占位文本 |
| `required` | boolean | 是否必填 |
| `options` | string[] | 选项列表（仅 `select` / `radio` 使用） |

---

## License

MIT
