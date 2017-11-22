/**
 * @see displacy-ent.js
 * https://github.com/explosion/displacy-ent/blob/master/assets/js/displacy-ent.js
 */

import { ElementRef } from '@angular/core';

export interface AnnotationEntity {
  label: string;
  start: number;
  end: number;
  txt: string;
}

export function createAnnotationsDom(
  containerElm: ElementRef,
  text: string,
  entities: AnnotationEntity[]
): void {
  const container = containerElm.nativeElement;
  container.innerHTML = '';

  let offset = 0;
  entities.forEach(({ label, start, end }) => {
    const entity = text.slice(start, end);
    const fragments = text.slice(offset, start).split('\n');

    fragments.forEach((fragment, i) => {
      container.appendChild(document.createTextNode(fragment));
      if (fragments.length > 1 && i !== fragments.length - 1) {
        container.appendChild(document.createElement('br'));
      }
    });

    const mark = document.createElement('mark');
    mark.setAttribute('data-entity', label.toLowerCase());
    mark.appendChild(document.createTextNode(entity));
    container.appendChild(mark);

    offset = end;
  });

  container.appendChild(
    document.createTextNode(text.slice(offset, text.length))
  );
}
