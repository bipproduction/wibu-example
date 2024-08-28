// Core viewer
'use client'
import { Viewer } from '@react-pdf-viewer/core';
import { GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export function PDF() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return <div suppressHydrationWarning={false}>
        <Viewer
            fileUrl='/assets/ternak_lele.pdf'
            plugins={[
                defaultLayoutPluginInstance,
            ]}
        />
    </div>
}