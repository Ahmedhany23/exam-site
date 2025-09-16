"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@/lib/ckeditor5/build/ckeditor";

export function RichTextEditor() {
  const { Editor } = ClassicEditor;
  if (typeof window === "undefined") {
    return null;
  }

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
          event: React.ChangeEvent,
          editor: { getData: () => string }
        ) => {
          const data = editor.getData();
          console.log(" data:", data);
        }}
      />
    </div>
  );
}
