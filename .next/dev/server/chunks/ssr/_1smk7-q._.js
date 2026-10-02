module.exports = [
"[project]/components/upload/UploadZone.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadZone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/film.js [app-ssr] (ecmascript) <export default as Film>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$editorStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/editorStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/subtitles/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const STEP_MESSAGES = {
    idle: '',
    uploading: 'Uploading video...',
    extracting: 'Extracting audio...',
    transcribing: 'Transcribing speech with AI...',
    ready: 'Processing complete!',
    error: 'Something went wrong'
};
/** Zoom the timeline out by 20% once a video is loaded. */ const POST_UPLOAD_ZOOM_OUT = 0.8;
function UploadZone() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setVideo, setSubtitles, setDuration, zoomOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$editorStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditorStore"])();
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        step: 'idle',
        percent: 0,
        message: ''
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [metadata, setMetadata] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const setStep = (step, percent)=>{
        setProgress({
            step,
            percent,
            message: STEP_MESSAGES[step]
        });
    };
    const handleFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (file)=>{
        setError(null);
        setSelectedFile(file);
        setStep('uploading', 10);
        try {
            // ── Step 1: Upload ──────────────────────────────────────────────────
            const formData = new FormData();
            formData.append('video', file);
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            if (!uploadRes.ok) {
                const data = await uploadRes.json();
                throw new Error(data.error ?? 'Upload failed');
            }
            const uploadData = await uploadRes.json();
            setMetadata(uploadData.metadata);
            setStep('extracting', 35);
            // ── Step 2: Transcribe (includes audio extraction) ─────────────────
            setStep('transcribing', 55);
            const transcribeRes = await fetch('/api/transcribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jobId: uploadData.jobId,
                    filePath: uploadData.filePath
                })
            });
            if (!transcribeRes.ok) {
                const data = await transcribeRes.json();
                throw new Error(data.error ?? 'Transcription failed');
            }
            const { segments } = await transcribeRes.json();
            setStep('ready', 100);
            // ── Step 3: Set editor state and navigate ─────────────────────────
            const videoUrl = URL.createObjectURL(file);
            setVideo({
                filePath: uploadData.filePath,
                url: videoUrl,
                metadata: uploadData.metadata
            });
            setSubtitles(segments);
            setDuration(uploadData.metadata.duration);
            zoomOut(POST_UPLOAD_ZOOM_OUT);
            // Short delay to show the "ready" state before navigating
            await new Promise((r)=>setTimeout(r, 600));
            router.push('/editor');
        } catch (err) {
            const message = err.message;
            setError(message);
            setStep('error', 0);
        }
    }, [
        router,
        setVideo,
        setSubtitles,
        setDuration,
        zoomOut
    ]);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [
        handleFile
    ]);
    const onFileChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [
        handleFile
    ]);
    const isProcessing = [
        'uploading',
        'extracting',
        'transcribing'
    ].includes(progress.step);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `upload-zone w-full max-w-2xl mx-auto ${isDragging ? 'dragging' : ''}`,
        onDragOver: (e)=>{
            e.preventDefault();
            setIsDragging(true);
        },
        onDragLeave: ()=>setIsDragging(false),
        onDrop: onDrop,
        onClick: ()=>!isProcessing && fileInputRef.current?.click(),
        role: "button",
        tabIndex: 0,
        "aria-label": "Upload video file",
        onKeyDown: (e)=>e.key === 'Enter' && fileInputRef.current?.click(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: "video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm,.mp4,.mov,.mkv,.avi,.webm",
                onChange: onFileChange,
                className: "hidden",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/upload/UploadZone.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-10 text-center",
                children: [
                    progress.step === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mb-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center border border-bg-border",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "w-7 h-7 text-accent"
                                    }, void 0, false, {
                                        fileName: "[project]/components/upload/UploadZone.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base font-medium text-text-primary mb-1",
                                children: "Drop your video here"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-text-muted mb-4",
                                children: "or click to browse"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-3 flex-wrap",
                                children: [
                                    'MP4',
                                    'MOV',
                                    'MKV',
                                    'AVI',
                                    'WebM'
                                ].map((fmt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs px-2 py-1 rounded bg-bg-elevated text-text-secondary border border-bg-border",
                                        children: fmt
                                    }, fmt, false, {
                                        fileName: "[project]/components/upload/UploadZone.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted mt-3",
                                children: [
                                    "Up to ",
                                    process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB ?? 500,
                                    "MB"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/upload/UploadZone.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-in",
                        children: [
                            selectedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-6 p-3 rounded-lg bg-bg-elevated border border-bg-border",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__["Film"], {
                                        className: "w-5 h-5 text-accent flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/components/upload/UploadZone.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-left min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-text-primary truncate",
                                                children: selectedFile.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/upload/UploadZone.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-text-muted",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatFileSize"])(selectedFile.size),
                                                    metadata && ` · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimeShort"])(metadata.duration)}`,
                                                    metadata && ` · ${metadata.width}×${metadata.height}`
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/upload/UploadZone.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/upload/UploadZone.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 mb-5",
                                children: [
                                    {
                                        step: 'uploading',
                                        label: 'Uploading video'
                                    },
                                    {
                                        step: 'extracting',
                                        label: 'Extracting audio'
                                    },
                                    {
                                        step: 'transcribing',
                                        label: 'Transcribing with AI'
                                    }
                                ].map(({ step, label })=>{
                                    const stepOrder = [
                                        'uploading',
                                        'extracting',
                                        'transcribing'
                                    ];
                                    const currentIdx = stepOrder.indexOf(progress.step);
                                    const thisIdx = stepOrder.indexOf(step);
                                    const isDone = thisIdx < currentIdx;
                                    const isCurrent = thisIdx === currentIdx;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 flex-shrink-0 flex items-center justify-center",
                                                children: isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "w-4 h-4 text-status-success"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 25
                                                }, this) : isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-4 h-4 text-accent animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-3 h-3 rounded-full border border-bg-border"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/upload/UploadZone.tsx",
                                                lineNumber: 232,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm ${isCurrent ? 'text-text-primary' : isDone ? 'text-status-success' : 'text-text-disabled'}`,
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/components/upload/UploadZone.tsx",
                                                lineNumber: 241,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, step, true, {
                                        fileName: "[project]/components/upload/UploadZone.tsx",
                                        lineNumber: 231,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "progress-bar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "progress-bar-fill",
                                    style: {
                                        width: `${progress.percent}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/upload/UploadZone.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    progress.step === 'ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-in flex flex-col items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                className: "w-10 h-10 text-status-success"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-text-primary",
                                children: "Processing complete!"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted",
                                children: "Opening editor..."
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/upload/UploadZone.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this),
                    progress.step === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-10 h-10 text-status-error"
                                }, void 0, false, {
                                    fileName: "[project]/components/upload/UploadZone.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-status-error mb-2",
                                children: "Processing failed"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-text-secondary mb-5 max-w-sm mx-auto",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-secondary",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setProgress({
                                        step: 'idle',
                                        percent: 0,
                                        message: ''
                                    });
                                    setError(null);
                                    setSelectedFile(null);
                                    setMetadata(null);
                                },
                                children: "Try again"
                            }, void 0, false, {
                                fileName: "[project]/components/upload/UploadZone.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/upload/UploadZone.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/upload/UploadZone.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/upload/UploadZone.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/subtitles/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "formatFileSize",
    ()=>formatFileSize,
    "formatSRT",
    ()=>formatSRT,
    "formatTimeShort",
    ()=>formatTimeShort,
    "formatTimestamp",
    ()=>formatTimestamp,
    "formatVTT",
    ()=>formatVTT,
    "generateSubtitleId",
    ()=>generateSubtitleId,
    "getActiveSubtitle",
    ()=>getActiveSubtitle,
    "mergeSubtitles",
    ()=>mergeSubtitles,
    "parseTimestamp",
    ()=>parseTimestamp,
    "sortSubtitles",
    ()=>sortSubtitles,
    "splitSubtitle",
    ()=>splitSubtitle,
    "validateSegment",
    ()=>validateSegment
]);
function formatSRT(seconds) {
    const totalMs = Math.round(seconds * 1000);
    const ms = totalMs % 1000;
    const totalSeconds = Math.floor(totalMs / 1000);
    const secs = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const mins = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${pad(hours)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`;
}
function formatVTT(seconds) {
    const totalMs = Math.round(seconds * 1000);
    const ms = totalMs % 1000;
    const totalSeconds = Math.floor(totalMs / 1000);
    const secs = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const mins = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours > 0) {
        return `${pad(hours)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
    }
    return `${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}
function formatTimestamp(seconds) {
    const totalMs = Math.round(seconds * 1000);
    const ms = totalMs % 1000;
    const totalSeconds = Math.floor(totalMs / 1000);
    const secs = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const mins = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours > 0) {
        return `${pad(hours)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
    }
    return `${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}
function formatTimeShort(seconds) {
    const totalSeconds = Math.floor(seconds);
    const secs = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const mins = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours > 0) {
        return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
}
function parseTimestamp(str) {
    // Normalize separator
    const normalized = str.trim().replace(',', '.');
    const parts = normalized.split(':');
    if (parts.length === 2) {
        // MM:SS.mmm
        const mins = parseFloat(parts[0]);
        const secs = parseFloat(parts[1]);
        return mins * 60 + secs;
    } else if (parts.length === 3) {
        // HH:MM:SS.mmm
        const hours = parseFloat(parts[0]);
        const mins = parseFloat(parts[1]);
        const secs = parseFloat(parts[2]);
        return hours * 3600 + mins * 60 + secs;
    }
    return 0;
}
function pad(n, width = 2) {
    return String(Math.floor(n)).padStart(width, '0');
}
function getActiveSubtitle(subtitles, currentTime) {
    for (const sub of subtitles){
        if (currentTime >= sub.start && currentTime < sub.end) {
            return sub;
        }
    }
    return null;
}
// ─── Subtitle Operations ───────────────────────────────────────────────────
const MIN_DURATION = 0.1;
function splitSubtitle(sub, splitTime) {
    if (splitTime <= sub.start + MIN_DURATION || splitTime >= sub.end - MIN_DURATION) {
        return null;
    }
    const wordMidpoint = Math.floor(sub.text.length / 2);
    const spaceNear = findNearestSpace(sub.text, wordMidpoint);
    const firstText = sub.text.slice(0, spaceNear).trim();
    const secondText = sub.text.slice(spaceNear).trim();
    const first = {
        id: `${sub.id}-a`,
        start: sub.start,
        end: splitTime,
        text: firstText || sub.text
    };
    const second = {
        id: `${sub.id}-b`,
        start: splitTime,
        end: sub.end,
        text: secondText || sub.text
    };
    return [
        first,
        second
    ];
}
function findNearestSpace(text, pos) {
    let left = pos;
    let right = pos;
    while(left > 0 || right < text.length){
        if (left > 0 && text[left] === ' ') return left;
        if (right < text.length && text[right] === ' ') return right;
        left--;
        right++;
    }
    return pos;
}
function mergeSubtitles(a, b) {
    return {
        id: a.id,
        start: Math.min(a.start, b.start),
        end: Math.max(a.end, b.end),
        text: `${a.text} ${b.text}`.trim()
    };
}
function validateSegment(seg, videoDuration) {
    if (isNaN(seg.start) || isNaN(seg.end)) return 'Invalid timestamp (NaN)';
    if (seg.start < 0) return 'Start time cannot be negative';
    if (seg.end < 0) return 'End time cannot be negative';
    if (seg.end <= seg.start) return 'End must be after start';
    if (seg.end - seg.start < MIN_DURATION) return `Minimum duration is ${MIN_DURATION}s`;
    if (seg.start > videoDuration) return 'Start time exceeds video duration';
    if (seg.end > videoDuration) return 'End time exceeds video duration';
    return null;
}
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function generateSubtitleId() {
    return `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function sortSubtitles(subtitles) {
    return [
        ...subtitles
    ].sort((a, b)=>a.start - b.start);
}
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = [
        'B',
        'KB',
        'MB',
        'GB'
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
}),
"[project]/store/editorStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditorStore",
    ()=>useEditorStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$subtitle$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types/subtitle.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/subtitles/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const MAX_HISTORY = 50;
const initialState = {
    video: null,
    subtitles: [],
    selectedSubtitleId: null,
    currentTime: 0,
    isPlaying: false,
    duration: 0,
    zoom: 100,
    style: __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$subtitle$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SUBTITLE_STYLE"],
    history: [],
    historyIndex: -1,
    isExporting: false,
    exportProgress: null
};
const useEditorStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ...initialState,
        // ─── Video ────────────────────────────────────────────────────────────────
        setVideo: (video)=>set({
                video
            }),
        // ─── Subtitle helpers ─────────────────────────────────────────────────────
        setSubtitles: (subtitles)=>{
            pushHistory(set, get, subtitles);
        },
        updateSubtitle: (id, changes)=>{
            const { subtitles } = get();
            const updated = subtitles.map((s)=>s.id === id ? {
                    ...s,
                    ...changes
                } : s);
            pushHistory(set, get, updated);
        },
        addSubtitle: (afterId)=>{
            const { subtitles, duration } = get();
            const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortSubtitles"])(subtitles);
            let start = 0;
            let end = Math.min(3, duration);
            if (afterId) {
                const idx = sorted.findIndex((s)=>s.id === afterId);
                if (idx !== -1) {
                    const prev = sorted[idx];
                    start = prev.end;
                    end = Math.min(prev.end + 3, duration);
                }
            } else if (sorted.length > 0) {
                const last = sorted[sorted.length - 1];
                start = last.end;
                end = Math.min(last.end + 3, duration);
            }
            const newSub = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateSubtitleId"])(),
                start,
                end,
                text: 'New subtitle'
            };
            const updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortSubtitles"])([
                ...subtitles,
                newSub
            ]);
            pushHistory(set, get, updated);
            set({
                selectedSubtitleId: newSub.id
            });
        },
        deleteSubtitle: (id)=>{
            const { subtitles } = get();
            const updated = subtitles.filter((s)=>s.id !== id);
            pushHistory(set, get, updated);
            set({
                selectedSubtitleId: null
            });
        },
        splitSubtitleAtTime: (id, time)=>{
            const { subtitles } = get();
            const sub = subtitles.find((s)=>s.id === id);
            if (!sub) return;
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitSubtitle"])(sub, time);
            if (!result) return;
            const [first, second] = result;
            const updated = subtitles.filter((s)=>s.id !== id).concat([
                first,
                second
            ]);
            pushHistory(set, get, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortSubtitles"])(updated));
            set({
                selectedSubtitleId: first.id
            });
        },
        mergeWithNext: (id)=>{
            const { subtitles } = get();
            const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortSubtitles"])(subtitles);
            const idx = sorted.findIndex((s)=>s.id === id);
            if (idx === -1 || idx >= sorted.length - 1) return;
            const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeSubtitles"])(sorted[idx], sorted[idx + 1]);
            const updated = [
                ...sorted.slice(0, idx),
                merged,
                ...sorted.slice(idx + 2)
            ];
            pushHistory(set, get, updated);
            set({
                selectedSubtitleId: merged.id
            });
        },
        // ─── Selection ────────────────────────────────────────────────────────────
        selectSubtitle: (id)=>set({
                selectedSubtitleId: id
            }),
        // ─── Playback ─────────────────────────────────────────────────────────────
        setCurrentTime: (time)=>set({
                currentTime: time
            }),
        setIsPlaying: (isPlaying)=>set({
                isPlaying
            }),
        setDuration: (duration)=>set({
                duration
            }),
        // ─── Timeline ─────────────────────────────────────────────────────────────
        setZoom: (zoom)=>set({
                zoom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(zoom, 20, 500)
            }),
        zoomOut: (factor)=>set((state)=>({
                    zoom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$subtitles$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(state.zoom * factor, 20, 500)
                })),
        // ─── Style ────────────────────────────────────────────────────────────────
        updateStyle: (changes)=>set((state)=>({
                    style: {
                        ...state.style,
                        ...changes
                    }
                })),
        // ─── History ──────────────────────────────────────────────────────────────
        undo: ()=>{
            const { history, historyIndex } = get();
            if (historyIndex <= 0) return;
            const newIndex = historyIndex - 1;
            set({
                subtitles: history[newIndex],
                historyIndex: newIndex
            });
        },
        redo: ()=>{
            const { history, historyIndex } = get();
            if (historyIndex >= history.length - 1) return;
            const newIndex = historyIndex + 1;
            set({
                subtitles: history[newIndex],
                historyIndex: newIndex
            });
        },
        // ─── Export ───────────────────────────────────────────────────────────────
        setExporting: (isExporting, exportProgress)=>set({
                isExporting,
                exportProgress: exportProgress ?? null
            }),
        // ─── Reset ────────────────────────────────────────────────────────────────
        reset: ()=>set(initialState)
    }));
/**
 * Push a new state to history, truncating any redo branch.
 */ function pushHistory(set, get, subtitles) {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(subtitles);
    if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
    }
    set({
        subtitles,
        history: newHistory,
        historyIndex: newHistory.length - 1
    });
}
}),
"[project]/types/subtitle.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SUBTITLE_STYLE",
    ()=>DEFAULT_SUBTITLE_STYLE
]);
const DEFAULT_SUBTITLE_STYLE = {
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    backgroundOpacity: 70,
    position: 'bottom',
    textAlign: 'center',
    outline: true,
    outlineColor: '#000000',
    maxWidth: 80
};
}),
];

//# sourceMappingURL=_1smk7-q._.js.map