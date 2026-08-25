import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useLogin() {
  const username = ref('admin');
  const password = ref('admin123');
  const router = useRouter();
  const authStore = useAuthStore();

  const onSubmit = async () => {
    try {
      await authStore.login(username.value, password.value);
      router.push({ name: 'payments' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      validationError();
    }

  };

  const validationError = () => {
    Notify.create({
      type: 'negative',
      message: 'Por favor, ingrese un nombre de usuario y contraseña válidos.',
      position: 'top',
    });
  }

  return {
    username,
    password,
    onSubmit,
    validationError,
    authStore,
  };
}
