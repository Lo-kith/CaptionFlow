module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/transcribe/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ffmpeg$2f$extractAudio$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ffmpeg/extractAudio.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$whisper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transcription/whisper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$tempFiles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/tempFiles.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$whisper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$whisper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
async function POST(req) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$tempFiles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureTempDirs"])();
        const body = await req.json();
        const { jobId, filePath } = body;
        if (!jobId || !filePath) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing jobId or filePath'
            }, {
                status: 400
            });
        }
        // ─── Security: ensure filePath is within uploads dir ──────────────────
        const uploadsDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$tempFiles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEMP_DIRS"].uploads);
        const resolvedPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(filePath);
        if (!resolvedPath.startsWith(uploadsDir)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid file path'
            }, {
                status: 403
            });
        }
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(resolvedPath)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Video file not found'
            }, {
                status: 404
            });
        }
        // ─── Extract audio ─────────────────────────────────────────────────────
        let audioPath;
        try {
            audioPath = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ffmpeg$2f$extractAudio$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractAudio"])(resolvedPath, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$tempFiles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEMP_DIRS"].audio);
        } catch (err) {
            console.error('[transcribe] Audio extraction failed:', err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Audio extraction failed: ${err.message}`
            }, {
                status: 500
            });
        }
        // ─── Transcribe ────────────────────────────────────────────────────────
        let result;
        try {
            const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$whisper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTranscriptionService"])();
            result = await service.transcribe(audioPath);
        } catch (err) {
            console.error('[transcribe] Transcription failed:', err);
            const message = err.message;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Transcription failed: ${message}`
            }, {
                status: 500
            });
        } finally{
            // Clean up audio file
            try {
                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(audioPath);
            } catch  {}
        }
        if (result.segments.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No speech detected in the video. Please check that the video contains spoken audio.'
            }, {
                status: 422
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            segments: result.segments,
            language: result.language,
            duration: result.duration
        });
    } catch (err) {
        console.error('[transcribe] Unexpected error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Transcription failed unexpectedly. Please try again.'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/ffmpeg/extractAudio.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractAudio",
    ()=>extractAudio
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ffmpeg$2f$paths$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ffmpeg/paths.ts [app-route] (ecmascript)");
;
;
;
;
async function extractAudio(videoPath, outputDir) {
    const audioFileName = `audio-${Date.now()}.wav`;
    const audioPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(outputDir, audioFileName);
    // Ensure output directory exists
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(outputDir, {
        recursive: true
    });
    return new Promise((resolve, reject)=>{
        const args = [
            '-i',
            videoPath,
            '-vn',
            '-acodec',
            'pcm_s16le',
            '-ar',
            '16000',
            '-ac',
            '1',
            '-y',
            audioPath
        ];
        const proc = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ffmpeg$2f$paths$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFFmpegPath"])(), args);
        let stderr = '';
        proc.stderr.on('data', (chunk)=>{
            stderr += chunk.toString();
        });
        proc.on('close', (code)=>{
            if (code !== 0) {
                reject(new Error(`FFmpeg audio extraction failed (code ${code}): ${stderr}`));
                return;
            }
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(audioPath)) {
                reject(new Error('Audio file was not created by FFmpeg'));
                return;
            }
            resolve(audioPath);
        });
        proc.on('error', (err)=>{
            reject(new Error(`FFmpeg failed to start: ${err.message}. Make sure FFmpeg is installed and in PATH.`));
        });
    });
}
}),
"[project]/lib/ffmpeg/paths.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFFmpegPath",
    ()=>getFFmpegPath,
    "getFFprobePath",
    ()=>getFFprobePath
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$ffmpeg$2d$static__$5b$external$5d$__$28$ffmpeg$2d$static$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$ffmpeg$2d$static$29$__ = __turbopack_context__.i("[externals]/ffmpeg-static [external] (ffmpeg-static, cjs, [project]/node_modules/ffmpeg-static)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$ffprobe$2d$static__$5b$external$5d$__$28$ffprobe$2d$static$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$ffprobe$2d$static$29$__ = __turbopack_context__.i("[externals]/ffprobe-static [external] (ffprobe-static, cjs, [project]/node_modules/ffprobe-static)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
;
/**
 * Sanitize path generated by bundlers (like Next.js Turbopack) which replace __dirname with \ROOT.
 */ function resolveBundlerPath(p) {
    if (!p) return null;
    // Fix Next.js Turbopack \ROOT virtual path
    let normalized = p;
    if (/^[\/\\]+ROOT[\/\\]?/.test(normalized)) {
        const cleaned = normalized.replace(/^[\/\\]+ROOT[\/\\]?/, '');
        normalized = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), cleaned);
    }
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(normalized)) {
        return normalized;
    }
    return null;
}
/**
 * Scan WinGet packages directory for installed FFmpeg/FFprobe binaries on Windows.
 */ function findWinGetBinary(binaryName) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const localAppData = process.env.LOCALAPPDATA;
    if (!localAppData) return null;
    const wingetDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(localAppData, 'Microsoft', 'WinGet', 'Packages');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(wingetDir)) return null;
    try {
        const entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(wingetDir);
        for (const entry of entries){
            if (entry.toLowerCase().includes('ffmpeg')) {
                const pkgDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(wingetDir, entry);
                // Check pkgDir/bin or subfolder/bin
                const binDirect = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(pkgDir, 'bin', binaryName);
                if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(binDirect)) return binDirect;
                const subEntries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(pkgDir);
                for (const sub of subEntries){
                    const subBin = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(pkgDir, sub, 'bin', binaryName);
                    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(subBin)) return subBin;
                }
            }
        }
    } catch  {}
    return null;
}
function getFFmpegPath() {
    if (process.env.FFMPEG_PATH && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(process.env.FFMPEG_PATH)) {
        return process.env.FFMPEG_PATH;
    }
    const resolved = resolveBundlerPath(typeof __TURBOPACK__imported__module__$5b$externals$5d2f$ffmpeg$2d$static__$5b$external$5d$__$28$ffmpeg$2d$static$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$ffmpeg$2d$static$29$__["default"] === 'string' ? __TURBOPACK__imported__module__$5b$externals$5d2f$ffmpeg$2d$static__$5b$external$5d$__$28$ffmpeg$2d$static$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$ffmpeg$2d$static$29$__["default"] : null);
    if (resolved) {
        return resolved;
    }
    // Direct fallback inside node_modules
    const directPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(directPath)) {
        return directPath;
    }
    // Check WinGet installation
    const wingetPath = findWinGetBinary('ffmpeg.exe');
    if (wingetPath) {
        return wingetPath;
    }
    return 'ffmpeg';
}
function getFFprobePath() {
    if (process.env.FFPROBE_PATH && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(process.env.FFPROBE_PATH)) {
        return process.env.FFPROBE_PATH;
    }
    const resolved = resolveBundlerPath(__TURBOPACK__imported__module__$5b$externals$5d2f$ffprobe$2d$static__$5b$external$5d$__$28$ffprobe$2d$static$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$ffprobe$2d$static$29$__["default"]?.path);
    if (resolved) {
        return resolved;
    }
    // Direct fallback inside node_modules
    const directPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'node_modules', 'ffprobe-static', 'bin', ("TURBOPACK compile-time truthy", 1) ? 'win32' : "TURBOPACK unreachable", ("TURBOPACK compile-time truthy", 1) ? 'x64' : "TURBOPACK unreachable", ("TURBOPACK compile-time truthy", 1) ? 'ffprobe.exe' : "TURBOPACK unreachable");
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(directPath)) {
        return directPath;
    }
    // Check WinGet installation
    const wingetPath = findWinGetBinary('ffprobe.exe');
    if (wingetPath) {
        return wingetPath;
    }
    return 'ffprobe';
}
}),
"[project]/lib/transcription/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WHISPER_MODEL",
    ()=>DEFAULT_WHISPER_MODEL,
    "WHISPER_MODELS",
    ()=>WHISPER_MODELS
]);
const WHISPER_MODELS = {
    tiny: 'Xenova/whisper-tiny',
    base: 'Xenova/whisper-base',
    small: 'Xenova/whisper-small',
    medium: 'Xenova/whisper-medium',
    large: 'Xenova/whisper-large'
};
const DEFAULT_WHISPER_MODEL = 'Xenova/whisper-base';
}),
"[project]/lib/transcription/whisper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "LocalWhisperService",
    ()=>LocalWhisperService,
    "createTranscriptionService",
    ()=>createTranscriptionService
]);
/**
 * Local Whisper transcription using @huggingface/transformers (Transformers.js v4).
 *
 * Runs entirely on-device — no API key, no internet required after
 * the first model download. Models are cached in the HuggingFace
 * cache directory (~/.cache/huggingface/hub).
 *
 * Audio pipeline:
 *   Video → FFmpeg (16 kHz mono WAV) → wavefile decoder → Float32Array
 *     → Xenova/whisper-* → chunk timestamps → SubtitleSegment[]
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__ = __turbopack_context__.i("[externals]/@huggingface/transformers [external] (@huggingface/transformers, esm_import, [project]/node_modules/@huggingface/transformers)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$wavefile__$5b$external$5d$__$28$wavefile$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$wavefile$29$__ = __turbopack_context__.i("[externals]/wavefile [external] (wavefile, cjs, [project]/node_modules/wavefile)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/transcription/types.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// ─── Configure transformers.js for server-side Node.js ────────────────────
// Prevent the library from trying to use browser-only APIs
__TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__["env"].useBrowserCache = false;
__TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__["env"].allowLocalModels = false; // always fetch from HuggingFace hub
// v4 otherwise defaults cacheDir to node_modules/@huggingface/transformers/.cache,
// which is neither writable-by-default nor persistent. Point it at a real path
// (e.g. a mounted Docker volume) so the model is downloaded only once.
if (process.env.WHISPER_CACHE_DIR) {
    __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__["env"].cacheDir = process.env.WHISPER_CACHE_DIR;
}
let _pipelinePromise = null;
let _loadedModelId = null;
/**
 * Lazily load (and cache) the ASR pipeline.
 * The first call downloads the model; subsequent calls reuse it.
 */ async function getOrCreatePipeline(modelId) {
    // If model changed, reset
    if (_loadedModelId && _loadedModelId !== modelId) {
        _pipelinePromise = null;
        _loadedModelId = null;
    }
    if (!_pipelinePromise) {
        console.log(`[whisper] Loading model "${modelId}" (first-time download may take a few minutes)...`);
        _loadedModelId = modelId;
        _pipelinePromise = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$huggingface$2f$transformers$29$__["pipeline"])('automatic-speech-recognition', modelId, {
            // Use int8 (q8) ONNX model for faster inference + smaller download.
            // NOTE: v3+ replaced the old `quantized: true` option with `dtype`.
            dtype: 'q8'
        });
    }
    return _pipelinePromise;
}
// ─── WAV audio decoder ────────────────────────────────────────────────────
/**
 * Read a WAV file and return its samples as a Float32Array at 16 kHz.
 *
 * FFmpeg has already output 16 kHz mono PCM, but we use wavefile to
 * robustly decode the RIFF header and handle edge cases.
 */ function decodeWavFile(filePath) {
    const buffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath);
    const wav = new __TURBOPACK__imported__module__$5b$externals$5d2f$wavefile__$5b$external$5d$__$28$wavefile$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$wavefile$29$__["WaveFile"](buffer);
    // Normalize to 32-bit float and 16 kHz (Whisper requirement)
    wav.toBitDepth('32f');
    wav.toSampleRate(16000);
    // getSamples() returns a Float64Array (not an Array, not a Float32Array),
    // so convert explicitly — Whisper's feature extractor expects float32.
    const raw = wav.getSamples();
    const samples = Float32Array.from(raw);
    return samples;
}
class LocalWhisperService {
    modelId;
    constructor(modelId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_WHISPER_MODEL"]){
        this.modelId = modelId;
    }
    async transcribe(audioPath) {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(audioPath)) {
            throw new Error(`Audio file not found: ${audioPath}`);
        }
        // 1. Load model (cached after first run)
        const transcriber = await getOrCreatePipeline(this.modelId);
        // 2. Decode WAV → Float32Array
        let audioSamples;
        try {
            audioSamples = decodeWavFile(audioPath);
        } catch (err) {
            throw new Error(`Failed to decode audio file: ${err.message}`);
        }
        if (audioSamples.length === 0) {
            throw new Error('Audio file is empty or contains no samples');
        }
        console.log(`[whisper] Transcribing ${(audioSamples.length / 16000).toFixed(1)}s of audio with model "${this.modelId}"...`);
        // 3. Run transcription with timestamp chunks
        let output;
        try {
            output = await transcriber(audioSamples, {
                return_timestamps: true,
                chunk_length_s: 30,
                task: 'transcribe'
            });
        } catch (err) {
            console.warn(`[whisper] Timestamp extraction failed (${err.message}), retrying without chunking...`);
            output = await transcriber(audioSamples, {
                task: 'transcribe'
            });
        }
        console.log(`[whisper] Transcription complete. Segments: ${output.chunks?.length ?? 0}`);
        // 4. Normalize output into SubtitleSegment[]
        const segments = this.normalizeSegments(output);
        return {
            segments,
            language: undefined,
            duration: audioSamples.length / 16000
        };
    }
    normalizeSegments(output) {
        if (!output.chunks || output.chunks.length === 0) {
            if (output.text?.trim()) {
                const cleaned = sanitizeText(output.text.trim());
                if (cleaned) {
                    return this.splitTextIntoPhraseSegments(cleaned, 0, 30);
                }
            }
            return [];
        }
        const validChunks = output.chunks.map((c)=>({
                ...c,
                cleanText: sanitizeText(c.text || '')
            })).filter((c)=>c.cleanText.length > 0 && !isHallucinated(c.cleanText));
        const result = [];
        validChunks.forEach((chunk, i)=>{
            const start = Math.max(0, chunk.timestamp[0] ?? 0);
            let end = chunk.timestamp[1];
            if (end === null || end === undefined || end <= start) {
                if (i < validChunks.length - 1 && validChunks[i + 1].timestamp[0] !== null && validChunks[i + 1].timestamp[0] > start) {
                    end = validChunks[i + 1].timestamp[0];
                } else {
                    const wordCount = chunk.cleanText.split(/\s+/).length;
                    end = start + Math.max(1.5, wordCount * 0.35);
                }
            }
            const phraseSegments = this.splitTextIntoPhraseSegments(chunk.cleanText, start, end);
            result.push(...phraseSegments);
        });
        // Deduplicate consecutive identical segments
        const finalSegments = [];
        result.forEach((seg)=>{
            if (finalSegments.length > 0 && finalSegments[finalSegments.length - 1].text.toLowerCase() === seg.text.toLowerCase()) {
                // Extend the previous segment's end time instead of adding duplicate text
                finalSegments[finalSegments.length - 1].end = seg.end;
            } else {
                finalSegments.push(seg);
            }
        });
        return finalSegments.map((seg, idx)=>({
                ...seg,
                id: `sub-${idx + 1}`
            }));
    }
    splitTextIntoPhraseSegments(fullText, startTime, endTime) {
        const cleaned = sanitizeText(fullText);
        if (!cleaned || isHallucinated(cleaned)) return [];
        const totalDuration = Math.max(0.2, endTime - startTime);
        const words = cleaned.split(/\s+/).filter(Boolean);
        if (words.length === 0) return [];
        // If chunk is short (<= 7 words and <= 3.5s), keep as single segment
        if (words.length <= 7 && totalDuration <= 3.5) {
            return [
                {
                    id: '',
                    start: Number(startTime.toFixed(3)),
                    end: Number(endTime.toFixed(3)),
                    text: words.join(' ')
                }
            ];
        }
        // Split text into phrase groups by punctuation or max word count (5-7 words)
        const phrases = [];
        let currentWords = [];
        for(let i = 0; i < words.length; i++){
            const word = words[i];
            currentWords.push(word);
            const hasPunctuation = /[,.?!;:]$/.test(word);
            if (currentWords.length >= 7 || hasPunctuation && currentWords.length >= 3 || i === words.length - 1) {
                phrases.push(currentWords.join(' '));
                currentWords = [];
            }
        }
        if (currentWords.length > 0) {
            if (phrases.length > 0) {
                phrases[phrases.length - 1] += ' ' + currentWords.join(' ');
            } else {
                phrases.push(currentWords.join(' '));
            }
        }
        const totalCharCount = words.join('').length || 1;
        let currentStart = startTime;
        return phrases.map((phrase, idx)=>{
            const phraseCharCount = phrase.replace(/\s+/g, '').length;
            const phraseDuration = phraseCharCount / totalCharCount * totalDuration;
            const isLast = idx === phrases.length - 1;
            const subEnd = isLast ? endTime : Math.min(endTime - 0.05, currentStart + phraseDuration);
            const segment = {
                id: '',
                start: Number(currentStart.toFixed(3)),
                end: Number(Math.max(currentStart + 0.1, subEnd).toFixed(3)),
                text: phrase
            };
            currentStart = subEnd;
            return segment;
        });
    }
}
/**
 * Remove repeated hallucinated tokens (e.g., "R R R R R", "RRRRRRR.", ". . . .")
 */ function sanitizeText(text) {
    let cleaned = text.trim();
    // Remove trailing or leading repeated single/double letter words e.g. "Sunday evening, R R R R R." -> "Sunday evening,"
    cleaned = cleaned.replace(/(\b[A-Za-z]{1,2}\b[.,!?]?\s+){2,}\b[A-Za-z]{1,2}\b[.,!?]?/gi, '').trim();
    // Remove repeating single character runs like "RRRRRRR" or "RRRRRRR."
    cleaned = cleaned.replace(/\b([a-zA-Z0-9])\1{2,}\b[.,!?]?/gi, '').trim();
    // Remove standalone non-alphanumeric symbols
    cleaned = cleaned.replace(/^[^a-zA-Z0-9\s]+$/g, '').trim();
    return cleaned;
}
/**
 * Check if text is a Whisper hallucination (e.g. repeated token loop, non-speech noise)
 */ function isHallucinated(text) {
    const trimmed = text.trim();
    if (!trimmed) return true;
    // Strip punctuation to evaluate core alphanumeric content
    const alphaOnly = trimmed.replace(/[^a-zA-Z0-9]/g, '');
    if (!alphaOnly || alphaOnly.length < 2) return true;
    // 1. Repeating single character pattern e.g. "RRRRRRR", "R R R R R"
    if (/^([a-zA-Z0-9])\1+$/i.test(alphaOnly)) {
        return true;
    }
    // 2. Repeating short n-gram pattern e.g. "ababab", "xyzxyzxyz"
    if (/^(.{1,4})\1{2,}$/i.test(alphaOnly)) {
        return true;
    }
    // 3. High ratio of identical words / letters
    const words = trimmed.split(/\s+/).map((w)=>w.replace(/[^a-zA-Z0-9]/g, '')).filter(Boolean);
    if (words.length > 0) {
        const firstWord = words[0].toUpperCase();
        const identicalCount = words.filter((w)=>w.toUpperCase() === firstWord).length;
        if (identicalCount / words.length >= 0.5 && firstWord.length <= 3) {
            return true;
        }
    }
    // 4. Common Whisper silence/noise/outro hallucinations
    const lower = trimmed.toLowerCase();
    if (lower.includes('subtitles by') || lower.includes('amara.org') || lower.includes('thank you for watching') || lower.includes('subscribe') || /^\[.*\]$/.test(lower) || /^\(.*\)$/.test(lower) || lower === 'you' || lower === 'bye' || lower === 'thanks') {
        return true;
    }
    return false;
}
// ─── Factory ──────────────────────────────────────────────────────────────
/**
 * Resolve model ID from environment.
 *
 * WHISPER_MODEL env var accepts:
 *   - A full HuggingFace model ID:  "Xenova/whisper-small"
 *   - A short alias:                "tiny" | "base" | "small" | "medium" | "large"
 *
 * Defaults to "Xenova/whisper-base" — good balance of speed and accuracy.
 */ function resolveModelId() {
    const raw = process.env.WHISPER_MODEL?.trim();
    if (!raw) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$transcription$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_WHISPER_MODEL"];
    // Short alias → full model ID
    const aliases = {
        tiny: 'Xenova/whisper-tiny',
        base: 'Xenova/whisper-base',
        small: 'Xenova/whisper-small',
        medium: 'Xenova/whisper-medium',
        large: 'Xenova/whisper-large',
        // English-only variants (faster)
        'tiny.en': 'Xenova/whisper-tiny.en',
        'base.en': 'Xenova/whisper-base.en',
        'small.en': 'Xenova/whisper-small.en',
        'medium.en': 'Xenova/whisper-medium.en'
    };
    return aliases[raw] ?? raw;
}
function createTranscriptionService() {
    const modelId = resolveModelId();
    return new LocalWhisperService(modelId);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/utils/tempFiles.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TEMP_DIRS",
    ()=>TEMP_DIRS,
    "ensureTempDirs",
    ()=>ensureTempDirs,
    "safeUnlink",
    ()=>safeUnlink,
    "sanitizeFilename",
    ()=>sanitizeFilename
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const BASE_DIR = process.env.TEMP_DIR ?? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), 'captionflow');
const TEMP_DIRS = {
    uploads: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_DIR, 'uploads'),
    audio: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_DIR, 'audio'),
    subtitles: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_DIR, 'subtitles'),
    output: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_DIR, 'output')
};
function ensureTempDirs() {
    Object.values(TEMP_DIRS).forEach((dir)=>{
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(dir, {
            recursive: true
        });
    });
}
function safeUnlink(filePath) {
    try {
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(filePath);
        }
    } catch  {
    // Ignore cleanup errors
    }
}
function sanitizeFilename(name) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0dx6ntn._.js.map