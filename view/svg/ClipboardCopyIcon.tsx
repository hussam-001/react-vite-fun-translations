const ClipboardCopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        className="lucide lucide-clipboard-copy-icon lucide-clipboard-copy"
        {...props}
    >
        <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4M21 14H11" />
        <path d="m15 10-4 4 4 4" />
    </svg>
)
export default ClipboardCopyIcon;
