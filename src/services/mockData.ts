export interface PaymentMethod {
  id: string;
  name: string;
  type: 'Tarjeta' | 'Efectivo' | 'Transferencia';
  status: boolean;
  createdAt: string;
  description?: string;
}

// Data quemada de prueba
let paymentsMockDB: PaymentMethod[] = [
  {
    id: '1',
    name: 'Tarjeta de Crédito Visa',
    type: 'Tarjeta',
    status: true,
    createdAt: '2023-10-01',
    description: 'Pago principal con tarjeta',
  },
  {
    id: '2',
    name: 'Transferencia Bancolombia',
    type: 'Transferencia',
    status: true,
    createdAt: '2023-10-15',
  },
  {
    id: '3',
    name: 'Pago en Efectivo (Baloto)',
    type: 'Efectivo',
    status: false,
    createdAt: '2023-11-05',
    description: 'Solo para pagos presenciales',
  },
];

export const mockApi = {
  // Funcion de login
  async login(username: string, password: string): Promise<{ token: string }> {
    if (username === 'admin' && password === 'admin123') {
      return { token: 'token-12345' };
    }
    throw new Error('Credenciales incorrectas');
  },

  // Traer data mockeada
  async getDataPayments(): Promise<PaymentMethod[]> {
    return [...paymentsMockDB]
  },

  // Crear registro
  async createDataPayment(data: Omit<PaymentMethod, 'id' | 'createdAt'>): Promise<PaymentMethod> {

    const newPayment: PaymentMethod = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    }

    paymentsMockDB.push(newPayment);
    return newPayment;
  },

  // Editar registro
  async updateDataPayment(id: string, data: Partial<Omit<PaymentMethod, 'id' | 'createdAt'>>): Promise<PaymentMethod> {
    const index = paymentsMockDB.findIndex(payment => payment.id === id);
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }

    paymentsMockDB[index] = { ...paymentsMockDB[index], ...data };
    return paymentsMockDB[index];
  },

  // Borrar registro
  async deleteDataPayment(id: string): Promise<void> {
    const initLen = paymentsMockDB.length;
    paymentsMockDB = paymentsMockDB.filter((p) => p.id !== id);

    if (paymentsMockDB.length === initLen) {
      throw new Error('No se pudo eliminar: Registro no encontrado');
    }
  }
}
