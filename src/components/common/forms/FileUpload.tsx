import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
/* 컴포넌트 */
import Btn from '../buttons/Btn.tsx'

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
  acceptedFileTypes?: Record<string, string[]>;
  maxFileSize?: number;
}

const FileUploader = ({
                        onFileSelect,
                        acceptedFileTypes = { "image/*": [] },
                        maxFileSize = 1024 * 1024 * 1024, // 1GB
                      }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          flex
          items-center
          px-3
          py-2
          border
          border-gray-300
          rounded-md
          transition-colors duration-200
          ${
          isDragActive
            ? "border-[#33BB9A] bg-primary-main"
            : "border-gray-300 hover:border-[#33BB9A]"
        }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex items-center gap-2">
          <Btn
            type="button"
            background="regular"
            size="sm"
          >
            파일 선택
          </Btn>
          <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            {file ? file.name : "* 이미지 파일을 첨부해주세요."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;