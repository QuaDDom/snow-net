import React from 'react'

export default function Markdown({ node, children }: any) {
    if (node.children[0].tagName === "img") {
        const image: any = node.children[0];
        return (
            <div className="image">
                <img
                    src={`${image.properties.src}`}
                    alt={image.properties.alt}
                    width="600"
                    height="300"
                />
            </div>
        );
    }
    return <p>{children}</p>;
}
