import { mount } from 'svelte';
import './styles/app.css';
import App from './App.svelte';

const target = document.getElementById('app');

if (!target) {
  throw new Error('Root app element #app not found in document.');
}

const app = mount(App, {
  target,
});

export default app;
