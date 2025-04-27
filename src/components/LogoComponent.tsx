import { useNavigate } from "react-router-dom"

export const LogoComponent = () => {
  const navigate = useNavigate()

  return (
    <button
      className="text-red-400 font-montserrat cursor-pointer"
      onClick={() => navigate("/")}>
      <span className="font-extrabold">netflix</span>
      <span className="font-medium">roulette</span>
    </button>
  )
}
