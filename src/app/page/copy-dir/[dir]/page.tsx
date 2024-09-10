"use client";
import { hookstate, useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton
} from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { FaFile, FaFolder } from "react-icons/fa";

const rootPath = "/page/copy-dir/";
const realoadDir = hookstate("");
const selectedId = hookstate("");
const contextMenuObject = hookstate({
  x: 0,
  y: 0,
  dirId: "",
  open: false
});

const rootContextMenuObject = hookstate({
  open: false,
  x: 0,
  y: 0
});

// const copyName = hookstate("");

export default function Page({ params }: { params: { dir: string } }) {
  const dirId = params.dir;
  const { value: contextMenu, set: setContextMenu } =
    useHookstate(contextMenuObject);
  const { value: rootContextMenu, set: setRootContextMenu } = useHookstate(
    rootContextMenuObject
  );
  const [cpName, setCopyName] = useLocalStorage({
    key: "copyName",
    defaultValue: ""
  });
  const { value: reloadValue, set: setReloadValue } = useHookstate(realoadDir);

  function onRootClick() {
    contextMenu.open && setContextMenu({ ...contextMenu, open: false });
    // setRootContextMenu({
    //   open: false,
    //   x: 0,
    //   y: 0
    // });
  }

  function onContextMenu(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setRootContextMenu({
      open: true,
      x: e.clientX,
      y: e.clientY
    });
  }

  async function onPate() {
    console.log(cpName);

    setRootContextMenu({
      open: false,
      x: 0,
      y: 0
    });

    try {
      const res = await fetch(rootPath + `/api/${dirId}/create`, {
        method: "POST",
        body: JSON.stringify({
          name: "copy-" + cpName,
          variant: "FILE"
        } as Prisma.DirGetPayload<{ select: { name: true; variant: true } }>)
      });
      const data = await res.text();

      if (!res.ok) return alert(data);
      alert("Success");
    } catch (error) {
      console.log(error);
    } finally {
      setReloadValue(Math.random().toString());
    }
  }
  return (
    <Stack>
      <Flex onContextMenu={onContextMenu} onClick={onRootClick}>
        <Stack w={300}>
          <CreateDir dirId={dirId} />
          <CreateFile dirId={dirId} />
        </Stack>
        <Stack flex={1} bg={"gray"} p={"md"}>
          <Flex align={"center"} gap={"md"}>
            <ActionIcon
              variant="transparent"
              size={"xs"}
              component={Link}
              href={rootPath + "/root"}
            >
              <FaFolder />
            </ActionIcon>
            <Title order={3}>List</Title>
          </Flex>
          <DisplayDir dirId={dirId} />
        </Stack>
      </Flex>
      {/* context menu component */}
      <Box
        pos={"absolute"}
        left={rootContextMenu.x}
        top={rootContextMenu.y}
        display={rootContextMenu.open && cpName.length > 0 ? "block" : "none"}
        p={"md"}
        bg={"white"}
      >
        {cpName.length > 0 && <Button onClick={onPate}>Paste</Button>}
      </Box>
    </Stack>
  );
}

type Dir = Prisma.DirGetPayload<{
  select: { id: true; name: true; variant: true };
}>;

function DisplayDir({ dirId }: { dirId: string | null }) {
  const [listDir, setListDir] = useState<Dir[]>([]);
  const { value, set } = useHookstate(realoadDir);
  async function loadData() {
    const res = await fetch(rootPath + `/api/${dirId}/list`, {
      method: "GET"
    });

    const data = await res.text();
    if (!res.ok) return console.log(data);
    setListDir(JSON.parse(data).data);
  }

  useShallowEffect(() => {
    loadData();
    if (value) {
      loadData();
    }
  }, [value]);
  return (
    <Stack h={"100vh"}>
      <Flex wrap={"wrap"} gap={"md"} justify={"center"}>
        {listDir.map((dir) => (
          <DirItem key={dir.id} dir={dir} />
        ))}
      </Flex>
    </Stack>
  );
}

function DirItem({ dir }: { dir: Dir }) {
  const { value: selected, set: setSelected } = useHookstate(selectedId);
  const { value: contextMenu, set: setContextMenu } =
    useHookstate(contextMenuObject);
  // const { value: cpName, set: setCopyName } = useHookstate(copyName);
  const [cpName, setCopyName] = useLocalStorage({
    key: "copyName",
    defaultValue: ""
  });

  const { value: rootContextMenu, set: setRootContextMenu } = useHookstate(
    rootContextMenuObject
  );

  async function onDoubleClick() {
    window.location.href = rootPath + "/" + dir.id;
    console.log(dir.id);
  }

  function onSelected() {
    setSelected(dir.id);
    rootContextMenu.open && setRootContextMenu({
      open: false,
      x: 0,
      y: 0
    });
  }

  function onContextMenu(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    if (window) {
      setContextMenu({ x: e.clientX, y: e.clientY, dirId: dir.id, open: true });
    }
  }

  function FolderType() {
    return (
      <Stack
        onContextMenu={onContextMenu}
        c={"blue"}
        bg={selected === dir.id ? "grey" : "transparent"}
        align="center"
      >
        <FaFolder size={64} />
        <Text c={"white"}>{dir.name}</Text>
      </Stack>
    );
  }

  function FileType() {
    return (
      <Stack
        onContextMenu={onContextMenu}
        bg={selected === dir.id ? "grey" : "transparent"}
        c={"white"}
        align="center"
      >
        <FaFile size={64} />
        <Text>{dir.name}</Text>
      </Stack>
    );
  }

  function onCopy() {
    setCopyName(dir.name);
  }

  return (
    <Stack onClick={onSelected} onDoubleClick={onDoubleClick}>
      {dir.variant === "DIR" ? <FolderType /> : <FileType />}
      <Box
        bg={"white"}
        pos={"absolute"}
        w={"200"}
        top={200}
        style={{
          zIndex: 99,
          display:
            contextMenu.open &&
            contextMenu.dirId === dir.id &&
            dir.variant === "FILE"
              ? "block"
              : "none"
        }}
      >
        <Stack pos={"relative"} p={"md"}>
          <Button onClick={onCopy}>copy</Button>
        </Stack>
      </Box>
    </Stack>
  );
}

function CreateDir({ dirId }: { dirId: string | null }) {
  const [form, setForm] = useState({
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const { value, set } = useHookstate(realoadDir);

  async function onCreate() {
    try {
      setLoading(true);
      if (!form.name) {
        return alert("Please enter a name");
      }

      const res = await fetch(rootPath + `/api/${dirId}/create`, {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          variant: "DIR"
        } as Prisma.DirGetPayload<{ select: { name: true; variant: true } }>)
      });
      const data = await res.text();
      if (!res.ok) return alert(data);
      set(Math.random().toString());
      alert("Success");
      setForm({ name: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Group>
      <Stack p={"md"}>
        <Title order={3}>Create Directory</Title>
        <TextInput
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <Button loading={loading} onClick={onCreate}>
          Create
        </Button>
      </Stack>
    </Group>
  );
}

function CreateFile({ dirId }: { dirId: string | null }) {
  const [form, setForm] = useState({
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const { value, set } = useHookstate(realoadDir);

  async function onCreate() {
    try {
      setLoading(true);
      if (!form.name) {
        return alert("Please enter a name");
      }

      const res = await fetch(rootPath + `/api/${dirId}/create`, {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          variant: "FILE"
        } as Prisma.DirGetPayload<{ select: { name: true; variant: true } }>)
      });
      const data = await res.text();

      if (!res.ok) return alert(data);
      alert("Success");
      setForm({ name: "" });
      set(Math.random().toString());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Group>
      <Stack p={"md"}>
        <Title order={3}>Create File</Title>
        <TextInput
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
        <Button loading={loading} onClick={onCreate}>
          Create
        </Button>
      </Stack>
    </Group>
  );
}
