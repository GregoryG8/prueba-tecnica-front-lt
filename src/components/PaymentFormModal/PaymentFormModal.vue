<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ isEditing ? 'Editar Método de Pago' : 'Nuevo Método de Pago' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-form @submit.prevent="onSubmit" @validation-error="validationError" class="q-gutter-md">

          <q-input
            v-model="formData.name"
            label="Nombre del método *"
            outlined
            :rules="[val => !!val || 'El nombre es obligatorio']"
          />

          <q-select
            v-model="formData.type"
            :options="['Tarjeta', 'Efectivo', 'Transferencia']"
            label="Tipo de pago *"
            outlined
            :rules="[val => !!val || 'Selecciona un tipo']"
          />

          <q-input
            v-model="formData.description"
            label="Descripción (Opcional)"
            outlined
            type="textarea"
            autogrow
          />

          <div class="row justify-end q-gutter-sm q-mt-md">
            <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
            <q-btn
              :label="isEditing ? 'Guardar Cambios' : 'Crear Método'"
              type="submit"
              color="primary"
              :loading="paymentStore.isLoading"
            />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { PaymentMethod } from 'src/services/mockData';
import { usePaymentFormModal } from './usePaymentFormModal';

const props = defineProps<{
  modelValue: boolean;
  paymentData?: PaymentMethod | null;
}>();

const emit = defineEmits(['update:modelValue']);

const { isOpen,
  isEditing,
  formData,
  paymentStore,
  onSubmit,
  validationError,
} = usePaymentFormModal(props, emit);

</script>
