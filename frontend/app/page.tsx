import Link from "next/link";

export default function HomePage() {
  return (
    <main className= "min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100" >

    {/* Hero */ }

    < section className = "mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center" >

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700" >
          🚀 AI Powered Career Platform
    </span>

    < h1 className = "mt-8 max-w-4xl text-6xl font-extrabold leading-tight" >
      Build Better Careers with
          <span className= "text-blue-600" >
    { " "}Artificial Intelligence
      </span>
      </h1>

      < p className = "mt-8 max-w-3xl text-xl text-gray-600" >
        Upload your resume, analyze your skills,
          tailor resumes for every job, generate cover letters,
            practice interviews, and discover your perfect job —
          all powered by AI.
        </p>

    < div className = "mt-12 flex flex-wrap justify-center gap-5" >

      <Link
            href="/register"
  className = "rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
    >
    Get Started
      </Link>

      < Link
  href = "/login"
  className = "rounded-xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold transition hover:bg-gray-100"
    >
    Login
    </Link>

    </div>

    </section>

  {/* Features */ }

  <section className="mx-auto max-w-7xl px-6 pb-24" >

    <h2 className="mb-12 text-center text-4xl font-bold" >
      Everything You Need
        </h2>

        < div className = "grid gap-8 md:grid-cols-2 lg:grid-cols-3" >

        {
          [
          "Resume Analyzer",
          "Resume Tailoring",
          "Cover Letter Generator",
          "Mock Interview",
          "Job Match Score",
          "Career Advisor",
          ].map((feature) => (
            <div
              key= { feature }
              className = "rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
            <h3 className="mb-3 text-xl font-bold" >
            { feature }
            </h3>

          < p className = "text-gray-600" >
          AI - powered tools to accelerate your job search
                and improve your hiring success.
              </p>
          </div>
          ))
        }

          </div>

          </section>

  {/* CTA */ }

  <section className="bg-blue-600 py-20 text-center text-white" >

    <h2 className="text-5xl font-bold" >
      Ready to Get Hired Faster ?
        </h2>

        < p className = "mx-auto mt-6 max-w-3xl text-lg" >
          Join thousands of candidates using AI to build
          better resumes and land interviews.
        </p>

    < Link
  href = "/register"
  className = "mt-10 inline-block rounded-xl bg-white px-10 py-4 text-lg font-bold text-blue-600 transition hover:bg-gray-100"
    >
    Create Free Account
      </Link>

      </section>

      </main>
  );
}