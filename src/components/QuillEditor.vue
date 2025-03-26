<template>
  <div ref="editor" class="quill-editor"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Quill from 'quill'

const props = defineProps({
  modelValue: String // Prop pour la valeur de la description
})

const emit = defineEmits(['update:modelValue']) // Émettre les mises à jour de la valeur

const editor = ref<HTMLElement | null>(null) // Typage explicite pour editor
let quill: Quill | null = null // Typage explicite pour quill

onMounted(() => {
  if (editor.value) {
    quill = new Quill(editor.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ]
      }
    })

    // Synchroniser le contenu de Quill avec le v-model
    quill.on('text-change', () => {
      emit('update:modelValue', quill?.root.innerHTML || '') // Émettre le contenu HTML
    })

    // Initialiser le contenu de Quill
    if (props.modelValue) {
      quill.root.innerHTML = props.modelValue
    }
  }
})

// Surveiller les changements de la prop modelValue
watch(() => props.modelValue, (newValue) => {
  if (quill && newValue !== quill.root.innerHTML) {
    quill.root.innerHTML = newValue || '' // Met à jour Quill uniquement si nécessaire
  }
})
</script>

<style scoped>
.quill-editor {
  height: 200px; /* Ajustez la hauteur selon vos besoins */
}
</style>