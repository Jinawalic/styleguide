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
    Delete02Icon as Trash2,
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
    AccessIcon as Lock
} from '@hugeicons/core-free-icons';

// --- PILLAR 1: COLOR ARCHITECTURE ---
const colors = {
    brand: [
        { name: 'Ekonty Brand', hex: '#0b8260', role: 'Primary Brand Color' },
        { name: 'Brand Surface', hex: '#e6f4f2', role: 'Secondary / Surface Color' },
    ],
    semantic: [
        { name: 'Success', hex: '#10B981', role: 'Positive actions, confirmations' },
        { name: 'Warning', hex: '#F59E0B', role: 'Cautions, pending states' },
        { name: 'Danger', hex: '#F43F5E', role: 'Errors, destructive actions' },
        { name: 'Info', hex: '#3B82F6', role: 'Informational messages' },
    ],
    neutrals: [
        { label: '50', hex: '#F8FAFC' },
        { label: '100', hex: '#F1F5F9' },
        { label: '200', hex: '#E2E8F0' },
        { label: '300', hex: '#CBD5E1' },
        { label: '400', hex: '#94A3B8' },
        { label: '500', hex: '#64748B' },
        { label: '600', hex: '#475569' },
        { label: '700', hex: '#334155' },
        { label: '800', hex: '#1E293B' },
        { label: '900', hex: '#0F172A' },
    ]
};

const ColorPalette = () => (
    <div className="space-y-8">
        <section>
            <h3 className="text-xl font-semibold mb-4 font-heading">Brand Palette</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colors.brand.map((color) => (
                    <div key={color.hex} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                        <div className="w-full h-24 rounded-xl mb-3 shadow-inner" style={{ backgroundColor: color.hex }}></div>
                        <p className="font-bold text-slate-800">{color.name}</p>
                        <p className="text-sm text-slate-500 uppercase">{color.hex}</p>
                        <p className="text-xs text-slate-400 mt-2 text-center">{color.role}</p>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h3 className="text-xl font-semibold mb-4 font-heading">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colors.semantic.map((color) => (
                    <div key={color.name} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                        <div className="w-full h-20 rounded-xl mb-3 shadow-inner" style={{ backgroundColor: color.hex }}></div>
                        <p className="font-bold text-slate-800">{color.name}</p>
                        <p className="text-sm text-slate-500 uppercase">{color.hex}</p>
                        <p className="text-xs text-slate-400 mt-2 text-center">{color.role}</p>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h3 className="text-xl font-semibold mb-4 font-heading">Neutral Palette (Slate)</h3>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                    {colors.neutrals.map((shade) => (
                        <div key={shade.label} className="flex flex-col items-center">
                            <div
                                className="w-full h-12 rounded-lg mb-2 border border-slate-200"
                                style={{ backgroundColor: shade.hex }}
                            ></div>
                            <span className="text-[10px] font-bold text-slate-600">{shade.label}</span>
                            <span className="text-[8px] text-slate-400 uppercase">{shade.hex}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
);

// --- PILLAR 2: TYPOGRAPHY HIERARCHY ---
const typography = [
    { name: 'Display', size: '48px', weight: '700', family: 'Inter', class: 'text-[48px] font-bold leading-tight font-heading' },
    { name: 'Heading 1', size: '36px', weight: '700', family: 'Inter', class: 'text-[36px] font-bold leading-tight font-heading' },
    { name: 'Heading 2', size: '30px', weight: '600', family: 'Inter', class: 'text-[30px] font-semibold leading-snug font-heading' },
    { name: 'Heading 3', size: '24px', weight: '600', family: 'Inter', class: 'text-[24px] font-semibold leading-snug font-heading' },
    { name: 'Body Text', size: '16px', weight: '400', family: 'Roboto', class: 'text-[16px] font-normal leading-relaxed font-body' },
    { name: 'Caption', size: '12px', weight: '500', family: 'Roboto', class: 'text-[12px] font-medium leading-none font-body uppercase tracking-wider' },
];

const TypographyScale = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Style</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preview</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Specs</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {typography.map((style) => (
                    <tr key={style.name}>
                        <td className="p-4 align-top">
                            <span className="text-sm font-bold text-slate-700">{style.name}</span>
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

// --- PILLAR 3: GRID & LAYOUT ---
const spacing = [4, 8, 16, 24, 32, 48, 64];

const GridLayoutSystem = () => (
    <div className="space-y-8">
        <section>
            <h3 className="text-xl font-semibold mb-4 font-heading">Spacing Scale (4px Base)</h3>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-6 items-end">
                {spacing.map((unit) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="bg-brand rounded shadow-sm mb-2" style={{ width: unit, height: unit }}></div>
                        <span className="text-xs font-bold text-slate-600">{unit}px</span>
                        <span className="text-[10px] text-slate-400">Unit {unit / 4}</span>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h3 className="text-xl font-semibold mb-4 font-heading">Container Max-Widths</h3>
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
                        <div className="bg-slate-50 h-8 rounded-lg overflow-hidden border border-dashed border-slate-200 relative">
                            <div
                                className="bg-brand/10 h-full border-x border-brand/20 flex items-center justify-center transition-all duration-500"
                                style={{ width: container.label === 'Mobile' ? '100%' : container.width, margin: '0 auto' }}
                            >
                                <span className="text-[10px] font-bold text-brand">{container.width}</span>
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
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: IconSvgElement;
    fullWidth?: boolean;
}

const Button = ({ variant = 'primary', size = 'md', children, isLoading = false, icon: Icon, fullWidth = false, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-brand text-white shadow-sm hover:bg-brand/90 hover:shadow-md focus-visible:ring-brand",
        secondary: "bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 focus-visible:ring-slate-400",
        outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-200",
        icon: "p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 focus-visible:ring-slate-400"
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
const CardShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Type 1: Text-Only Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
            <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4">
                    Product Update
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 font-heading leading-tight">Empowering Marketplace Operations</h4>
                <p className="text-slate-600 text-sm font-body leading-relaxed mb-6">
                    Our design system bridges the gap between complex operations and intuitive human interaction, ensuring every user feels in control.
                </p>
            </div>
            <button className="text-brand text-sm font-bold inline-flex items-center group-hover:gap-2 transition-all">
                Learn more <HugeiconsIcon icon={ArrowRight} size={16} className="ml-1" />
            </button>
        </div>

        {/* Type 2: Image + Text Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="h-48 w-full overflow-hidden relative">
                <img src="/images/card-banner.png" alt="Marketplace Banner" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wider">New Arrival</span>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-heading">Vibrant Listing Styles</h4>
                <p className="text-slate-600 text-xs font-body leading-relaxed mb-4">
                    Discover how our new visual architecture enhances standard product listings with dynamic motion.
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-brand font-bold text-sm">$299.00</span>
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand hover:bg-brand/5 transition-colors">
                        <HugeiconsIcon icon={Plus} size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Type 3: User Details Card */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-brand/20 p-1 relative">
                    <img src="/images/card-avatar.png" alt="User Avatar" className="w-14 h-14 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">Sarah David</h4>
                    <p className="text-slate-500 text-xs font-medium">Verified 4.9 ★★★★★</p>
                </div>
            </div>
            <p className="text-slate-600 text-sm font-body leading-relaxed mb-6 italic">
                "Ekonty has completely transformed how I manage my boutique operations. The interface is just so intuitive!"
            </p>
            <div className="flex gap-2">
                <Button variant="secondary" size="sm" fullWidth>Message</Button>
                <Button variant="primary" size="sm" fullWidth>View Profile</Button>
            </div>
        </div>
    </div>
);

// --- PILLAR 7: INTERACTION & MOTION ---
const InteractionShowcase = () => {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase">Hover Effect</p>
                    <div className="h-20 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-brand hover:text-white hover:scale-105 transition-all duration-300 group">
                        <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">Hover Me</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase">Active State</p>
                    <div
                        onClick={() => setClicked(!clicked)}
                        className={`h-20 w-full rounded-xl flex items-center justify-center cursor-pointer select-none transition-all duration-100 shadow-sm
              ${clicked ? 'scale-95 bg-slate-800 text-white shadow-inner' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
            `}
                    >
                        <span className="text-sm font-bold">{clicked ? 'Clicked!' : 'Click Me'}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase">Focus State</p>
                    <button className="h-20 w-full bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:border-brand transition-all">
                        <span className="text-sm font-bold text-slate-600">Tab to Focus</span>
                    </button>
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase">Motion (Scale)</p>
                    <div className="h-20 w-full bg-success/10 border border-success/20 rounded-xl flex items-center justify-center cursor-pointer group hover:rotate-2 transition-transform duration-300">
                        <HugeiconsIcon icon={CheckCircle} className="w-8 h-8 text-success group-hover:scale-125 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface SectionProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
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

// --- MAIN PAGE LAYOUT ---
const EkontyDesignSystem = () => {
    const [activeTab, setActiveTab] = useState('Foundation');

    const navigation = [
        { name: 'Foundation', icon: Home },
        { name: 'Colors', icon: Colors },
        { name: 'Typography', icon: Typography },
        { name: 'Layout', icon: Layout },
        { name: 'Components', icon: Atoms },
        { name: 'Assets', icon: Icons },
        { name: 'Cards', icon: User },
        { name: 'Interactions', icon: Motion }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden lg:block py-6 px-5 z-10">
                <div className="mb-6 flex items-center px-4">
                    <img src="/images/logo.png" alt="Ekonty Logo" className="h-6 w-auto object-contain" />
                </div>

                <nav className="space-y-0.5">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
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

                <header className="sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-md z-[5] px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span>Documentation</span>
                        <HugeiconsIcon icon={ChevronRight} size={14} />
                        <span className="text-slate-900 font-bold">{activeTab}</span>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" icon={Send}>Feedback</Button>
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
                            <ColorPalette />
                        </Section>
                    )}

                    {activeTab === 'Typography' && (
                        <Section
                            title="Typography Scale"
                            subtitle="We use Outfit for a modern, confident heading style and Plus Jakarta Sans for an incredibly readable body text.">
                            <TypographyScale />
                        </Section>
                    )}

                    {activeTab === 'Layout' && (
                        <Section
                            title="Grid & Layout"
                            subtitle="Everything is built on a 4px grid. This ensures perfect alignment and consistent spacing across all touchpoints.">
                            <GridLayoutSystem />
                        </Section>
                    )}

                    {activeTab === 'Components' && (
                        <Section
                            title="Component Library"
                            subtitle="A collection of atomic elements used to build complex interfaces. Every component is designed with interactive states.">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold font-heading">Buttons</h3>
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
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
                                    <h3 className="text-xl font-semibold font-heading">Form Inputs</h3>
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-6">
                                        <Input label="Email Address" placeholder="e.g. john@example.com" icon={Mail} />
                                        <Input label="Password" type="password" placeholder="Enter your password" icon={Lock} />
                                        <Input label="Username" placeholder="ekonty_user" icon={User} error="This username is already taken." />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold font-heading">Search & Specialized Inputs</h3>
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-6">
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
                                    <div className="space-y-4">
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
                            </div>
                        </Section>
                    )}

                    {activeTab === 'Assets' && (
                        <Section
                            title="Iconography & Imagery"
                            subtitle="We use Hugeicons for a clean, consistent stroke style. Standardized sizes ensure visual balance across the UI.">
                            <div className="space-y-12">
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
                                        {[
                                            Search, Send, Settings, Bell, CheckCircle, AlertTriangle,
                                            XOctagon, Info, Eye, Plus, Trash2, MoreVertical,
                                            ArrowRight, ChevronRight, X, Loader2
                                        ].map((Icon, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:text-brand transition-colors cursor-help">
                                                    <HugeiconsIcon icon={Icon} size={24} />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">24px</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold font-heading">Media Placeholder</h3>
                                    <div className="max-w-xl">
                                        <MediaPlaceholder title="Marketplace Listing Image" />
                                    </div>
                                </div>
                            </div>
                        </Section>
                    )}

                    {activeTab === 'Cards' && (
                        <Section
                            title="Voice & Card Layouts"
                            subtitle="Our components scale seamlessly across different content types. Here is how we handle text-heavy, media-focused, and profile-based cards.">
                            <CardShowcase />
                        </Section>
                    )}

                    {activeTab === 'Interactions' && (
                        <Section
                            title="Interaction & Motion"
                            subtitle="Animation should be purposeful and subtle. We use physics-based transitions to make the UI feel reactive and alive.">
                            <InteractionShowcase />
                        </Section>
                    )}
                </div>
            </main>

            {/* Mobile Navigation */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-2 flex justify-around items-center z-50">
                {navigation.filter(item => ['Components', 'Colors', 'Foundation', 'Layout'].includes(item.name)).map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all
              ${activeTab === item.name ? 'bg-brand text-white shadow-lg' : 'text-slate-500'}
            `}
                    >
                        <HugeiconsIcon icon={item.icon} size={18} />
                        {item.name}
                    </button>
                ))}
                <button
                    onClick={() => setActiveTab('Cards')}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-bold transition-all
            ${['Assets', 'Cards', 'Interactions'].includes(activeTab) ? 'bg-brand text-white shadow-lg' : 'text-slate-500'}
          `}
                >
                    <HugeiconsIcon icon={MoreVertical} size={18} />
                    More
                </button>
            </div>
        </div >
    );
};

export default EkontyDesignSystem;
