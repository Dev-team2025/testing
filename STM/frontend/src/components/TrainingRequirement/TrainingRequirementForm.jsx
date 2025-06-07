import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function TrainingRequirementForm() {
    const [formData, setFormData] = useState({
        submittedBy: "",
        trainingName: "",
        contactNumber: "",
        email: "",
        preRequisites: "",
        schedule: "",
        programAgenda: "",
        executionApproach: "",
        labRequirements: "",
        caseStudies: "",
        expectedOutcome: "",
        deliverables: "",
        profileSummary: "",
        commercials: "",
        availableForScopingCall: "",
        availableForTrainingExecution: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/trainerresponses", formData);

            Swal.fire({
                icon: "success",
                title: "Response Recorded",
                text: "Thank you! Your response has been successfully recorded.",
                confirmButtonColor: "#1F3C88",
            });

            setFormData({
                submittedBy: "",
                trainingName: "",
                contactNumber: "",
                email: "",
                preRequisites: "",
                schedule: "",
                programAgenda: "",
                executionApproach: "",
                labRequirements: "",
                caseStudies: "",
                expectedOutcome: "",
                deliverables: "",
                profileSummary: "",
                commercials: "",
                availableForScopingCall: "",
                availableForTrainingExecution: "",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.error || "Something went wrong!",
                confirmButtonColor: "#d33",
            });
        }
    };

    const inputClass =
        "w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300";

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-[#1F3C88] mb-6">
                Training Requirement Form
            </h2>
            <form onSubmit={handleSubmit}>
                {[
                    ["submittedBy", "Submitted By"],
                    ["trainingName", "Training Name"],
                    ["contactNumber", "Contact Number"],
                    ["email", "Email"],
                ].map(([name, label]) => (
                    <div key={name}>
                        <label className="block font-semibold mb-1 text-[#1F3C88]">{label}</label>
                        <input
                            type={name === "email" ? "email" : "text"}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>
                ))}

                {[
                    ["preRequisites", "Pre-requisites"],
                    ["schedule", "Schedule"],
                    ["programAgenda", "Program Agenda"],
                    ["executionApproach", "Execution Approach"],
                    ["labRequirements", "Lab Requirements (if any), along with ballpark cost"],
                    ["caseStudies", "Case Studies/Use cases"],
                    ["expectedOutcome", "Expected Outcome"],
                    ["deliverables", "Deliverables"],
                    ["profileSummary", "Your profile summary (also attach detailed technical profile in the email)"],
                    ["commercials", "Your commercials (mention if any taxes applied as well, like GST)"],
                ].map(([name, label]) => (
                    <div key={name}>
                        <label className="block font-semibold mb-1 text-[#1F3C88]">{label}</label>
                        <textarea
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className={inputClass}
                            rows={2}
                            required
                        />
                    </div>
                ))}

                {/* Availability as two separate fields */}
                <div>
                    <label className="block font-semibold mb-1 text-[#1F3C88]">
                        Available for Scoping Call
                    </label>
                    <input
                        type="text"
                        name="availableForScopingCall"
                        value={formData.availableForScopingCall}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-[#1F3C88]">
                        Available for Training Execution
                    </label>
                    <input
                        type="text"
                        name="availableForTrainingExecution"
                        value={formData.availableForTrainingExecution}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1F3C88] text-white font-semibold py-2 rounded hover:bg-[#163179] transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TrainingRequirementForm;
