import { useQuasar } from 'quasar';
import { usePaymentStore } from 'src/stores/paymentStore';
import { PaymentMethod } from 'src/services/mockData';
import { computed, onMounted, ref } from 'vue';

export function usePayments() {
  const paymentStore = usePaymentStore();
  const currentFilters = ref({ search: '', type: null as string | null });
  const $q = useQuasar();

  const isModalOpen = ref(false);
  const selectedPayment = ref<PaymentMethod | null>(null);

  const handleFilters = (filters: { search: string; type: string | null }) => {
    currentFilters.value = filters;
  };

  const filteredPayments = computed(() => {
    let result = paymentStore.payments;

    if (currentFilters.value.search) {
      const term = currentFilters.value.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (currentFilters.value.type) {
      result = result.filter((p) => p.type === currentFilters.value.type);
    }

    return result;
  });

  const toggleStatus = async (id: string, newStatus: boolean) => {
    await paymentStore.updatePayment(id, { status: newStatus });
  };

  const confirmDelete = (id: string) => {
    $q.dialog({
      title: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este método de pago?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      await paymentStore.deletePayment(id);
    });
  };

  const openFormModal = (payment: PaymentMethod | null = null) => {
    selectedPayment.value = payment;
    isModalOpen.value = true;
  };

  onMounted(() => {
    paymentStore.getListPayments();
  });

  return {
    paymentStore,
    filteredPayments,
    handleFilters,
    toggleStatus,
    confirmDelete,
    openFormModal,
    selectedPayment,
    isModalOpen,
  };
}
