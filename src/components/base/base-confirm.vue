<script setup>
import BaseModal from './base-modal.vue';
import BaseHeading from './base-heading.vue';
import BaseButton from './base-button.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
});

const visible = defineModel('visible');
</script>

<template>
  <base-modal
    v-model:visible="visible"
    :with-container="false"
    :classes="{ container: 'w-fit mx-auto px-4' }"
    :card-props="{ paddless: true, class: 'p-8' }"
  >
    <div class="flex flex-col items-center justify-center text-center gap-4">
      <base-heading
        :title="title"
        :level="4"
      />
      <p>{{ message }}</p>
      <div class="flex gap-2">
        <base-button color="red">
          {{ confirmText }}
        </base-button>
        <base-button @click="visible = false">
          Cancel
        </base-button>
      </div>
    </div>
  </base-modal>
</template>
