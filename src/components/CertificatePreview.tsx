import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Certification } from "@/lib/data";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

type Props = {
  certificate: Certification | null;
  onClose: () => void;
};

const CertificatePreview = ({ certificate, onClose }: Props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(640);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPage(1);
    setPages(0);
    setFailed(false);
  }, [certificate]);

  useEffect(() => {
    if (!certificate) return;
    const element = container;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.min(900, Math.max(1, entry.contentRect.width - 24)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [certificate, container]);

  return (
    <Dialog open={Boolean(certificate)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="flex h-[90dvh] w-[calc(100%-1rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-lg p-0" data-lenis-prevent>
        <DialogHeader className="shrink-0 border-b border-border px-5 py-4 pr-12 text-left">
          <DialogTitle className="break-words leading-snug tracking-normal">{certificate?.title}</DialogTitle>
          <DialogDescription className="mt-1">{certificate?.issuer}</DialogDescription>
        </DialogHeader>

        <div ref={setContainer} className="min-h-0 flex-1 overflow-auto bg-muted/30 p-3" data-lenis-prevent>
          {certificate?.previewUrl && !failed ? (
            <Document
              file={certificate.previewUrl}
              onLoadSuccess={({ numPages }) => setPages(numPages)}
              onLoadError={() => setFailed(true)}
              loading={<div role="status" className="flex justify-center gap-2 py-16 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /> Loading certificate…</div>}
              className="flex justify-center"
            >
              <Page pageNumber={page} width={width} renderTextLayer={false} renderAnnotationLayer={false} onRenderError={() => setFailed(true)} />
            </Document>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
              <FileText className="h-10 w-10 text-primary" />
              <p className="max-w-md text-muted-foreground">
                {failed ? "The PDF preview couldn’t load. You can open the original document below." : "This certificate currently links to a shared Google Drive folder. An individual PDF is needed for an in-page preview."}
              </p>
              <Button asChild className="btn-primary">
                <a href={certificate?.link} target="_blank" rel="noreferrer"><ExternalLink />{failed ? "Open document" : "Open certificate folder"}</a>
              </Button>
            </div>
          )}
        </div>

        {certificate?.previewUrl && (
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Previous page" title="Previous page" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft /></Button>
              <span aria-live="polite" className="min-w-16 text-center text-sm tabular-nums">{pages ? `${page} / ${pages}` : "—"}</span>
              <Button variant="ghost" size="icon" aria-label="Next page" title="Next page" disabled={!pages || page >= pages} onClick={() => setPage((current) => current + 1)}><ChevronRight /></Button>
            </div>
            <Button asChild className="btn-primary"><a href={certificate.previewUrl} download target="_blank" rel="noreferrer"><Download /> Download PDF</a></Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;