<template>
  <TransitionRoot as="template" :show="$props.modelValue">
    <Dialog as="div" class="relative z-10" @close="$emit('update:modelValue', false)">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-transition-opacity backdrop-blur" />
      </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">{{ $props.title}}</DialogTitle>
                    <div class="mt-2">
                      <slot></slot>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 flex-none sm:flex gap-2 justify-end">
                  <AppButton @click="$emit('update:modelValue', false)" color="white" class="w-full sm:w-auto mb-2 sm:mb-0">Cancel</AppButton>
                  <AppButton @click="$emit('confirm', true); $emit('update:modelValue', false)" color="danger" class="w-full sm:w-auto">{{ $props.confirmButtonName }}</AppButton>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import AppButton from '@/components/form/AppButton.vue'

const $props = defineProps<{
    confirmButtonName: string
    title: string
    modelValue: boolean
}>()
const $emit = defineEmits(['confirm', 'update:modelValue'])
</script>
