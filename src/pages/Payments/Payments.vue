<template>
  <main class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h4 text-primary text-weight-bold">Métodos de Pago</div>
      <q-btn
        color="primary"
        icon="add"
        label="Nuevo Método"
        @click="openFormModal()"
      />
    </div>

    <PaymentFilters @update-filters="handleFilters" />

    <q-table
      title="Listado Actual"
      :rows="filteredPayments"
      :columns="columns"
      row-key="id"
      :loading="paymentStore.isLoading"
      flat
      bordered
      no-data-label="No se encontraron métodos de pago"
    >
      <!--Switch-->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.status"
            color="green"
            keep-color
            checked-icon="check"
            unchecked-icon="clear"
            @update:model-value="(val) => toggleStatus(props.row.id, val)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm text-right">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            title="Editar"
            @click="openFormModal(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            title="Eliminar"
            @click="confirmDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </main>
</template>
<script setup lang="ts">
import { usePayments } from './usePayments';
import { columns } from './Payments';
import PaymentFilters from 'src/components/PaymentFilters/PaymentFilters.vue';

const {
  paymentStore,
  filteredPayments,
  handleFilters,
  toggleStatus,
  confirmDelete,
  openFormModal,
} = usePayments();
</script>
