<script setup lang="ts">
import { defineProps, defineEmits, computed, ComputedRef } from 'vue'
const props = defineProps({
    modelValue: String,
    label: {
        type: String,
        default: ''
    },
    validation: {
        type: Object as () => (ComputedRef<{ isEmpty: boolean, isValid: boolean }>),
        required: true
    },
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    },
    tag: {
        type: String,
        default: 'input'
    }
})

const emits = defineEmits(['update:modelValue'])

const id = 'INPUT_' + ~~(Math.random() * 1000)

const classBind = computed(() => {
    if (props.validation.value.isEmpty) {
        return 'bg-gray-400'
    }
    if (props.validation.value.isValid) {
        return 'bg-green-500'
    }
    return 'bg-red-500'
})
</script>

<template>
    <fieldset class="flex flex-col px-2 relative">
        <label :for="id" class="font-bold text-gray-700 text-blue-700 mb-1">{{ props.label }}:</label>
        <component :is="props.tag" :type="props.type" :id="id" :value="props.modelValue"
            @input="emits('update:modelValue', $event.target.value)"
            class="bg-gray-100 rounded h-10 p-2 outline-none focus:ring-2 focus:ring-blue-400"
            :placeholder="props.placeholder" />
        <span class="flex w-3 h-3 absolute rounded-full bottom-3.5 left-4" :class="classBind"></span>
    </fieldset>
</template>
