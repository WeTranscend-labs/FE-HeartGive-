import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { useFormContext } from 'react-hook-form';

export function OrganizationInfoForm() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <BuildingOfficeIcon className="w-5 h-5 mr-2 text-gray-400" />
          Organization Description
        </label>
        <textarea
          {...register('organizationInfo.description', {
            required: 'Organization description is required',
            minLength: {
              value: 100,
              message: 'Description must be at least 100 characters',
            },
          })}
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us about your organization's mission, history, and impact..."
        />
        {/* {errors.organizationInfo?. && (
          <p className="mt-1 text-sm text-red-600">
            {errors.organizationInfo.description.message as string}
          </p>
        )} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <GlobeAltIcon className="w-5 h-5 mr-2 text-gray-400" />
            Website
          </label>
          <input
            type="url"
            {...register('organizationInfo.website')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://www.example.org"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <EnvelopeIcon className="w-5 h-5 mr-2 text-gray-400" />
            Email
          </label>
          <input
            type="email"
            {...register('organizationInfo.email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="contact@organization.org"
          />
          {/* {errors.organizationInfo?.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.organizationInfo.email.message as string}
            </p>
          )} */}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <PhoneIcon className="w-5 h-5 mr-2 text-gray-400" />
            Phone
          </label>
          <input
            type="tel"
            {...register('organizationInfo.phone')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <MapPinIcon className="w-5 h-5 mr-2 text-gray-400" />
            Address
          </label>
          <input
            type="text"
            {...register('organizationInfo.address')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="123 Main St, City, Country"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            {...register('organizationInfo.socialLinks.facebook')}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Facebook URL"
          />
          <input
            type="url"
            {...register('organizationInfo.socialLinks.twitter')}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Twitter URL"
          />
          <input
            type="url"
            {...register('organizationInfo.socialLinks.instagram')}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Instagram URL"
          />
          <input
            type="url"
            {...register('organizationInfo.socialLinks.linkedin')}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="LinkedIn URL"
          />
        </div>
      </div>
    </div>
  );
}
