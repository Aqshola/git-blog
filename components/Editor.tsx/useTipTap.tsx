import React, { useEffect } from "react";
import { Box, Button, Divider, Flex, FormLabel } from "@chakra-ui/react";

import { useEditor, EditorContent, HTMLContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type EDITOR_STYLE = {
  toolbar?: boolean;
  border?: boolean;
};

export default function useTipTap(
  content: string = "",
  editable: boolean = true
): [
  ({ toolbar, border }: EDITOR_STYLE) => JSX.Element,
  HTMLContent | undefined
] {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: editable,
  });

  useEffect(() => {
    if (content !== "") {
      editor?.commands.setContent(content);
    }
  }, [content]);

  const Element = React.useMemo(() => {
    const Editor = ({ toolbar = true, border = true }: EDITOR_STYLE) => (
      <Box
        mt={5}
        borderWidth={border ? "thin" : "none"}
        borderRadius={"md"}
        _focusWithin={{
          outline: "4px solid #0070f3",
        }}
        padding={2}
      >
        <Box>
          {toolbar && <FormLabel id="content">Content</FormLabel>}

          <Box>
            {toolbar && (
              <>
                <Flex gap={2} mb={2} wrap="wrap">
                  <Button
                    variant={editor?.isActive("bold") ? "solid" : "outline"}
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleBold().run();
                    }}
                  >
                    B
                  </Button>
                  <Button
                    variant={editor?.isActive("italic") ? "solid" : "outline"}
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleItalic().run();
                    }}
                  >
                    <i>I</i>
                  </Button>
                  <Button
                    variant={editor?.isActive("strike") ? "solid" : "outline"}
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleStrike().run();
                    }}
                  >
                    <u>Strike</u>
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("bulletList") ? "solid" : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleBulletList().run();
                    }}
                  >
                    Bullet List
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("orderedList") ? "solid" : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleOrderedList().run();
                    }}
                  >
                    Number List
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("orderedList") ? "solid" : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleOrderedList().run();
                    }}
                  >
                    P
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 1 })
                        ? "solid"
                        : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleHeading({ level: 1 }).run();
                    }}
                  >
                    H1
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 2 })
                        ? "solid"
                        : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                  >
                    H2
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 3 })
                        ? "solid"
                        : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                  >
                    H3
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("heading", { level: 4 })
                        ? "solid"
                        : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleHeading({ level: 4 }).run();
                    }}
                  >
                    H4
                  </Button>
                  <Button
                    variant={
                      editor?.isActive("orderedList") ? "solid" : "outline"
                    }
                    borderColor="black"
                    size={"sm"}
                    onClick={() => {
                      editor?.chain().focus().toggleHeading({ level: 5 }).run();
                    }}
                  >
                    H5
                  </Button>
                </Flex>
                <Divider mb={2} />
              </>
            )}

            <EditorContent id="content" placeholder="Content" editor={editor} />
          </Box>
        </Box>
      </Box>
    );

    return Editor;
  }, [editor]);

  return [Element, editor?.getHTML()];
}
