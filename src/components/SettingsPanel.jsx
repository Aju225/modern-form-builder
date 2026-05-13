import { Settings2, Trash2 } from 'lucide-react'
import useFormStore from '../store/useFormStore'

export default function SettingsPanel() {
  const { components, selectedId, updateComponent, removeComponent } =
    useFormStore()

  const selectedComponent = components.find((c) => c.id === selectedId)

  if (!selectedComponent) {
    return (
      <aside className="w-[300px] min-w-[300px] h-full bg-gray-900 border-l border-gray-800 flex flex-col items-center justify-center">
        <Settings2 className="w-10 h-10 text-gray-700 mb-3" />
        <p className="text-sm text-gray-600">选择一个组件</p>
        <p className="text-xs text-gray-700 mt-1">以编辑其属性</p>
      </aside>
    )
  }

  const handleChange = (field, value) => {
    updateComponent(selectedId, { [field]: value })
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...(selectedComponent.options || [])]
    newOptions[index] = value
    updateComponent(selectedId, { options: newOptions })
  }

  const addOption = () => {
    const newOptions = [...(selectedComponent.options || []), `选项 ${(selectedComponent.options?.length || 0) + 1}`]
    updateComponent(selectedId, { options: newOptions })
  }

  const removeOption = (index) => {
    const newOptions = (selectedComponent.options || []).filter((_, i) => i !== index)
    updateComponent(selectedId, { options: newOptions })
  }

  return (
    <aside className="w-[300px] min-w-[300px] h-full bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
            属性配置
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {selectedComponent.type} 组件
          </p>
        </div>
        <button
          onClick={() => removeComponent(selectedId)}
          className="p-1.5 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="删除组件"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-400">
            标签
          </label>
          <input
            type="text"
            value={selectedComponent.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg
              text-sm text-gray-200 placeholder-gray-600
              focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
              transition-colors"
            placeholder="请输入标签"
          />
        </div>

        {(selectedComponent.type === 'input' ||
          selectedComponent.type === 'textarea') && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-400">
              占位文本
            </label>
            <input
              type="text"
              value={selectedComponent.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg
                text-sm text-gray-200 placeholder-gray-600
                focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                transition-colors"
              placeholder="请输入占位文本"
            />
          </div>
        )}

        {(selectedComponent.type === 'radio' ||
          selectedComponent.type === 'select') && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-400">
              选项列表
            </label>
            <div className="space-y-1.5">
              {(selectedComponent.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg
                      text-sm text-gray-200
                      focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
                      transition-colors"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addOption}
              className="w-full py-1.5 text-xs text-blue-400 border border-dashed border-gray-700
                rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors"
            >
              + 添加选项
            </button>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <label className="text-xs font-medium text-gray-400">
            必填项
          </label>
          <button
            onClick={() =>
              handleChange('required', !selectedComponent.required)
            }
            className={`relative w-9 h-5 rounded-full transition-colors duration-200
              ${selectedComponent.required ? 'bg-blue-600' : 'bg-gray-700'}
            `}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200
                ${selectedComponent.required ? 'translate-x-[18px]' : 'translate-x-[2px]'}
              `}
            />
          </button>
        </div>
      </div>

      <div className="p-3 border-t border-gray-800">
        <div className="text-xs text-gray-600 space-y-1">
          <p>ID: {selectedComponent.id}</p>
          <p>类型: {selectedComponent.type}</p>
        </div>
      </div>
    </aside>
  )
}
