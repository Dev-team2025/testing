import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CombinedDetails = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/combined/combined-details')
            .then(res => {
                setCombinedData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching combined data:", err);
                setLoading(false);
            });
    }, []);

    // Helper to parse end date from trainingDates string
    const isUpcomingOrOngoing = (trainingDates) => {
        if (!trainingDates) return false;

        // Example format: "2025-06-15 to 2025-06-18"
        const parts = trainingDates.split('to').map(p => p.trim());

        // If single date given, consider it as end date too
        let endDateStr = parts.length === 2 ? parts[1] : parts[0];

        // Parse end date
        const endDate = new Date(endDateStr);

        if (isNaN(endDate)) {
            // If parsing fails, fallback to show it
            return true;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize time to start of day

        return endDate >= today; // Show if end date is today or in future
    };

    // Helper to parse start date from trainingDates string
    const getStartDate = (trainingDates) => {
        if (!trainingDates) return new Date(0); // fallback to very old date if missing
        const parts = trainingDates.split('to').map(p => p.trim());
        return new Date(parts[0]); // parse start date
    };

    // Filter combinedData to only upcoming or ongoing training
    const filteredData = combinedData.filter(item => isUpcomingOrOngoing(item.trainingDates));

    // Sort filtered data by start date ascending
    filteredData.sort((a, b) => getStartDate(a.trainingDates) - getStartDate(b.trainingDates));

    if (loading) return <p>Loading...</p>;

    if (filteredData.length === 0) {
        return (
            <div className="p-6">
                <button
                    onClick={() => window.history.back()}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    &larr; Go Back
                </button>
                <p>No upcoming or ongoing training assignments found.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <button
                onClick={() => window.history.back()}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                &larr; Go Back
            </button>

            <h2 className="text-2xl font-bold mb-4">Combined Assignment and Trainer Responses</h2>

            {filteredData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 shadow-md">
                    <h3 className="font-semibold text-lg">Assignment: {item.clientName}</h3>
                    <p><strong>Training Dates:</strong> {item.trainingDates}</p>
                    <p><strong>Mode:</strong> {item.modeOfTraining}</p>
                    <p><strong>Location:</strong> {item.trainingLocation}</p>
                    <p><strong>Assignment Code:</strong> {item.assignmentCode}</p>

                    <h4 className="mt-4 font-semibold">Trainer Response</h4>
                    <p><strong>Submitted By:</strong> {item.trainerResponse.submittedBy}</p>
                    <p><strong>Email:</strong> {item.trainerResponse.email}</p>
                    <p><strong>Training Name:</strong> {item.trainerResponse.trainingName}</p>
                    <p><strong>Execution Approach:</strong> {item.trainerResponse.executionApproach}</p>
                    <p><strong>Expected Outcome:</strong> {item.trainerResponse.expectedOutcome}</p>
                </div>
            ))}
        </div>
    );
};

export default CombinedDetails;
