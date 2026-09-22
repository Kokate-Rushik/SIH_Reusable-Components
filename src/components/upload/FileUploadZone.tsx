import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Loader2, FileCheck } from 'lucide-react';
import { uploadReportFile, UploadOptions } from '../../services/api';
import { SIFAnalysisResult, UploadResponse } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface FileUploadZoneProps {
  onUploadSuccess?: (result: UploadResponse, analysis?: SIFAnalysisResult) => void;
  onUploadError?: (error: Error) => void;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
  className?: string;
  partitionNamespace?: string;
  sourceFormat?: string;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onUploadSuccess,
  onUploadError,
  acceptedFileTypes = ['.pdf', '.csv', '.json', '.parquet', '.txt', '.docx'],
  maxSizeMB = 50,
  className,
  partitionNamespace,
  sourceFormat,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setErrorMessage(null);

    // Max size check
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorMessage(`File exceeds maximum size limit of ${maxSizeMB} MB.`);
      return false;
    }

    // Extension check
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFileTypes.includes(extension) && acceptedFileTypes.length > 0) {
      setErrorMessage(
        `Unsupported file type (${extension}). Allowed formats: ${acceptedFileTypes.join(', ')}`
      );
      return false;
    }

    return true;
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setUploadComplete(false);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        setUploadComplete(false);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setErrorMessage(null);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartUpload = async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setErrorMessage(null);
    setUploadProgress(10);

    try {
      const options: UploadOptions = {
        sourceFormat,
        partitionNamespace,
        onProgress: (p) => setUploadProgress(p),
      };

      const result = await uploadReportFile(selectedFile, options);

      setIsUploading(false);
      setUploadComplete(true);
      setUploadProgress(100);

      if (onUploadSuccess) {
        onUploadSuccess(result, result.analysis);
      }
    } catch (err: any) {
      setIsUploading(false);
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setErrorMessage(errorObj.message || 'File upload failed. Please try again.');
      if (onUploadError) {
        onUploadError(errorObj);
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload-input"
        aria-label="Upload file"
      />

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-150',
          !selectedFile && 'cursor-pointer',
          isDragOver
            ? 'border-slate-800 bg-slate-100/80 scale-[0.995]'
            : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
        )}
      >
        <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-slate-700 mb-3 border border-slate-200 shadow-xs">
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-slate-800" />
          ) : uploadComplete ? (
            <FileCheck className="h-5 w-5 text-emerald-700" />
          ) : (
            <UploadCloud className="h-5 w-5" />
          )}
        </div>

        <div className="text-sm font-semibold text-slate-900">
          {selectedFile
            ? 'Dataset Staged for Processing'
            : 'Drag and drop incident report or click to browse'}
        </div>

        <div className="text-xs text-slate-500 mt-1 max-w-md">
          Supported files: {acceptedFileTypes.join(', ')} (up to {maxSizeMB} MB per ingestion batch).
        </div>

        {!selectedFile && (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
            >
              Select Local File
            </button>
          </div>
        )}
      </div>

      {/* Selected File Card & Actions */}
      {selectedFile && (
        <div className="surface-card p-4 border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 border border-slate-200">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-900 truncate">
                  {selectedFile.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Standard Record'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!isUploading && !uploadComplete && (
                <>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleStartUpload}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    Ingest & Analyze
                  </button>
                </>
              )}

              {uploadComplete && (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    Ingestion Complete
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                  >
                    Upload Another
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Transmitting payload to SIF rules engine...</span>
                <span className="font-mono">{uploadProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 transition-all duration-200 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded flex items-start gap-2 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Ingestion Error: </span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
