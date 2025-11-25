import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axiosInstance from "../../api/axios.ts"
import loginImage from "../../assets/images/login_prokids.png"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 로그인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError("")

      const response = await axiosInstance.post("/login", { email, password })

      const data = response as any

      if (data && data.accessToken) {
        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          sameSite: "None"
        })
        alert("🎉로그인 성공! 관리자님 반갑습니다!")
        navigate("/dashboard")
      } else {
        setError("로그인에 실패했습니다.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
          {/* Image */}
          <div className="w-1/2 hidden lg:block">
            <img
              src={loginImage}
              alt="로그인 이미지"
              className="w-full h-full object-cover"
            />
          </div>

          {/* login form */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center min-h-[500px] dark:bg-zinc-700">
            <img src="/logo/proKids_logo.svg" alt="ProKids Logo" className="h-9 mb-3" />
            <h1 className="text-4xl text-[#33BB9A] font-extrabold text-center mb-6">관리자 로그인</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#33BB9A]"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#33BB9A]"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary-main text-white text-lg font-semibold tracking-wide uppercase rounded-md cursor-pointerhover:bg-[#2BAA8B] focus:outline-none focus:ring-2 focus:ring-[#33BB9A]"
                  disabled={isLoading}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login