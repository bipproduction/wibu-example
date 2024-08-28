'use client'
import { Card, Stack, Title } from '@mantine/core';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

function TinyMce() {
    const handleEditorChange = (content: string, editor: any) => {
        console.log('Content was updated:', content);
    };

    return (
        <Stack p={"md"}>
            <Title order={3}>TinyMCE Full-Featured Editor</Title>
            <Editor

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

const Suneditor = () => {
    const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor: any) => {
        editor.current = sunEditor;
    };

    function handleChange(content: any) {
        console.log(content); //Get Content Inside Editor
    }
    return (
        <Stack p={"md"}>
            <Title order={3}> suneditor-react</Title>
            <SunEditor setOptions={{
                buttonList: buttonList.complex
            }} onChange={handleChange} getSunEditorInstance={getSunEditorInstance} />
        </Stack>
    );
};

export default function Page() {
    return <Stack>
        <Card>
            <TinyMce />
        </Card>
        <Card >
            <Suneditor />
        </Card>
    </Stack>
}

