// components/custom-editor.js
'use client' // only in App Router
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Card, Stack, Title } from '@mantine/core';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    AutoImage,
} from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

function CkEditor() {
    return (
        <Stack p={"md"} c={"dark"}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: {
                        items: ['undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList'],
                    },
                    plugins: [
                        Bold, Essentials, Italic, Mention, Paragraph, Undo, AutoImage,

                    ],
                    mention: {
                        feeds: [
                            {
                                marker: '@',
                                feed: [
                                    '@apple', '@bears', '@brownie', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                                ],
                            },
                        ]
                    },
                    initialData: '<p>Hello from CKEditor 5 in React!</p>'
                }}
            />
        </Stack>
    );
}

function TinyMce() {
    const handleEditorChange = (content: string, editor: any) => {
        console.log('Content was updated:', content);
    };

    return (
        <Stack p={"md"}>
            <Title order={3}>TinyMCE Full-Featured Editor</Title>
            <Editor
                apiKey="h2oh4lfrtn9xfcb14a79rzcszoz2wz8yov8p6bi2wstn0g0u" // You can get this from TinyMCE if you use their hosted version
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'accordion',
                        'anchor',
                        'autolink',
                        'autoresize',
                        'autosave',
                        'charmap',
                        'code',
                        'codesample',
                        'directionality',
                        'emoticons',
                        'fullscreen',
                        'help',
                        'image',
                        'importcss',
                        'inserttime',
                        'link',
                        'lists',
                        'liststyles',
                        'media',
                        'nonbreaking',
                        'space',
                        'pagebreak',
                        'preview',
                        'quickbars',
                        'save',
                        'searchreplace',
                        'table',
                        'visualblocks',
                        'visualchars',
                        'wordcount'
                    ].join(' '),
                    toolbar:
                        'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist checklist | outdent indent | removeformat | code codesample | link image media | preview fullscreen | charmap emoticons directionality | searchreplace | table | save',
                    quickbars_selection_toolbar: 'bold italic underline strikethrough | quicklink h2 h3 blockquote',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={handleEditorChange}
            />
        </Stack>
    );
}

export default function Page() {
    return <Stack>
        <Card>
            <Stack>
                <Title order={3}>CKEditor</Title>
                <CkEditor />
            </Stack>
        </Card>
        <Card>
            <TinyMce />
        </Card>
    </Stack>
}
