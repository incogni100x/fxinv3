export default function PrivacyPolicy() {
  return (
    <div className=" min-h-screen py-20 px-4 ">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg px-4 lg:px-6 py-10">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6 py-6">
          Privacy Policy
        </h1>
        <p className="text-gray-700 mb-8">
          At <span className="font-semibold">Pro Elite Holdings</span>, we
          are committed to protecting your privacy. This Privacy Policy outlines
          the information we collect, how we use it, and the measures we take to
          keep it secure.
        </p>

        {/* Information Collection Section */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect personal and financial information to provide a seamless
            trading experience. This includes:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              Personal details such as name, email, phone number, and address.
            </li>
            <li>
              Financial data, including bank account details, trading history,
              and payment methods.
            </li>
            <li>
              Behavioral data like your website usage patterns to enhance user
              experience.
            </li>
          </ul>
        </section>

        {/* Usage of Information */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Facilitate your trading activities and account management.</li>
            <li>
              Ensure compliance with financial regulations and prevent fraud.
            </li>
            <li>
              Communicate important updates, promotions, or educational content
              related to trading.
            </li>
            <li>Analyze trends and improve platform functionality.</li>
          </ul>
        </section>

        {/* Data Sharing and Protection */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">
            3. Data Sharing and Security
          </h2>
          <p className="text-gray-700 mb-4">
            Your data is shared only with trusted third parties for operational
            purposes, including:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Payment processors to manage transactions securely.</li>
            <li>Regulatory bodies as required by law.</li>
            <li>
              Service providers who assist in maintaining platform performance.
            </li>
          </ul>
          <p className="text-gray-700">
            We use industry-standard encryption and secure storage practices to
            protect your data.
          </p>
        </section>

        {/* Contact */}
        <p className="text-gray-700">
          For questions about our Privacy Policy, please contact us at{" "}
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
