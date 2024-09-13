"use client";
import { Button, Divider, Group, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function Page() {
  const [urlText, setUrlText] = useState("");
  const [fileName, setFileName] = useState("");
  const onDownload = async () => {
    try {
      if (!urlText || urlText.length === 0 || fileName.length === 0) {
        alert("Please enter a valid URL and file name");
        return;
      }
      const fileUrl = urlText;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a link element, use Blob URL
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = "gambar.png"; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Stack p={"md"}>
      <Title>Download Button</Title>
      <Group>
        <Stack>
          <TextInput
            placeholder="URL"
            value={urlText}
            onChange={(e) => setUrlText(e.target.value)}
          />
          <TextInput
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Button onClick={onDownload}>Download</Button>
        </Stack>
      </Group>

      <Divider />
      <MarkdownPreview source={textMarkdown()} />
    </Stack>
  );
}

function textMarkdown() {
  return `
\`\`\`tsx
    "use client";
import { Button, Divider, Group, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview'

export default function Page() {
  const [urlText, setUrlText] = useState("");
  const [fileName, setFileName] = useState("");
  const onDownload = async () => {
    try {
      if (!urlText || urlText.length === 0 || fileName.length === 0) {
        alert("Please enter a valid URL and file name");
        return;
      }
      const fileUrl = urlText;
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a link element, use Blob URL
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = "gambar.png"; // Nama file yang akan diunduh
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Group>
      <Stack p={"md"}>
        <TextInput
          placeholder="URL"
          value={urlText}
          onChange={(e) => setUrlText(e.target.value)}
        />
        <TextInput
          placeholder="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button onClick={onDownload}>Download</Button>

        <Divider />

      </Stack>
    </Group>
  );
}
\`\`\`
    `;
}
