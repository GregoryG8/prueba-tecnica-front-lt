import { ref } from 'vue';

export function usePaymentFilters(emit: { (event: 'update-filters', filters: { search: string; type: string | null }): void }) {
  const search = ref('');
  const type = ref('Todos');

  const typeOptions = ['Todos', 'Tarjeta', 'Efectivo', 'Transferencia'];

  const onFilterChange = () => {
    emit('update-filters', {
      search: search.value,
      type: type.value === 'Todos' ? null : type.value,
    });
  };

  return {
    search,
    type,
    typeOptions,
    onFilterChange,
  };
}
