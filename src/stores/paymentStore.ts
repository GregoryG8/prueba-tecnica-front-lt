import { defineStore } from 'pinia';
import { mockApi, PaymentMethod } from 'src/services/mockData';
import { Notify } from 'quasar';

export const usePaymentStore = defineStore('payments', {
  state: () => ({
    payments: [] as PaymentMethod[],
    isLoading: false,
  }),

  actions: {
    // Trae lista de data
    async getListPayments() {
      this.isLoading = true;

      try {
        this.payments = await mockApi.getDataPayments();
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al obtener la lista de pagos',
          position: 'top',
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Crear registro
    async createPayment(data: Omit<PaymentMethod, 'id' | 'createdAt'>) {
      this.isLoading = true;

      try {
        const newPayment = await mockApi.createDataPayment(data);
        this.payments.push(newPayment);

        Notify.create({
          type: 'positive',
          message: 'Pago creado exitosamente',
          position: 'top',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al crear el pago',
          position: 'top',
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Actualizar registro
    async updatePayment(id: string, data: Partial<Omit<PaymentMethod, 'id' | 'createdAt'>>) {
      this.isLoading = true;

      try {
        const updatedPayment = await mockApi.updateDataPayment(id, data);
        const index = this.payments.findIndex(payment => payment.id === id);
        if (index !== -1) {
          this.payments[index] = updatedPayment;
        }

        Notify.create({
          type: 'positive',
          message: 'Pago actualizado exitosamente',
          position: 'top',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al actualizar el pago',
          position: 'top',
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Eliminar registro
    async deletePayment(id: string) {
      this.isLoading = true;

      try {
        await mockApi.deleteDataPayment(id);
        this.payments = this.payments.filter(payment => payment.id !== id);

        Notify.create({
          type: 'positive',
          message: 'Pago eliminado exitosamente',
          position: 'top',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al eliminar el pago',
          position: 'top',
        });
      } finally {
        this.isLoading = false;
      }
    },

    
  },
});
