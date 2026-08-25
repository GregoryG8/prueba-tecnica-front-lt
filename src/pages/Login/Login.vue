<template>
  <main class="flex flex-center bg-grey-2 window-height">
    <q-card class="q-pa-md shadow-2" style="width: 100%; max-width: 400px">

      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold text-primary">Bienvenido</div>
        <div class="text-grey-7">Ingresa tus credenciales para continuar</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" @validation-error="validationError" class="q-gutter-md">

          <q-input
            v-model="username"
            label="Usuario"
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'El usuario es obligatorio']"
          />

          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'La contraseña es obligatoria']"
          />

          <div>
            <q-btn
              label="Iniciar Sesión"
              type="submit"
              color="primary"
              class="full-width"
              :loading="authStore.isLoading"
            />
          </div>
        </q-form>
      </q-card-section>

    </q-card>
  </main>
</template>
<script setup lang="ts">
import { useLogin } from './useLogin';

const { username, password, onSubmit, validationError, authStore  } = useLogin();
</script>
