import type { Element } from 'hast';
import { selectAll } from 'hast-util-select';
import { rehype } from 'rehype';

export type ComponentsRenderProps = Record<string, Record<string, ComponentsRenderPropCallback>>;
export type ComponentsRenderPropCallback = (props: ComponentsRenderProp) => string | number | boolean;
export type ComponentsRenderProp = Record<string, string | number | boolean | null | undefined> & {
  uid: ReturnType<typeof crypto.randomUUID>;
  node: Element;
  nodes: Array<Element>;
  index: number;
  first: boolean;
  last: boolean;
};

export function renderSlot(html: string, props: ComponentsRenderProps, uid = crypto.randomUUID()) {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(() => (root: Element) => {
      Object.entries(props).forEach(([selector, _props]) =>
        selectAll(selector, root).forEach((node, index, nodes) =>
          Object.entries(_props).forEach(([key, value]) => {
            if (!node.properties) return;
            const props = node.properties ?? {};
            const first = index === 0;
            const last = index === nodes.length - 1;
            // @ts-expect-error
            node.properties[key] = `${value({ uid, node, nodes, index, first, last, ...props })}`;
          }),
        ),
      );
    });

  return String(processor.processSync(html).value);
}

export function renderSlots(...slots: Array<{ html: string; props: ComponentsRenderProps }>) {
  const uid = crypto.randomUUID();
  return slots.map(({ html, props }) => renderSlot(html, props, uid));
}
