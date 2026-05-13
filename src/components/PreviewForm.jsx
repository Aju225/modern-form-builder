import { useForm } from 'react-hook-form'
import useFormStore from '../store/useFormStore'

export default function PreviewForm() {
  const { components } = useFormStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('📋 表单提交结果 (JSON):', JSON.stringify(data, null, 2))
    alert('表单已提交！请在浏览器控制台 (F12) 查看完整 JSON 数据')
  }

  const buildValidation = (comp) => {
    const rules = {}
    if (comp.required) {
      rules.required = `${comp.label || comp.type} 为必填项`
    }
    return rules
  }

  const renderField = (comp) => {
    const validation = buildValidation(comp)
    const error = errors[comp.id]

    const baseInputClass = `w-full px-3 py-2.5 bg-gray-800/80 border rounded-lg
      text-sm text-gray-200 placeholder-gray-500
      focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30
      transition-colors
      ${error ? 'border-red-500/50' : 'border-gray-700'}`

    switch (comp.type) {
      case 'input':
        return (
          <input
            id={comp.id}
            type="text"
            placeholder={comp.placeholder || `请输入${comp.label || ''}`}
            className={baseInputClass}
            {...register(comp.id, validation)}
          />
        )

      case 'textarea':
        return (
          <textarea
            id={comp.id}
            rows={3}
            placeholder={comp.placeholder || `请输入${comp.label || ''}`}
            className={`${baseInputClass} resize-none`}
            {...register(comp.id, validation)}
          />
        )

      case 'select':
        return (
          <select
            id={comp.id}
            className={baseInputClass}
            {...register(comp.id, validation)}
          >
            <option value="">-- 请选择 --</option>
            {(comp.options || []).map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {(comp.options || []).map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="radio"
                  value={opt}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600
                    focus:ring-blue-500/30 focus:ring-offset-0"
                  {...register(comp.id, validation)}
                />
                <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-500 bg-gray-800 border-gray-600
                focus:ring-blue-500/30 focus:ring-offset-0"
              {...register(comp.id, validation)}
            />
            <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
              {comp.label || '复选框'}
            </span>
          </label>
        )

      case 'switch':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register(comp.id)}
              />
              <div
                className="w-10 h-5 bg-gray-700 rounded-full peer-checked:bg-blue-600
                  transition-colors duration-200"
              />
              <div
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                  peer-checked:translate-x-5 transition-transform duration-200"
              />
            </div>
            <span className="text-sm text-gray-300">{comp.label || '开关'}</span>
          </label>
        )

      case 'button':
        return (
          <button
            type="button"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-sm text-white
              rounded-lg transition-colors duration-150 font-medium"
          >
            {comp.label || '按钮'}
          </button>
        )

      default:
        return (
          <p className="text-sm text-gray-500 italic">
            未知组件类型: {comp.type}
          </p>
        )
    }
  }

  if (components.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <p className="text-gray-500 text-sm">画布中没有组件</p>
          <p className="text-gray-700 text-xs mt-1">
            请先切换到编辑模式添加表单组件
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950">
      <div className="max-w-lg mx-auto py-10 px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {components.map((comp) => (
            <div key={comp.id} className="space-y-1.5">
              {comp.type !== 'checkbox' && comp.type !== 'switch' && comp.type !== 'button' && (
                <label
                  htmlFor={comp.id}
                  className="block text-sm font-medium text-gray-300"
                >
                  {comp.label || comp.type}
                  {comp.required && (
                    <span className="text-red-400 ml-1">*</span>
                  )}
                </label>
              )}

              {renderField(comp)}

              {errors[comp.id] && (
                <p className="text-xs text-red-400 mt-1">
                  {errors[comp.id].message}
                </p>
              )}
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium
                rounded-lg transition-colors duration-150
                focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              提交表单
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
