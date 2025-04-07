import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.store('imageBox', { src: null, name: null, type: null, size: null, dimensions: null, lastModified: null });

  Alpine.data('dither', () => ({
    image: '',
    submit(event: SubmitEvent) {
      fetch('/api/dither', { method: 'POST', body: new FormData(event.target as HTMLFormElement) }).then(
        async (response) => {
          if (response.ok)
            this.image = URL.createObjectURL(new Blob([await response.arrayBuffer()], { type: 'image/png' }));
        },
      );
    },
  }));
};
