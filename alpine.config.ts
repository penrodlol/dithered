import anchor from '@alpinejs/anchor';
import focus from '@alpinejs/focus';
import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => Alpine.plugin([focus, anchor]);
