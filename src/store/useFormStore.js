import { create } from 'zustand'

const STORAGE_KEY = 'modern-form-builder-components'

function loadComponents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // corrupted data, ignore
  }
  return []
}

function nextIdFrom(components) {
  let max = 0
  for (const c of components) {
    const match = c.id?.match(/^comp_(\d+)$/)
    if (match) {
      const num = parseInt(match[1], 10)
      if (num > max) max = num
    }
  }
  return max + 1
}

const initialComponents = loadComponents()
let nextId = nextIdFrom(initialComponents)

const useFormStore = create((set) => ({
  components: initialComponents,
  selectedId: null,
  previewMode: false,

  addComponent: (type, label) =>
    set((state) => {
      const id = `comp_${nextId++}`
      const newComponent = {
        id,
        type,
        label: label || type,
        placeholder: '',
        required: false,
        options: type === 'radio' || type === 'select' ? ['选项 1', '选项 2', '选项 3'] : [],
      }
      return { components: [...state.components, newComponent] }
    }),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  selectComponent: (id) =>
    set({ selectedId: id }),

  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  moveComponent: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.components.findIndex((c) => c.id === activeId)
      const newIndex = state.components.findIndex((c) => c.id === overId)
      if (oldIndex === -1 || newIndex === -1) return state

      const newComponents = [...state.components]
      const [moved] = newComponents.splice(oldIndex, 1)
      newComponents.splice(newIndex, 0, moved)
      return { components: newComponents }
    }),

  togglePreviewMode: () =>
    set((state) => ({ previewMode: !state.previewMode, selectedId: null })),
}))

useFormStore.subscribe(
  (state) => state.components,
  (components) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
    } catch {
      // storage full or unavailable
    }
  }
)

export default useFormStore
