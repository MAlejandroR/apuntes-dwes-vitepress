<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps<{
  title?:string
  password?:string
}>()


const dialog = ref<HTMLDialogElement | null>(null)

const unlocked = ref <bool>(false)
const enteredPassword = ref <string>('')
const error = ref<bool>(false)

const handleToggle = (event: Event)=> {
  const details = event.target as HTMLDialogElement

//Sin contraseña ya desbloqueado
  if (!props.password || unlocked.value) {
    return
  }

  if (details.open) {
    details.open = false
    dialog.value?.showModal()
  }
}
  function unlock() {
    if (enteredPassword.value === props.password) {
      unlocked.value = true
      error.value = false
      dialog.value?.close()
    } else {
      error.value = true
    }
  }
  function closeDialog() {
    enteredPassword.value = ''
    error.value = false
    dialog.value?.close()
  }
</script>



<template>
  <details @toggle="handleToggle">
    <summary>
      <h2>{{ title ? title : 'Ver contenido' }}</h2>
    </summary>

    <div class="content">
      <slot />
    </div>
  </details>

  <dialog ref="dialog">
    <form @submit.prevent="unlock">
      <h3>Contenido protegido</h3>

      <p>Introduce la contraseña para ver el contenido.</p>

      <input
          v-model="enteredPassword"
          type="password"
          placeholder="Contraseña"
          autofocus
      >

      <p v-if="error" class="error">
        Contraseña incorrecta
      </p>

      <div class="buttons">
        <button type="button" @click="closeDialog">
          Cancelar
        </button>

        <button type="submit">
          Ver contenido
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
summary {
  cursor: pointer;
}

summary h2 {
  display: inline;
}

.content {
  margin-top: 1rem;
}

dialog {
  border: none;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 320px;
}

dialog::backdrop {
  background: rgb(0 0 0 / 50%);
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.6rem;
  margin: 0.5rem 0;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.error {
  font-size: 0.9rem;
  color: #c00;
}
</style>