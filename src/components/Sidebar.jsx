import { useDraggable } from '@dnd-kit/core'
import {
  Type,
  AlignLeft,
  ChevronDown,
  Circle,
  CheckSquare,
  ToggleLeft,
  Send,
} from 'lucide-react'

const FIELD_TYPES = [
  { type: 'input', label: '单行输入', icon: Type },
  { type: 'textarea', label: '多行文本', icon: AlignLeft },
  { type: 'select', label: '下拉选择', icon: ChevronDown },
  { type: 'radio', label: '单选按钮', icon: Circle },
  { type: 'checkbox', label: '复选框', icon: CheckSquare },
  { type: 'switch', label: '开关', icon: ToggleLeft },
  { type: 'button', label: '按钮', icon: Send },
]

function DraggableField({ type, label, icon: Icon }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { type, label, from: 'sidebar' },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-grab active:cursor-grabbing
        bg-gray-800 border border-gray-700 hover:border-blue-500/50
        hover:bg-gray-750 transition-all duration-150 select-none
        ${isDragging ? 'opacity-50 ring-2 ring-blue-500 scale-95' : ''}`}
    >
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-[250px] min-w-[250px] h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
          基础组件
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          拖拽组件到画布中
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {FIELD_TYPES.map((field) => (
          <DraggableField
            key={field.type}
            type={field.type}
            label={field.label}
            icon={field.icon}
          />
        ))}
      </div>

      <div className="p-3 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">
          拖拽组件到中间画布
        </p>
      </div>
    </aside>
  )
}
