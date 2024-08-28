// react-pdf-to-image.d.ts
declare module 'react-pdf-to-image' {
    import * as React from 'react';

    interface PDFtoIMGProps {
        file: string | File;
        scale?: number;
        canvasBackground?: string;
        page?: number;
        onRenderSuccess?: (pages: string[]) => void;
        onRenderError?: (error: Error) => void;
        children: (props: { pages: string[] }) => React.ReactNode;
    }

    export class PDFtoIMG extends React.Component<PDFtoIMGProps> {}
}
