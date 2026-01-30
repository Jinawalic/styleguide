import React, { useState } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
    Search01Icon as Search,
    SentIcon as Send,
    Settings01Icon as Settings,
    Notification01Icon as Bell,
    CheckmarkCircle01Icon as CheckCircle,
    Alert01Icon as AlertTriangle,
    Cancel01Icon as XOctagon,
    InformationCircleIcon as Info,
    Loading03Icon as Loader2,
    ViewIcon as Eye,
    ViewOffIcon as EyeOff,
    ArrowRight01Icon as ChevronRight,
    ArrowRight02Icon as ArrowRight,
    PlusSignIcon as Plus,
    // Delete02Icon as Trash2,
    Copy01Icon as Copy,
    MoreVerticalIcon as MoreVertical,
    Cancel01Icon as X,
    Home01Icon as Home,
    PaintBrush01Icon as Colors,
    TextFontIcon as Typography,
    DashboardSquareIcon as Layout,
    PackageIcon as Atoms,
    Image02Icon as Icons,
    // Mic01Icon as Voice,
    MotionIcon as Motion,
    Mail01Icon as Mail,
    UserIcon as User,
    AccessIcon as Lock,
    CodeIcon as Code,
    KanbanIcon as Kanban,
    TextNumberSignIcon as Hash,
    Comment01Icon as MessageSquare,
    Attachment01Icon as Attachment,
    SmileIcon as Smile,
    // MoreHorizontalIcon as MoreHorizontal,
    UserGroupIcon as Team,
    // Tick01Icon as Checkmark,
    // Calendar01Icon as Calendar,
    // PencilEdit01Icon as Edit
} from '@hugeicons/core-free-icons';

// --- PILLAR 1: COLOR ARCHITECTURE ---
const colors = {
    brand: [
        { name: 'Ekonty Brand', tailwind: 'brand', role: 'Primary Brand Color' },
        { name: 'Brand Surface', tailwind: 'brand-custom', role: 'Secondary / Surface Color' },
    ],
    semantic: [
        { name: 'Success', tailwind: 'success', role: 'Positive actions, confirmations' },
        { name: 'Warning', tailwind: 'warning', role: 'Cautions, pending states' },
        { name: 'Danger', tailwind: 'danger', role: 'Errors, destructive actions' },
        { name: 'Info', tailwind: 'info', role: 'Informational messages' },
    ],
    neutrals: [
        { label: '50', tailwind: 'slate-50' },
        { label: '100', tailwind: 'slate-100' },
        { label: '200', tailwind: 'slate-200' },
        { label: '300', tailwind: 'slate-300' },
        { label: '400', tailwind: 'slate-400' },
        { label: '500', tailwind: 'slate-500' },
        { label: '600', tailwind: 'slate-600' },
        { label: '700', tailwind: 'slate-700' },
        { label: '800', tailwind: 'slate-800' },
        { label: '900', tailwind: 'slate-900' },
    ]
};

const CodeBlock = ({ code, onClose }: { code: string, onClose?: () => void, language?: string }) => {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const highlightCode = (source: string) => {
        // Simple VSCode-like syntax highlighting
        const highlighted = source
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/\b(import|from|const|return|export|default|function|interface|type)\b/g, '<span class="text-purple-400">$1</span>') // Keywords (Purple)
            .replace(/\b(React|useState|useEffect)\b/g, '<span class="text-emerald-400">$1</span>') // React Hooks_Classes (Teal)
            .replace(/([a-zA-Z0-9_-]+)=/g, '$1</span>=') // Props (Light Blue)
            .replace(/("[^"]*")/g, '<span class="text-orange-300">$1</span>') // Strings (Orange/Brown)
            .replace(/'([^']*)'/g, '<span class="text-orange-300">$1</span>') // Strings Single Quote
            .replace(/&lt;([A-Z][a-zA-Z0-9]*)/g, '&lt;<span class="text-emerald-400">$1</span>') // Component Open (Teal)
            .replace(/&lt;\/([A-Z][a-zA-Z0-9]*)/g, '&lt;/<span class="text-emerald-400">$1</span>') // Component Close
            .replace(/(\/\/[^\n]*)/g, '<span class="text-green-600">$1</span>'); // Comments (Green)

        return highlighted;
    };

    // Check if code is long (more than 10 lines)
    const codeLines = code.split('\n');
    const isLongCode = codeLines.length > 10;
    const previewLines = codeLines.slice(0, 10).join('\n');
    const displayCode = isExpanded || !isLongCode ? code : previewLines;

    return (
        <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl font-mono text-sm bg-zinc-900 text-zinc-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-slate-700/50">
                <span className="text-xs font-medium text-slate-400">Example Usage</span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors group"
                    >
                        {copied ? (
                            <>
                                <HugeiconsIcon icon={CheckCircle} size={14} className="text-emerald-400" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <HugeiconsIcon icon={Copy} size={14} />
                                <span className="group-hover:underline decoration-slate-500 underline-offset-4">Copy code</span>
                            </>
                        )}
                    </button>
                    {onClose && (
                        <div className="w-px h-3 bg-slate-700 mx-1"></div>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors"
                            title="Close"
                        >
                            <HugeiconsIcon icon={X} size={16} />
                        </button>
                    )}
                </div>
            </div>
            {/* Code Area */}
            <div className="p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(displayCode) }} />
                </pre>
            </div>
            {/* Show More/Less Button */}
            {isLongCode && (
                <div className="border-t border-slate-700/50 bg-zinc-800">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full px-4 py-3 text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"
                    >
                        <span className="uppercase tracking-wider">{isExpanded ? 'Show Less' : 'Show More'}</span>
                        <HugeiconsIcon
                            icon={ChevronRight}
                            size={14}
                            className={`transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

const CodeSnippetModal = ({ data, onClose }: { data: { title: string, code: string } | null, onClose: () => void }) => {
    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
            <div className="w-full max-w-lg relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="bg-zinc-900 px-4 py-3 rounded-t-xl border-b border-white/5 flex justify-between items-center text-white">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{data.title}</span>
                </div>
                <CodeBlock code={data.code} onClose={onClose} />
            </div>
        </div>
    );
};

const ColorPalette = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    return (
        <div className="space-y-8">
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold font-heading">Brand Palette</h3>
                    <button onClick={() => onViewDetail('colors-brand')} className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                        <HugeiconsIcon icon={Code} size={14} />
                        View Code
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {colors.brand.map((color) => (
                        <div
                            key={color.tailwind}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
                        >
                            <div className={`w-full h-24 rounded-xl mb-3 shadow-inner group-hover:ring-4 ring-brand/5 transition-all bg-${color.tailwind}`}></div>
                            <p className="font-bold text-slate-800">{color.name}</p>
                            <p className="text-sm text-slate-500 uppercase">{color.tailwind}</p>
                            <p className="text-xs text-slate-400 mt-2 text-center">{color.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold font-heading">Semantic Colors</h3>
                    <button onClick={() => onViewDetail('colors-semantic')} className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                        <HugeiconsIcon icon={Code} size={14} />
                        View Code
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colors.semantic.map((color) => (
                        <div
                            key={color.name}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
                        >
                            <div className={`w-full h-20 rounded-xl mb-3 shadow-inner group-hover:ring-4 ring-brand/5 transition-all bg-${color.tailwind}`}></div>
                            <p className="font-bold text-slate-800">{color.name}</p>
                            <p className="text-sm text-slate-500 uppercase">{color.tailwind}</p>
                            <p className="text-xs text-slate-400 mt-2 text-center">{color.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold font-heading">Neutral Palette (Slate)</h3>
                    <button onClick={() => onViewDetail('colors-neutral')} className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                        <HugeiconsIcon icon={Code} size={14} />
                        View Code
                    </button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                        {colors.neutrals.map((shade) => (
                            <div
                                key={shade.label}
                                className="flex flex-col items-center group"
                            >
                                <div
                                    className={`w-full h-12 rounded-lg mb-2 border border-slate-200 group-hover:scale-110 group-hover:shadow-md transition-all duration-200 bg-${shade.tailwind}`}
                                ></div>
                                <span className="text-[10px] font-bold text-slate-600 group-hover:text-brand transition-colors">{shade.label}</span>
                                <span className="text-[8px] text-slate-400 uppercase">{shade.tailwind}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- PILLAR 2: TYPOGRAPHY HIERARCHY ---
const typography = [
    { name: 'Display', size: '38px', weight: '500', family: 'Inter', class: 'text-4xl  leading-tight font-heading' },
    { name: 'Heading 1', size: '26px', weight: '500', family: 'Inter', class: 'text-3xl  leading-tight font-heading' },
    { name: 'Heading 2', size: '20px', weight: '500', family: 'Inter', class: 'text-2xl  leading-snug font-heading' },
    { name: 'Heading 3', size: '16px', weight: '500', family: 'Inter', class: 'text-xl  leading-snug font-heading' },
    { name: 'Body Text', size: '16px', weight: '400', family: 'Roboto', class: 'text-base font-normal leading-relaxed font-body' },
    { name: 'Caption', size: '12px', weight: '500', family: 'Roboto', class: 'text-xs font-medium leading-none font-body uppercase tracking-wider' },
];

const TypographyScale = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type Scale</span>
                <button onClick={() => onViewDetail('typography')} className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                    <HugeiconsIcon icon={Code} size={14} />
                    View Code
                </button>
            </div>
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Style</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preview</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specs</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {typography.map((style) => (
                        <tr key={style.name} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 align-top">
                                <span className="text-sm text-slate-700">{style.name}</span>
                            </td>
                            <td className="p-4">
                                <div className={style.class}>The quick brown fox jumps over the lazy dog</div>
                            </td>
                            <td className="p-4 align-top">
                                <div className="text-[10px] space-y-1 text-slate-500">
                                    <p><span className="font-bold">Size:</span> {style.size}</p>
                                    <p><span className="font-bold">Weight:</span> {style.weight}</p>
                                    <p><span className="font-bold">Family:</span> {style.family}</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- PILLAR 3: GRID & LAYOUT ---
const spacing = [4, 8, 16, 24, 32, 48, 64];

const GridLayoutSystem = ({ onShowCode }: { onShowCode: (title: string, code: string) => void }) => (
    <div className="space-y-12">
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold font-heading">Spacing Scale (4px Base)</h3>
                <button
                    onClick={() => onShowCode('Spacing System', `<!-- Spacing Scale Usage -->\n<div className="space-y-4"> <!-- 16px -->\n  <div className="p-8"> <!-- 32px -->\n    <div className="m-2"> <!-- 8px -->\n    </div>\n  </div>\n</div>`)}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    View Code
                </button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-6 items-end">
                {spacing.map((unit) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="bg-emerald-800 rounded shadow-sm mb-2" style={{ width: unit, height: unit }}></div>
                        <span className="text-xs font-bold text-slate-600">{unit}px</span>
                        <span className="text-[10px] text-slate-400">Unit {unit / 4}</span>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold font-heading">Container Max-Widths</h3>
                <button
                    onClick={() => onShowCode('Responsive Container', `<div className="w-full md:max-w-[720px] lg:max-w-[1200px] mx-auto px-4">\n  <div className="bg-slate-100 p-8 rounded-2xl text-center">\n      Content Area\n  </div>\n</div>`)}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    View Code
                </button>
            </div>
            <div className="space-y-4">
                {[
                    { label: 'Mobile', width: '100%', pixels: 'Fluid' },
                    { label: 'Tablet', width: '720px', pixels: '720px' },
                    { label: 'Desktop', width: '1200px', pixels: '1200px' }
                ].map((container) => (
                    <div key={container.label} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-700">{container.label}</span>
                            <span className="text-xs text-slate-400">{container.pixels}</span>
                        </div>
                        <div className="bg-slate-50 h-8 rounded-lg overflow-hidden border border-dashed border-slate-200 relative group transition-colors">
                            <div
                                className="bg-emerald-800/10 h-full border-x border-emerald-800/20 flex items-center justify-center transition-all duration-500"
                                style={{ width: container.label === 'Mobile' ? '100%' : container.width, margin: '0 auto' }}
                            >
                                <span className="text-[10px] font-bold text-emerald-800">{container.width}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// --- PILLAR 4: COMPONENT LIBRARY (ATOMS) ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'xl' | 'full';
    isLoading?: boolean;
    icon?: IconSvgElement;
    fullWidth?: boolean;
}

const Button = ({ variant = 'primary', size = 'md', rounded = 'xl', children, isLoading = false, icon: Icon, fullWidth = false, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-brand text-white shadow-sm hover:bg-brand/90 hover:shadow-md focus-visible:ring-brand",
        secondary: "bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 focus-visible:ring-slate-400",
        outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-200",
        icon: "p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 focus-visible:ring-slate-400",
        warning: "bg-warning text-white shadow-sm hover:bg-warning/90 hover:shadow-md focus-visible:ring-warning"
    };

    const roundedStyles = {
        xl: "rounded-xl",
        full: "rounded-full"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base"
    };

    return (
        <button
            className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${variant !== 'icon' ? sizes[size] : ''} 
        ${variant !== 'icon' ? roundedStyles[rounded] : ''}
        ${fullWidth ? 'w-full' : ''}
`}
            {...props}
        >
            {isLoading ? (
                <HugeiconsIcon icon={Loader2} className="w-5 h-5 animate-spin mr-2" />
            ) : Icon && variant !== 'icon' ? (
                <HugeiconsIcon icon={Icon} className="w-5 h-5 mr-2" />
            ) : null}

            {variant === 'icon' && Icon ? <HugeiconsIcon icon={Icon} className="w-5 h-5" /> : children}
        </button>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: IconSvgElement;
}

const Input = ({ label, placeholder, type = 'text', error, icon: Icon, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-sm font-bold text-slate-700 font-body">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand">
                        <HugeiconsIcon icon={Icon} size={14} />
                    </div>
                )}
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`
                        w-full bg-white border-2 rounded-xl py-2 transition-all outline-none font-body text-sm
                        ${Icon ? 'pl-11 pr-4' : 'px-4'}
                        ${error ? 'border-danger focus:ring-4 focus:ring-danger/10' : 'border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/10'}
                        placeholder:text-slate-400
                    `}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none"
                    >
                        {showPassword ? <HugeiconsIcon icon={EyeOff} size={16} /> : <HugeiconsIcon icon={Eye} size={16} />}
                    </button>
                )}
            </div>
            {error && <p className="text-xs font-medium text-danger">{error}</p>}
        </div>
    );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    icon?: IconSvgElement;
}

const Select = ({ label, error, icon: Icon, children, ...props }: SelectProps) => (
    <div className="space-y-1.5 w-full">
        {label && <label className="text-sm font-bold text-slate-700 font-body">{label}</label>}
        <div className="relative group">
            {Icon && (
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand">
                    <HugeiconsIcon icon={Icon} size={14} />
                </div>
            )}
            <select
                className={`
                w-full bg-white border-2 rounded-xl py-2 transition-all outline-none font-body text-sm appearance-none
                ${Icon ? 'pl-11 pr-10' : 'px-4 pr-10'}
                ${error ? 'border-danger focus:ring-4 focus:ring-danger/10' : 'border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/10'}
            `}
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <HugeiconsIcon icon={ChevronRight} size={14} className="rotate-90" />
            </div>
        </div>
        {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = ({ label, error, ...props }: TextareaProps) => (
    <div className="space-y-1.5 w-full">
        {label && <label className="text-sm font-bold text-slate-700 font-body">{label}</label>}
        <textarea
            className={`
                w-full bg-white border-2 rounded-xl py-2 px-4 transition-all outline-none font-body text-sm min-h-[100px]
                ${error ? 'border-danger focus:ring-4 focus:ring-danger/10' : 'border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/10'}
                placeholder:text-slate-400
            `}
            {...props}
        />
        {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
        <div className="relative flex items-center justify-center">
            <input
                type="checkbox"
                className="peer sr-only"
                {...props}
            />
            <div className="w-5 h-5 border-2 border-slate-200 rounded-md transition-all peer-checked:bg-brand peer-checked:border-brand group-hover:border-brand/50"></div>
            <div className="absolute text-white transition-opacity opacity-0 peer-checked:opacity-100 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
        </div>
        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">{label}</span>
    </label>
);

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: 'brand' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

const Toggle = ({ label, variant = 'brand', ...props }: ToggleProps) => {
    const variantColors = {
        brand: 'peer-checked:bg-brand',
        secondary: 'peer-checked:bg-slate-600',
        success: 'peer-checked:bg-success',
        warning: 'peer-checked:bg-warning',
        danger: 'peer-checked:bg-danger',
        info: 'peer-checked:bg-info'
    };

    return (
        <label className="inline-flex items-center cursor-pointer group select-none">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    {...props}
                />
                <div className={`w-11 h-6 bg-slate-200 rounded-full transition-colors ${variantColors[variant]}`}></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
            </div>
            {label && <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px] font-body">{label}</span>}
        </label>
    );
};

interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    children: React.ReactNode;
    onClose?: () => void;
}

const Alert = ({ variant = 'info', title, children, onClose }: AlertProps) => {
    const styles = {
        info: { bg: 'bg-info/10', border: 'border-info/20', text: 'text-info', icon: Info },
        success: { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success', icon: CheckCircle },
        warning: { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning', icon: AlertTriangle },
        danger: { bg: 'bg-danger/10', border: 'border-danger/20', text: 'text-danger', icon: XOctagon },
    };

    const { bg, border, text, icon: Icon } = styles[variant as keyof typeof styles];

    return (
        <div className={`flex items-start p-4 rounded-xl border ${bg} ${border} transition-all duration-300 animate-in fade-in slide-in-from-top-2`}>
            <HugeiconsIcon icon={Icon} className={`w-5 h-5 ${text} mt-0.5 mr-3 shrink-0`} />
            <div className="flex-1">
                {title && <h4 className={`text-sm font-bold ${text} mb-1`}>{title}</h4>}
                <div className="text-sm text-slate-600 font-body">{children}</div>
            </div>
            {onClose && (
                <button onClick={onClose} className="ml-3 text-slate-400 hover:text-slate-600">
                    <HugeiconsIcon icon={X} size={16} />
                </button>
            )}
        </div>
    );
};

// --- PILLAR 5: ICONOGRAPHY & IMAGERY ---
interface MediaPlaceholderProps {
    title?: string;
}

const MediaPlaceholder = ({ title = "Media Preview" }: MediaPlaceholderProps) => (
    <div className="aspect-[3/4] w-[300px] h-[300px] w-full max-w-[280px] rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative group">
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300"></div>
        <div className="p-2 bg-white rounded-full shadow-sm mb-3">
            <HugeiconsIcon icon={Plus} size={16} className="text-slate-400" />
        </div>
        <span className="text-sm font-bold opacity-70 uppercase tracking-widest">{title}</span>
        <span className="text-[10px] mt-1">3:4 Aspect Ratio</span>
    </div>
);

// --- PILLAR 6: VOICE & TONE ---
const CardShowcase = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-3 mb-2 flex justify-between items-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Examples</h4>
            <button onClick={() => onViewDetail('cards')} className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                View Code
            </button>
        </div>

        {/* Text-Only Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group cursor-default">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    Product Update
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 font-heading leading-tight italic">Empowering Marketplace Operations</h4>
                <p className="text-slate-600 text-xs font-body leading-relaxed mb-8 opacity-80">
                    Modern tools for a new generation of sellers, bridging the gap between complexity and elegance.
                </p>
            </div>
            <button className="text-emerald-800 text-xs font-black inline-flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                Learn more
                <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
        </div>

        {/* Image + Text Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-default">
            <div className="h-44 w-full overflow-hidden relative">
                <div className="w-full h-full bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-1000"></div>
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-800 shadow-lg uppercase tracking-widest border border-white">New Arrival</span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-slate-900 font-heading leading-tight">Vibrant Listing Styles</h4>
                    <span className="text-emerald-800 font-extrabold text-sm">$299.00</span>
                </div>
                <p className="text-slate-500 text-[11px] font-body mb-6 leading-relaxed italic opacity-80 line-clamp-2">
                    Premium handcrafted marketplace assets designed for maximum conversion.
                </p>
                <div className="flex items-center gap-2">
                    <button className="flex-1 py-2.5 bg-emerald-800 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95 uppercase tracking-widest">Buy Now</button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-800 hover:bg-emerald-50 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group cursor-default">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-800/10 p-1 relative">
                    <div className="w-full h-full rounded-full bg-slate-200 animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-base leading-tight font-heading italic">Sarah David</h4>
                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">Verified Seller</p>
                </div>
            </div>
            <p className="text-slate-500 text-xs font-body leading-relaxed mb-6 border-l-2 border-slate-50 pl-4 italic opacity-80">
                "Ekonty has completely transformed how I manage my boutique operations."
            </p>
            <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-slate-50 text-slate-600 text-[9px] font-bold rounded-lg hover:bg-slate-100 transition-colors uppercase tracking-widest">Message</button>
                <button className="flex-1 px-3 py-2 bg-emerald-800 text-white text-[9px] font-bold rounded-lg hover:bg-emerald-700 transition-all uppercase tracking-widest">Profile</button>
            </div>
        </div>
    </div>
);

// --- PILLAR 7: INTERACTION & MOTION ---
const InteractionShowcase = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="absolute top-4 right-4">
                <button onClick={() => onViewDetail('interactions')} className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                    <HugeiconsIcon icon={Code} size={14} />
                    View Code
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4">
                <div className="space-y-3 cursor-default group">
                    <p className="text-xs font-bold text-slate-400 uppercase">Hover Effect</p>
                    <div className="h-20 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center hover:bg-brand hover:text-white hover:scale-105 transition-all duration-300 group-hover:border-transparent">
                        <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">Hover Me</span>
                    </div>
                </div>

                <div className="space-y-3 cursor-default group">
                    <p className="text-xs font-bold text-slate-400 uppercase">Active State</p>
                    <div className="h-20 w-full rounded-xl flex items-center justify-center cursor-pointer select-none transition-all duration-100 shadow-sm bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95">
                        <span className="text-sm font-bold">Click Me</span>
                    </div>
                </div>

                <div className="space-y-3 cursor-default group">
                    <p className="text-xs font-bold text-slate-400 uppercase">Focus State</p>
                    <button className="h-20 w-full bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:border-brand transition-all">
                        <span className="text-sm font-bold text-slate-600">Tab to Focus</span>
                    </button>
                </div>

                <div className="space-y-3 cursor-default group">
                    <p className="text-xs font-bold text-slate-400 uppercase">Motion (Scale)</p>
                    <div className="h-20 w-full bg-success/10 border border-success/20 rounded-xl flex items-center justify-center group hover:rotate-2 transition-transform duration-300">
                        <HugeiconsIcon icon={CheckCircle} size={32} className="text-success group-hover:scale-125 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT DETAIL VIEW ---
interface ComponentExample {
    title: string;
    description?: string;
    preview: React.ReactNode;
    code: string;
}

const ComponentDetailView = ({
    title,
    examples,
    onBack
}: {
    title: string,
    examples: ComponentExample[],
    onBack: () => void
}) => {
    return (
        <div className="animate-in fade-in slide-in-from-right duration-300">
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
                <HugeiconsIcon icon={ChevronRight} size={18} className="rotate-180" />
                Back to Components
            </button>

            <h2 className="text-3xl font-bold text-slate-900 font-heading mb-8">{title}</h2>

            <div className="space-y-12">
                {examples.map((example, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                            <h4 className="font-bold text-slate-700">{example.title}</h4>
                            {example.description && <p className="text-sm text-slate-500 mt-1">{example.description}</p>}
                        </div>
                        <div className="p-8 flex justify-center items-center bg-slate-50 border-b border-slate-100 min-h-[160px] overflow-x-auto">
                            {example.preview}
                        </div>
                        <div className="bg-zinc-900">
                            <CodeBlock code={example.code} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- PILLAR 8: TEAM COLLABORATION ---
const KanbanColumn = ({ title, count, children, onAddTask }: { title: string, count: number, children: React.ReactNode, onAddTask: () => void }) => (
    <div className="flex flex-col h-full min-w-[280px] w-80 bg-slate-50 rounded-2xl p-4 border border-slate-100 group/column">
        <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="font-bold text-slate-700 text-sm">{title}</h4>
            <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100 shadow-sm">{count}</span>
        </div>
        <div className="flex-1 space-y-3 pr-1">
            {children}
        </div>
        <div className="opacity-0 group-[&:has(.task-card:hover)]:opacity-100 hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={onAddTask}
                className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-brand hover:bg-white rounded-xl transition-all text-sm font-bold border border-transparent hover:border-slate-100 hover:shadow-sm"
            >
                <HugeiconsIcon icon={Plus} size={16} />
                <span>Add Task</span>
            </button>
        </div>
    </div>
);

const TaskCard = ({ title }: { title: string }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [notificationText, setNotificationText] = useState("set user notification");

    return (
        <div className="bg-white p-4 rounded-xl w-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer task-card">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-1 min-w-0 flex-1">
                    {isEditing ? (
                        <input
                            autoFocus
                            className="bg-transparent border-b border-emerald-500 outline-none text-[10px] font-bold capitalize tracking-wider text-slate-500 w-full"
                            value={notificationText}
                            onChange={(e) => setNotificationText(e.target.value)}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                        />
                    ) : (
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                            <span className="truncate text-[10px] font-bold capitalize tracking-wider text-slate-400">
                                {notificationText}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                    className="w-4 h-4 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-sm text-slate-400 hover:text-emerald-600"
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button className="text-slate-300 hover:text-slate-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                    </svg>
                </button>
            </div>

            {/* Title / Surface */}
            <div className="rounded-sm mb-3">
                <h5 className="bg-emerald-50 font-bold text-slate-600 text-sm leading-snug p-1 rounded-sm">
                    {title}
                </h5>
            </div>

            {/* Date */}
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100/50 rounded-full mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-[10px] font-bold text-slate-500">
                    Jan 30, 2026
                </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-4 h-4 flex items-center justify-center bg-emerald-100 border border-emerald-200 rounded-sm text-emerald-600">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-bold">SAM1-6</span>
                </div>

                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const KanbanBoard = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    return (
        <div className="h-[600px] w-full bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand/10 rounded-lg text-brand">
                        <HugeiconsIcon icon={Kanban} size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 leading-tight">Sprint Board</h3>
                        <p className="text-slate-500 text-xs">Ekonty Marketplace v2.0</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetail('kanban')}
                        icon={Code}
                    >
                        View Code
                    </Button>
                    <Button variant="primary" size="sm" icon={Plus}>New Sprint</Button>
                </div>
            </div>
            <div className="flex-1 overflow-x-auto p-6 bg-slate-50/50">
                <div className="flex gap-6 h-full">
                    <KanbanColumn title="Backlog" count={12} onAddTask={() => { }}>
                        <TaskCard title="Refactor Navigation" />
                        <TaskCard title="Update Color Palette Tokens" />
                        <TaskCard title="Fix Mobile Menu Glitch" />
                    </KanbanColumn>
                    <KanbanColumn title="In Progress" count={4} onAddTask={() => { }}>
                        <TaskCard title="Integrate Hugeicons Library" />
                        <TaskCard title="System Documentation" />
                    </KanbanColumn>
                    <KanbanColumn title="Completed" count={28} onAddTask={() => { }}>
                        <TaskCard title="Setup React Project" />
                        <TaskCard title="Initial Component Audit" />
                    </KanbanColumn>
                </div>
            </div>
        </div >
    );
};

const ChatMessage = ({ name, time, message, isSystem = false, isMe = false, avatar }: { name?: string, time?: string, message: string, isSystem?: boolean, isMe?: boolean, avatar?: string }) => {
    if (isSystem) {
        return (
            <div className="flex items-center justify-center gap-2 py-2 opacity-60">
                <div className="h-px w-8 bg-slate-300"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{message}</span>
                <div className="h-px w-8 bg-slate-300"></div>
            </div>
        );
    }

    return (
        <div className={`flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMe ? 'flex-row-reverse' : ''}`}>
            {!isMe && (
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
                    {avatar ? <img src={avatar} className="w-full h-full object-cover" alt={name} /> : <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">{name?.charAt(0)}</div>}
                </div>
            )}
            <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-700">{name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{time}</span>
                </div>
                <div className={`p-3 rounded-2xl text-sm font-body leading-relaxed shadow-sm ${isMe ? 'bg-brand text-white rounded-tr-sm' : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'}`}>
                    {message}
                </div>
            </div>
        </div>
    );
};

const ChatSystem = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    const channels = [
        { name: 'general', active: false },
        { name: 'design-system', active: true },
        { name: 'marketplace-bugs', active: false },
        { name: 'random', active: false },
    ];

    return (
        <div className="h-[600px] w-full bg-white rounded-2xl border border-slate-200 overflow-hidden flex shadow-xl">
            {/* Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-slate-100 flex flex-col hidden md:flex">
                <div className="p-4 border-b border-slate-100 mb-2">
                    <h4 className="font-bold text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-brand text-white flex items-center justify-center text-xs">E</span>
                        Ekonty Team
                    </h4>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Channels</h5>
                            <HugeiconsIcon icon={Plus} size={12} className="text-slate-400 cursor-pointer hover:text-brand" />
                        </div>
                        <div className="space-y-0.5">
                            {channels.map(channel => (
                                <div
                                    key={channel.name}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${channel.active ? 'bg-white text-brand shadow-sm border border-slate-100/50' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                                >
                                    <HugeiconsIcon icon={Hash} size={14} className={channel.active ? 'text-brand' : 'opacity-50'} />
                                    {channel.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">K</div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-slate-700">Kofi Mensah</p>
                            <p className="text-[10px] text-slate-400">Online</p>
                        </div>
                        <HugeiconsIcon icon={Settings} size={16} className="text-slate-400 hover:text-slate-600 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                <div className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-4 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="md:hidden mr-2">
                            <HugeiconsIcon icon={Kanban} size={20} className="text-slate-400" />
                        </div>
                        {/* <HugeiconsIcon icon={Hash} size={18} className="text-slate-400" /> */}
                        <h3 className="font-bold text-slate-800">Chat Interface</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetail('chat-system')}
                            icon={Code}
                        >
                            View Code
                        </Button>
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">U{i}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <ChatMessage isSystem message="Kofi joined the channel" />
                    <ChatMessage name="Sarah David" time="10:30 AM" message="Hey team! I've just updated the typography tokens in the main branch." />
                    <ChatMessage name="Mike Johnson" time="10:32 AM" message="Awesome! Does this include the new Inter font weights?" />
                    <ChatMessage name="Sarah David" time="10:35 AM" message="Yes, all weights from 400 to 700 are now available." />
                    <ChatMessage name="Kofi Mensah" time="10:42 AM" isMe message="Great work! I'll update the Kanban board components to use them." />
                    <div className="flex items-center gap-2 px-4 opacity-50">
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">Sarah is typing...</span>
                    </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Message #design-system..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-32 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                <HugeiconsIcon icon={Attachment} size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                <HugeiconsIcon icon={Smile} size={18} />
                            </button>
                            <button className="p-2 bg-brand text-white rounded-lg hover:bg-brand/90 shadow-sm transition-all hover:scale-105 active:scale-95">
                                <HugeiconsIcon icon={Send} size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TeamCollaboration = ({ onViewDetail }: { onViewDetail: (section: string) => void }) => {
    const [view, setView] = useState<'kanban' | 'chat'>('kanban');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 font-heading mb-2">Team Collaboration</h2>
                    <p className="text-slate-500 font-body max-w-2xl">Internal tools should feel as polished as the external marketplace to boost team productivity.</p>
                </div>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1 self-start">
                    <button
                        onClick={() => setView('kanban')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <HugeiconsIcon icon={Kanban} size={16} />
                        Workflow
                    </button>
                    <button
                        onClick={() => setView('chat')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'chat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <HugeiconsIcon icon={MessageSquare} size={16} />
                        Connect
                    </button>
                </div>
            </div>

            <div className="mt-8">
                {view === 'kanban' ? <KanbanBoard onViewDetail={onViewDetail} /> : <ChatSystem onViewDetail={onViewDetail} />}
            </div>
        </div>
    );
};

interface SectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

interface SearchResultItem {
    name: string;
    type: string;
    tab: string;
    icon?: IconSvgElement;
    detail?: string;
}

const Section = ({ title, subtitle, children }: SectionProps) => (
    <div className="mb-20 animate-in fade-in duration-700">
        <div className="mb-8 border-l-4 border-brand pl-6">
            <h2 className="text-3xl font-bold text-slate-900 font-heading mb-2">{title}</h2>
            <p className="text-slate-500 font-body max-w-2xl">{subtitle}</p>
        </div>
        {children}
    </div>
);

// --- SYSTEM ICONS DATA ---
const systemIcons = [
    { name: 'Home', path: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />' },
    { name: 'Search', path: '<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />' },
    { name: 'Settings', path: '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />' },
    { name: 'Bell', path: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />' },
    { name: 'Plus', path: '<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />' },
    { name: 'X', path: '<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />' },
    { name: 'Check', path: '<polyline points="20 6 9 17 4 12" />' },
    { name: 'Mail', path: '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect width="20" height="16" x="2" y="4" rx="2" />' },
    { name: 'Lock', path: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />' },
    { name: 'User', path: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />' },
    { name: 'Trash', path: '<polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />' },
    { name: 'Eye', path: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />' },
    { name: 'Heart', path: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />' },
    { name: 'Star', path: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />' },
    { name: 'Cloud', path: '<path d="M17.5 19a5.5 5.5 0 0 0 0-11h-1.2l-.7-1.1c-1-1.9-3.1-3.1-5.6-3.1a6.6 6.6 0 0 0-6.5 6.4h-.2A4.4 4.4 0 0 0 3.3 19h14.2Z" />' },
    { name: 'Moon', path: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />' },
    { name: 'Sun', path: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />' },
    { name: 'ArrowRight', path: '<line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />' },
    { name: 'ArrowLeft', path: '<line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />' },
    { name: 'ArrowUp', path: '<line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />' },
    { name: 'ArrowDown', path: '<line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />' },
    { name: 'ExternalLink', path: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />' },
    { name: 'Share', path: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />' },
    { name: 'Download', path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />' },
    { name: 'Upload', path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />' },
    { name: 'Filter', path: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />' },
    { name: 'Menu', path: '<line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />' },
    { name: 'MoreVertical', path: '<circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />' },
    { name: 'MoreHorizontal', path: '<circle cx="12" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="19" cy="12" r="1" />' },
    { name: 'Grid', path: '<rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />' },
    { name: 'List', path: '<line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />' },
    { name: 'Calendar', path: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />' },
    { name: 'Clock', path: '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />' },
    { name: 'MapPin', path: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />' },
    { name: 'Camera', path: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />' },
    { name: 'Image', path: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />' },
    { name: 'Music', path: '<path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />' },
    { name: 'Film', path: '<rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />' },
    { name: 'Monitor', path: '<rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />' },
    { name: 'Smartphone', path: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />' },
    { name: 'Database', path: '<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />' },
    { name: 'Shield', path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />' },
    { name: 'Award', path: '<circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />' },
    { name: 'ShoppingBag', path: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />' },
    { name: 'ShoppingCart', path: '<circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />' },
    { name: 'Tag', path: '<path d="m11.5 2 9.2 9.2a2.1 2.1 0 0 1 0 3l-6.5 6.5a2.1 2.1 0 0 1-3 0L2 11.5V2h9.5Z" /><circle cx="7" cy="7" r="1" />' },
    { name: 'Package', path: '<path d="m7.5 4.21 4.5 2.6 4.5-2.6m-9 15.58V14.6L3 12V7.4l4.5-2.6L12 7.4l4.5-2.6L21 7.4V12l-4.5 2.6v5.19l-4.5 2.6-4.5-2.6Z" /><polyline points="3 7 12 12 21 7" /><line x1="12" y1="22" x2="12" y2="12" />' },
    { name: 'Flag', path: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />' },
    { name: 'Briefcase', path: '<rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />' },
    { name: 'Gift', path: '<polyline points="20 12 20 22 4 22 4 12" /><rect width="20" height="5" x="2" y="7" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />' },
    { name: 'Anchor', path: '<circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" />' },
    { name: 'Zap', path: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />' },
];

// --- MAIN PAGE LAYOUT ---
const EkontyDesignSystem = () => {
    const [activeTab, setActiveTab] = useState('Foundation');
    const [activeComponentDetail, setActiveComponentDetail] = useState<string | null>(null);
    const [codeModalData, setCodeModalData] = useState<{ title: string, code: string } | null>(null);
    const [searchTermIcons, setSearchTermIcons] = useState('');
    const [globalSearch, setGlobalSearch] = useState('');

    const showCode = (title: string, code: string) => {
        setCodeModalData({ title, code });
    };

    const navigation = [
        { name: 'Foundation', icon: Home },
        { name: 'Colors', icon: Colors },
        { name: 'Typography', icon: Typography },
        { name: 'Layout', icon: Layout },
        { name: 'Components', icon: Atoms },
        { name: 'Assets', icon: Icons },
        { name: 'Cards', icon: User },
        { name: 'Interactions', icon: Motion },
        { name: 'Collaboration', icon: Team }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <CodeSnippetModal data={codeModalData} onClose={() => setCodeModalData(null)} />
            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden lg:block py-6 px-5 z-10">
                <div className="mb-6 flex items-center px-4">
                    <img src="/images/logo.png" alt="Ekonty Logo" className="h-6 w-auto object-contain" />
                </div>

                <nav className="space-y-0.5">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => { setActiveTab(item.name); setActiveComponentDetail(null); }}
                            className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-3
                ${activeTab === item.name ? 'bg-brand text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
`}
                        >
                            <HugeiconsIcon icon={item.icon} size={18} />
                            {item.name}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64 min-h-screen">
                {/* Mobile Top Header */}
                <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-4 flex items-center">
                    <img src="/images/logo.png" alt="Ekonty Logo" className="h-5 w-auto object-contain" />
                </div>

                <header className="sticky top-0 bg-slate-50/80 backdrop-blur-md z-[5] px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span>Documentation</span>
                        <HugeiconsIcon icon={ChevronRight} size={14} />
                        <span className="text-slate-900 font-bold">{activeTab}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="relative group min-w-[300px] hidden md:block">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-800 transition-colors">
                                <HugeiconsIcon icon={Search} size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search anything "
                                value={globalSearch}
                                onChange={(e) => setGlobalSearch(e.target.value)}
                                className="w-[300px] bg-white border border-slate-200 rounded-2xl py-2 pl-11 pr-4 text-[13px] font-bold focus:outline-none focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/5 transition-all placeholder:text-slate-400"
                            />

                            {/* Search Results Dropdown */}
                            {globalSearch && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl p-3 z-50 max-h-[400px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Search Results</h4>
                                    <div className="space-y-1">
                                        {(() => {
                                            const searchItems: SearchResultItem[] = [
                                                ...navigation.map(n => ({ name: n.name, type: 'Tab', tab: n.name, icon: n.icon })),
                                                { name: 'Primary Button', type: 'Component', tab: 'Components', detail: 'buttons' },
                                                { name: 'Input Fields', type: 'Component', tab: 'Components', detail: 'inputs' },
                                                { name: 'Grid Layout', type: 'Foundation', tab: 'Layout' },
                                                { name: 'Typography Scale', type: 'Foundation', tab: 'Typography' },
                                                { name: 'Color Palette', type: 'Foundation', tab: 'Colors' },
                                                { name: 'Icons Library', type: 'Assets', tab: 'Assets' },
                                                { name: 'Profile Card', type: 'Card', tab: 'Cards' },
                                                { name: 'Hover Effects', type: 'Motion', tab: 'Interactions' }
                                            ];
                                            const filtered = searchItems.filter(item => item.name.toLowerCase().includes(globalSearch.toLowerCase()));

                                            if (filtered.length === 0) {
                                                return (
                                                    <div className="p-8 text-center">
                                                        <p className="text-xs font-bold text-slate-400">No matching results found.</p>
                                                    </div>
                                                );
                                            }

                                            return filtered.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setActiveTab(item.tab);
                                                        if (item.detail) setActiveComponentDetail(item.detail);
                                                        setGlobalSearch('');
                                                    }}
                                                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                                                            <HugeiconsIcon icon={item.icon || Search} size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-700">{item.name}</p>
                                                            <p className="text-[10px] text-slate-400">{item.type} in {item.tab}</p>
                                                        </div>
                                                    </div>
                                                    <HugeiconsIcon icon={ChevronRight} size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                                                </button>
                                            ));
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Button variant="primary" size="sm" icon={Plus}>Get Started</Button>
                    </div>
                </header>

                <div className="p-8 max-w-[1200px] mx-auto">
                    {activeTab === 'Foundation' && (
                        <div className="space-y-12">
                            <div className="bg-gradient-to-br from-brand to-brand/80 p-12 rounded-3xl text-white shadow-xl shadow-brand/20 relative overflow-hidden">
                                <div className="absolute right-[-5%] top-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                                <div className="absolute right-12 top-12 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center p-4 rotate-12 hidden md:flex">
                                    <img src="/images/logo.png" alt="Ekonty" className="w-full h-full object-contain brightness-0 invert" />
                                </div>
                                <div className="relative z-1">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">Version 2.0 (Living)</span>
                                    <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">Ekonty Living Design System</h1>
                                    <p className="text-xl text-white/80 font-body max-w-xl mb-8 leading-relaxed">
                                        A high-fidelity framework for building empowering, inclusive, and vibrant digital experiences for the Ekonty marketplace.
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-3 bg-white text-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">Browse Components</button>
                                        <button className="px-6 py-3 bg-brand/20 border border-white/20 text-white font-bold rounded-xl hover:bg-brand/30 transition-all">Download Assets</button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 font-heading">Our Mission</h3>
                                    <p className="text-slate-600 font-body leading-relaxed mb-4">
                                        To create a cohesive visual language that bridges the gap between complex marketplace operations and intuitive human interaction.
                                    </p>
                                    <a href="#" className="inline-flex items-center text-brand font-bold hover:gap-2 transition-all">
                                        Read the manifesto <HugeiconsIcon icon={ArrowRight} size={16} className="ml-2" />
                                    </a>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 font-heading">Quick Links</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Figma File', 'Token JSON', 'Usage Guide', 'Accessibility'].map(link => (
                                            <div key={link} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                                                <div className="w-2 h-2 bg-brand rounded-full"></div>
                                                <span className="text-sm font-bold text-slate-600">{link}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Colors' && (
                        <Section
                            title="Color Architecture"
                            subtitle="Our palette is designed to maintain brand recognition while providing functional visual cues for success, errors, and warnings.">
                            {activeComponentDetail && activeComponentDetail.startsWith('colors-') ? (
                                <ComponentDetailView
                                    title={activeComponentDetail === 'colors-brand' ? 'Brand Palette' : activeComponentDetail === 'colors-semantic' ? 'Semantic Colors' : 'Neutral Palette'}
                                    onBack={() => setActiveComponentDetail(null)}
                                    examples={
                                        activeComponentDetail === 'colors-brand' ? [
                                            { title: 'Ekonty Brand', preview: <div className="w-24 h-24 rounded-xl shadow-sm bg-brand"></div>, code: `<div className="emerald-800"></div>` },
                                            { title: 'Brand Surface', preview: <div className="w-24 h-24 rounded-xl shadow-sm border border-slate-100 bg-brand-custom"></div>, code: `<div className="emerald-50"></div>` }
                                        ] : activeComponentDetail === 'colors-semantic' ? [
                                            { title: 'Success', preview: <div className="w-24 h-24 rounded-xl bg-success"></div>, code: `<div className="emerald-500"></div>` },
                                            { title: 'Warning', preview: <div className="w-24 h-24 rounded-xl bg-warning"></div>, code: `<div className="bg-amber-500"></div>` },
                                            { title: 'Danger', preview: <div className="w-24 h-24 rounded-xl bg-danger"></div>, code: `<div className="bg-rose-500"></div>` },
                                            { title: 'Info', preview: <div className="w-24 h-24 rounded-xl bg-info"></div>, code: `<div className="bg-blue-500"></div>` }
                                        ] : colors.neutrals.map(shade => ({
                                            title: `Slate ${shade.label}`,
                                            preview: <div className={`w-24 h-24 rounded-xl shadow-sm border border-slate-200 bg-${shade.tailwind}`}></div>,
                                            code: `<div className="bg-slate-${shade.label}"></div>`
                                        }))
                                    }
                                />
                            ) : (
                                <ColorPalette onViewDetail={setActiveComponentDetail} />
                            )}
                        </Section >
                    )}

                    {
                        activeTab === 'Typography' && (
                            <Section
                                title="Typography Scale"
                                subtitle="We use Outfit for a modern, confident heading style and Plus Jakarta Sans for an incredibly readable body text.">
                                {activeComponentDetail === 'typography' ? (
                                    <ComponentDetailView
                                        title="Typography Scale"
                                        onBack={() => setActiveComponentDetail(null)}
                                        examples={[
                                            {
                                                title: "Display",
                                                preview: <span className="text-5xl font-bold leading-tight font-heading">The quick brown fox</span>,
                                                code: `<h1 className="text-5xl font-bold leading-tight font-heading">The quick brown fox</h1>`
                                            },
                                            {
                                                title: "Heading 1",
                                                preview: <span className="text-4xl font-bold leading-tight font-heading">The quick brown fox</span>,
                                                code: `<h2 className="text-4xl font-bold leading-tight font-heading">The quick brown fox</h2>`
                                            },
                                            {
                                                title: "Heading 2",
                                                preview: <span className="text-3xl font-semibold leading-snug font-heading">The quick brown fox</span>,
                                                code: `<h3 className="text-3xl font-semibold leading-snug font-heading">The quick brown fox</h3>`
                                            },
                                            {
                                                title: "Body Text",
                                                preview: <span className="text-base font-normal leading-relaxed font-body">The quick brown fox jumps over the lazy dog.</span>,
                                                code: `<p className="text-base font-normal leading-relaxed font-body">The quick brown fox jumps over the lazy dog.</p>`
                                            },
                                            {
                                                title: "Caption",
                                                preview: <span className="text-xs font-medium leading-none font-body uppercase tracking-wider">The quick brown fox</span>,
                                                code: `<span className="text-xs font-medium leading-none font-body uppercase tracking-wider">The quick brown fox</span>`
                                            }
                                        ]}
                                    />
                                ) : (
                                    <TypographyScale onViewDetail={setActiveComponentDetail} />
                                )}
                            </Section>
                        )
                    }

                    {
                        activeTab === 'Layout' && (
                            <Section
                                title="Grid & Layout"
                                subtitle="Everything is built on a 4px grid. This ensures perfect alignment and consistent spacing across all touchpoints.">
                                <GridLayoutSystem onShowCode={showCode} />
                            </Section>
                        )
                    }

                    {
                        activeTab === 'Components' && (
                            <Section
                                title="Component Library"
                                subtitle="A collection of atomic elements used to build complex interfaces. Every component is designed with interactive states.">
                                <div className="space-y-12">
                                    {activeComponentDetail ? (
                                        <>
                                            {activeComponentDetail === 'buttons' && (
                                                <ComponentDetailView
                                                    title="Buttons"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Primary Button",
                                                            preview: <Button variant="primary">Primary Action</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out bg-brand text-white shadow-sm hover:bg-brand/90 focus-visible:ring-brand px-5 py-2.5 text-sm">Primary Action</button>`
                                                        },
                                                        {
                                                            title: "Secondary Button",
                                                            preview: <Button variant="secondary">Secondary Action</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 px-5 py-2.5 text-sm">Secondary Action</button>`
                                                        },
                                                        {
                                                            title: "Outline Button",
                                                            preview: <Button variant="outline">Outline Action</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 px-5 py-2.5 text-sm">Outline Action</button>`
                                                        },
                                                        {
                                                            title: "Ghost Button",
                                                            preview: <Button variant="ghost">Ghost Action</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out bg-transparent text-slate-600 hover:bg-slate-100 px-5 py-2.5 text-sm">Ghost Action</button>`
                                                        },
                                                        {
                                                            title: "Rounded Full Primary",
                                                            preview: <Button variant="primary" rounded="full">Pill Primary</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out bg-brand text-white shadow-sm hover:bg-brand/90 focus-visible:ring-brand px-5 py-2.5 text-sm">Pill Primary</button>`
                                                        },
                                                        {
                                                            title: "Rounded Full Warning",
                                                            preview: <Button variant="warning" rounded="full">Pill Warning</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out bg-warning text-white shadow-sm hover:bg-warning/90 focus-visible:ring-warning px-5 py-2.5 text-sm">Pill Warning</button>`
                                                        },
                                                        {
                                                            title: "Rounded Full Outline",
                                                            preview: <Button variant="outline" rounded="full">Pill Outline</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 px-5 py-2.5 text-sm">Pill Outline</button>`
                                                        },
                                                        {
                                                            title: "Rounded Full Secondary",
                                                            preview: <Button variant="secondary" rounded="full">Pill Secondary</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 px-5 py-2.5 text-sm">Pill Secondary</button>`
                                                        },
                                                        {
                                                            title: "Icon Button",
                                                            preview: <Button variant="icon" icon={Bell} />,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 focus-visible:ring-slate-400">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">...</svg>
</button>`
                                                        },
                                                        {
                                                            title: "Loading State",
                                                            preview: <Button variant="primary" isLoading>Processing</Button>,
                                                            code: `<button className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out bg-brand text-white shadow-sm hover:bg-brand/90 px-5 py-2.5 text-sm opacity-50 cursor-not-allowed">
    <span className="animate-spin mr-2">...</span>
    Processing
</button>`
                                                        }
                                                    ]}
                                                />
                                            )}


                                            {activeComponentDetail === 'inputs' && (
                                                <ComponentDetailView
                                                    title="Form Inputs"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Standard Input",
                                                            preview: <div className="w-full max-w-sm"><Input label="Email Address" placeholder="name@example.com" icon={Mail} /></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Email Address</label>
    <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <input 
            type="text" 
            placeholder="name@example.com" 
            className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 pl-11 pr-4 transition-all outline-none font-body text-sm focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400" 
        />
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Password Input",
                                                            preview: <div className="w-full max-w-sm"><Input label="Password" type="password" placeholder="Enter password" icon={Lock} /></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Password</label>
    <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <input 
            type="password" 
            placeholder="Enter password" 
            className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 pl-11 pr-12 transition-all outline-none font-body text-sm focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400" 
        />
        <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Error State",
                                                            preview: <div className="w-full max-w-sm"><Input label="Username" placeholder="ekonty_user" error="Username is already taken" icon={User} /></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Username</label>
    <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <input 
            type="text" 
            placeholder="ekonty_user" 
            className="w-full bg-white border-2 border-rose-500 rounded-xl py-2 pl-11 pr-4 transition-all outline-none font-body text-sm focus:ring-4 focus:ring-rose-500/10" 
        />
    </div>
    <p className="text-xs font-medium text-rose-500">Username is already taken</p>
</div>`
                                                        }
                                                    ]}
                                                />
                                            )}

                                            {activeComponentDetail === 'complex' && (
                                                <ComponentDetailView
                                                    title="Search & Specialized Inputs"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Search Input",
                                                            preview: <div className="w-full max-w-sm"><Input label="Search" placeholder="Search marketplace..." icon={Search} /></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Search</label>
    <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input 
            type="text" 
            placeholder="Search marketplace..." 
            className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 pl-11 pr-4 transition-all outline-none font-body text-sm focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400" 
        />
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Select Dropdown",
                                                            preview: <div className="w-full max-w-sm"><Select label="Category"><option>Electronics</option><option>Fashion</option></Select></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Category</label>
    <div className="relative">
        <select className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 px-4 transition-all outline-none font-body text-sm appearance-none focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10">
            <option>Electronics</option>
            <option>Fashion</option>
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Textarea",
                                                            preview: <div className="w-full max-w-sm"><Textarea label="Bio" placeholder="Tell us about yourself..." /></div>,
                                                            code: `<div className="space-y-1.5 w-full">
    <label className="text-sm font-bold text-slate-700 font-body uppercase tracking-wider text-[11px]">Bio</label>
    <textarea 
        placeholder="Tell us about yourself..." 
        className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 px-4 transition-all outline-none font-body text-sm min-h-[100px] focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10 placeholder:text-slate-400"
    ></textarea>
</div>`
                                                        },
                                                        {
                                                            title: "Checkboxes",
                                                            preview: <div className="flex flex-col gap-4"><Checkbox label="Option 1" defaultChecked /><Checkbox label="Option 2" /></div>,
                                                            code: `<label className="flex items-center gap-3 cursor-pointer group select-none">
    <div className="relative flex items-center justify-center">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <div className="w-5 h-5 border-2 border-slate-200 rounded-md transition-all peer-checked:bg-emerald-800 peer-checked:border-emerald-800 group-hover:border-emerald-800/50"></div>
        <div className="absolute text-white transition-opacity opacity-0 peer-checked:opacity-100 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    </div>
    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Option 1</span>
</label>`
                                                        }
                                                    ]}
                                                />
                                            )}

                                            {activeComponentDetail === 'alerts' && (
                                                <ComponentDetailView
                                                    title="Feedback & Alerts"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Info Alert",
                                                            preview: <div className="w-full max-w-lg"><Alert variant="info" title="Update Available">A new software update is available.</Alert></div>,
                                                            code: `<div className="flex items-start p-4 rounded-xl border bg-blue-500/10 border-blue-500/20">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 mt-0.5 mr-3 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <div className="flex-1">
        <h4 className="text-sm font-bold text-blue-500 mb-1">Update Available</h4>
        <div className="text-sm text-slate-600 font-body">A new software update is available.</div>
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Success Alert",
                                                            preview: <div className="w-full max-w-lg"><Alert variant="success" title="Success">Operation completed successfully.</Alert></div>,
                                                            code: `<div className="flex items-start p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/20">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 mt-0.5 mr-3 shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <div className="flex-1">
        <h4 className="text-sm font-bold text-emerald-500 mb-1">Success</h4>
        <div className="text-sm text-slate-600 font-body">Operation completed successfully.</div>
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Warning Alert",
                                                            preview: <div className="w-full max-w-lg"><Alert variant="warning" title="Warning">Please check your internet connection.</Alert></div>,
                                                            code: `<div className="flex items-start p-4 rounded-xl border bg-amber-500/10 border-amber-500/20">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 mt-0.5 mr-3 shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    <div className="flex-1">
        <h4 className="text-sm font-bold text-amber-500 mb-1">Warning</h4>
        <div className="text-sm text-slate-600 font-body">Please check your internet connection.</div>
    </div>
</div>`
                                                        },
                                                        {
                                                            title: "Danger Alert",
                                                            preview: <div className="w-full max-w-lg"><Alert variant="danger" title="Error">Something went wrong.</Alert></div>,
                                                            code: `<div className="flex items-start p-4 rounded-xl border bg-rose-500/10 border-rose-500/20">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500 mt-0.5 mr-3 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    <div className="flex-1">
        <h4 className="text-sm font-bold text-rose-500 mb-1">Error</h4>
        <div className="text-sm text-slate-600 font-body">Something went wrong.</div>
    </div>
</div>`
                                                        }
                                                    ]}
                                                />
                                            )}

                                            {activeComponentDetail === 'darkmode' && (
                                                <ComponentDetailView
                                                    title="Theming & Dark Mode"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Dark Dashboard Card",
                                                            preview: (
                                                                <div className="dark bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-sm">
                                                                    <div className="flex justify-between items-center mb-6">
                                                                        <div className="w-10 h-10 bg-brand/20 rounded-xl flex items-center justify-center">
                                                                            <HugeiconsIcon icon={Info} className="text-brand" size={20} />
                                                                        </div>
                                                                        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-lg">+12.5%</div>
                                                                    </div>
                                                                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</h4>
                                                                    <div className="text-2xl font-bold text-white font-heading">$45,285.00</div>
                                                                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-slate-500 text-[11px]">
                                                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                                                        Live updates enabled
                                                                    </div>
                                                                </div>
                                                            ),
                                                            code: `
<div className="dark:bg-slate-900 bg-white p-8 rounded-3xl border dark:border-slate-800 border-slate-100 shadow-2xl w-full max-w-sm transition-colors">
    <div className="flex justify-between items-center mb-6">
        <div className="w-10 h-10 dark:bg-emerald-800/20 bg-emerald-50 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dark:text-emerald-400 text-emerald-800">...</svg>
        </div>
        <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-lg">+12.5%</div>
    </div>
    <h4 className="dark:text-slate-400 text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</h4>
    <div className="text-2xl font-bold dark:text-white text-slate-900 font-heading">$45,285.00</div>
    <div className="mt-4 pt-4 dark:border-slate-800 border-slate-100 border-t flex items-center gap-2 dark:text-slate-500 text-slate-400 text-[11px]">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
        Live updates enabled
    </div>
</div>`
                                                        }
                                                    ]}
                                                />
                                            )}

                                            {activeComponentDetail === 'toggles' && (
                                                <ComponentDetailView
                                                    title="Switch Toggles"
                                                    onBack={() => setActiveComponentDetail(null)}
                                                    examples={[
                                                        {
                                                            title: "Brand Toggle",
                                                            preview: <Toggle label="Active Service" defaultChecked />,
                                                            code: `<label className="inline-flex items-center cursor-pointer group select-none">
    <div className="relative">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-emerald-800"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
    </div>
    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Active Service</span>
</label>`
                                                        },
                                                        {
                                                            title: "Success Toggle",
                                                            preview: <Toggle variant="success" label="Notifications On" defaultChecked />,
                                                            code: `<label className="inline-flex items-center cursor-pointer group select-none">
    <div className="relative">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-emerald-500"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
    </div>
    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Notifications On</span>
</label>`
                                                        },
                                                        {
                                                            title: "Warning State",
                                                            preview: <Toggle variant="warning" label="Maintenance Mode" defaultChecked />,
                                                            code: `<label className="inline-flex items-center cursor-pointer group select-none">
    <div className="relative">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-amber-500"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
    </div>
    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Maintenance Mode</span>
</label>`
                                                        },
                                                        {
                                                            title: "Danger Toggle",
                                                            preview: <Toggle variant="danger" label="Delete Account" />,
                                                            code: `<label className="inline-flex items-center cursor-pointer group select-none">
    <div className="relative">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-rose-500"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
    </div>
    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Delete Account</span>
</label>`
                                                        },
                                                        {
                                                            title: "Info Toggle",
                                                            preview: <Toggle variant="info" label="Beta Access" defaultChecked />,
                                                            code: `<label className="inline-flex items-center cursor-pointer group select-none">
    <div className="relative">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-blue-500"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
    </div>
    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider text-[11px]">Beta Access</span>
</label>`
                                                        }
                                                    ]}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Buttons</h3>
                                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative group">
                                                    <button
                                                        onClick={() => setActiveComponentDetail('buttons')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <div className="flex flex-wrap gap-4 items-center">
                                                        <Button variant="primary">Primary Button</Button>
                                                        <Button variant="secondary">Secondary</Button>
                                                        <Button variant="outline">Outline</Button>
                                                        <Button variant="ghost">Ghost Button</Button>
                                                        <Button variant="icon" icon={Bell} />
                                                    </div>
                                                    <div className="mt-8 flex flex-wrap gap-4 items-center">
                                                        <Button variant="primary" isLoading>Processing</Button>
                                                        <Button variant="primary" disabled>Disabled State</Button>
                                                        <Button variant="primary" icon={Plus}>With Icon</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Interactive Toggles</h3>
                                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative group">
                                                    <button
                                                        onClick={() => setActiveComponentDetail('toggles')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 z-10"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <div className="flex flex-wrap gap-8 items-center">
                                                        <Toggle label="Brand Setting" defaultChecked />
                                                        <Toggle variant="success" label="Success State" defaultChecked />
                                                        <Toggle variant="warning" label="Warning" defaultChecked />
                                                        <Toggle variant="danger" label="Danger" />
                                                        <Toggle variant="info" label="System Info" defaultChecked />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Form Inputs</h3>
                                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-6 relative group">
                                                    <button
                                                        onClick={() => setActiveComponentDetail('inputs')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 z-10"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <Input label="Email Address" placeholder="e.g. john@example.com" icon={Mail} />
                                                    <Input label="Password" type="password" placeholder="Enter your password" icon={Lock} />
                                                    <Input label="Username" placeholder="ekonty_user" icon={User} error="This username is already taken." />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Search & Specialized Inputs</h3>
                                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-6 relative group">
                                                    <button
                                                        onClick={() => setActiveComponentDetail('complex')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 z-10"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <Input label="Marketplace Search" placeholder="Search for items, brands, or shops..." icon={Search} />
                                                    <Select label="Account Type">
                                                        <option value="">Select your account type</option>
                                                        <option value="seller">Verified Seller</option>
                                                        <option value="buyer">Individual Buyer</option>
                                                        <option value="business">Enterprise Business</option>
                                                    </Select>
                                                    <Textarea label="Order Description" placeholder="Briefly describe your requirements..." />
                                                    <div className="pt-2 flex flex-col gap-4">
                                                        <Checkbox label="I agree to the Terms of Service" defaultChecked />
                                                        <Checkbox label="Subscribe to marketplace updates" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Feedback & Alerts</h3>
                                                <div className="space-y-4 relative group">
                                                    <button
                                                        onClick={() => setActiveComponentDetail('alerts')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-brand hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 z-10"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <Alert variant="success" title="Payment Successful" onClose={() => { }}>
                                                        Your transaction has been processed successfully. A receipt has been sent to your email.
                                                    </Alert>
                                                    <Alert variant="warning" title="Incomplete Profile">
                                                        Please complete your profile details to unlock all marketplace features.
                                                    </Alert>
                                                    <Alert variant="danger" title="System Error">
                                                        We were unable to connect to the server. Please check your internet connection.
                                                    </Alert>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xl font-semibold font-heading">Theming & Dark Mode</h3>
                                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative group overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900 rotate-45 translate-x-16 -translate-y-16"></div>
                                                    <button
                                                        onClick={() => setActiveComponentDetail('darkmode')}
                                                        className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 transition-colors z-10"
                                                    >
                                                        <HugeiconsIcon icon={Code} size={12} />
                                                        View Code
                                                    </button>
                                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
                                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Standard Mode</h4>
                                                            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                                                <div className="w-8 h-8 bg-brand/10 rounded-lg mb-3"></div>
                                                                <div className="h-2 w-24 bg-slate-200 rounded-full mb-2"></div>
                                                                <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex-1">
                                                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Dark Mode</h4>
                                                            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                                                                <div className="w-8 h-8 bg-brand/30 rounded-lg mb-3"></div>
                                                                <div className="h-2 w-24 bg-slate-700 rounded-full mb-2"></div>
                                                                <div className="h-2 w-16 bg-slate-600 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </>
                                    )}
                                </div>
                            </Section>
                        )
                    }

                    {
                        activeTab === 'Assets' && (
                            <Section
                                title="Iconography & Imagery"
                                subtitle="A collection of system-standard SVG icons. Click any icon to copy its raw HTML/Tailwind CSS code.">
                                <div className="space-y-12">
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                            <div className="relative flex-1 max-w-md group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-800 transition-colors">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Search 50+ icons by name..."
                                                    value={searchTermIcons}
                                                    onChange={(e) => setSearchTermIcons(e.target.value)}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-800 focus:bg-white transition-all text-sm font-medium"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                                <span className="text-emerald-800">{systemIcons.filter(icon => icon.name.toLowerCase().includes(searchTermIcons.toLowerCase())).length}</span>
                                                Icons found
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                            {systemIcons
                                                .filter(icon => icon.name.toLowerCase().includes(searchTermIcons.toLowerCase()))
                                                .map((icon, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => showCode(`${icon.name} Icon`, `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">\n    ${icon.path}\n</svg>`)}
                                                        className="flex flex-col items-center gap-3 p-4  bg-white transition-all group animate-in fade-in duration-300"
                                                    >
                                                        <div className="text-slate-500 group-hover:text-emerald-800 group-hover:scale-110 transition-transform">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <g dangerouslySetInnerHTML={{ __html: icon.path }} />
                                                            </svg>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-700 transition-colors truncate w-full text-center">{icon.name}</span>
                                                    </button>
                                                ))}
                                        </div>

                                        {systemIcons.filter(icon => icon.name.toLowerCase().includes(searchTermIcons.toLowerCase())).length === 0 && (
                                            <div className="py-20 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                                    <svg className="text-slate-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                </div>
                                                <h4 className="text-slate-900 font-bold">No icons found</h4>
                                                <p className="text-slate-500 text-sm">Try searching for something else, like "Home" or "User".</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold font-heading">Media Placeholder</h3>
                                            <button
                                                onClick={() => showCode('Media Placeholder', `<div className="aspect-[3/4] w-full max-w-[280px] rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative group transition-all hover:bg-slate-200/50">\n    <div className="p-2 bg-white rounded-full shadow-sm mb-3">\n        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>\n    </div>\n    <span className="text-sm font-bold opacity-70 uppercase tracking-widest leading-none">Media Preview</span>\n    <span className="text-[10px] mt-1 font-medium opacity-60">3:4 Aspect Ratio</span>\n</div>`)}
                                                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                                View Code
                                            </button>
                                        </div>
                                        <div className="max-w-xl">
                                            <MediaPlaceholder title="Marketplace Listing Image" />
                                        </div>
                                    </div>
                                </div>
                            </Section>
                        )}

                    {
                        activeTab === 'Cards' && (
                            <Section
                                title="Voice & Card Layouts"
                                subtitle="Our components scale seamlessly across different content types. Here is how we handle text-heavy, media-focused, and profile-based cards.">
                                {activeComponentDetail === 'cards' ? (
                                    <ComponentDetailView
                                        title="Card Layouts"
                                        onBack={() => setActiveComponentDetail(null)}
                                        examples={[
                                            {
                                                title: "Text-Only Card",
                                                preview: (
                                                    <div className="max-w-md w-full bg-slate-50 p-6 flex justify-center">
                                                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group max-w-sm">
                                                            <div>
                                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                                                                    Product Update
                                                                </div>
                                                                <h4 className="text-2xl font-bold text-slate-900 mb-4 font-heading leading-tight italic">Empowering Marketplace Operations</h4>
                                                                <p className="text-slate-600 text-sm font-body leading-relaxed mb-8">Modern tools for a new generation of sellers, bridging the gap between complexity and elegance.</p>
                                                            </div>
                                                            <button className="text-emerald-800 text-sm font-black inline-flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                                                                Learn more
                                                                <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                                code: `<div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group max-w-sm">
    <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
            Product Update
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-4 font-heading leading-tight italic">Empowering Marketplace Operations</h4>
        <p className="text-slate-600 text-sm font-body leading-relaxed mb-8">Modern tools for a new generation of sellers, bridging the gap between complexity and elegance.</p>
    </div>
    <button className="text-emerald-800 text-sm font-black inline-flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider">
        Learn more 
        <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>
</div>`
                                            },
                                            {
                                                title: "Image + Text Card",
                                                preview: (
                                                    <div className="max-w-md w-full bg-slate-50 p-6 flex justify-center">
                                                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group max-w-sm">
                                                            <div className="h-56 w-full overflow-hidden relative">
                                                                <div className="w-full h-full bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-1000"></div>
                                                                <div className="absolute top-5 left-5">
                                                                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-800 shadow-lg uppercase tracking-widest border border-white">New Arrival</span>
                                                                </div>
                                                            </div>
                                                            <div className="p-8">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <h4 className="text-xl font-bold text-slate-900 font-heading leading-tight">Vibrant Listing Styles</h4>
                                                                    <span className="text-emerald-800 font-extrabold text-base">$299.00</span>
                                                                </div>
                                                                <p className="text-slate-500 text-xs font-body mb-8 leading-relaxed italic opacity-80">Premium handcrafted marketplace assets designed for maximum conversion and high engagement.</p>
                                                                <button className="w-full py-3.5 bg-emerald-800 text-white text-[11px] font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-800/20 active:scale-95 uppercase tracking-widest">Add to Cart</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                                code: `<div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group max-w-sm">
    <div className="h-56 w-full overflow-hidden relative">
        <div className="w-full h-full bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-1000"></div>
        <div className="absolute top-5 left-5">
            <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-800 shadow-lg uppercase tracking-widest border border-white">New Arrival</span>
        </div>
    </div>
    <div className="p-8">
        <div className="flex justify-between items-start mb-3">
            <h4 className="text-xl font-bold text-slate-900 font-heading leading-tight">Vibrant Listing Styles</h4>
            <span className="text-emerald-800 font-extrabold text-base">$299.00</span>
        </div>
        <p className="text-slate-500 text-xs font-body mb-8 leading-relaxed italic opacity-80">Premium handcrafted marketplace assets designed for maximum conversion and high engagement.</p>
        <button className="w-full py-3.5 bg-emerald-800 text-white text-[11px] font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-800/20 active:scale-95 uppercase tracking-widest">Add to Cart</button>
    </div>
</div>`
                                            },
                                            {
                                                title: "Profile Card",
                                                preview: (
                                                    <div className="max-w-md w-full bg-slate-50 p-6 flex justify-center">
                                                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 group max-w-sm">
                                                            <div className="flex items-center gap-4 mb-8">
                                                                <div className="w-20 h-20 rounded-full border-2 border-emerald-800/10 p-1 relative">
                                                                    <div className="w-18 h-18 rounded-full bg-slate-200 animate-pulse"></div>
                                                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-slate-900 text-xl leading-tight font-heading italic">Sarah David</h4>
                                                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Verified Seller</p>
                                                                    <div className="flex text-amber-400 text-[8px] mt-1">★★★★★</div>
                                                                </div>
                                                            </div>
                                                            <p className="text-slate-500 text-sm font-body leading-relaxed mb-8 border-l-2 border-slate-50 pl-4 italic opacity-80">
                                                                "Ekonty has completely transformed how I manage my boutique operations. The interface is just so intuitive!"
                                                            </p>
                                                            <div className="flex gap-3">
                                                                <button className="flex-1 px-4 py-3 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest">Message</button>
                                                                <button className="flex-1 px-4 py-3 bg-emerald-800 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md uppercase tracking-widest active:scale-95">Profile</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                                code: `<div className="bg-white p-8 rounded-[1rem] shadow-sm border border-slate-100  transition-all duration-300 group max-w-sm">
    <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-emerald-800/10 p-1 relative">
            <div className="w-18 h-18 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
        </div>
        <div>
            <h4 className="font-bold text-slate-900 text-xl leading-tight font-heading italic">Sarah David</h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Verified Seller</p>
            <div className="flex text-amber-400 text-[8px] mt-1">★★★★★</div>
        </div>
    </div>
    <p className="text-slate-500 text-sm font-body leading-relaxed mb-8 border-l-2 border-slate-50 pl-4 italic opacity-80">
        "Ekonty has completely transformed how I manage my boutique operations. The interface is just so intuitive!"
    </p>
    <div className="flex gap-3">
        <button className="flex-1 px-4 py-3 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest">Message</button>
        <button className="flex-1 px-4 py-3 bg-emerald-800 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md uppercase tracking-widest active:scale-95">Profile</button>
    </div>
</div>`
                                            }
                                        ]}
                                    />
                                ) : (
                                    <CardShowcase onViewDetail={setActiveComponentDetail} />
                                )}
                            </Section>
                        )
                    }

                    {
                        activeTab === 'Interactions' && (
                            <Section
                                title="Interaction & Motion"
                                subtitle="Animation should be purposeful and subtle. We use physics-based transitions to make the UI feel reactive and alive.">
                                {activeComponentDetail === 'interactions' ? (
                                    <ComponentDetailView
                                        title="Interaction Patterns"
                                        onBack={() => setActiveComponentDetail(null)}
                                        examples={[
                                            {
                                                title: "Hover Effect",
                                                preview: <div className="w-full max-w-xs h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-brand hover:text-white hover:scale-105 transition-all duration-300 group"><span className="text-sm font-bold group-hover:translate-x-1 transition-transform">Hover Me</span></div>,
                                                code: `<div className="h-14 w-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-emerald-800 hover:text-white hover:scale-105 transition-all duration-300 group shadow-sm active:scale-95">
    <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">Hover Me</span>
</div>`
                                            },
                                            {
                                                title: "Active State (Click)",
                                                preview: <div className="w-full max-w-xs h-20 rounded-xl flex items-center justify-center cursor-pointer select-none transition-all duration-100 shadow-sm bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95"><span className="text-sm font-bold">Click Me</span></div>,
                                                code: `<div className="h-14 w-24 rounded-xl flex items-center justify-center cursor-pointer select-none transition-all duration-100 shadow-sm bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 border border-slate-200">
    <span className="text-sm font-bold">Click Me</span>
</div>`
                                            },
                                            {
                                                title: "Focus State",
                                                preview: <div className="w-full max-w-xs"><button className="h-20 w-full bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:border-brand transition-all"><span className="text-sm font-bold text-slate-600">Tab to Focus</span></button></div>,
                                                code: `<button className="h-14 w-24 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-emerald-800/20 focus-visible:border-emerald-800 transition-all shadow-sm">
    <span className="text-sm font-bold text-slate-600">Tab to Focus</span>
</button>`
                                            },
                                            {
                                                title: "Motion (Scale)",
                                                preview: <div className="w-full max-w-xs"><div className="h-20 w-full bg-success/10 border border-success/20 rounded-xl flex items-center justify-center group hover:rotate-2 transition-transform duration-300"><HugeiconsIcon icon={CheckCircle} size={32} className="text-success group-hover:scale-125 transition-transform" /></div></div>,
                                                code: `<div className="h-14 w-24 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center group hover:rotate-2 transition-transform duration-300 shadow-sm">
      <svg className="text-emerald-500 group-hover:scale-125 transition-transform duration-300" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>`
                                            }
                                        ]}
                                    />
                                ) : (
                                    <InteractionShowcase onViewDetail={setActiveComponentDetail} />
                                )}
                            </Section>
                        )
                    }

                    {
                        activeTab === 'Collaboration' && (
                            <Section
                                title=""
                                subtitle="">
                                {activeComponentDetail === 'kanban' ? (
                                    <ComponentDetailView
                                        title=""
                                        onBack={() => setActiveComponentDetail(null)}
                                        examples={[
                                            {
                                                title: "Kanban Task Card",
                                                preview: (
                                                    <div className="bg-white p-12 flex justify-center w-full max-w-md">
                                                        <TaskCard title="Refactor Navigation Component" />
                                                    </div>
                                                ),
                                                code: `
<div className="bg-white p-4 rounded-xl w-full border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group">

      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <span className="truncate text-[10px] font-bold capitalize tracking-wider text-slate-400">
            set user notification
          </span>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-4 h-4 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-sm text-slate-400 hover:text-emerald-600">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-slate-300 hover:text-slate-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      <div className="rounded-sm mb-3 ">
        <h5 className="bg-emerald-50 font-bold text-slate-600 text-sm leading-snug p-2 italic">
          Refactor Navigation Component
        </h5>
      </div>

      <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100/50 rounded-full mb-4">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-[10px] font-bold text-slate-500">
          Jan 30, 2026
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-4 h-4 flex items-center justify-center bg-emerald-100 border border-emerald-200 rounded-sm text-emerald-600">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[10px] font-bold">SAM1-6</span>
        </div>

        <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </div>`
                                            },
                                            {
                                                title: "Add Task Button",
                                                preview: (
                                                    <div className="w-full max-sm bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                        <button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-brand hover:bg-white rounded-xl transition-all text-sm font-bold border border-transparent hover:border-slate-100 hover:shadow-sm">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                            <span>Add Task</span>
                                                        </button>
                                                    </div>
                                                ),
                                                code: `
<button className="w-full py-2 flex items-center justify-center gap-2 text-slate-500 hover:text-emerald-800 hover:bg-white rounded-xl transition-all text-sm font-bold border border-transparent hover:border-slate-100 hover:shadow-sm">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    <span>Add Task</span>
</button>`
                                            }
                                        ]}
                                    />
                                ) : activeComponentDetail === 'chat-system' ? (
                                    <ComponentDetailView
                                        title=""
                                        onBack={() => setActiveComponentDetail(null)}
                                        examples={[
                                            {
                                                title: "Messaging System",
                                                preview: (
                                                    <div className="bg-slate-50 p-2 w-full">
                                                        <ChatSystem onViewDetail={() => { }} />
                                                    </div>
                                                ),
                                                code: `
<div className="h-[600px] w-full bg-white rounded-2xl border border-slate-200 overflow-hidden flex shadow-xl font-sans">
  
  <aside className="w-64 bg-slate-50 border-r border-slate-100 flex flex-col hidden md:flex">
    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
       <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-sm">E</div>
       <span className="font-bold text-slate-800">Ekonty Team</span>
    </div>
    <div className="flex-1 p-4">
      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Channels</h5>
      <div className="space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100 text-emerald-800 font-bold text-sm cursor-pointer">
          <span className="opacity-50 text-emerald-800">#</span> Dev. Team
        </div>
        <div className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all text-sm cursor-pointer">
          <span className="opacity-50">#</span> General
        </div>
      </div>
    </div>
  </aside>

  <div className="flex-1 flex flex-col bg-slate-50/30">
    
    <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-slate-800">Chat Section</span>
      </div>
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">JD</div>
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">SM</div>
      </div>
    </header>

    <div className="flex-1 p-6 space-y-8">
      
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-slate-200 mx-10"></div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Kofi Joined the channel</span>
        <div className="h-px flex-1 bg-slate-200 mx-10"></div>
      </div>

      <div className="flex gap-4 group">
        <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold text-xs ring-1 ring-slate-100">S</div>
        <div className="flex flex-col max-w-[70%]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-700">Sarah David</span>
            <span className="text-[9px] text-slate-400 font-bold">10:30 AM</span>
          </div>
          <div className="p-4 bg-white rounded-2xl rounded-tl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 text-sm text-slate-600 leading-relaxed">
            Hey team! I've just updated the typography tokens in the main branch.
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-xs">M</div>
        <div className="flex flex-col max-w-[70%]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-700">Mike Johnson</span>
            <span className="text-[9px] text-slate-400 font-bold">10:32 AM</span>
          </div>
          <div className="p-4 bg-white rounded-2xl rounded-tl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 text-sm text-slate-600 leading-relaxed">
            Awesome! Does this include the new Inter font weights?
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[11px] font-bold text-slate-800">Kofi Mensah</span>
            <span className="text-[9px] font-bold text-slate-400">10:42 AM</span>
          </div>
          <div className="p-4 bg-emerald-800 text-white rounded-2xl rounded-tr-none shadow-lg shadow-emerald-800/20 text-sm leading-relaxed max-w-[70%]">
            Great work! I'll update the Kanban board components to use them.
          </div>
      </div>

      <div className="flex items-center gap-3 px-1 opacity-40">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" ></div>
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" ></div>
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" ></div>
        </div>
        <span className="text-[11px] font-bold text-slate-500 italic">Sarah is typing...</span>
      </div>

    </div>

    <div className="p-6 bg-white border-t border-slate-100">
      <div className="relative flex items-center">
        <input 
          type="text" 
          placeholder="Message #design-system..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-32 focus:outline-none focus:ring-4 focus:ring-emerald-800/5 focus:border-emerald-800 transition-all text-[13px] placeholder:text-slate-400 font-medium"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
           </button>
           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
           </button>
           <button className="p-2.5 bg-emerald-800 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
           </button>
        </div>
      </div>
    </div>

  </div>
</div>`
                                            }
                                        ]}
                                    />
                                ) : (
                                    <TeamCollaboration onViewDetail={setActiveComponentDetail} />
                                )}
                            </Section>
                        )
                    }
                </div>
            </main>

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-2 flex justify-around items-center z-50">
                {navigation.filter(item => ['Components', 'Colors', 'Foundation', 'Layout'].includes(item.name)).map((item) => (
                    <button
                        key={item.name}
                        onClick={() => { setActiveTab(item.name); setActiveComponentDetail(null); }}
                        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all
                  ${activeTab === item.name ? 'bg-brand text-white shadow-lg' : 'text-slate-500'}
                `}
                    >
                        <HugeiconsIcon icon={item.icon} size={18} />
                        {item.name}
                    </button>
                ))}
                <button
                    onClick={() => { setActiveTab('Cards'); setActiveComponentDetail(null); }}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all
                ${['Assets', 'Cards', 'Interactions', 'Collaboration'].includes(activeTab) ? 'bg-brand text-white shadow-lg' : 'text-slate-500'}
              `}
                >
                    <HugeiconsIcon icon={MoreVertical} size={18} />
                    More
                </button>
            </div>
        </div>
    );
};

export default EkontyDesignSystem;
