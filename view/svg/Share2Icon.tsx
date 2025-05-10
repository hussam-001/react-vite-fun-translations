const Share2Icon = (props: React.SVGProps<SVGSVGElement>) => (
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
        className="lucide lucide-share2-icon lucide-share-2"
        {...props}
    >
        <circle cx={18} cy={5} r={3} />
        <circle cx={6} cy={12} r={3} />
        <circle cx={18} cy={19} r={3} />
        <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
)
export default Share2Icon;
