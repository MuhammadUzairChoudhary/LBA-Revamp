import { BrowserRouter } from "react-router-dom"
import AppRouter from "../src/AppRouter"

export default function Page() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
