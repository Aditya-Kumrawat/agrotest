import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google authentication
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-agro-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-3 border-b border-agro-border bg-white">
        <div className="flex items-center gap-4">
          <div className="flex">
            <svg
              width="16"
              height="16"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.6087 8.1912C3.57343 7.96087 4.74147 7.8261 6 7.8261C7.25853 7.8261 8.42657 7.96087 9.3913 8.1912C10.3048 8.40927 11.3322 8.9223 11.7854 9.2784L6.28287 0.45363C6.15237 0.244343 5.84763 0.244343 5.71713 0.45363L0.21458 9.2784C0.66777 8.9223 1.6952 8.40927 2.6087 8.1912Z"
                fill="#0D1A12"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3327 10.9213C12.3315 10.9154 12.3292 10.9052 12.3249 10.8902C12.3145 10.8534 12.2983 10.8086 12.2782 10.7608C12.2723 10.7468 12.2663 10.7331 12.2604 10.7201C11.8368 10.4296 10.9929 10.0202 10.2365 9.83963C9.32917 9.62303 8.21377 9.49277 7 9.49277C5.78623 9.49277 4.67083 9.62303 3.7635 9.83963C3.0004 10.0218 2.14835 10.4368 1.72846 10.7277C1.72461 10.7358 1.72072 10.7443 1.71684 10.7531C1.69973 10.7917 1.68574 10.8295 1.67659 10.863C1.66785 10.8949 1.6668 10.9111 1.66668 10.9129C1.66667 10.9131 1.66668 10.913 1.66668 10.9129C1.66668 10.9214 1.67013 11.0256 1.89495 11.2105C2.11515 11.3915 2.47407 11.5844 2.97637 11.7591C3.97473 12.1063 5.3973 12.3333 7 12.3333C8.6027 12.3333 10.0253 12.1063 11.0236 11.7591C11.5259 11.5844 11.8848 11.3915 12.105 11.2105C12.3002 11.05 12.3286 10.9504 12.3327 10.9213ZM0.650593 9.92293L6.15143 1.10089C6.54293 0.473033 7.45707 0.47303 7.84857 1.10089L13.3511 9.92567C13.357 9.93507 13.3626 9.9446 13.368 9.9543L12.7854 10.2784C13.368 9.9543 13.3679 9.9542 13.368 9.9543L13.3684 9.955L13.3688 9.95583L13.37 9.95797L13.3733 9.96393C13.3759 9.96867 13.3792 9.97487 13.3832 9.98243C13.3913 9.9975 13.4021 10.0182 13.4147 10.0433C13.4397 10.0931 13.4732 10.163 13.5072 10.2439C13.5634 10.3774 13.6667 10.6437 13.6667 10.913C13.6667 11.4809 13.3343 11.9258 12.9519 12.2403C12.5649 12.5586 12.0451 12.8155 11.4617 13.0184C10.2885 13.4265 8.711 13.6667 7 13.6667C5.289 13.6667 3.71153 13.4265 2.53833 13.0184C1.95488 12.8155 1.4351 12.5586 1.04806 12.2403C0.66565 11.9258 0.33333 11.4809 0.33333 10.913C0.33333 10.6242 0.43088 10.3641 0.497737 10.2131C0.534583 10.1299 0.57116 10.0601 0.598957 10.0104C0.612993 9.9852 0.625157 9.9645 0.6345 9.94903C0.63918 9.94127 0.64318 9.93477 0.646387 9.92963L0.648873 9.92567L0.650593 9.92293ZM10.9956 8.668L7 2.25999L3.00437 8.668C3.15537 8.6203 3.30597 8.57807 3.4539 8.54273C4.47603 8.2987 5.6967 8.15943 7 8.15943C8.3033 8.15943 9.52397 8.2987 10.5461 8.54273C10.694 8.57807 10.8446 8.6203 10.9956 8.668Z"
                fill="#0D1A12"
              />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-agro-text-primary">
            AgroSaarthi
          </h1>
        </div>
        <button className="agro-button-primary text-sm px-4 py-2">
          Sign Up
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-agro-text-primary mb-3">
              Welcome back
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full agro-input"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full agro-input"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full agro-button-primary h-12 text-base"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-agro-text-muted mb-4">
              Or continue with
            </p>
            <button
              onClick={handleGoogleLogin}
              className="w-full agro-button-secondary h-12 text-base flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5 8C15.5002 11.6456 12.8788 14.7633 9.28732 15.3891C5.6958 16.0148 2.17452 13.9673 0.941785 10.5364C-0.290948 7.10558 1.12197 3.28518 4.29043 1.48203C7.45889 -0.321131 11.4651 0.415282 13.7852 3.22734C13.9371 3.3983 13.9835 3.6386 13.9062 3.85384C13.8289 4.06909 13.6401 4.22491 13.4141 4.26009C13.1881 4.29528 12.961 4.20421 12.8219 4.02266C10.9264 1.72439 7.67233 1.08336 5.04684 2.49105C2.42136 3.89874 1.15434 6.96382 2.01955 9.81447C2.88476 12.6651 5.64168 14.5089 8.60667 14.2198C11.5717 13.9307 13.9205 11.5891 14.2188 8.625H8C7.65482 8.625 7.375 8.34518 7.375 8C7.375 7.65482 7.65482 7.375 8 7.375H14.875C15.2202 7.375 15.5 7.65482 15.5 8Z"
                  fill="#0D1A12"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-agro-text-muted">
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
