import { useState } from 'react';
import Resizer from 'react-image-file-resizer';

export const imageResizer = (file: File, height?: number, width?: number) =>
    new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            width || 650,
            height || 650,
            'JPEG',
            80,
            0,
            url => {
                resolve(url);
            },
            'file'
        );
    });
