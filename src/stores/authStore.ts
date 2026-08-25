import { defineStore } from 'pinia';
import { mockApi } from '../services/mockData';
import { Notify } from 'quasar';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null as string | null,
    isLoading: false,
  }),

  actions: {
    // Iniciar sesion
    async login(username: string, password: string) {
      this.isLoading = true;

      try {
        const response = await mockApi.login(username, password);

        this.token = response.token;
        this.isAuthenticated = true;

        localStorage.setItem('token', response.token);
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al iniciar sesión',
          position: 'top',
        });
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Cerrar sesion
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');

      Notify.create({
        type: 'info',
        message: 'Sesión cerrada correctamente',
        position: 'top',
      });
    },

    // Verificar sesion
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    }

  },
});
