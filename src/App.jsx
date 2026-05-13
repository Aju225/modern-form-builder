import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Eye, Pen, FileJson } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import SettingsPanel from './components/SettingsPanel'
import PreviewForm from './components/PreviewForm'
import JsonExportModal from './components/JsonExportModal'
import useFormStore from './store/useFormStore'

export default function App() {
  const {
    components,
    previewMode,
    addComponent,
    moveComponent,
    togglePreviewMode,
  } = useFormStore()
  const [showExport, setShowExport] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    if (active.data.current?.from === 'sidebar') {
      addComponent(
        over.data.current?.type || active.data.current?.type,
        active.data.current?.label
      )
      return
    }

    if (active.id !== over.id) {
      moveComponent(active.id, over.id)
    }
  }

  const exportData = {
    version: '1.0.0',
    type: 'form',
    components,
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen w-screen bg-gray-950 overflow-hidden">
        <header className="h-11 min-h-[44px] bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
              Form Builder
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExport(true)}
              disabled={components.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400
                hover:text-gray-200 hover:bg-gray-800 rounded-md transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FileJson className="w-3.5 h-3.5" />
              导出 JSON
            </button>

            <button
              onClick={togglePreviewMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all duration-200
                ${previewMode
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
            >
              {previewMode ? (
                <>
                  <Pen className="w-3.5 h-3.5" />
                  退出预览
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  预览
                </>
              )}
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {previewMode ? (
            <PreviewForm />
          ) : (
            <>
              <Sidebar />
              <Canvas />
              <SettingsPanel />
            </>
          )}
        </div>
      </div>

      <JsonExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        jsonData={exportData}
      />
    </DndContext>
  )
}
