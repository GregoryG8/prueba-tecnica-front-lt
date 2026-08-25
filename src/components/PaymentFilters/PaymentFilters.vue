<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section class="row q-col-gutter-md items-center">
      <div class="col-12 col-sm-6 col-md-4">
        <q-input
          v-model="search"
          dense
          outlined
          placeholder="Buscar por nombre..."
          clearable
          @update:model-value="onFilterChange"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          v-model="type"
          :options="typeOptions"
          dense
          outlined
          label="Filtrar por tipo"
          @update:model-value="onFilterChange"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { usePaymentFilters } from './usePaymentFilters';

const emit = defineEmits<{
  (e: 'update-filters', filters: { search: string; type: string | null }): void;
}>();

const { search, type, typeOptions, onFilterChange } = usePaymentFilters(emit);
</script>
