import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainerList = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/trainers");
                setTrainers(res.data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto mt-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                ← Go Back
            </button>

            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Trainer List</h2>

            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading trainers...</p>
                </div>
            ) : trainers.length === 0 ? (
                <p className="text-red-600 text-center font-semibold">No trainers found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded shadow-md">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr className="text-left">
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Phone</th>
                                <th className="p-3 border">Experience</th>
                                <th className="p-3 border">Skills</th>
                                <th className="p-3 border">Base Location</th>
                                <th className="p-3 border">LinkedIn</th>
                                <th className="p-3 border">Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border">{t.name}</td>
                                    <td className="p-3 border">{t.email}</td>
                                    <td className="p-3 border">{t.phone}</td>
                                    <td className="p-3 border">{t.experience} years</td>
                                    <td className="p-3 border">{Array.isArray(t.skills) ? t.skills.join(', ') : 'N/A'}</td>
                                    <td className="p-3 border">{t.baseLocation}</td>
                                    <td className="p-3 border">
                                        {t.linkedInProfile ? (
                                            <a
                                                href={t.linkedInProfile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                Profile
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {t.resume ? (
                                            <a
                                                href={`http://localhost:5000/uploads/${t.resume}`}
                                                download
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                                            >
                                                Download
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrainerList;
