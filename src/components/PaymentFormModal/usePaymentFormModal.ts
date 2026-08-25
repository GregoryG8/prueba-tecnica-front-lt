import { Notify } from 'quasar';
import { PaymentMethod } from 'src/services/mockData';
import { usePaymentStore } from 'src/stores/paymentStore';
import { computed, ref, watch } from 'vue';

export function usePaymentFormModal(
  props: { modelValue: boolean; paymentData?: PaymentMethod | null },
  emit: (event: 'update:modelValue', value: boolean) => void
) {
  const paymentStore = usePaymentStore();

  const isEditing = computed(() => !!props.paymentData);

  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const formData = ref({
    name: '',
    type: 'Tarjeta' as 'Tarjeta' | 'Efectivo' | 'Transferencia',
    description: '',
    status: true,
  });

  const onSubmit = async () => {
    try {
      if (isEditing.value && props.paymentData) {
        await paymentStore.updatePayment(props.paymentData.id, {
          name: formData.value.name,
          type: formData.value.type,
          description: formData.value.description,
        });
      } else {
        await paymentStore.createPayment({
          name: formData.value.name,
          type: formData.value.type,
          description: formData.value.description,
          status: formData.value.status,
        });
      }
      isOpen.value = false;
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };

  watch(
    () => props.modelValue,
    (isOpening) => {
      if (isOpening) {
        if (props.paymentData) {
          formData.value = {
            name: props.paymentData.name,
            type: props.paymentData.type,
            description: props.paymentData.description || '',
            status: props.paymentData.status,
          };
        } else {
          formData.value = {
            name: '',
            type: 'Tarjeta',
            description: '',
            status: true,
          };
        }
      }
    }
  );

  const validationError = () => {
    Notify.create({
      type: 'negative',
      message: 'Por favor, complete todos los campos requeridos correctamente.',
      position: 'top',
    });
  };

  return {
    isOpen,
    formData,
    onSubmit,
    isEditing,
    paymentStore,
    validationError,
  };
}
