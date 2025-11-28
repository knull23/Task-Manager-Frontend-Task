import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { User, Mail, Calendar } from 'lucide-react';

export function Profile() {
  const { profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [errors, setErrors] = useState<{ fullName?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    const { error } = await updateProfile({
      full_name: fullName,
      bio: bio || undefined,
    });
    setLoading(false);

    if (error) {
      setErrors({ general: error.message || 'Failed to update profile' });
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {profile?.full_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900">{profile?.full_name}</h3>
            <p className="text-gray-600 flex items-center mt-1">
              <Mail className="w-4 h-4 mr-2" />
              {profile?.email}
            </p>
            <p className="text-gray-500 text-sm flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-2" />
              Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              Profile updated successfully!
            </div>
          )}

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            placeholder="Enter your full name"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
              {profile?.email}
            </div>
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={4}
              placeholder="Tell us about yourself (optional)"
            />
          </div>

          <Button type="submit" loading={loading} className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Update Profile</span>
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-600 font-medium">Account Status</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">Active</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-sm text-green-600 font-medium">Profile Complete</p>
              <p className="text-2xl font-bold text-green-700 mt-1">
                {profile?.bio ? '100%' : '80%'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-600 font-medium">Member Since</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">
                {profile?.created_at ? new Date(profile.created_at).getFullYear() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
