export default function TermsAndConditions() {
  return (
    <div className=" min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg px-4 py-12">
        <h1 className="text-xl  lg:text-4xl font-bold text-gray-900 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-8">
          These Terms and Conditions govern the use of{" "}
          <span className="font-semibold">Pro Elite Holdings</span>
          and its trading services. By accessing our platform, you agree to
          these terms. Please read them carefully.
        </p>

        {/* Eligibility Section */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            1. Eligibility
          </h2>
          <p className="text-gray-700">
            By using our platform, you confirm that you:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Are at least 18 years old or meet the legal age for trading in
              your jurisdiction.
            </li>
            <li>Have the authority to agree to these terms.</li>
            <li>Will comply with all applicable laws and regulations.</li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700">Users are responsible for:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Maintaining the confidentiality of their account information.
            </li>
            <li>Ensuring all trades comply with applicable regulations.</li>
            <li>Refraining from fraudulent or malicious activities.</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            3. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            Pro Elite Holdings is not liable for:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Losses arising from market fluctuations.</li>
            <li>Unauthorized account access due to user negligence.</li>
            <li>Third-party service outages affecting trading activities.</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            4. Termination of Services
          </h2>
          <p className="text-gray-700">
            We reserve the right to terminate accounts for violations of these
            terms, including but not limited to:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Providing false information.</li>
            <li>Engaging in prohibited trading activities.</li>
            <li>Non-compliance with regulatory requirements.</li>
          </ul>
        </section>

        <p className="text-gray-700">
          For any inquiries about these Terms, please reach us at{" "}
          <a
            href={`mailto:support@${process.env.RESEND_DOMAIN}`}
            className="text-indigo-600 underline"
          >
            support@{process.env.RESEND_DOMAIN}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
