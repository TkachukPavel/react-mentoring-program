import { RouterProvider } from "react-router-dom"
import "./App.css"
import { appRoutes } from "./routes/app.routes"

function App() {
  return <RouterProvider router={appRoutes} />
}

export default App
