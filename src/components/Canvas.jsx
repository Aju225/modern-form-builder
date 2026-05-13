import { useDroppable, useDndContext, DragOverlay } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Type,
  AlignLeft,
  ChevronDown,
  Circle,
  CheckSquare,
  ToggleLeft,
  Send,
  GripVertical,
  Trash2,
} from 'lucide-react'
import useFormStore from '../store/useFormStore'

const ICON_MAP = {
  input: Type,
  textarea: AlignLeft,
  select: ChevronDown,
  radio: Circle,
  checkbox: CheckSquare,
  switch: ToggleLeft,
  button: Send,
}

function SortableField({ component }) {
  const { selectedId, selectComponent, removeComponent } = useFormStore()
  const isSelected = selectedId === component.id
  const Icon = ICON_MAP[component.type] || Type

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    removeComponent(component.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-150
        ${isSelected
          ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/30'
          : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'
        }
        ${isDragging ? 'opacity-30' : ''}`}
      onClick={() => selectComponent(component.id)}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-0.5 text-gray-500 hover:text-gray-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200 truncate">
          {component.label || component.type}
        </p>
        {component.required && (
          <span className="text-xs text-red-400">* 必填</span>
        )}
      </div>

      <button
        onClick={handleRemove}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function DragOverlayContent({ component }) {
  const Icon = ICON_MAP[component.type] || Type

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-gray-800 border-blue-500/50 ring-2 ring-blue-500/30 shadow-xl opacity-95">
      <span className="p-0.5 text-gray-500">
        <GripVertical className="w-4 h-4" />
      </span>

      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200 truncate">
          {component.label || component.type}
        </p>
        {component.required && (
          <span className="text-xs text-red-400">* 必填</span>
        )}
      </div>
    </div>
  )
}

function DropPlaceholder() {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg
        border-2 border-dashed border-blue-500/40 bg-blue-500/5 animate-pulse"
    >
      <div className="w-4 h-4 rounded bg-blue-500/10" />
      <div className="flex-1 h-4 rounded bg-blue-500/10" />
    </div>
  )
}

export default function Canvas() {
  const { components } = useFormStore()
  const { active } = useDndContext()
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' })

  const activeComponent = components.find((c) => c.id === active?.id)
  const isReordering = active && active.data?.current?.from !== 'sidebar'

  return (
    <main
      ref={setNodeRef}
      className={`flex-1 h-full flex flex-col transition-colors duration-200
        ${isOver ? 'bg-blue-950/20' : 'bg-gray-950'}
      `}
    >
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
          画布
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          将组件拖放到此处搭建表单
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {components.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600">
            <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center mb-4 transition-colors duration-200
              ${isOver ? 'border-blue-500/50 border-dashed' : 'border-dashed border-gray-700'}`}
            >
              <Type className={`w-8 h-8 transition-colors duration-200 ${isOver ? 'text-blue-400' : ''}`} />
            </div>
            <p className={`text-sm transition-colors duration-200 ${isOver ? 'text-blue-400' : ''}`}>
              将左侧组件拖放到此处
            </p>
            <p className="text-xs mt-1 text-gray-700">
              开始搭建你的表单
            </p>
          </div>
        ) : (
          <div className="max-w-lg mx-auto space-y-2">
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.map((component) => (
                <SortableField key={component.id} component={component} />
              ))}
            </SortableContext>

            {isReordering && (
              <DropPlaceholder />
            )}

            <div className="pt-4 flex justify-center">
              <p className="text-xs text-gray-600">
                继续从左侧拖入更多组件，或拖拽组件调整顺序
              </p>
            </div>
          </div>
        )}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeComponent ? (
          <DragOverlayContent component={activeComponent} />
        ) : null}
      </DragOverlay>
    </main>
  )
}
