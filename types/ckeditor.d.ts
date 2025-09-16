declare module "@ckeditor/ckeditor5-react" {
  import * as React from "react";
  const CKEditor: React.ComponentType<any>;
  export { CKEditor };
}

declare module "@/lib/ckeditor5/build/ckeditor" {
  import { Editor } from "@ckeditor/ckeditor5-core";
  const ClassicEditor: typeof Editor;
  export default ClassicEditor;
}
