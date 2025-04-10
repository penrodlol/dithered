import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.data('store', () => ({
    original: { name: null, type: null, size: null, lastModified: null, dimensions: null },
    dithered: '',
    loading: false,
    async applyDither(event: SubmitEvent) {
      this.loading = true;

      const formData = new FormData(event.target as HTMLFormElement);
      const payload = await fetch('/api/dither', { method: 'POST', body: formData });
      this.loading = false;
      if (!payload.ok) return;
      this.dithered = URL.createObjectURL(new Blob([await payload.arrayBuffer()], { type: 'image/png' }));
    },
  }));
};
