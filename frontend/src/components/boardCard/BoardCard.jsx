import { useTheme } from "../../contexts/theme/ThemeProvider"
import { useNavigate } from "react-router-dom"
const BoardCard = ({ board }) => {
    const { theme } = useTheme()
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-4 rounded-xl px-4 py-3 mb-3 w-full h-20 cursor-pointer hover:shadow-lg transition"
            style={{
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.cardBackground,
                color: theme.text,
                maxWidth: "420px",
            }}
            onClick={() => navigate(`/boards/${board?._id}/${board?.title}`)}
        >
            <div
                className="flex items-center justify-center rounded-lg"
                style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: theme.iconBackground || "#e5e7eb",
                }}
            >
                {/* Grid icon */}
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme.text}
                    strokeWidth="2"
                >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                </svg>
            </div>

            <div className="flex flex-col">
                <span className="font-semibold text-base">
                    {board.title}
                </span>
                <span className="text-sm opacity-70">
                    Created {new Date(board.createdAt.$date).toLocaleDateString()}
                </span>
            </div>
        </div>
    )
}
export default BoardCard