export const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' as const, sortable: true },
  { name: 'type', label: 'Tipo', field: 'type', align: 'left' as const, sortable: true },
  { name: 'status', label: 'Estado', field: 'status', align: 'center' as const },
  { name: 'createdAt', label: 'Fecha de Creación', field: 'createdAt', align: 'center' as const, sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'right' as const },
];
