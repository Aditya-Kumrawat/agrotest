import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-agro-background border-b border-agro-border">
        <div className="flex items-center justify-between px-10 py-3">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex">
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
                  d="M0.333333 0.333333H4.7778V4.7778H9.2222V9.2222H13.6667V13.6667H0.333333V0.333333Z"
                  fill="#0D1A12"
                />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-agro-text-primary">
              AgroSaarthi
            </h1>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-9">
            <a
              href="#overview"
              className="text-sm font-medium text-agro-text-primary hover:text-agro-primary transition-colors"
            >
              Overview
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-agro-text-primary hover:text-agro-primary transition-colors"
            >
              Features
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link to="/login" className="agro-button-primary text-sm px-4 py-2">
              Get Started
            </Link>
            <Link
              to="/login"
              className="agro-button-secondary text-sm px-4 py-2"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[800px] bg-agro-background">
        <div className="container mx-auto px-4 py-20 md:px-40">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[480px] rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40 rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://cdn.builder.io/api/v1/image/assets/TEMP/188594f5620caa852e72ade08095f8a2a742cacd?width=1856')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <div className="max-w-4xl space-y-2">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                      Predict Crop Disease Before It Strikes
                    </h1>
                    <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto">
                      Leverage advanced CNN models to identify potential
                      diseases in your crops early, ensuring healthier yields
                      and minimizing losses.
                    </p>
                  </div>
                  <Link
                    to="/login"
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-agro-primary text-agro-text-primary font-bold rounded-lg hover:bg-agro-primary-dark transition-colors text-base"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-agro-text-primary mb-4">
              Project Overview
            </h2>
            <p className="text-base text-agro-text-primary leading-relaxed">
              AgroSaarthi is a web application designed to assist farmers in
              early detection of crop diseases. By utilizing state-of-the-art
              Convolutional Neural Network (CNN) models, the application
              analyzes images of crops to identify potential diseases before
              they spread, allowing for timely intervention and treatment. This
              proactive approach helps farmers maintain healthier crops,
              increase yields, and reduce economic losses associated with
              disease outbreaks.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 bg-agro-background">
        <div className="container mx-auto px-4 md:px-40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-agro-text-primary mb-4">
              Key Features
            </h2>

            {/* Feature Header */}
            <div className="mb-10">
              <h3 className="text-3xl md:text-4xl font-black text-agro-text-primary mb-4 tracking-tight">
                Empowering Farmers with Advanced Technology
              </h3>
              <p className="text-base text-agro-text-primary">
                AgroSaarthi provides a suite of tools designed to make crop
                disease management easier and more effective.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="agro-card border border-agro-border-secondary bg-agro-background">
                <div className="w-6 h-6 mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.5 2.25H14.9013L13.6234 0.33375C13.4844 0.125363 13.2505 0.000150442 13 0H7C6.74949 0.000150442 6.51559 0.125363 6.37656 0.33375L5.09781 2.25H2.5C1.25736 2.25 0.25 3.25736 0.25 4.5V15C0.25 16.2426 1.25736 17.25 2.5 17.25H17.5C18.7426 17.25 19.75 16.2426 19.75 15V4.5C19.75 3.25736 18.7426 2.25 17.5 2.25ZM18.25 15C18.25 15.4142 17.9142 15.75 17.5 15.75H2.5C2.08579 15.75 1.75 15.4142 1.75 15V4.5C1.75 4.08579 2.08579 3.75 2.5 3.75H5.5C5.75084 3.75016 5.98516 3.62491 6.12438 3.41625L7.40125 1.5H12.5978L13.8756 3.41625C14.0148 3.62491 14.2492 3.75016 14.5 3.75H17.5C17.9142 3.75 18.25 4.08579 18.25 4.5V15ZM10 5.25C7.72183 5.25 5.875 7.09683 5.875 9.375C5.875 11.6532 7.72183 13.5 10 13.5C12.2782 13.5 14.125 11.6532 14.125 9.375C14.1224 7.0979 12.2771 5.25258 10 5.25ZM10 12C8.55025 12 7.375 10.8247 7.375 9.375C7.375 7.92525 8.55025 6.75 10 6.75C11.4497 6.75 12.625 7.92525 12.625 9.375C12.625 10.8247 11.4497 12 10 12Z"
                      fill="#0D1A12"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-agro-text-primary mb-1">
                  Image Analysis
                </h4>
                <p className="text-sm text-agro-text-muted">
                  Upload images of your crops directly from your smartphone or
                  camera for immediate analysis.
                </p>
              </div>

              <div className="agro-card border border-agro-border-secondary bg-agro-background">
                <div className="w-6 h-6 mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.5306 18.4694L14.8366 13.7762C17.6629 10.383 17.3204 5.36693 14.0591 2.38935C10.7978 -0.588237 5.77134 -0.474001 2.64867 2.64867C-0.474001 5.77134 -0.588237 10.7978 2.38935 14.0591C5.36693 17.3204 10.383 17.6629 13.7762 14.8366L18.4694 19.5306C18.7624 19.8237 19.2376 19.8237 19.5306 19.5306C19.8237 19.2376 19.8237 18.7624 19.5306 18.4694ZM1.75 8.5C1.75 4.77208 4.77208 1.75 8.5 1.75C12.2279 1.75 15.25 4.77208 15.25 8.5C15.25 12.2279 12.2279 15.25 8.5 15.25C4.77379 15.2459 1.75413 12.2262 1.75 8.5Z"
                      fill="#0D1A12"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-agro-text-primary mb-1">
                  Disease Identification
                </h4>
                <p className="text-sm text-agro-text-muted">
                  Our CNN models accurately identify a wide range of common crop
                  diseases, providing detailed information about each.
                </p>
              </div>

              <div className="agro-card border border-agro-border-secondary bg-agro-background">
                <div className="w-6 h-6 mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 0.75H1.5C0.671573 0.75 0 1.42157 0 2.25V7.76062C0 16.1616 7.10812 18.9487 8.53125 19.4222C8.8352 19.5256 9.1648 19.5256 9.46875 19.4222C10.8938 18.9487 18 16.1616 18 7.76062V2.25C18 1.42157 17.3284 0.75 16.5 0.75ZM16.5 7.76156C16.5 15.1134 10.2797 17.5697 9 17.9972C7.73156 17.5744 1.5 15.12 1.5 7.76156V2.25H16.5V7.76156ZM4.71938 10.2806C4.42632 9.98757 4.42632 9.51243 4.71938 9.21937C5.01243 8.92632 5.48757 8.92632 5.78063 9.21937L7.5 10.9388L12.2194 6.21937C12.5124 5.92632 12.9876 5.92632 13.2806 6.21937C13.5737 6.51243 13.5737 6.98757 13.2806 7.28063L8.03063 12.5306C7.88995 12.6715 7.69906 12.7506 7.5 12.7506C7.30094 12.7506 7.11005 12.6715 6.96937 12.5306L4.71938 10.2806Z"
                      fill="#0D1A12"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-agro-text-primary mb-1">
                  Preventive Measures
                </h4>
                <p className="text-sm text-agro-text-muted">
                  Receive recommendations and best practices for preventing
                  disease spread and maintaining crop health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Showcase Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-3 tracking-tight">
                Agrosaarthi - Analytics Dashboard
              </h2>
              <p className="text-xl md:text-2xl text-black/50 tracking-tight max-w-4xl mx-auto">
                Welcome to Agrosaarthi's Analytics Dashboard, where farmers can
                monitor the health and status of their crops with interactive
                analytics and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-3xl p-5 pb-10">
                <div className="h-72 bg-white rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f599054608d203b653582af21ef2b27765564cf7?width=716"
                      alt="Interactive Dashboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-black mb-3 tracking-tight">
                  Interactive Dashboard
                </h3>
                <p className="text-lg text-black/50 tracking-tight">
                  View real-time analytics and insights to track the progress of
                  your crops.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 pb-10">
                <div className="h-72 bg-white rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bee4f9f329547cb2a6771b3ad68ead41a422a11c?width=1017"
                      alt="Health Monitoring"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-black mb-3 tracking-tight">
                  Health Monitoring
                </h3>
                <p className="text-lg text-black/50 tracking-tight">
                  Monitor the health of your plants and receive recommendations
                  for curing diseases.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 pb-10">
                <div className="h-72 bg-white rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/020e049b87cf945f701b21194279374dfa119b23?width=999"
                      alt="Forecasting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-black mb-3 tracking-tight">
                  Forecasting
                </h3>
                <p className="text-lg text-black/50 tracking-tight">
                  Get forecasts on crop growth and weather conditions to plan
                  ahead.
                </p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-5 pb-10">
                <div className="h-72 bg-white rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a711c567545567664e5f78f271e67bbc8bb69ca1?width=716"
                      alt="Chatbot Assistance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-black mb-3 tracking-tight">
                  Chatbot Assistance
                </h3>
                <p className="text-lg text-black/50 tracking-tight">
                  Engage with our chatbot for instant help and guidance on
                  farming practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Detection Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                Disease Detection
              </h2>
              <p className="text-xl md:text-2xl text-black/60 tracking-tight max-w-4xl">
                Identify and diagnose plant diseases with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl md:text-4xl font-black text-black mb-3 tracking-tight">
                  Advanced Diagnosis
                </h3>
                <p className="text-lg md:text-2xl text-black/50 tracking-tight">
                  Cutting-edge technology to accurately detect plant diseases.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl md:text-4xl font-black text-black mb-3 tracking-tight">
                  Analytics Insights
                </h3>
                <p className="text-lg md:text-2xl text-black/50 tracking-tight">
                  Get detailed analytics on disease patterns for informed
                  decisions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl md:text-4xl font-black text-black mb-3 tracking-tight">
                  Forecasting Tools
                </h3>
                <p className="text-lg md:text-2xl text-black/50 tracking-tight">
                  Predict future disease outbreaks to take proactive measures.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl md:text-4xl font-black text-black mb-3 tracking-tight">
                  Interactive Chatbot
                </h3>
                <p className="text-lg md:text-2xl text-black/50 tracking-tight">
                  Chat with our AI assistant for instant disease diagnosis and
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-12 tracking-tight">
              FAQ
            </h2>

            <div className="border-2 border-gray-50 rounded-3xl overflow-hidden">
              <div className="bg-gray-50 p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-4xl font-black text-black tracking-tight">
                    How does the Diagnosis Tool work?
                  </h3>
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-black">+</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-lg md:text-2xl text-black tracking-tight">
                  The Diagnosis Tool allows farmers to input symptoms observed
                  in their plants and receive a diagnosis for plant diseases.
                  This aids in effective treatment and helps farmers take
                  necessary actions to protect their crops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <a
                  href="#"
                  className="text-agro-text-muted hover:text-agro-primary transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="text-agro-text-muted hover:text-agro-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.5291 5.095C19.9925 3.59994 19.8096 1.97919 19.0247 0.625C18.8907 0.392897 18.643 0.24994 18.375 0.25C16.6036 0.246292 14.9349 1.08067 13.875 2.5H11.625C10.5651 1.08067 8.89638 0.246292 7.125 0.25C6.85699 0.24994 6.60932 0.392897 6.47531 0.625C5.69035 1.97919 5.50747 3.59994 5.97094 5.095C5.50756 5.9038 5.25934 6.81791 5.25 7.75V8.5C5.25326 11.1241 7.19154 13.3436 9.79125 13.7003C9.27807 14.357 8.99952 15.1666 9 16V16.75H6.75C5.50736 16.75 4.5 15.7426 4.5 14.5C4.5 12.4289 2.82107 10.75 0.75 10.75C0.335786 10.75 0 11.0858 0 11.5C0 11.9142 0.335786 12.25 0.75 12.25C1.99264 12.25 3 13.2574 3 14.5C3 16.5711 4.67893 18.25 6.75 18.25H9V19.75C9 20.1642 9.33579 20.5 9.75 20.5C10.1642 20.5 10.5 20.1642 10.5 19.75V16C10.5 14.7574 11.5074 13.75 12.75 13.75C13.9926 13.75 15 14.7574 15 16V19.75C15 20.1642 15.3358 20.5 15.75 20.5C16.1642 20.5 16.5 20.1642 16.5 19.75V16C16.5005 15.1666 16.2219 14.357 15.7087 13.7003C18.3085 13.3436 20.2467 11.1241 20.25 8.5V7.75C20.2407 6.81791 19.9924 5.9038 19.5291 5.095V5.095ZM18.75 8.5C18.75 10.5711 17.0711 12.25 15 12.25H10.5C8.42893 12.25 6.75 10.5711 6.75 8.5V7.75C6.7592 7.00002 6.98373 6.26849 7.39687 5.6425C7.55345 5.43612 7.59244 5.16356 7.5 4.92156C7.10545 3.90402 7.1321 2.7713 7.57406 1.77344C8.8174 1.90719 9.9324 2.59924 10.6041 3.65406C10.7414 3.86876 10.9783 3.99905 11.2331 4H14.2659C14.5218 4.00001 14.76 3.8696 14.8978 3.65406C15.5694 2.59914 16.6844 1.90706 17.9278 1.77344C18.3692 2.77155 18.3951 3.90427 18 4.92156C17.9079 5.16109 17.9432 5.43094 18.0938 5.63875C18.511 6.26474 18.7388 6.99778 18.75 7.75V8.5Z"
                    fill="#52946B"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-agro-text-muted">
                © 2024 CropGuard. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
