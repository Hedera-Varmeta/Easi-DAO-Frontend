import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { MDEditorProps } from "@uiw/react-md-editor";
import { useState } from "react";
import { BtnMode, ContainerMarkdown } from "./styled";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface IProps extends MDEditorProps {
  onlyView?: boolean;
}

const Markdown = ({ onlyView = false, value, ...props }: IProps) => {
  const [isPreview, setIsPreview] = useState(onlyView);

  function toggleMode(mode: boolean): void {
    setIsPreview(mode);
  }

  return (
    <div>
      {!onlyView && (
        <ContainerMarkdown>
          <BtnMode
            type="button"
            variant="text"
            active={!isPreview}
            onClick={() => toggleMode(false)}
          >
            Edit
          </BtnMode>
          <BtnMode
            type="button"
            variant="text"
            active={isPreview}
            onClick={() => toggleMode(true)}
          >
            Preview
          </BtnMode>
        </ContainerMarkdown>
      )}
      <div data-color-mode="light">
        {isPreview && (
          <MarkdownPreview
            source={value}
            style={
              !onlyView
                ? {
                    padding: 8,
                    minHeight: 200,
                  }
                : {}
            }
          />
        )}
        {!isPreview && (
          <MDEditor
            {...props}
            value={value}
            extraCommands={[]}
            preview="edit"
          />
        )}
      </div>
    </div>
  );
};

export default Markdown;
