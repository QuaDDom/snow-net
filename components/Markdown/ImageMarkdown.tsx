import { None } from 'framer-motion';
import React from 'react';

interface Props {
    children: any;
    node: any;
}

export default function ImageMarkdown({ children, node }: Props) {
    const image = node.children[0];
    const metastring = image.properties.alt;
    const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
    const metaWidth = metastring.match(/{([^}]+)x/);
    const metaHeight = metastring.match(/x([^}]+)}/);
    const width = metaWidth ? metaWidth[1] : '768';
    const height = metaHeight ? metaHeight[1] : '432';
    const isPriority = metastring?.toLowerCase().match('{priority}');
    const hasCaption = metastring?.toLowerCase().includes('{caption:');
    const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

    return <div>ImageMarkdown</div>;
}
