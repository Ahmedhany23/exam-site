"use client";

import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import type { Editor as ClassicEditorType } from "@ckeditor/ckeditor5-core";

export function RichTextEditor() {
  const [Editor, setEditor] = useState<typeof ClassicEditorType | null>(null);

  useEffect(() => {
    import("@/lib/ckeditor5/build/ckeditor").then(
      (
        mod: { default: typeof ClassicEditorType } & {
          Editor?: typeof ClassicEditorType;
        }
      ) => {
        setEditor(() => (mod.Editor ? mod.Editor : mod.default));
      }
    );
  }, []);

  if (!Editor) return null;

  return (
    <div className="w-full">
      <h2 className="mb-2 text-lg font-medium">المحرر</h2>
      <CKEditor
        editor={Editor}
        config={{
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "imageInsert",
              "|",
              "heading",
              "bold",
              "italic",
              "strikethrough",
              "underline",
              "link",
              "blockQuote",
              "removeFormat",
              "|",
              "selectAll",
              "specialCharacters",
              "superscript",
              "subscript",
              "style",
              "|",
              "bulletedList",
              "numberedList",
              "outdent",
              "indent",
              "|",
              "mediaEmbed",
              "insertTable",
              "|",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "fontSize",
              "highlight",
              "|",
              "horizontalLine",
              "pageBreak",
              "findAndReplace",
              "restrictedEditingException",
              "textPartLanguage",
              "-",
            ],
            shouldNotGroupWhenFull: true,
          },
          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableCellProperties",
              "tableProperties",
            ],
          },
        }}
        data="<p>ابدأ بالكتابة هنا...</p>"
        onChange={(
          _: React.ChangeEvent<HTMLInputElement>,
          editor: ClassicEditorType
        ) => {
          const data = editor.getData();
          console.log("data:", data);
        }}
      />
    </div>
  );
}
