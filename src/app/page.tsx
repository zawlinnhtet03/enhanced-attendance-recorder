export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-aqua px-8 py-16 text-white shadow-sm">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm uppercase tracking-widest text-aqua-300">Xtrameet-style Platform</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Enhanced Attendance Management System
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Transform check-ins with QR codes, real-time analytics, and a modern admin dashboard. Minimal setup, enterprise-ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/login" className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-brand shadow hover:bg-white/90 transition">Get Started</a>
            <a href="#features" className="rounded-lg border border-white/30 px-6 py-3 text-sm text-white hover:bg-white/10 transition">Request Demo</a>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Everything You Need for Successful Events</h2>
          <p className="mx-auto max-w-3xl text-gray-600">A complete toolkit to create, manage, and analyze attendance for workshops and seminars.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Workshop Management */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </span>
            <div className="feature-title">Workshop Management</div>
            <p className="feature-desc">Create and manage sessions with integrated QR code check-in.</p>
          </div>

          {/* Real-time Analytics */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M3 3v18h18"/>
                <path d="M7 15l3-3 3 2 4-5"/>
              </svg>
            </span>
            <div className="feature-title">Real-time Analytics</div>
            <p className="feature-desc">Monitor participation to understand effectiveness.</p>
          </div>

          {/* Resource Sharing */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
              </svg>
            </span>
            <div className="feature-title">Resource Sharing</div>
            <p className="feature-desc">Securely share docs and materials before, during, after events.</p>
          </div>

          {/* Role-based Access */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M12 17a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"/>
                <path d="M19 21v-2a4 4 0 0 0-3-3.87M5 21v-2a4 4 0 0 1 3-3.87"/>
              </svg>
            </span>
            <div className="feature-title">Role-based Access</div>
            <p className="feature-desc">Admin-only dashboard with route protection.</p>
          </div>

          {/* Interactive Tools */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M21 15V6a2 2 0 0 0-2-2H6"/>
                <path d="M3 9v9a2 2 0 0 0 2 2h13"/>
                <path d="M7 9h10v6H7z"/>
              </svg>
            </span>
            <div className="feature-title">Interactive Quizzes & Polls</div>
            <p className="feature-desc">Boost engagement with real-time polls and quizzes.</p>
          </div>

          {/* Certificates */}
          <div className="feature-card">
            <span className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M4 4h16v12H4z"/>
                <path d="M8 22l4-2 4 2v-6H8z"/>
              </svg>
            </span>
            <div className="feature-title">Certificate Generation</div>
            <p className="feature-desc">Automatically issue completion certificates.</p>
          </div>
        </div>
      </section>

      {/* SOLUTIONS ROW */}
      <section id="about" className="mt-16 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-medium">Create & Schedule</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Easy workshop creation wizard</li>
              <li>Flexible scheduling options</li>
              <li>Automatic notifications</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Engage & Interact</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Live interactive quizzes</li>
              <li>Real-time polling</li>
              <li>QR check-in for attendance</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Analyze & Improve</h3>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Detailed engagement reports</li>
              <li>Performance analytics</li>
              <li>Actionable insights</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (simple) */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold">What Our Users Say</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {["“This simplified our entire check-in process.”", "“Clean UI and fast setup.”", "“Great for workshops and seminars.”"].map((q, i) => (
            <div key={i} className="card p-6 text-sm text-gray-700">{q}</div>
          ))}
        </div>
      </section>

      {/* PRICING CTA */}
      <section id="pricing" className="mt-16 rounded-2xl bg-gradient-to-br from-brand to-aqua p-8 text-white shadow-sm">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-semibold">Ready to Transform Your Events?</h3>
          <p className="mt-2 text-white/85">Join teams using our platform to deliver engaging workshops and seminars.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="/login" className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-brand hover:bg-white/90 transition">Get Started</a>
            <a href="#contact" className="rounded-lg border border-white/30 px-6 py-3 text-sm text-white hover:bg-white/10 transition">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="mt-16 rounded-2xl border bg-white p-8 text-sm text-gray-600 shadow-sm">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-semibold text-brand-700">Attendance Recorder</div>
            <p className="mt-2">Enhanced attendance management.</p>
          </div>
          <div>
            <div className="mb-2 font-medium">Product</div>
            <ul className="space-y-1">
              <li><a className="hover:text-brand-700" href="#features">Features</a></li>
              <li><a className="hover:text-brand-700" href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-medium">Resources</div>
            <ul className="space-y-1">
              <li><a className="hover:text-brand-700" href="#about">About</a></li>
              <li><a className="hover:text-brand-700" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-medium">Admin</div>
            <a className="rounded-md bg-brand px-3 py-2 text-white hover:bg-brand-700" href="/login">Log In</a>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Attendance Recorder. All rights reserved.</div>
      </footer>
    </>
  );
}
