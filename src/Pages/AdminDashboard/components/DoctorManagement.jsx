import React, { useState, useEffect } from "react";
import { Plus, ArrowUp, ArrowDown, Edit2, Trash2, X, Image as ImageIcon, Upload } from "lucide-react";
import api from "../../../api/api";
import { toast } from "../../../Components/Common/ToastProvider";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [education, setEducation] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.get("/doctors");
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingDoctor(null);
    setName("");
    setDegree("");
    setExperience("");
    setSpecialties("");
    setEducation("");
    setImage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoctor(doc);
    setName(doc.name || "");
    setDegree(doc.degree || "");
    setExperience(doc.experience || "");
    setSpecialties(doc.specialties ? doc.specialties.join(", ") : "");
    setEducation(doc.education || "");
    setImage(doc.image || "");
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warning("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        name,
        degree,
        experience,
        education,
        specialties: specialties.split(",").map((s) => s.trim()).filter(Boolean),
        image,
      };

      if (editingDoctor) {
        const response = await api.put(`/admin/doctors/${editingDoctor._id}`, payload);
        if (response.data.success) {
          toast.success("Doctor profile updated successfully!");
          setIsModalOpen(false);
          fetchDoctors();
        }
      } else {
        const response = await api.post("/admin/doctors", payload);
        if (response.data.success) {
          toast.success("Doctor profile added successfully!");
          setIsModalOpen(false);
          fetchDoctors();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save doctor details");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this doctor profile?")) return;
    try {
      const response = await api.delete(`/admin/doctors/${id}`);
      if (response.data.success) {
        toast.success("Doctor profile deleted successfully");
        fetchDoctors();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete doctor profile");
    }
  };

  const handleMove = async (index, direction) => {
    const newDoctors = [...doctors];
    const swapWithIndex = direction === "up" ? index - 1 : index + 1;

    if (swapWithIndex < 0 || swapWithIndex >= doctors.length) return;

    // Swap elements in frontend local state array
    const temp = newDoctors[index];
    newDoctors[index] = newDoctors[swapWithIndex];
    newDoctors[swapWithIndex] = temp;

    // Recalculate order values
    const updatedOrders = newDoctors.map((doc, idx) => ({
      id: doc._id,
      order: idx + 1,
    }));

    // Update local state temporarily for snappy UI
    setDoctors(
      newDoctors.map((doc, idx) => ({
        ...doc,
        order: idx + 1,
      }))
    );

    try {
      // Save order values to backend
      const response = await api.put("/admin/doctors/reorder", { orders: updatedOrders });
      if (!response.data.success) {
        fetchDoctors(); // Rollback if backend fails
      }
    } catch (err) {
      console.error(err);
      fetchDoctors(); // Rollback on error
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Manage Doctors</h2>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </button>
      </div>

      {loading && doctors.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading doctors...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 w-16">Order</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 w-24">Photo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name & Degree</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Experience</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Specialties</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, index) => (
                <tr key={doc._id} className="border-b border-gray-100 hover:bg-gray-50">
                  {/* Reordering Controls */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleMove(index, "up")}
                        disabled={index === 0}
                        className={`p-1 rounded transition-colors ${
                          index === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-gray-700">{doc.order}</span>
                      <button
                        onClick={() => handleMove(index, "down")}
                        disabled={index === doctors.length - 1}
                        className={`p-1 rounded transition-colors ${
                          index === doctors.length - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  {/* Doctor Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </td>

                  {/* Name and Degree */}
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.degree}</p>
                  </td>

                  {/* Experience */}
                  <td className="py-3 px-4 text-sm text-gray-600">{doc.experience}</td>

                  {/* Specialties */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {doc.specialties &&
                        doc.specialties.map((spec, i) => (
                          <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                            {spec}
                          </span>
                        ))}
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(doc)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Doctor"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500 text-sm">
                    No doctors profiles found. Click "Add Doctor" to begin seeding.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT DOCTOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {editingDoctor ? "Edit Doctor Profile" : "Add Doctor Profile"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Dr. Shanmugapriya"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    />
                  </div>

                  {/* Degree field */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">Degree</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      required
                      placeholder="e.g. MBBS, MD (Obs & Gynae)"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Experience field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Experience Statement</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    placeholder="e.g. 19 years experience in Women's Health"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                </div>

                {/* Specialties field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Specialties (Comma Separated)</label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    placeholder="e.g. Gynecology, IVF, PCOS Treatment"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                </div>

                {/* Education field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Education Details</label>
                  <textarea
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    rows={2}
                    placeholder="e.g. MBBS - Madras Medical College, Chennai • MD (Obs & Gynae) - Stanley Medical College"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                  />
                </div>

                {/* Image Upload field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                      {image ? (
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm border border-gray-300 cursor-pointer font-medium transition-colors">
                      <Upload className="w-4 h-4" />
                      Choose Image
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {image && (
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="text-xs text-red-500 hover:underline font-semibold"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
