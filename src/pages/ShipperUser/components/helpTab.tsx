import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

type TabType = 'contact' | 'email'

export default function HelpTab() {
  const [activeTab, setActiveTab] = useState<TabType>('contact')

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Help</h2>
      </div>
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'contact'
              ? 'bg-white text-blue-600 font-semibold'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Us
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === 'email'
              ? 'bg-white text-blue-600 font-semibold'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('email')}
        >
          Email Us
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            <div className="flex items-center space-x-3 text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
              <span>+1 (253) 269 1300</span>
            </div>
            <p className="text-gray-600 font-normal">
              Our support team is available 24/7.
            </p>
          </div>
        )}
        {activeTab === 'email' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <div className="flex items-center space-x-3 text-gray-600">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
              <span>tech@pdienterprise.com</span>
            </div>
            <p className="text-gray-600 font-normal">
              We typically respond to emails within 24 hours during business days.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}