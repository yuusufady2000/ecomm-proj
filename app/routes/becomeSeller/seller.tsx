
import { useState } from "react";

const SellerForm = () => {
  const [nextStep, setNextStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

 
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  storeName: "",
  businessCategory: "",
  country: "",
  city: "",
  address: "",
  status: "pending" as "pending" | "accepted" | "rejected",
});



  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (nextStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }

      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      }

      if (!formData.birthDate) {
        newErrors.birthDate = "Birth date is required";
      }
    }

    if (nextStep === 2) {
      if (!formData.storeName.trim()) {
        newErrors.storeName = "Store name is required";
      }

      if (!formData.businessCategory) {
        newErrors.businessCategory = "Business category is required";
      }

      if (!formData.country.trim()) {
        newErrors.country = "Country is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitApplication = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/User",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const handleForward = () => {
    if (nextStep === 1) {
      const isValid = validateStep();

      if (!isValid) {
        return;
      }

      setNextStep(2);
      return;
    }

    if (nextStep === 2) {
      const isValid = validateStep();

      if (!isValid) {
        return;
      }

      setNextStep(3);
      return;
    }

    if (nextStep === 3) {
      submitApplication();
    }
  };

  const handlePrevStep = () => {
    if (nextStep > 1) {
      setErrors({});
      setNextStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Become a Seller
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please fill out the form below to become a seller.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-3">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              nextStep >= 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>

          <div
            className={`h-1 w-16 rounded ${
              nextStep >= 2 ? "bg-blue-600" : "bg-gray-200"
            }`}
          />

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              nextStep >= 2
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>

          <div
            className={`h-1 w-16 rounded ${
              nextStep >= 3 ? "bg-blue-600" : "bg-gray-200"
            }`}
          />

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
              nextStep >= 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>

        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          {nextStep === 1 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Tell us a little about yourself.
                </p>
              </div>

              <div className="space-y-5">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="birthDate"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Birth Date
                  </label>

                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.birthDate
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthDate}
                    </p>
                  )}
                </div>

              </div>
            </div>
          )}

          {nextStep === 2 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Business Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Tell us about your business.
                </p>
              </div>

              <div className="space-y-5">

                <div>
                  <label
                    htmlFor="storeName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Store Name
                  </label>

                  <input
                    type="text"
                    name="storeName"
                    id="storeName"
                    placeholder="Enter your store name"
                    value={formData.storeName}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.storeName
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.storeName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.storeName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="businessCategory"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Business Category
                  </label>

                  <select
                    name="businessCategory"
                    id="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.businessCategory
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="fashion">Fashion</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                  </select>

                  {errors.businessCategory && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.businessCategory}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.country
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.city
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                      errors.address
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />

                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

              </div>
            </div>
          )}

          {nextStep === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Review & Submit
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Review your information before submitting.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <div className="space-y-4 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">
                      {formData.name}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">
                      {formData.email}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-medium text-gray-900">
                      {formData.phoneNumber}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Birth Date</span>
                    <span className="font-medium text-gray-900">
                      {formData.birthDate}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Store Name</span>
                    <span className="font-medium text-gray-900">
                      {formData.storeName}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-900">
                      {formData.businessCategory}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Country</span>
                    <span className="font-medium text-gray-900">
                      {formData.country}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">City</span>
                    <span className="font-medium text-gray-900">
                      {formData.city}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-gray-900">
                      {formData.address}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">

            <button
              type="button"
              onClick={handlePrevStep}
              disabled={nextStep === 1}
              className="rounded-full bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleForward}
              className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {nextStep === 3 ? "Submit" : "Next"}
            </button>

          </div>

        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-100">
              <span className="text-8xl font-bold leading-none text-green-600">
                ✓
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Application Received!
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              We received your application and it's successfully submitted.
              We will get back to you in two business days.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-7 w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Done
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default SellerForm;
